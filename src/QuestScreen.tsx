import type { SideQuest } from './content'

// A tiny drawn UI of each side quest, shown inside the phone mockup.
export function QuestScreen({ quest }: { quest: SideQuest }) {
  return (
    <div className="screen">
      <span className="notch" />
      <div className="qs-bar">
        <strong>{quest.name}</strong>
      </div>
      {quest.screen === 'stories' && <Stories />}
      {quest.screen === 'chart' && <Chart />}
      {quest.screen === 'video' && <Video />}
    </div>
  )
}

// One creator's week, stitched from several platforms, each source with its own verdict.
const SOURCES = [
  { p: 'X', verdict: 'Loved' },
  { p: 'YT', verdict: 'Mixed' },
  { p: 'Rd', verdict: 'Pushback' },
]

// Content-Story: a creator's posts across platforms, read as one source-linked story.
function Stories() {
  return (
    <>
      <div className="qs-creator">
        <i />
        <span>
          <b />
          <b />
        </span>
      </div>
      <div className="qs-story">
        <div className="qs-progress">
          <span className="done" />
          <span className="live" />
          <span />
        </div>
        <span className="qs-lines qs-story-lines">
          <b />
          <b />
          <b />
          <b />
        </span>
        <p className="qs-story-text">This week, in one story</p>
      </div>
      <ul className="qs-sources">
        {SOURCES.map((s) => (
          <li key={s.p}>
            <span className="qs-src">{s.p}</span>
            <span className="qs-lines">
              <b />
            </span>
            <span className={`qs-verdict v-${s.verdict.toLowerCase()}`}>{s.verdict}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

// Quantbook: an equity curve with its options hedge underneath.
function Chart() {
  return (
    <>
      <div className="qs-ticker">
        <span>NIFTY 50</span>
        <span className="qs-tag">Backtest</span>
      </div>
      <div className="qs-chart">
        <svg viewBox="0 0 120 70" preserveAspectRatio="none" aria-hidden>
          <path className="grid" d="M0 17.5H120M0 35H120M0 52.5H120" />
          <path className="area" d="M0 58 L12 54 L22 56 L34 46 L44 48 L56 36 L66 39 L78 28 L88 31 L100 18 L110 21 L120 10 V70 H0 Z" />
          <path className="line" d="M0 58 L12 54 L22 56 L34 46 L44 48 L56 36 L66 39 L78 28 L88 31 L100 18 L110 21 L120 10" />
          <path className="hedge" d="M0 62 L20 61 L40 63 L60 60 L80 62 L100 59 L120 60" />
        </svg>
      </div>
      <div className="qs-legend">
        <span><i className="l-strat" />Strategy</span>
        <span><i className="l-hedge" />Hedge</span>
      </div>
      <div className="qs-run">Run backtest ▸</div>
    </>
  )
}

// The Channel: a long-form episode playing, with the next ones queued.
function Video() {
  return (
    <>
      <div className="qs-player">
        <span className="qs-play" />
        <div className="qs-scrub">
          <span />
        </div>
      </div>
      <p className="qs-ep">Building AI products, from India</p>
      <ul className="qs-queue">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <span className="qs-thumb" />
            <span className="qs-lines">
              <b />
              <b />
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
