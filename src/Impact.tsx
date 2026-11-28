import type { CaseStudy } from './content'

// Animated "impact cards" for the work sphere: one per project, each telling the result in
// motion instead of a generic mockup. Pure CSS loops (index.css, "Impact cards"), so they cost
// nothing in JS and pause with the rest of the sphere when the hero is off screen.

const CITIES = ['Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Goa']

function Events() {
  return (
    <div className="im im-events">
      <small>Spontaa · pan-India in 2 yrs</small>
      <div className="im-views">
        <b className="im-count" aria-hidden />
        <b className="im-million">1M+</b>
        <span>views</span>
      </div>
      <svg className="im-spark" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden>
        <path d="M0 66 C30 64 46 58 64 52 S100 40 118 30 S160 10 200 4" pathLength="1" />
      </svg>
      <div className="im-cities">
        {CITIES.map((c, i) => (
          <i key={c} style={{ animationDelay: `${0.5 + i * 0.35}s` }}>
            {c}
          </i>
        ))}
      </div>
    </div>
  )
}

function Pearbae() {
  return (
    <div className="im-phone-wrap">
      <div className="t-phone im-pearbae">
        <span className="t-notch" />
        <span className="im-avatar">🍐</span>
        <div className="im-steps">
          <p className="im-s1">
            <i className="im-spin" /> Verifying ID…
          </p>
          <p className="im-s2">✓ Verified</p>
          <p className="im-s3">
            📞 Calling…
            <small>number hidden</small>
          </p>
        </div>
      </div>
    </div>
  )
}

const MARKETS = [
  ['DE', '84.20', '86.05'],
  ['FR', '79.40', '77.90'],
  ['NL', '88.15', '90.30'],
  ['JP', '61.70', '63.10'],
  ['IN', '54.25', '52.80'],
]

function Energy() {
  return (
    <div className="im im-energy">
      <small>Power desk · 5 yrs · Europe + Asia</small>
      <div className="im-rows">
        {MARKETS.map(([m, a, b], i) => (
          <p key={m} style={{ animationDelay: `${i * 0.4}s` }}>
            <span>{m}</span>
            <b data-a={a} data-b={b} style={{ animationDelay: `${i * 0.4}s` }} />
          </p>
        ))}
      </div>
      <div className="im-tape" aria-hidden>
        <span>DE ▲ 2.2% · FR ▼ 1.9% · NL ▲ 2.4% · JP ▲ 2.3% · IN ▼ 2.7% · DE ▲ 2.2% · FR ▼ 1.9% · NL ▲ 2.4% · JP ▲ 2.3% · IN ▼ 2.7% ·</span>
      </div>
    </div>
  )
}

const STAGES = ['Enquiry', 'Quote', 'Booked', 'Trip']

function Travel() {
  return (
    <div className="im im-travel">
      <small>Travel agency · 50 yrs offline → online</small>
      <div className="im-from-to">
        <span className="im-ledger" aria-hidden>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="im-arrow">→</span>
        <b className="im-pct" aria-hidden />
      </div>
      <div className="im-bar">
        <i />
      </div>
      <div className="im-stages">
        {STAGES.map((s, i) => (
          <i key={s} style={{ animationDelay: `${0.6 + i * 0.45}s` }}>
            {s}
          </i>
        ))}
      </div>
      <span className="im-foot">2019 – 2021 rollout, bookings never stopped</span>
    </div>
  )
}

export function ImpactCard({ study }: { study: CaseStudy }) {
  switch (study.id) {
    case 'events':
      return <Events />
    case 'pearbae':
      return <Pearbae />
    case 'energy':
      return <Energy />
    case 'travel':
      return <Travel />
    default:
      throw new Error(`No impact card for ${study.id}`)
  }
}

// Pearbae's card is a phone, which leaves blueprint either side for the drafting props.
export const impactIsPhone = (study: CaseStudy) => study.id === 'pearbae'
