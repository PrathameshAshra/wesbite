import { useEffect, useMemo, useRef } from 'react'
import { work, type CaseStudy } from './content'
import { reducedMotion } from './scroll'

// A wall of work tiles wrapped around the viewer, like standing inside a sphere.
// Pure CSS 3D: the scene sits at the camera, tiles are pushed out to radius R.

// 420x300 tiles with ~14px gaps: 16 columns around the full circle, 5 rows stacked by the same gap.
const COLS = 16
const R = 1105
const ROW_STEP = 16.3
const ROWS = [-2, -1, 0, 1, 2].map((r) => r * ROW_STEP) // degrees above/below the horizon
const HALF_FOV = 34 // degrees from centre to the screen edge on wide screens (about 3 columns across)
const MIN_PERSP = 560 // phones: keep tiles readable instead of shrinking them to fit the FOV
const TILE_HALF = 11 // half a tile's width, in degrees
const LOOK_X = 7 // max sideways mouse-look, in degrees
const SPEED = 2.2 // degrees per second

type Kind = 'dashboard' | 'phone' | 'metric' | 'list'
const KINDS: Kind[] = ['dashboard', 'phone', 'metric', 'list']
// Bright backdrops behind each "screenshot", like a dribbble shot.
const BACKDROPS = [
  ['#7b5cff', '#53a4ff'],
  ['#ff8a3d', '#ffd25e'],
  ['#2ec4a6', '#c6ff7a'],
  ['#ff5d8f', '#a36bff'],
  ['#53a4ff', '#94fffe'],
  ['#1d55a0', '#7b5cff'],
  ['#ffd25e', '#ff5d8f'],
]

function TileBody({ study, kind, n }: { study: CaseStudy; kind: Kind; n: number }) {
  const m = study.metrics[n % study.metrics.length]
  switch (kind) {
    case 'dashboard':
      return (
        <div className="t-dash">
          <aside>
            <i /><i /><i /><i />
          </aside>
          <div>
            <b className="t-title">{study.name}</b>
            <div className="t-bars">
              {[48, 72, 36, 88, 60, 95, 70].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      )
    case 'phone':
      return (
        <div className="t-phone-wrap">
          <div className="t-phone">
            <span className="t-notch" />
            <b>{m.value}</b>
            <i /><i /><i />
          </div>
        </div>
      )
    case 'metric':
      return (
        <div className="t-metric">
          <small>{study.eyebrow}</small>
          <strong>{m.value}</strong>
          <span>{m.label}</span>
        </div>
      )
    case 'list':
      return (
        <div className="t-list">
          <b className="t-title">{study.name}</b>
          {study.built.slice(0, 3).map((b) => (
            <p key={b}>
              <i /> {b}
            </p>
          ))}
        </div>
      )
  }
}

export function Sphere() {
  const root = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const tiles = useRef<(HTMLDivElement | null)[]>([])

  const layout = useMemo(
    () =>
      ROWS.flatMap((phi, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          phi,
          base: c * (360 / COLS),
          study: work[(c + r * 3) % work.length],
          kind: KINDS[(c * 3 + r) % KINDS.length],
          backdrop: BACKDROPS[(c * 2 + r * 3) % BACKDROPS.length],
          n: c + r,
        })),
      ),
    [],
  )

  useEffect(() => {
    const look = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      look.tx = (e.clientX / window.innerWidth - 0.5) * LOOK_X * 2
      look.ty = (e.clientY / window.innerHeight - 0.5) * -8
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    // Perspective follows the viewport, so the dome keeps the same gentle curve on any screen.
    // Tiles are only drawn inside the field of view; ones near 90° sit beside the camera and
    // CSS perspective blows them up into huge overlapping shapes.
    let visible = 0
    const fit = () => {
      const half = window.innerWidth / 2
      const persp = Math.max(half / Math.tan((HALF_FOV * Math.PI) / 180), MIN_PERSP)
      root.current?.style.setProperty('--persp', `${persp}px`)
      visible = (Math.atan(half / persp) * 180) / Math.PI + TILE_HALF + LOOK_X
    }
    fit()
    window.addEventListener('resize', fit)

    let raf = 0
    let last = performance.now()
    let drift = 0
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reducedMotion) drift += dt * SPEED
      look.x += (look.tx - look.x) * Math.min(1, dt * 3)
      look.y += (look.ty - look.y) * Math.min(1, dt * 3)
      if (scene.current) {
        scene.current.style.transform = `translateZ(var(--persp)) rotateX(${look.y}deg) rotateY(${look.x}deg)`
      }
      layout.forEach((t, i) => {
        const el = tiles.current[i]
        if (!el) return
        const theta = ((((t.base + drift) % 360) + 540) % 360) - 180
        const show = Math.abs(theta) < visible
        el.style.visibility = show ? 'visible' : 'hidden'
        if (show) el.style.transform = `rotateY(${theta}deg) rotateX(${t.phi}deg) translateZ(${-R}px)`
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', fit)
    }
  }, [layout])

  return (
    <div className="sphere" ref={root} aria-hidden>
      <div className="sphere-scene" ref={scene}>
        {layout.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              tiles.current[i] = el
            }}
            className="tile"
            // Rows below the horizon sit faded behind the headline; only the clear rows are selectable.
            data-select={t.phi <= 0 ? t.study.name : undefined}
            style={{ '--accent': t.study.accent, '--g1': t.backdrop[0], '--g2': t.backdrop[1] } as React.CSSProperties}
          >
            <div className={`tile-inner k-${t.kind}`}>
              <TileBody study={t.study} kind={t.kind} n={t.n} />
            </div>
          </div>
        ))}
      </div>
      <div className="sphere-vignette" />
    </div>
  )
}
