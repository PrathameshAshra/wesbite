import { useEffect, useMemo, useRef, useState } from 'react'
import { work, bannerProjects, type BannerProject } from './content'
import { reducedMotion } from './scroll'
import { ImpactCard, impactIsPhone } from './Impact'

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
// Phones get one flat piece per card instead of 8 strips: iOS Safari left a dark crack along
// every seam, and drops and redraws 3D layers when the hero scrolls off screen (a black flash).
// The bend barely shows on a narrow screen anyway.
const STRIPS = window.matchMedia('(max-width: 820px)').matches ? 1 : 8
const STRIP_RAD = W / R / STRIPS
const STRIP_DEG = STRIP_RAD * (180 / Math.PI)
// Each flat strip spans the chord of its arc, so neighbours meet exactly.
const STRIP_W = 2 * R * Math.sin(STRIP_RAD / 2)


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
      {shot.kind === 'app' && <Props key={`props-${shot.src}`} />}
      <span className="sheet-tag">
        SHEET {sheetNo(project)} · {project.name.toUpperCase()}
      </span>
    </>
  )
}

// Drafting tools that fill the empty blueprint either side of a phone.
function Props() {
  return (
    <div className="props">
      <span className="prop prop-square">
        <img src="/props/set-square.svg" alt="" />
      </span>
      <span className="prop prop-tape">
        <img src="/props/tape.svg" alt="" />
      </span>
      <span className="prop prop-pencil">
        <img src="/props/pencil.svg" alt="" />
      </span>
    </div>
  )
}

// Push pins in a mix of colours (no blue: the sheet already is). Each tile gets a different pair.
const PIN_COLOURS = ['red', 'yellow', 'green']
const pin = (k: number) => `/props/pin-${PIN_COLOURS[k % PIN_COLOURS.length]}.svg`

// Every object sits under one light (top-left), so the shadow lives on an unrotated wrapper
// and only the object inside turns: shadows all fall down-right whatever the object's angle.
// Seen from one camera, the pins all lean the same way.
function Tacks({ n }: { n: number }) {
  return (
    <>
      <span className="tack tack-l">
        <img src={pin(n)} alt="" />
      </span>
      <span className="tack tack-r">
        <img src={pin(n + 1)} alt="" />
      </span>
    </>
  )
}


export function Sphere() {
  const root = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const tiles = useRef<(HTMLDivElement | null)[]>([])
  const [frame, setFrame] = useState(0)
  const drift = useRef(0)
  // Nothing animates while the hero is off screen.
  const [onScreen, setOnScreen] = useState(true)

  useEffect(() => {
    const el = root.current
    if (!el) throw new Error('Sphere root missing')
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion || !onScreen) return
    const id = setInterval(() => setFrame((f) => f + 1), SHOT_MS)
    return () => clearInterval(id)
  }, [onScreen])

  const layout = useMemo(() => {
    let shots = 0
    return ROWS.flatMap((phi, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          phi,
          base: c * (360 / COLS),
          study: work[(c + r * 3) % work.length],
          n: c + r,
          // Handed out in order, so neighbouring shot tiles show different projects.
          project: isShotTile(c, r) ? bannerProjects[shots++ % bannerProjects.length] : null,
        })),
    )
  }, [])

  useEffect(() => {
    if (!onScreen) return
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
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!reducedMotion) drift.current += dt * SPEED
      look.x += (look.tx - look.x) * Math.min(1, dt * 3)
      look.y += (look.ty - look.y) * Math.min(1, dt * 3)
      if (scene.current) {
        scene.current.style.transform = `translateZ(var(--persp)) rotateX(${look.y}deg) rotateY(${look.x + drift.current}deg)`
      }
      layout.forEach((t, i) => {
        const el = tiles.current[i]
        if (!el) return
        const theta = ((((t.base + drift.current) % 360) + 540) % 360) - 180
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
  }, [layout, onScreen])

  return (
    <div className={`sphere${onScreen ? '' : ' paused'}`} ref={root} aria-hidden>
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
                  width: STRIP_W + (STRIPS > 1 ? 1.5 : 0), // overlap hides seams; content is offset by the chord, so it lines up
                  // Bend the card sideways first (strips around a vertical axis meet exactly at every
                  // height), then tilt the whole bent card up/down into its row. Tilting each strip
                  // before bending made strips overlap or gap away from the horizon, eating letters.
                  transform: `rotateX(${t.phi}deg) rotateY(${((STRIPS - 1) / 2 - s) * STRIP_DEG}deg) translateZ(${-R}px)`,
                }}
              >
                <div
                  className="tile-face"
                  style={{ left: -s * STRIP_W, '--accent': t.study.accent } as React.CSSProperties}
                >
                  <Tacks n={i} />
                  {t.project ? (
                    <ShotTile project={t.project} frame={frame + t.n} />
                  ) : (
                    <>
                      <div className={`tile-inner k-impact${impactIsPhone(t.study) ? ' k-impact-phone' : ''}`}>
                        <ImpactCard study={t.study} />
                      </div>
                      {impactIsPhone(t.study) && <Props />}
                    </>
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
