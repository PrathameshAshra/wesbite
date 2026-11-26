import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type Lenis from 'lenis'
import { site, work, testimonials, type CaseStudy } from './content'
import { reducedMotion, startScroll, startSnap } from './scroll'
import { applyTheme, initialTheme, type Theme } from './theme'
import { Sphere } from './Sphere'
import { Splash } from './Splash'
import { Signature } from './Signature'
import { SideQuests, Build } from './Pinned'
import { FooterScene } from './FooterScene'
import { Cursor } from './Cursor'

const ease = [0.32, 0.72, 0, 1] as const

function Reveal({ children, delay = 0, y = 32, className }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

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
      <div className="stars" />
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
          {site.title}
        </motion.h1>
        <span className="sr-only">{site.name}</span>
      </div>
    </section>
  )
}

/* ---------- Statement ---------- */

function Statement() {
  return (
    <section className="statement" data-snap>
      {site.statement.map((line, i) => (
        <Reveal key={line} delay={i * 0.08}>
          <p className="headline">{line}</p>
        </Reveal>
      ))}
      <motion.p
        className="puffy"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.6, rotate: -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.2 }}
      >
        {site.statementWord}
      </motion.p>
      <Reveal delay={0.3}>
        <p className="about-line">{site.about}</p>
      </Reveal>
    </section>
  )
}

/* ---------- Featured work ---------- */

function WorkMedia({ study }: { study: CaseStudy }) {
  // TODO: replace with real project screenshots / video
  return (
    <div className="media" style={{ '--accent': study.accent } as React.CSSProperties}>
      <div className="media-grid" style={{ gridTemplateColumns: `repeat(${study.metrics.length}, 1fr)` }}>
        {study.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="media-cell"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.1 }}
          >
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </motion.div>
        ))}
        <div className="media-cell wide">
          <span className="eyebrow accent">{study.eyebrow}</span>
          <p>{study.outcome}</p>
        </div>
      </div>
    </div>
  )
}

function Work({ onOpen }: { onOpen: (s: CaseStudy) => void }) {
  return (
    <section className="work" id="work">
      {work.map((s, i) => (
        <article key={s.id} className="project" id={s.id} data-snap>
          <Reveal className="project-head">
            <div>
              {i === 0 && <p className="eyebrow section-label">Featured work</p>}
              <h2 className="project-title">{s.name}</h2>
              <p className="sub">{s.oneLiner}</p>
            </div>
            <button className="chip" onClick={() => onOpen(s)}>
              View project <span aria-hidden>→</span>
            </button>
          </Reveal>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1, ease }}
            onClick={() => onOpen(s)}
            className="media-wrap"
          >
            <WorkMedia study={s} />
          </motion.div>
        </article>
      ))}
    </section>
  )
}

/* ---------- Testimonials (hidden until real quotes exist) ---------- */

function Testimonials() {
  if (testimonials.length === 0) return null
  return (
    <section className="said" id="testimonials" data-snap>
      <Reveal>
        <h2 className="headline">That’s what they said</h2>
      </Reveal>
      <div className="said-list">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.06}>
            <figure className="quote glass">
              {t.photo && <img src={t.photo} alt="" width={40} height={40} loading="lazy" />}
              <div>
                <figcaption>
                  <strong>{t.name}</strong> · {t.role}
                </figcaption>
                <blockquote>{t.quote}</blockquote>
              </div>
            </figure>
          </Reveal>
        ))}
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
            {/* TODO: your photo at /public/me.jpg */}
            <span>Photo</span>
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

/* ---------- Story panel ---------- */

function StoryPanel({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} onClick={onClose}>
      <motion.aside
        className="panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-title"
        data-lenis-prevent
        style={{ '--accent': study.accent } as React.CSSProperties}
        initial={reducedMotion ? { opacity: 0 } : { y: '100%' }}
        animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
        exit={reducedMotion ? { opacity: 0 } : { y: '100%' }}
        transition={{ duration: 0.55, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Close" autoFocus>
          ✕
        </button>
        <p className="eyebrow accent">{study.eyebrow}</p>
        <h2 id="story-title" className="project-title">{study.name}</h2>
        <p className="panel-lede">{study.oneLiner}</p>
        <p className="meta">
          {study.role} · {study.years}
        </p>
        <WorkMedia study={study} />
        <h3 className="eyebrow">The problem</h3>
        <p>{study.problem}</p>
        <h3 className="eyebrow">What I built</h3>
        <ul className="built">
          {study.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <h3 className="eyebrow">The outcome</h3>
        <p className="outcome">{study.outcome}</p>
        <div className="stack">
          {study.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </motion.aside>
    </motion.div>
  )
}

/* ---------- Chrome: logo, theme toggle, pill nav ---------- */

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'side-quests', label: 'Side Quests' },
  { id: 'build', label: 'What I build' },
]

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

function Chrome({ lenis, theme, onTheme }: { lenis: Lenis | null; theme: Theme; onTheme: () => void }) {
  const active = useActiveSection([...NAV.map((n) => n.id), 'contact'])
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) throw new Error(`Missing section #${id}`)
    // Phones use native scroll-snap, which only cooperates with native smooth scrolling.
    if (lenis && window.matchMedia('(min-width: 821px)').matches) lenis.scrollTo(el, { duration: 1.4 })
    else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }
  return (
    <>
      <a className="logo" href="#top" onClick={go('top')} aria-label="prathamesh, back to top">
        <Signature className="logo-sig" strokeWidth={12} />
      </a>
      <button className="theme" onClick={onTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {theme === 'dark' ? '☀' : '☾'}
      </button>
      <nav className="pill" aria-label="Sections">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'on' : ''}>
            {n.label}
          </a>
        ))}
        <a href="#contact" onClick={go('contact')} className="cta">
          Say hi
        </a>
      </nav>
    </>
  )
}

export default function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [open, setOpen] = useState<CaseStudy | null>(null)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [ready, setReady] = useState(false)
  const onSplashDone = useCallback(() => setReady(true), [])

  useEffect(() => applyTheme(theme), [theme])

  // The splash signature flies into the logo spot; keep the real logo hidden until it lands.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-splash', !ready)
  }, [ready])

  useEffect(() => {
    const l = startScroll()
    setLenis(l)
    const snap = l ? startSnap(l) : null
    return () => {
      snap?.destroy()
      l?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!lenis) return
    if (open || !ready) lenis.stop()
    else lenis.start()
  }, [open, ready, lenis])

  return (
    <>
      <Splash onDone={onSplashDone} />
      <Cursor />
      <Backdrop />
      <Chrome lenis={lenis} theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero ready={ready} />
        <Statement />
        <Work onOpen={setOpen} />
        <SideQuests />
        <Testimonials />
        <Build />
        <Contact />
      </main>
      <FooterScene />
      <AnimatePresence>{open && <StoryPanel key={open.id} study={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
