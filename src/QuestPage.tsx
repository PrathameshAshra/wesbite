import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site, type SideQuest } from './content'
import { reducedMotion } from './scroll'
import { linkTo } from './router'
import { Reveal } from './Reveal'
import { QuestScreen } from './QuestScreen'
import { QuestInside } from './QuestInside'
import { Share } from './Share'

const ease = [0.32, 0.72, 0, 1] as const

// One side quest, told as a story: hook → why it exists → a look inside → how it works →
// calls made → where it's at → what's next.
export function QuestPage({ quest, next }: { quest: SideQuest; next: SideQuest }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <article className="case quest-page" style={{ '--accent': quest.accent } as React.CSSProperties}>
      <Hero quest={quest} />

      <section className="case-body">
        <div className="case-block">
          <Reveal>
            <p className="eyebrow qd-step">01 · The itch</p>
            <h2 className="headline">Why it exists</h2>
            <p>{quest.itch}</p>
          </Reveal>
          <BeforeAfter quest={quest} />
        </div>

        <div className="case-block qd-wide">
          <Reveal>
            <p className="eyebrow qd-step">02 · A look inside</p>
            <h2 className="headline">What’s on screen</h2>
          </Reveal>
          <QuestInside quest={quest} />
        </div>

        <div className="case-block">
          <Reveal>
            <p className="eyebrow qd-step">03 · How it works</p>
            <h2 className="headline">How it works</h2>
          </Reveal>
          <Steps steps={quest.steps} />
        </div>

        <div className="case-block">
          <Reveal>
            <p className="eyebrow qd-step">04 · Calls I made</p>
            <h2 className="headline">Decisions, and why</h2>
            <p className="qd-hint">Tap a card to see the reason.</p>
          </Reveal>
          <Calls calls={quest.calls} />
        </div>

        <div className="case-block">
          <Reveal>
            <p className="eyebrow qd-step">05 · Where it’s at</p>
            <h2 className="headline">By the numbers</h2>
          </Reveal>
          <div className="case-metrics">
            {quest.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <Timeline milestones={quest.milestones} />
          <Reveal>
            <p className="case-outcome">{quest.now}</p>
          </Reveal>
        </div>

        <div className="case-block">
          <Reveal>
            <p className="eyebrow qd-step">06 · What’s next</p>
            <h2 className="headline">Up next</h2>
          </Reveal>
          <ul className="qd-next">
            {quest.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <ul className="qd-tags">
            {quest.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {quest.href && (
            <a className="chip qd-cta" href={quest.href} target="_blank" rel="noreferrer">
              {quest.cta} <span aria-hidden>↗</span>
            </a>
          )}
          <div className="qd-share-end">
            <Share url={questUrl(quest)} text={`${quest.name}: ${quest.blurb}`} />
          </div>
        </div>
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

const questUrl = (quest: SideQuest) => `${site.url}/side-quests/${quest.id}`

/* ---------- Hero: the hook question, then the quest ---------- */

function Hero({ quest }: { quest: SideQuest }) {
  const rise = (delay: number, y = 16) => ({
    initial: reducedMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  })
  return (
    <header className="case-hero">
      <div className="case-glow" aria-hidden />
      <motion.p className="eyebrow case-eyebrow" {...rise(0.1, 10)}>
        Side quest · {quest.status}
      </motion.p>
      <motion.p className="qd-hook" {...rise(0.2, 30)}>
        {quest.hook}
      </motion.p>
      <motion.h1 className="mega case-title" {...rise(0.35, 30)}>
        {quest.name}
      </motion.h1>
      <motion.p className="case-lede" {...rise(0.45)}>
        {quest.blurb}
      </motion.p>
      {quest.href && (
        <motion.a className="chip qd-cta" href={quest.href} target="_blank" rel="noreferrer" {...rise(0.55)}>
          {quest.cta} <span aria-hidden>↗</span>
        </motion.a>
      )}
      <motion.div className="qd-share-hero" {...rise(0.58)}>
        <Share url={questUrl(quest)} text={`${quest.name}: ${quest.blurb}`} />
      </motion.div>
      <motion.div className="qd-stage" {...rise(0.6, 60)}>
        <div className="phone" aria-hidden>
          <QuestScreen quest={quest} />
        </div>
      </motion.div>
    </header>
  )
}

/* ---------- Before / After toggle ---------- */

function BeforeAfter({ quest }: { quest: SideQuest }) {
  const [after, setAfter] = useState(false)
  const side = after ? quest.after : quest.before
  return (
    <div className="qd-ba">
      <div className="qd-switch" role="group" aria-label="Before or after">
        <button aria-pressed={!after} onClick={() => setAfter(false)}>
          Before
        </button>
        <button aria-pressed={after} onClick={() => setAfter(true)}>
          After
        </button>
        <span className={`qd-thumb${after ? ' right' : ''}`} aria-hidden />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={after ? 'after' : 'before'}
          className={`qd-side ${after ? 'is-after' : 'is-before'}`}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease }}
          aria-live="polite"
        >
          <strong>{side.label}</strong>
          <ul>
            {side.points.map((p, i) => (
              <li key={p} style={{ '--i': i } as React.CSSProperties}>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ---------- Steps that light up as they scroll into view (once) ---------- */

function Steps({ steps }: { steps: SideQuest['steps'] }) {
  const ref = useRef<HTMLOListElement>(null)
  const [lit, setLit] = useState(reducedMotion ? steps.length : 0)
  useEffect(() => {
    const el = ref.current
    if (!el) throw new Error('Steps list missing')
    if (reducedMotion) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setLit((n) => Math.max(n, Number((e.target as HTMLElement).dataset.i) + 1))
        }),
      { rootMargin: '0px 0px -30% 0px' },
    )
    el.querySelectorAll('li').forEach((li) => io.observe(li))
    return () => io.disconnect()
  }, [])
  return (
    <ol className="qd-steps" ref={ref}>
      {steps.map((s, i) => (
        <li key={s.title} data-i={i} className={i < lit ? 'on' : ''}>
          <span className="case-num">{String(i + 1).padStart(2, '0')}</span>
          <strong>{s.title}</strong>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

/* ---------- Flip cards: the call on the front, the reason on the back ---------- */

function Calls({ calls }: { calls: SideQuest['calls'] }) {
  const [flipped, setFlipped] = useState<number[]>([])
  const toggle = (i: number) => setFlipped((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))
  return (
    <ul className="qd-calls">
      {calls.map((c, i) => (
        <li key={c.call}>
          <button className={`qd-card${flipped.includes(i) ? ' flipped' : ''}`} onClick={() => toggle(i)} aria-pressed={flipped.includes(i)}>
            <span className="qd-face qd-front">
              <span className="eyebrow">The call</span>
              <strong>{c.call}</strong>
              <span className="qd-flip-hint" aria-hidden>
                Why? ↻
              </span>
            </span>
            <span className="qd-face qd-back">
              <span className="eyebrow">Why</span>
              <span>{c.why}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Milestone timeline you can drag through ---------- */

function Timeline({ milestones }: { milestones: SideQuest['milestones'] }) {
  const ref = useRef<HTMLOListElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) throw new Error('Timeline missing')
    // Mouse drag scrolls the strip; touch and trackpads scroll it natively.
    let startX = 0
    let startLeft = 0
    let dragging = false
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      dragging = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.classList.add('dragging')
    }
    const move = (e: PointerEvent) => {
      if (dragging) el.scrollLeft = startLeft - (e.clientX - startX)
    }
    const up = () => {
      dragging = false
      el.classList.remove('dragging')
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])
  return (
    <ol className="qd-timeline" ref={ref} aria-label="Milestones" data-lenis-prevent>
      {milestones.map((m, i) => (
        <li key={`${m.when}-${m.what}`} className={i === milestones.length - 1 ? 'now' : ''}>
          <span className="qd-when">{m.when}</span>
          <i aria-hidden />
          <span className="qd-what">{m.what}</span>
        </li>
      ))}
    </ol>
  )
}
