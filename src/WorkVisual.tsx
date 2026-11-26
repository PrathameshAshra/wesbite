import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { CaseStudy } from './content'
import { reducedMotion } from './scroll'

// Full-bleed teaser for a case study: an illustrated product shot built from UI mocks,
// revealed with a clip-path wipe and given depth with scroll parallax. Swap in real screenshots later.

function Phone({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`tz-phone ${className}`}>
      <span className="tz-notch" />
      <div className="tz-screen">{children}</div>
    </div>
  )
}

function Browser({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`tz-browser ${className}`}>
      <div className="tz-bar">
        <i /><i /><i />
        <span>{url}</span>
      </div>
      <div className="tz-page">{children}</div>
    </div>
  )
}

function Events() {
  return (
    <>
      <Phone className="tz-back">
        <p className="tz-h">Tonight near you</p>
        {[
          ['Rooftop jam', 'Bandra · 8:30 PM', '#ff8a3d'],
          ['Board game night', 'Indiranagar · 7 PM', '#ffd25e'],
          ['Sunset run club', 'Marine Drive · 6 AM', '#ff5d8f'],
        ].map(([t, s, c]) => (
          <div key={t} className="tz-event">
            <b style={{ background: c }} />
            <div>
              <strong>{t}</strong>
              <span>{s}</span>
            </div>
          </div>
        ))}
        <div className="tz-tabs"><i className="on" /><i /><i /><i /></div>
      </Phone>
      <div className="tz-card tz-map tz-front">
        <p className="tz-h">AI picks · Mumbai</p>
        <div className="tz-grid">
          {[[24, 30], [58, 52], [76, 26], [40, 70]].map(([x, y], i) => (
            <span key={i} className="tz-pin" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>
    </>
  )
}

function Pearbae() {
  return (
    <>
      <Phone className="tz-back">
        <div className="tz-profile" />
        <p className="tz-h">Aanya, 26</p>
        <span className="tz-badge">✓ Aadhaar verified</span>
        <div className="tz-chips"><i>Live music</i><i>Trekking</i><i>Board games</i></div>
      </Phone>
      <Phone className="tz-front tz-call">
        <div className="tz-avatar" />
        <p className="tz-h">Calling Aanya…</p>
        <span className="tz-timer">00:42</span>
        <div className="tz-call-btns"><i /><i className="end" /><i /></div>
      </Phone>
    </>
  )
}

function Energy() {
  const pts = [62, 58, 64, 55, 60, 48, 52, 40, 46, 34, 38, 28, 32, 24]
  const line = pts.map((y, i) => `${(i / (pts.length - 1)) * 100},${y}`).join(' ')
  return (
    <Browser url="desk.trading/power" className="tz-front tz-wide">
      <div className="tz-trade">
        <div className="tz-chart">
          <div className="tz-tabs-row"><i className="on">DE</i><i>FR</i><i>NL</i><i>JP</i></div>
          <p className="tz-price">€84.20<span>/MWh</span></p>
          <svg viewBox="0 0 100 70" preserveAspectRatio="none">
            <polygon points={`0,70 ${line} 100,70`} className="tz-area" />
            <polyline points={line} className="tz-line" />
          </svg>
        </div>
        <div className="tz-book">
          {[[72, 'bid'], [54, 'bid'], [38, 'bid'], [44, 'ask'], [62, 'ask'], [80, 'ask']].map(([w, k], i) => (
            <div key={i} className={`tz-row ${k}`}><b style={{ width: `${w}%` }} /><span>{(84.2 + (i - 2.5) * 0.15).toFixed(2)}</span></div>
          ))}
        </div>
      </div>
    </Browser>
  )
}

function Travel() {
  return (
    <>
      <Browser url="agency.travel/plan" className="tz-back tz-wide">
        <div className="tz-steps">
          {['Enquiry', 'Quote', 'Booked', 'Travel'].map((s, i) => (
            <span key={s} className={i < 3 ? 'done' : ''}>{s}</span>
          ))}
        </div>
        {['Day 1 · Fly to Goa', 'Day 2 · Old Goa heritage walk', 'Day 3 · Dudhsagar falls'].map((d) => (
          <div key={d} className="tz-itin"><i />{d}</div>
        ))}
      </Browser>
      <Phone className="tz-front tz-ticket">
        <p className="tz-h">Boarding pass</p>
        <div className="tz-route"><strong>BOM</strong><span>✈</span><strong>GOI</strong></div>
        <div className="tz-barcode" />
      </Phone>
    </>
  )
}

const SCENES: Record<string, () => React.ReactNode> = { events: Events, pearbae: Pearbae, energy: Energy, travel: Travel }

export function WorkVisual({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const back = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [50, -50])
  const front = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [110, -110])
  const Scene = SCENES[study.id]
  if (!Scene) throw new Error(`No teaser scene for case study "${study.id}"`)

  return (
    <motion.div
      ref={ref}
      className={`teaser tz-${study.id}`}
      style={{ '--accent': study.accent } as React.CSSProperties}
      initial={reducedMotion ? false : { clipPath: 'inset(14% 10% 14% 10% round 28px)', scale: 0.96 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div className="tz-layer" style={{ y: back }}>
        <Scene />
      </motion.div>
      <motion.div className="tz-metrics" style={{ y: front }}>
        {study.metrics.map((m) => (
          <div key={m.label} className="tz-metric">
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
