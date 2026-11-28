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

const PLATFORMS = ['IG', 'in', 'X', 'YT']

// Content-Story: one story, posted to every platform at once.
function Stories() {
  return (
    <>
      <div className="qs-rings">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} className={i === 0 ? 'me' : ''} />
        ))}
      </div>
      <div className="qs-story">
        <div className="qs-progress">
          <span className="done" />
          <span className="live" />
          <span />
        </div>
        <p className="qs-story-text">Shipped it today</p>
        <div className="qs-sticker">New</div>
      </div>
      <div className="qs-platforms">
        {PLATFORMS.map((p) => (
          <span key={p}>
            {p}
            <i>✓</i>
          </span>
        ))}
      </div>
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
