// Runs after `vite build`. Writes one real HTML file per route so search engines and AI crawlers
// (most of which don't run JavaScript) see each page's own title, description, structured data
// and readable content. React replaces the content inside #root once the app loads.
// Also writes sitemap.xml and llms.txt from the same copy in src/content.ts.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { site, work, sideQuests, testimonials } from '../src/content.ts'

const DIST = new URL('../dist/', import.meta.url).pathname
const template = readFileSync(DIST + 'index.html', 'utf8')
const today = new Date().toISOString().slice(0, 10)

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const abs = (path) => site.url + path

const sameAs = [site.contact.linkedin, site.contact.x, site.contact.youtube].filter(Boolean)
const person = {
  '@type': 'Person',
  '@id': abs('/#person'),
  name: site.name,
  url: site.url,
  image: abs('/og.jpg'),
  jobTitle: 'Product Manager',
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  knowsAbout: site.expertise,
  founder: { '@type': 'Organization', name: 'Codeamesh Consultancy LLP', url: 'https://codeamesh.com', foundingDate: '2020' },
  sameAs,
}

// Replaces one tag in the template, failing loudly if the template changed shape.
function swap(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`prerender: template is missing ${pattern}`)
  return html.replace(pattern, value)
}

function page({ path, title, description, jsonLd, body }) {
  let html = template
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = swap(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(description)}" />`)
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${abs(path)}" />`)
  html = swap(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${abs(path)}" />`)
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
  html = swap(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(description)}" />`)
  html = swap(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(title)}" />`)
  html = swap(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(description)}" />`)
  html = swap(
    html,
    /<script type="application\/ld\+json">.*?<\/script>/s,
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLd }).replace(/</g, '\\u003c')}</script>`,
  )
  html = swap(html, /<div id="root"><\/div>/, `<div id="root"><div class="prerender">${body}</div></div>`)
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  mkdirSync(dirname(DIST + file), { recursive: true })
  writeFileSync(DIST + file, html)
}

const nav = `<nav><a href="/">Home</a> · <a href="/#work">Work</a> · <a href="/side-quests">Side quests</a> · <a href="${esc(site.contact.linkedin)}">LinkedIn</a></nav>`
const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`

/* ---------- Home ---------- */
page({
  path: '/',
  title: `${site.name} · AI Product Manager & Engineer in Mumbai`,
  description: site.metaDescription,
  jsonLd: [
    { '@type': 'ProfilePage', '@id': abs('/'), url: site.url, name: site.name, dateModified: today, mainEntity: { '@id': person['@id'] } },
    person,
  ],
  body: `${nav}
<h1>${esc(site.name)}, ${esc(site.title)}</h1>
<p>${esc(site.kicker)}</p>
<p>${esc(site.description)}</p>
<p>${esc(site.about)}</p>
<h2>Featured work</h2>
${list(work.map((w) => `<a href="/work/${w.id}"><strong>${esc(w.name)}</strong></a>: ${esc(w.oneLiner)}`))}
<h2>Side quests</h2>
${list(sideQuests.map((q) => `<strong>${esc(q.name)}</strong>: ${esc(q.blurb)}`))}
<h2>What clients say</h2>
${list(testimonials.map((t) => `“${esc(t.quote)}” (${esc(t.name)}, ${esc(t.role)})`))}
<h2>What I build</h2>
${list(site.services.map(esc))}
<h2>Contact</h2>
<p><a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a> · <a href="${esc(site.contact.call)}">Book a call</a> · <a href="${esc(site.contact.linkedin)}">LinkedIn</a></p>`,
})

/* ---------- Case studies ---------- */
for (const w of work) {
  const path = `/work/${w.id}`
  page({
    path,
    title: `${w.name} case study · ${site.name}`,
    description: w.oneLiner,
    jsonLd: [
      {
        '@type': 'Article',
        '@id': abs(path),
        url: abs(path),
        headline: `${w.name}: ${w.oneLiner}`,
        description: w.problem,
        author: { '@id': person['@id'] },
        about: w.stack,
        dateModified: today,
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: w.name, item: abs(path) },
      ] },
      person,
    ],
    body: `${nav}
<p>${esc(w.eyebrow)}</p>
<h1>${esc(w.name)}</h1>
<p>${esc(w.oneLiner)}</p>
<p>Role: ${esc(w.role)} · Timeline: ${esc(w.years)} · Stack: ${esc(w.stack.join(', '))}</p>
${list(w.metrics.map((m) => `${esc(m.value)} ${esc(m.label)}`))}
<h2>The problem</h2>
<p>${esc(w.problem)}</p>
<h2>What I built</h2>
${list(w.built.map(esc))}
<h2>The outcome</h2>
<p>${esc(w.outcome)}</p>
<p>Built by <a href="/">${esc(site.name)}</a>.</p>`,
  })
}

/* ---------- Side quests ---------- */
page({
  path: '/side-quests',
  title: `Side quests · ${site.name}`,
  description: `Side projects by ${site.name}: ${sideQuests.map((q) => q.name).join(', ')}.`,
  jsonLd: [
    {
      '@type': 'ItemList',
      '@id': abs('/side-quests'),
      name: `Side projects by ${site.name}`,
      itemListElement: sideQuests.map((q, i) => ({ '@type': 'ListItem', position: i + 1, name: q.name, description: q.blurb, ...(q.href && { url: q.href }) })),
    },
    person,
  ],
  body: `${nav}
<h1>Side quests: things ${esc(site.name)} builds for fun</h1>
${list(sideQuests.map((q) => `<strong>${esc(q.name)}</strong>: ${esc(q.blurb)}`))}`,
})

/* ---------- sitemap.xml ---------- */
const paths = ['/', ...work.map((w) => `/work/${w.id}`), '/side-quests']
writeFileSync(
  DIST + 'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${abs(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
)

/* ---------- llms.txt (the plain-text summary AI assistants look for) ---------- */
writeFileSync(
  DIST + 'llms.txt',
  `# ${site.name}

> ${site.description}

- Based in: Mumbai, India
- Current role: Product Manager
- Founder: Codeamesh Consultancy LLP (app and AI studio, founded 2020)
- Known for: ${site.expertise.join(', ')}
- Contact: ${site.contact.email} · ${site.contact.linkedin}

## Case studies

${work.map((w) => `- [${w.name}](${abs(`/work/${w.id}`)}): ${w.oneLiner} Stack: ${w.stack.join(', ')}.`).join('\n')}

## Side projects

${sideQuests.map((q) => `- ${q.name}: ${q.blurb}`).join('\n')}

## What clients say

${testimonials.map((t) => `- ${t.name} (${t.role}): "${t.quote}"`).join('\n')}
`,
)

console.log(`prerender: ${paths.length} pages, sitemap.xml, llms.txt`)
