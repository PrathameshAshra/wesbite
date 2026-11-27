import { useEffect, useMemo, useRef, useState } from 'react'
import { work, bannerProjects, type BannerProject, type CaseStudy } from './content'
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
// Each card is a sticker on the inside of the sphere: built from vertical strips, each one
// turned to sit on the surface, so the card's top and bottom edges follow the curve.
const W = 420
const STRIPS = 8
const STRIP_W = W / STRIPS
const STRIP_DEG = (W / R / STRIPS) * (180 / Math.PI)

type Kind = 'dashboard' | 'phone' | 'metric' | 'list'
const KINDS: Kind[] = ['dashboard', 'phone', 'metric', 'list']

// Every 4th tile (staggered by row) is a real project, cycling through its own screenshots.
const isShotTile = (c: number, r: number) => (c + r * 2) % 4 === 0
const SHOT_MS = 2400

const sheetNo = (project: BannerProject) => String(bannerProjects.indexOf(project) + 1).padStart(2, '0')

// The project's current frame; keyed by src so each new frame fades in. A phone shot leaves
// empty blueprint either side, so drafting props sit on the sheet around it.
function ShotTile({ project, frame }: { project: BannerProject; frame: number }) {
  const shot = project.shots[frame % project.shots.length]
  return (
    <>
      <div className={`tile-inner k-shot k-shot-${shot.kind}`}>
        <div className={`t-shot t-shot-${shot.kind}`}>
          <img key={shot.src} src={shot.src} alt="" />
        </div>
      </div>
      {shot.kind === 'app' && (
        <div className="props" key={`props-${shot.src}`}>
          <img className="prop prop-square" src="/props/set-square.svg" alt="" />
          <img className="prop prop-tape" src="/props/tape.svg" alt="" />
          <img className="prop prop-pencil" src="/props/pencil.svg" alt="" />
        </div>
      )}
      <span className="sheet-tag">
        SHEET {sheetNo(project)} · {project.name.toUpperCase()}
      </span>
    </>
  )
}

function Tacks() {
  return (
    <>
      <img className="tack tack-l" src="/props/pin.svg" alt="" />
      <img className="tack tack-r" src="/props/pin.svg" alt="" />
    </>
  )
}

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
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = setInterval(() => setFrame((f) => f + 1), SHOT_MS)
    return () => clearInterval(id)
  }, [])

  const layout = useMemo(() => {
    let shots = 0
    return ROWS.flatMap((phi, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          phi,
          base: c * (360 / COLS),
          study: work[(c + r * 3) % work.length],
          kind: KINDS[(c * 3 + r) % KINDS.length],
          n: c + r,
          // Handed out in order, so neighbouring shot tiles show different projects.
          project: isShotTile(c, r) ? bannerProjects[shots++ % bannerProjects.length] : null,
        })),
    )
  }, [])

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
    const el = root.current
    if (!el) throw new Error('Sphere root missing')
    // Sized to its own box (not the window), so it also works as a small preview in the brand kit.
    const fit = () => {
      const half = el.clientWidth / 2
      const persp = Math.max(half / Math.tan((HALF_FOV * Math.PI) / 180), MIN_PERSP)
      el.style.setProperty('--persp', `${persp}px`)
      visible = (Math.atan(half / persp) * 180) / Math.PI + TILE_HALF + LOOK_X
    }
    const ro = new ResizeObserver(fit)
    ro.observe(el)

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
        scene.current.style.transform = `translateZ(var(--persp)) rotateX(${look.y}deg) rotateY(${look.x + drift}deg)`
      }
      layout.forEach((t, i) => {
        const el = tiles.current[i]
        if (!el) return
        const theta = ((((t.base + drift) % 360) + 540) % 360) - 180
        el.style.visibility = Math.abs(theta) < visible ? 'visible' : 'hidden'
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
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
            style={{ transform: `rotateY(${t.base}deg)` }}
          >
            {Array.from({ length: STRIPS }, (_, s) => (
              <div
                key={s}
                className="tile-strip"
                style={{
                  left: -STRIP_W / 2,
                  width: STRIP_W + 0.6, // a hair of overlap hides the seams between strips
                  transform: `rotateY(${((STRIPS - 1) / 2 - s) * STRIP_DEG}deg) rotateX(${t.phi}deg) translateZ(${-R}px)`,
                }}
              >
                <div
                  className="tile-face"
                  style={{ left: -s * STRIP_W, '--accent': t.study.accent } as React.CSSProperties}
                >
                  <Tacks />
                  {t.project ? (
                    <ShotTile project={t.project} frame={frame + t.n} />
                  ) : (
                    <div className={`tile-inner k-${t.kind}`}>
                      <TileBody study={t.study} kind={t.kind} n={t.n} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sphere-vignette" />
    </div>
  )
}
