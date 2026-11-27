import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { CaseStudy } from './content'
import { reducedMotion } from './scroll'
import { linkTo } from './router'
import { Reveal } from './Reveal'

const ease = [0.32, 0.72, 0, 1] as const
const photo = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

// A full page per case study, like the reference's /work/<name> pages.
export function CasePage({ study, next }: { study: CaseStudy; next: CaseStudy }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <article className="case" style={{ '--accent': study.accent } as React.CSSProperties}>
      <header className="case-hero">
        <div className="case-glow" aria-hidden />
        <motion.p
          className="eyebrow case-eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {study.eyebrow}
        </motion.p>
        <motion.h1
          className="mega case-title"
          initial={reducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {study.name}
        </motion.h1>
        <motion.p
          className="case-lede"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          {study.oneLiner}
        </motion.p>
        <motion.div
          className="case-shot"
          initial={reducedMotion ? false : { opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.45 }}
        >
          <img
            src={photo(study.photo.id, 1600)}
            srcSet={[800, 1200, 1600, 2000].map((w) => `${photo(study.photo.id, w)} ${w}w`).join(', ')}
            sizes="(max-width: 820px) 92vw, min(1180px, 90vw)"
            alt={study.photo.alt}
          />
        </motion.div>
      </header>

      <section className="case-body">
        <Reveal className="case-facts">
          <div>
            <span className="eyebrow">Role</span>
            <p>{study.role}</p>
          </div>
          <div>
            <span className="eyebrow">Timeline</span>
            <p>{study.years}</p>
          </div>
          <div>
            <span className="eyebrow">Stack</span>
            <p>{study.stack.join(', ')}</p>
          </div>
        </Reveal>

        <Reveal className="case-metrics">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="case-block">
          <h2 className="headline">The problem</h2>
          <p>{study.problem}</p>
        </Reveal>

        <div className="case-block">
          <Reveal>
            <h2 className="headline">What I built</h2>
          </Reveal>
          <ol className="case-built">
            {study.built.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <li>
                  <span className="case-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{b}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="case-block">
          <h2 className="headline">The outcome</h2>
          <p className="case-outcome">{study.outcome}</p>
        </Reveal>
      </section>

      <a className="case-next" href={`/work/${next.id}`} onClick={linkTo(`/work/${next.id}`)} style={{ '--accent': next.accent } as React.CSSProperties}>
        <span className="eyebrow">Next project</span>
        <span className="mega">{next.name}</span>
        <span className="chip">
          View project <span aria-hidden>→</span>
        </span>
      </a>
    </article>
  )
}
