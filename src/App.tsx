import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type Lenis from 'lenis'
import { site, work, testimonials, sideQuests } from './content'
import { holdScroll, reducedMotion, startScroll, startSnap } from './scroll'
import { Reveal } from './Reveal'
import { applyTheme, initialTheme, type Theme } from './theme'
import { Sphere } from './Sphere'
import { Stars } from './Stars'
import { Splash } from './Splash'
import { Signature } from './Signature'
import { SideQuests, Build } from './Pinned'
import { FooterScene } from './FooterScene'
import { Cursor } from './Cursor'
import { WorkVisual } from './WorkVisual'
import { Notes } from './Notes'
import { CasePage } from './CasePage'
import { Branding } from './Branding'
import { QuestsPage } from './QuestsPage'
import { QuestPage } from './QuestPage'
import { linkTo, navigate, usePath } from './router'

const ease = [0.32, 0.72, 0, 1] as const

/* ---------- Backdrop ---------- */

function Backdrop() {
  const clouds = useRef<HTMLDivElement>(null)
  // Clouds only belong in the blue part of the sky: fade them in once the navy top has scrolled past.
  useEffect(() => {
    const update = () => {
      if (!clouds.current) return
      const vh = window.innerHeight
      clouds.current.style.opacity = String(Math.min(1, Math.max(0, (window.scrollY - vh * 1.1) / vh)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="backdrop" aria-hidden>
      <Stars count={220} />
      <div ref={clouds} className="clouds">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`cloud c${i}`} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Hero: inside a sphere of work ---------- */

function Hero({ ready }: { ready: boolean }) {
  const shown = reducedMotion || ready
  return (
    <section className="hero" id="top" data-snap>
      <Stars count={120} />
      <Sphere />
      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          {site.kicker}
        </motion.p>
        <motion.h1
          className="mega"
          initial={reducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={shown ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
        >
          <span className="sr-only">{site.name}, </span>
          {site.title}
        </motion.h1>
      </div>
    </section>
  )
}

/* ---------- Statement ---------- */

// Original geek-culture toys floating around the statement: they pop in when the section
// arrives and bob gently. Shadows sit on the wrapper so they all fall the same way.
const TOYS = [
  { src: '/props/gamepad.svg', className: 'toy toy-pad' },
  { src: '/props/cartridge.svg', className: 'toy toy-cart' },
  { src: '/props/coin.svg', className: 'toy toy-coin' },
  { src: '/props/heart.svg', className: 'toy toy-heart' },
]

function Toys() {
  return (
    <div className="toys" aria-hidden>
      {TOYS.map((t, i) => (
        <motion.span
          key={t.src}
          className={t.className}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-10% 0px' }}
          transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.15 + i * 0.12 }}
        >
          <img src={t.src} alt="" />
        </motion.span>
      ))}
    </div>
  )
}

function Statement() {
  return (
    <section className="statement" data-snap>
      <Toys />
      {site.statement.map((line, i) => (
        <Reveal key={line} delay={i * 0.45}>
          <p className="headline">{line}</p>
        </Reveal>
      ))}
      <motion.p
        className="puffy"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.6, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.9 }}
      >
        {site.statementWord}
      </motion.p>
      <Reveal delay={1.1}>
        <p className="about-line">{site.about}</p>
      </Reveal>
    </section>
  )
}

/* ---------- Featured work ---------- */

function Work() {
  return (
    <section className="work" id="work">
      {work.map((s, i) => (
        <article key={s.id} className="project" id={s.id} data-snap data-case={i}>
          <Reveal className="project-head">
            <div>
              {i === 0 && <p className="eyebrow section-label">Featured work</p>}
              <h2 className="project-title">{s.name}</h2>
              <p className="sub">{s.oneLiner}</p>
            </div>
            <a className="chip" href={`/work/${s.id}`} onClick={linkTo(`/work/${s.id}`)}>
              View project <span aria-hidden>→</span>
            </a>
          </Reveal>
          {/* Same target as the "View project" chip, so it stays out of the tab order and screen readers. */}
          <a className="media-wrap" data-select={s.name} href={`/work/${s.id}`} onClick={linkTo(`/work/${s.id}`)} tabIndex={-1} aria-hidden>
            <WorkVisual study={s} />
          </a>
        </article>
      ))}
    </section>
  )
}

// Right-edge rail: one dot per case study, visible while the work section is on screen.
function WorkRail({ go }: { go: (id: string) => (e: React.MouseEvent) => void }) {
  const [active, setActive] = useState(-1)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.case))),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const outside = new IntersectionObserver(([e]) => !e.isIntersecting && setActive(-1), { threshold: 0 })
    const cases = document.querySelectorAll('[data-case]')
    if (cases.length !== work.length) throw new Error('Work rail expects one [data-case] per case study')
    cases.forEach((el) => io.observe(el))
    const section = document.getElementById('work')
    if (!section) throw new Error('Missing #work section')
    outside.observe(section)
    return () => {
      io.disconnect()
      outside.disconnect()
    }
  }, [])

  return (
    <nav className={`work-rail ${active >= 0 ? 'show' : ''}`} aria-label="Case studies">
      <span className="rail-count" aria-hidden>
        {String(Math.max(active, 0) + 1).padStart(2, '0')} / {String(work.length).padStart(2, '0')}
      </span>
      {work.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} onClick={go(s.id)} className={i === active ? 'on' : ''} aria-current={i === active ? 'true' : undefined}>
          <span className="rail-label">{s.name}</span>
          <i />
        </a>
      ))}
    </nav>
  )
}

/* ---------- Testimonials ---------- */

// Client quotes, shown to every visitor.
function Testimonials() {
  return (
    <section className="said" id="testimonials" data-snap>
      <Reveal>
        <h2 className="headline">That’s what they said.</h2>
      </Reveal>
      <div className="said-col">
        <Notes items={testimonials} />
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */

function Contact() {
  const c = site.contact
  return (
    <section className="contact" id="contact" data-snap>
      <Reveal>
        <div className="card glass">
          <div className="photo">
            <img src="/me.jpg" alt={`${site.name}, smiling, in a cap and glasses`} width={400} height={400} loading="lazy" decoding="async" />
          </div>
          <h2 className="project-title">{site.name}</h2>
          <p className="status">
            <i /> {site.status}
          </p>
          <div className="card-actions">
            <a className="chip solid" href={c.call} target="_blank" rel="noreferrer">
              Book a call
            </a>
            <a className="chip ghost" href={`mailto:${c.email}`}>
              Email me
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------- Chrome: logo, theme toggle, pill nav ---------- */

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'side-quests', label: 'Side Quests' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'build', label: 'What I build' },
]

const SECTIONS = [...NAV.map((n) => n.id), 'contact']

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) throw new Error(`Missing section #${id}`)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

type Go = (id: string) => (e: React.MouseEvent) => void

function Pill({ go, active }: { go: Go; active: string }) {
  return (
    <nav className="pill" aria-label="Sections">
      {NAV.map((n) => (
        <a key={n.id} href={`/#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'on' : ''}>
          {n.label}
        </a>
      ))}
      <a href="/#contact" onClick={go('contact')} className="cta">
        Say hi
      </a>
    </nav>
  )
}

function ActivePill({ go }: { go: Go }) {
  return <Pill go={go} active={useActiveSection(SECTIONS)} />
}

function Chrome({ home, lenis, theme, onTheme }: { home: boolean; lenis: Lenis | null; theme: Theme; onTheme: () => void }) {
  const go: Go = (id) => (e) => {
    e.preventDefault()
    // From a case study page, go back to the home page at that section.
    if (!home) {
      navigate(id === 'top' ? '/' : `/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (!el) throw new Error(`Missing section #${id}`)
    // Phones use native scroll-snap, which only cooperates with native smooth scrolling.
    if (lenis && window.matchMedia('(min-width: 821px)').matches) lenis.scrollTo(el, { duration: 1.4 })
    else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }
  return (
    <>
      <a className="logo" href="/" onClick={go('top')} aria-label="prathamesh, home">
        <Signature className="logo-sig" weight={4} />
      </a>
      <button className="theme" onClick={onTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? '☀' : '☾'}
      </button>
      {home && <WorkRail go={go} />}
      {home ? <ActivePill go={go} /> : <Pill go={go} active="" />}
    </>
  )
}

function Home({ ready }: { ready: boolean }) {
  // Arriving from a case study at "/#section": jump straight there, then tidy the URL.
  useEffect(() => {
    const id = location.hash.slice(1)
    if (!id) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(id)
    if (!el) throw new Error(`Missing section #${id}`)
    el.scrollIntoView({ behavior: 'instant' })
    history.replaceState(null, '', '/')
  }, [])
  return (
    <>
      <main>
        <Hero ready={ready} />
        <Statement />
        <Work />
        <SideQuests />
        <Testimonials />
        <Build />
        <Contact />
      </main>
      <FooterScene />
    </>
  )
}

type Route =
  | { kind: 'home' }
  | { kind: 'branding' }
  | { kind: 'quests' }
  | { kind: 'quest'; quest: (typeof sideQuests)[number]; next: (typeof sideQuests)[number] }
  | { kind: 'case'; study: (typeof work)[number]; next: (typeof work)[number] }

function route(path: string): Route {
  if (/^\/branding\/?$/.test(path)) return { kind: 'branding' }
  if (/^\/side-quests\/?$/.test(path)) return { kind: 'quests' }
  const q = path.match(/^\/side-quests\/([^/]+)\/?$/)
  const qi = q ? sideQuests.findIndex((s) => s.id === q[1]) : -1
  if (qi >= 0) return { kind: 'quest', quest: sideQuests[qi], next: sideQuests[(qi + 1) % sideQuests.length] }
  const m = path.match(/^\/work\/([^/]+)\/?$/)
  const i = m ? work.findIndex((w) => w.id === m[1]) : -1
  return i < 0 ? { kind: 'home' } : { kind: 'case', study: work[i], next: work[(i + 1) % work.length] }
}

// Keep in step with the titles scripts/prerender.mjs writes for crawlers.
const TITLES = { home: `${site.name} · AI Product Manager & Engineer in Mumbai`, branding: `Brand kit · ${site.name}`, quests: `Side quests · ${site.name}` }

export default function App() {
  const path = usePath()
  const page = route(path)
  const home = page.kind === 'home'
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [ready, setReady] = useState(false)
  const onSplashDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Unknown paths fall back to the home page.
  useEffect(() => {
    if (home && path !== '/') history.replaceState(null, '', '/' + location.hash)
  }, [home, path])

  useEffect(() => {
    document.title =
      page.kind === 'case'
        ? `${page.study.name} case study · ${site.name}`
        : page.kind === 'quest'
          ? `${page.quest.name} · Side quest · ${site.name}`
          : TITLES[page.kind]
  }, [page])

  useEffect(() => {
    const l = startScroll()
    setLenis(l)
    return () => l?.destroy()
  }, [])

  // One-screen-per-gesture snapping belongs to the home page only; case studies scroll freely.
  useEffect(() => {
    if (!lenis || !home) return
    const snap = startSnap(lenis)
    return () => snap?.destroy()
  }, [lenis, home])

  useEffect(() => (ready ? undefined : holdScroll()), [ready])

  return (
    <>
      <Splash onReveal={onSplashDone} />
      <Cursor />
      <Backdrop />
      <Chrome home={home} lenis={lenis} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <motion.div key={path} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
        {page.kind === 'case' && (
          <main>
            <CasePage study={page.study} next={page.next} />
          </main>
        )}
        {page.kind === 'branding' && (
          <main>
            <Branding />
          </main>
        )}
        {page.kind === 'quests' && (
          <main>
            <QuestsPage />
          </main>
        )}
        {page.kind === 'quest' && (
          <main>
            <QuestPage quest={page.quest} next={page.next} />
          </main>
        )}
        {page.kind === 'home' && <Home ready={ready} />}
      </motion.div>
    </>
  )
}
