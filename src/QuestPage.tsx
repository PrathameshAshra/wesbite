import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { SideQuest } from './content'
import { reducedMotion } from './scroll'
import { linkTo } from './router'
import { Reveal } from './Reveal'
import { QuestScreen } from './QuestScreen'

const ease = [0.32, 0.72, 0, 1] as const

// One side quest, laid out like a case study page: phone mockup up top, then the idea, what it
// does and where it's at.
export function QuestPage({ quest, next }: { quest: SideQuest; next: SideQuest }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <article className="case quest-page" style={{ '--accent': quest.accent } as React.CSSProperties}>
      <header className="case-hero">
        <div className="case-glow" aria-hidden />
        <motion.p
          className="eyebrow case-eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          Side quest · {quest.status}
        </motion.p>
        <motion.h1
          className="mega case-title"
          initial={reducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        >
          {quest.name}
        </motion.h1>
        <motion.p
          className="case-lede"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          {quest.blurb}
        </motion.p>
        {quest.href && (
          <motion.a
            className="chip qd-cta"
            href={quest.href}
            target="_blank"
            rel="noreferrer"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            {quest.cta} <span aria-hidden>↗</span>
          </motion.a>
        )}
        <motion.div
          className="qd-stage"
          initial={reducedMotion ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
        >
          <div className="phone" aria-hidden>
            <QuestScreen quest={quest} />
          </div>
        </motion.div>
      </header>

      <section className="case-body">
        <Reveal className="case-block">
          <h2 className="headline">The idea</h2>
          <p>{quest.idea}</p>
        </Reveal>

        <div className="case-block">
          <Reveal>
            <h2 className="headline">What it does</h2>
          </Reveal>
          <ol className="case-built">
            {quest.does.map((d, i) => (
              <li key={d}>
                <Reveal delay={i * 0.05} className="case-built-row">
                  <span className="case-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="case-block">
          <h2 className="headline">Where it’s at</h2>
          <p className="case-outcome">{quest.now}</p>
          <ul className="qd-tags">
            {quest.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <a
        className="case-next"
        href={`/side-quests/${next.id}`}
        onClick={linkTo(`/side-quests/${next.id}`)}
        style={{ '--accent': next.accent } as React.CSSProperties}
      >
        <span className="eyebrow">Next side quest</span>
        <span className="mega">{next.name}</span>
        <span className="chip">
          View side quest <span aria-hidden>→</span>
        </span>
      </a>
    </article>
  )
}
