import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { sideQuests } from './content'
import { reducedMotion } from './scroll'
import { QuestScreen } from './QuestScreen'
import { linkTo } from './router'

const ease = [0.32, 0.72, 0, 1] as const

// Every side quest on one page, reached from "View all side quests" on the home page.
export function QuestsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <article className="case quests-page">
      <header className="qp-head">
        <p className="eyebrow">Side quests</p>
        <h1 className="mega">Things I build for fun</h1>
      </header>
      <ul className="qp-grid">
        {sideQuests.map((q, i) => (
          <motion.li
            key={q.id}
            className="qp-card"
            style={{ '--accent': q.accent } as React.CSSProperties}
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.08 }}
          >
            <div className="qp-stage">
              <div className="phone" aria-hidden style={{ transform: `rotateZ(${i % 2 ? 3 : -3}deg)` }}>
                <QuestScreen quest={q} />
              </div>
            </div>
            <h2 className="project-title">{q.name}</h2>
            <p>{q.blurb}</p>
            <a className="chip" href={`/side-quests/${q.id}`} onClick={linkTo(`/side-quests/${q.id}`)}>
              View details <span aria-hidden>→</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </article>
  )
}
