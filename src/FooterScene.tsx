import { site } from './content'
import { Signature } from './Signature'
import { linkTo } from './router'

// Our own illustrated ending: a giant faded signature behind a flowery hill, a butterfly, and the links on the grass.

const PETALS = ['#ff6fa5', '#ffd25e', '#ffffff', '#ff5d5d', '#c79bff']

// Deterministic scatter so the meadow looks the same on every load.
function rand(seed: number) {
  const x = Math.sin(seed * 999.13) * 43758.5453
  return x - Math.floor(x)
}

// y of the hill's top edge at x (matches the front hill path below).
function hillTop(x: number) {
  const t = x / 1440
  return 250 - Math.sin(t * Math.PI) * 150
}

const FLOWERS = Array.from({ length: 110 }, (_, i) => {
  const x = rand(i + 1) * 1440
  const depth = rand(i + 50) // 0 = near the crest, 1 = near the bottom
  const y = hillTop(x) + 18 + depth * (480 - hillTop(x) - 30)
  return { x, y, r: 3 + depth * 6, color: PETALS[i % PETALS.length], sway: rand(i + 7) }
}).sort((a, b) => a.y - b.y)

function Flower({ x, y, r, color, sway }: (typeof FLOWERS)[number]) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <line x1="0" y1="0" x2={(sway - 0.5) * r} y2={r * 2.4} stroke="#2f7d2a" strokeWidth={r * 0.35} strokeLinecap="round" />
      <g className="flower-head" style={{ animationDelay: `${-sway * 4}s` }}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * r * 0.8} cy={Math.sin((a * Math.PI) / 180) * r * 0.8} r={r * 0.62} fill={color} />
        ))}
        <circle r={r * 0.45} fill="#ffb02e" />
      </g>
    </g>
  )
}

function Butterfly() {
  return (
    <div className="butterfly" aria-hidden>
      <svg viewBox="0 0 34 29" width="34" height="29">
        <g className="wing wing-l">
          <path d="M17 14 C 8 0, 0 4, 3 12 C 5 17, 12 16, 17 14 Z" fill="#ff8a3d" />
          <path d="M17 15 C 9 18, 5 26, 11 27 C 15 27, 16 21, 17 15 Z" fill="#ff6b2c" />
        </g>
        <g className="wing wing-r">
          <path d="M17 14 C 26 0, 34 4, 31 12 C 29 17, 22 16, 17 14 Z" fill="#ff8a3d" />
          <path d="M17 15 C 25 18, 29 26, 23 27 C 19 27, 18 21, 17 15 Z" fill="#ff6b2c" />
        </g>
        <rect x="16" y="8" width="2" height="14" rx="1" fill="#3a2416" />
      </svg>
    </div>
  )
}

export function FooterScene() {
  const c = site.contact
  return (
    <footer className="footer">
      <div className="footer-sig" aria-hidden>
        <Signature weight={6} />
      </div>
      <Butterfly />
      <svg className="hill" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMax slice" aria-hidden>
        <defs>
          <linearGradient id="hill-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5fae45" />
            <stop offset="1" stopColor="#2b6b26" />
          </linearGradient>
          <linearGradient id="hill-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7cc95a" />
            <stop offset="0.55" stopColor="#3f8f33" />
            <stop offset="1" stopColor="#1f5a1c" />
          </linearGradient>
        </defs>
        <path d="M-40 500 V230 C 260 150, 520 180, 760 220 S 1250 170, 1480 230 V500 Z" fill="url(#hill-back)" opacity="0.8" />
        <path d={`M0 500 V250 ${Array.from({ length: 25 }, (_, i) => `L ${i * 60} ${hillTop(i * 60).toFixed(1)}`).join(' ')} L 1440 250 V500 Z`} fill="url(#hill-front)" />
        {FLOWERS.map((f, i) => (
          <Flower key={i} {...f} />
        ))}
      </svg>
      <div className="footer-links">
        <nav aria-label="Elsewhere">
          <a href={`mailto:${c.email}`}>Email</a>
          <a href={c.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {c.x && <a href={c.x} target="_blank" rel="noreferrer">X</a>}
          {c.youtube && <a href={c.youtube} target="_blank" rel="noreferrer">YouTube</a>}
          {c.resume && <a href={c.resume} target="_blank" rel="noreferrer">Resume</a>}
          <a href="/branding" onClick={linkTo('/branding')}>Brand kit</a>
        </nav>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
