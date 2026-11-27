import { useEffect, useRef, useState } from 'react'
import { signature } from './signature'
import { Signature } from './Signature'
import { Stars } from './Stars'
import { work, type Testimonial } from './content'
import { Notes } from './Notes'
import { Sphere } from './Sphere'

// /branding: the site's brand kit and component kitchen sink. Every "Copy" grabs the live markup
// and the matching CSS rules straight from the site's stylesheet, so copies never drift from the site.

/* ---------- copy helpers ---------- */

function cssRules(selectors: string[]) {
  const hits = (sel: string) =>
    sel.split(',').some((part) => selectors.some((s) => part.trim() === s || part.trim().startsWith(`${s}:`) || part.trim().startsWith(`${s} `) || part.trim().startsWith(`${s}.`) || part.trim().startsWith(`${s}::`)))
  const out: string[] = []
  const walk = (rules: CSSRuleList) => {
    for (const r of rules) {
      if (r instanceof CSSStyleRule && hits(r.selectorText)) out.push(r.cssText)
      else if (r instanceof CSSKeyframesRule && selectors.includes(`@keyframes ${r.name}`)) out.push(r.cssText)
    }
  }
  for (const sheet of document.styleSheets) walk(sheet.cssRules)
  if (out.length === 0) throw new Error(`No CSS found for ${selectors.join(', ')}`)
  return out.join('\n')
}

function rootTokens() {
  const out: string[] = []
  for (const sheet of document.styleSheets) {
    for (const r of sheet.cssRules) {
      if (r instanceof CSSStyleRule && (r.selectorText.includes(':root') || r.selectorText.includes('[data-theme'))) out.push(r.cssText)
    }
  }
  if (out.length === 0) throw new Error('Missing :root design tokens')
  return out.join('\n')
}

function useCopy() {
  const [copied, setCopied] = useState('')
  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? '' : c)), 1400)
    })
  }
  return { copied, copy }
}

function CopyButton({ label = 'Copy', done, onClick }: { label?: string; done: boolean; onClick: () => void }) {
  return (
    <button className={`bk-copy ${done ? 'done' : ''}`} onClick={onClick}>
      {done ? 'Copied ✓' : label}
    </button>
  )
}

/* ---------- specimen: live preview + copy HTML & CSS ---------- */

function Specimen({ name, note, css, children, dark = true }: { name: string; note?: string; css: string[]; children: React.ReactNode; dark?: boolean }) {
  const stage = useRef<HTMLDivElement>(null)
  const { copied, copy } = useCopy()
  const html = () => {
    if (!stage.current) throw new Error('Specimen stage missing')
    return stage.current.innerHTML.replace(/ style=""/g, '')
  }
  return (
    <figure className="bk-spec">
      <div className={`bk-stage ${dark ? '' : 'light'}`} ref={stage}>
        {children}
      </div>
      <figcaption>
        <div>
          <strong>{name}</strong>
          {note && <span>{note}</span>}
        </div>
        <div className="bk-actions">
          <CopyButton label="HTML" done={copied === 'html'} onClick={() => copy('html', html())} />
          <CopyButton label="CSS" done={copied === 'css'} onClick={() => copy('css', cssRules(css))} />
          <CopyButton label="Both" done={copied === 'both'} onClick={() => copy('both', `<!-- ${name} -->\n${html()}\n\n<style>\n${cssRules(css)}\n</style>`)} />
        </div>
      </figcaption>
    </figure>
  )
}

/* ---------- data ---------- */

const COLORS = [
  { name: 'Night', hex: '#04060e', use: 'Top of the sky, splash' },
  { name: 'Midnight', hex: '#0a1c40', use: 'Sky, case-study hero' },
  { name: 'Deep navy', hex: '#0b1626', use: 'Dark page, ink on white chips' },
  { name: 'Navy', hex: '#0e2d5c', use: 'Hero bottom, sky middle' },
  { name: 'Sky', hex: '#1d6fd8', use: 'Light page (white text passes AA)' },
  { name: 'Day blue', hex: '#53a4ff', use: 'Highlights, theme colour' },
  { name: 'Puffy pink', hex: '#ff6fa5', use: 'The puffy word' },
  { name: 'Puffy deep', hex: '#e2397a', use: 'Puffy gradient end' },
  { name: 'Online', hex: '#83ff9e', use: 'Status dot' },
  { name: 'White', hex: '#ffffff', use: 'All text' },
]

const GRADIENTS = [
  { name: 'Sky (light)', css: 'linear-gradient(#04060e 0%, #070f24 14%, #0a1c40 28%, #0e2d5c 42%, #153f7e 56%, #1d55a0 66%, #1d6fd8 78%, #1d6fd8 100%)' },
  { name: 'Hero night', css: 'linear-gradient(#04060e, #0e2d5c)' },
  { name: 'Puffy', css: 'linear-gradient(180deg, #ffd1e3 0%, #ff6fa5 45%, #e2397a 100%)' },
]

const TYPE = [
  { token: '--fs-4xl', label: 'Hero · Anton', cls: 'mega', sample: 'Product Builder' },
  { token: '--fs-3xl', label: 'Section headline · Anton', cls: 'headline', sample: 'What I built' },
  { token: '--fs-2xl', label: 'Project title · Anton', cls: 'project-title', sample: 'Pearbae' },
  { token: '--fs-lg', label: 'Lead body · Inter', cls: 'bk-t-lg', sample: 'A decade of shipping software across web, mobile and AI.' },
  { token: '--fs-md', label: 'Body · Inter', cls: 'bk-t-md', sample: 'Built every surface, then scaled it to live events across the country.' },
  { token: '--fs-sm', label: 'UI · Inter', cls: 'bk-t-sm', sample: 'Buttons, nav, footer links' },
  { token: '--fs-xs', label: 'Eyebrow · Inter caps', cls: 'eyebrow', sample: 'An engineer who thinks like a PM' },
]

// Template only: placeholder copy, clearly not real quotes.
const SAMPLE_NOTES: Testimonial[] = [
  { name: 'Client name', role: 'Founder, Company', short: 'The one-line highlight from their testimonial.', quote: 'The full testimonial opens here, inside the same card. The page blurs behind it, the card grows to fit the whole quote, and a Close pill appears underneath. Esc or a click outside closes it too.' },
  { name: 'Second client', role: 'Head of Product, Company', short: 'Tap a card: it expands in place, no modal.', quote: 'Each card is a notification until you tap it. Then that same card expands, like opening a notification on your phone.' },
  { name: 'Third client', role: 'CTO, Company', short: 'Hover lifts the card slightly.', quote: 'Use real quotes only, with permission from the person quoted.' },
]

const SECTIONS = [
  ['logo', 'Logo'],
  ['colour', 'Colour'],
  ['type', 'Type'],
  ['motion', 'Motion'],
  ['components', 'Components'],
  ['tokens', 'Tokens'],
] as const

const svgSource = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${signature.viewBox}" fill="${fill}">\n${signature.letters.map((d) => `  <path d="${d}"/>`).join('\n')}\n</svg>`

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  URL.revokeObjectURL(url)
}

/* ---------- page ---------- */

export function Branding() {
  const { copied, copy } = useCopy()
  const [replay, setReplay] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <article className="bk">
      <header className="bk-hero">
        <Stars count={120} />
        <p className="eyebrow">Brand kit · style library · components</p>
        <h1 className="mega">Branding</h1>
        <p className="bk-lede">Everything this site is made of. Click any colour, token or component to copy it straight into your own project.</p>
        <nav className="bk-toc" aria-label="Brand kit sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => (e.preventDefault(), document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section className="bk-sec" id="logo">
        <h2 className="headline">Logo</h2>
        <p className="bk-note">A handwritten signature set in Sacramento (OFL), converted to outlines. Always filled, never stroked. Give it clear space of one letter height on every side.</p>
        <div className="bk-grid two">
          {[
            ['On night', '#ffffff', 'bk-logo-night'],
            ['On white', '#0b1626', 'bk-logo-white'],
          ].map(([label, fill, cls]) => (
            <figure key={label} className="bk-spec">
              <div className={`bk-stage ${cls}`}>
                <Signature className="bk-logo" />
              </div>
              <figcaption>
                <div>
                  <strong>{label}</strong>
                  <span>{fill}</span>
                </div>
                <div className="bk-actions">
                  <CopyButton label="Copy SVG" done={copied === `svg${fill}`} onClick={() => copy(`svg${fill}`, svgSource(fill))} />
                  <button className="bk-copy" onClick={() => download(`prathamesh-${fill === '#ffffff' ? 'white' : 'navy'}.svg`, svgSource(fill))}>
                    Download
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bk-sec" id="colour">
        <h2 className="headline">Colour</h2>
        <p className="bk-note">Night navy into sky blue, with one loud pink. Click a swatch to copy its hex.</p>
        <div className="bk-swatches">
          {COLORS.map((c) => (
            <button key={c.hex} className="bk-swatch" onClick={() => copy(c.hex, c.hex)}>
              <i style={{ background: c.hex }} />
              <strong>{copied === c.hex ? 'Copied ✓' : c.name}</strong>
              <code>{c.hex}</code>
              <span>{c.use}</span>
            </button>
          ))}
        </div>
        <h3 className="bk-h3">Project accents</h3>
        <div className="bk-swatches small">
          {work.map((w) => (
            <button key={w.id} className="bk-swatch" onClick={() => copy(w.accent, w.accent)}>
              <i style={{ background: w.accent }} />
              <strong>{copied === w.accent ? 'Copied ✓' : w.name}</strong>
              <code>{w.accent}</code>
            </button>
          ))}
        </div>
        <h3 className="bk-h3">Gradients</h3>
        <div className="bk-grid three">
          {GRADIENTS.map((g) => (
            <button key={g.name} className="bk-gradient" onClick={() => copy(g.name, `background: ${g.css};`)}>
              <i style={{ background: g.css }} />
              <strong>{copied === g.name ? 'Copied ✓' : g.name}</strong>
              <code>{g.css}</code>
            </button>
          ))}
        </div>
      </section>

      <section className="bk-sec" id="type">
        <h2 className="headline">Type</h2>
        <p className="bk-note">Anton for display, uppercase, tracking 0. Inter for everything else. Eight sizes, nothing in between. Click a row to copy its token.</p>
        <div className="bk-type">
          {TYPE.map((t) => (
            <button key={t.token} className="bk-type-row" onClick={() => copy(t.token, `font-size: var(${t.token});`)}>
              <span className="bk-type-meta">
                <code>{copied === t.token ? 'Copied ✓' : t.token}</code>
                <span>{t.label}</span>
              </span>
              <span className={t.cls}>{t.sample}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bk-sec" id="motion">
        <h2 className="headline">Motion</h2>
        <p className="bk-note">One curve for everything: fast out, long soft landing. 0.2–0.3s for UI, 0.8–1.1s for reveals.</p>
        <div className="bk-grid two">
          <button className="bk-motion" onClick={() => copy('ease', 'cubic-bezier(0.32, 0.72, 0, 1)')}>
            <svg viewBox="0 0 100 100" aria-hidden>
              <path d="M0 100 C 32 28, 0 0, 100 0" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <strong>{copied === 'ease' ? 'Copied ✓' : '--ease'}</strong>
            <code>cubic-bezier(0.32, 0.72, 0, 1)</code>
          </button>
          <div className="bk-motion">
            <div className="bk-ball-track">
              <i key={replay} className="bk-ball" />
            </div>
            <button className="chip" onClick={() => setReplay((r) => r + 1)}>
              Replay <span aria-hidden>↻</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bk-sec" id="components">
        <h2 className="headline">Components</h2>
        <p className="bk-note">Live components from the site. Copy the HTML, the CSS (pulled from the live stylesheet), or both. They need the tokens at the bottom of the page.</p>
        <div className="bk-wide">
          <Specimen name="Work sphere (landing hero)" note="Cards curve like stickers on the inside of a sphere; drifts and follows the mouse. Needs Sphere.tsx" css={['.sphere', '.sphere-scene', '.tile', '.tile-strip', '.tile-face', '.tile-inner', '.sphere-vignette']}>
            <div className="bk-sphere">
              <Sphere />
            </div>
          </Specimen>
          <Specimen name="Figma selection pointer" note="Hover a card with a mouse: the pointer snaps into a selection frame and holds through small movements" css={['.ipad-pointer', '.ptr-h', '.ptr-label', '.ptr-size', '.ptr-dot']}>
            <div className="bk-select">
              <div className="bk-select-card" data-select="Pearbae">
                <strong>Pearbae</strong>
                <span>Hover me</span>
              </div>
              <div className="bk-select-card" data-select="Power trading">
                <strong>Power trading</strong>
                <span>Then me</span>
              </div>
              <div className="bk-select-card shown">
                <strong>Static preview</strong>
                <span>How the frame looks</span>
                <div className="ipad-pointer is-select bk-static-ptr" aria-hidden>
                  <i className="ptr-h tl" />
                  <i className="ptr-h tr" />
                  <i className="ptr-h bl" />
                  <i className="ptr-h br" />
                  <span className="ptr-label">Static preview</span>
                  <span className="ptr-size">240 × 160</span>
                </div>
              </div>
            </div>
          </Specimen>
        </div>
        <div className="bk-grid two">
          <Specimen name="Chip button" note="Primary and ghost" css={['.chip']}>
            <div className="bk-row">
              <a className="chip" href="#">
                View project <span aria-hidden>→</span>
              </a>
              <a className="chip ghost" href="#">
                Email me
              </a>
            </div>
          </Specimen>
          <Specimen name="Pill nav" note="Floating, blurred, bottom of screen" css={['.pill']}>
            <nav className="pill bk-static">
              <a href="#" className="on">
                Work
              </a>
              <a href="#">Side Quests</a>
              <a href="#" className="cta">
                Say hi
              </a>
            </nav>
          </Specimen>
          <Specimen name="Eyebrow + headline" css={['.eyebrow', '.headline']}>
            <div className="bk-col">
              <p className="eyebrow">Featured work</p>
              <h3 className="headline">Love shipping</h3>
            </div>
          </Specimen>
          <Specimen name="Puffy word" note="Glossy 3D-ish accent word, floats" css={['.puffy', '@keyframes float']}>
            <p className="puffy">use</p>
          </Specimen>
          <Specimen name="Status badge" css={['.status']}>
            <p className="status">
              <i /> Open to chat
            </p>
          </Specimen>
          <Specimen name="Glass card" note="Contact card shell" css={['.glass', '.card', '.card-actions']}>
            <div className="card glass bk-card">
              <h3 className="project-title">Prathamesh Ashra</h3>
              <div className="card-actions">
                <a className="chip" href="#">
                  Book a call
                </a>
                <a className="chip ghost" href="#">
                  Email me
                </a>
              </div>
            </div>
          </Specimen>
          <Specimen name="Metric tile" note="From case-study pages" css={['.case-metrics']}>
            <div className="case-metrics bk-metrics" style={{ '--accent': '#ff8a3d' } as React.CSSProperties}>
              <div>
                <strong>1M+</strong>
                <span>views</span>
              </div>
            </div>
          </Specimen>
          <Specimen name="Testimonial notifications" note="Template copy. Tap one: the same card expands in place" css={['.notes', '.notes-blur', '.note', '.note-face', '.note-initials', '.note-body', '.note-who', '.note-quote', '.note-close']}>
            <div className="bk-notes">
              <Notes items={SAMPLE_NOTES} />
            </div>
          </Specimen>
          <Specimen name="Twinkling stars" note="Random positions, sizes and timing" css={['.stars', '@keyframes twinkle']}>
            <div className="bk-stars">
              <Stars count={60} />
            </div>
          </Specimen>
        </div>
      </section>

      <section className="bk-sec" id="tokens">
        <h2 className="headline">Tokens</h2>
        <p className="bk-note">The CSS variables every component above relies on. Paste these first.</p>
        <div className="bk-actions">
          <CopyButton label="Copy all tokens" done={copied === 'tokens'} onClick={() => copy('tokens', rootTokens())} />
        </div>
      </section>
    </article>
  )
}
