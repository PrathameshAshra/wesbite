import { useState } from 'react'
import type { SideQuest } from './content'

// "A look inside": a drawn, illustrative screen of the quest (never a real screenshot) with
// numbered hotspots. Hover or tap a dot, or pick an item from the list, to read about that part.
export function QuestInside({ quest }: { quest: SideQuest }) {
  const [active, setActive] = useState(0)
  const spots = quest.inside.spots
  return (
    <div className="qi">
      <figure className="qi-frame">
        <div className="qi-bar" aria-hidden>
          <i />
          <i />
          <i />
          <span>{quest.inside.title}</span>
        </div>
        <div className={`qi-screen qi-${quest.screen}`}>
          {quest.screen === 'stories' && <StoriesScreen />}
          {quest.screen === 'chart' && <ChartScreen />}
          {quest.screen === 'video' && <VideoScreen />}
          {spots.map((s, i) => (
            <button
              key={s.title}
              className={`qi-dot${i === active ? ' on' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`${i + 1}: ${s.title}`}
              aria-pressed={i === active}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <figcaption className="qi-note">Illustrative screen, not the real product</figcaption>
      </figure>
      <ol className="qi-list">
        {spots.map((s, i) => (
          <li key={s.title}>
            <button className={i === active ? 'on' : ''} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={i === active}>
              <span className="qi-num">{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <span className="qi-text">{s.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

const Lines = ({ n, className = '' }: { n: number; className?: string }) => (
  <span className={`qi-lines ${className}`}>
    {Array.from({ length: n }, (_, i) => (
      <b key={i} />
    ))}
  </span>
)

const VERDICTS = [
  ['X', 'Loved'],
  ['YouTube', 'Loved'],
  ['LinkedIn', 'Mixed'],
  ['Instagram', 'Mixed'],
  ['TikTok', 'Loved'],
  ['Reddit', 'Pushback'],
]

function StoriesScreen() {
  return (
    <div className="qi-grid qi-grid-side">
      <div className="qi-main">
        <div className="qi-creator">
          <i className="qi-avatar" />
          <Lines n={2} />
          <span className="qi-badges">
            {['X', 'YT', 'in', 'IG', 'TT', 'Rd'].map((b) => (
              <em key={b}>{b}</em>
            ))}
          </span>
        </div>
        <div className="qi-story">
          {['X', 'YT', 'Rd', 'in'].map((src) => (
            <p key={src}>
              <Lines n={2} />
              <em className="qi-src">{src}</em>
            </p>
          ))}
        </div>
      </div>
      <aside className="qi-panel">
        <strong>Verdicts</strong>
        {VERDICTS.map(([p, v]) => (
          <span key={p} className="qi-verdict-row">
            <span>{p}</span>
            <em className={`qs-verdict v-${v.toLowerCase()}`}>{v}</em>
          </span>
        ))}
      </aside>
    </div>
  )
}

function ChartScreen() {
  return (
    <div className="qi-grid qi-grid-side">
      <div className="qi-main">
        <div className="qi-input">
          <span>Sell a weekly Nifty iron condor. How would it have done?</span>
          <em>Run ▸</em>
        </div>
        <div className="qi-chart">
          <svg viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden>
            <path className="grid" d="M0 22.5H200M0 45H200M0 67.5H200" />
            <path className="raw" d="M0 70 L20 62 L35 68 L50 52 L65 60 L80 40 L95 55 L110 34 L125 46 L140 28 L155 40 L170 20 L185 30 L200 14" />
            <path className="hedged" d="M0 72 L20 66 L35 68 L50 58 L65 61 L80 50 L95 54 L110 44 L125 47 L140 38 L155 41 L170 32 L185 34 L200 26" />
          </svg>
          <span className="qi-legend">
            <span>
              <i className="l-raw" />
              Unhedged
            </span>
            <span>
              <i className="l-hedged" />
              Hedged
            </span>
          </span>
        </div>
      </div>
      <aside className="qi-panel">
        <span className="qi-paper">Paper only</span>
        <strong>Notes</strong>
        {[0, 1, 2].map((i) => (
          <span key={i} className="qi-note-card">
            <Lines n={2} />
          </span>
        ))}
      </aside>
    </div>
  )
}

function VideoScreen() {
  return (
    <div className="qi-grid qi-grid-side">
      <div className="qi-main">
        <div className="qi-player">
          <span className="qs-play" />
          <span className="qi-scrub">
            <i />
          </span>
        </div>
        <p className="qi-ep">Evals explained for PMs by an ex-engineer</p>
        <Lines n={2} />
      </div>
      <aside className="qi-panel">
        <strong>One idea per episode</strong>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="qi-up">
            <i />
            <Lines n={2} />
          </span>
        ))}
      </aside>
    </div>
  )
}
