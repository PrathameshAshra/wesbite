import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { site, sideQuests as allQuests, HOME_QUESTS } from './content'
import { QuestScreen } from './QuestScreen'
import { linkTo } from './router'

const sideQuests = allQuests.slice(0, HOME_QUESTS)
import { reducedMotion } from './scroll'

// A section that stays pinned for `steps` screens while you scroll through it.
// Reports scroll progress (0–1) through the pinned stretch, and places one snap marker per step.
function usePinnedProgress() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', setProgress)
  return { ref, progress }
}

function SnapMarkers({ steps, unit }: { steps: number; unit: number }) {
  return (
    <>
      {Array.from({ length: steps }, (_, i) => (
        <span key={i} className="snap-marker" data-snap style={{ top: `${i * unit}svh` }} aria-hidden />
      ))}
    </>
  )
}

const TICKS = 15

export function SideQuests() {
  const { ref, progress } = usePinnedProgress()
  const n = sideQuests.length
  const active = Math.min(n - 1, Math.floor(progress * n))
  const local = progress * n - active // 0–1 within the current quest
  const filled = Math.round(progress * TICKS)

  return (
    <section className="quests" id="side-quests" ref={ref} style={{ height: `${n * 100}svh` }}>
      <SnapMarkers steps={n} unit={100} />
      <div className="pin">
        <div className="quest-label">
          <h2 className="eyebrow">Side quests</h2>
          <div className="ticks" role="progressbar" aria-label="Side quests progress" aria-valuemin={1} aria-valuemax={n} aria-valuenow={active + 1}>
            {Array.from({ length: TICKS }, (_, i) => (
              <i key={i} className={i < Math.max(1, filled) ? 'on' : ''} />
            ))}
          </div>
        </div>
        {sideQuests.map((q, i) => (
          <motion.div
            key={q.name}
            className="quest"
            style={{ '--accent': q.accent } as React.CSSProperties}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, y: reducedMotion ? 0 : i === active ? 0 : i < active ? -40 : 40 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            <div className="quest-name">
              <h3 className="project-title">{q.name}</h3>
            </div>
            <div
              className="phone"
              aria-hidden
              style={{ transform: reducedMotion ? undefined : `perspective(900px) rotateY(${(local - 0.5) * -36}deg) rotateZ(${i % 2 ? 3 : -3}deg)` }}
            >
              <QuestScreen quest={q} />
            </div>
            <div className="quest-copy">
              <p>{q.blurb}</p>
              <div className="quest-actions">
                {q.href && (
                  <a className="chip" href={q.href} target="_blank" rel="noreferrer">
                    {q.cta} <span aria-hidden>↗</span>
                  </a>
                )}
                <a className="chip ghost" href="/side-quests" onClick={linkTo('/side-quests')}>
                  View all side quests <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Build() {
  const { ref, progress } = usePinnedProgress()
  const n = site.services.length
  const active = Math.min(n - 1, Math.floor(progress * n))
  const STEP = 60 // svh of scroll per item

  return (
    <section className="build" id="build" ref={ref} style={{ height: `calc(100svh + ${(n - 1) * STEP}svh)` }}>
      <SnapMarkers steps={n} unit={STEP} />
      <div className="pin build-pin">
        <h2 className="eyebrow section-label">What I build</h2>
        {site.services.map((s, i) => (
          <p key={s} className={`headline build-item ${i <= active ? 'on' : ''}`}>
            {s}
          </p>
        ))}
      </div>
    </section>
  )
}
