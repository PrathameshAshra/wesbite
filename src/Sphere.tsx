import { useEffect, useMemo, useRef } from 'react'
import { work, type CaseStudy } from './content'
import { reducedMotion } from './scroll'

// A wall of work tiles wrapped around the viewer, like standing inside a sphere.
// Pure CSS 3D: the scene sits at the camera, tiles are pushed out to radius R.

const COLS = 16
const ROWS = [-26, -9, 9, 26] // degrees above/below the horizon
const R = 1150
const VISIBLE = 105 // hide tiles further than this from straight ahead (they'd be behind the camera)
const SPEED = 2.2 // degrees per second

type Kind = 'dashboard' | 'phone' | 'metric' | 'list'
const KINDS: Kind[] = ['dashboard', 'phone', 'metric', 'list']

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
            <b className="t-title">{study.title}</b>
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
          <b className="t-title">{study.title}</b>
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
  const scene = useRef<HTMLDivElement>(null)
  const tiles = useRef<(HTMLDivElement | null)[]>([])

  const layout = useMemo(
    () =>
      ROWS.flatMap((phi, r) =>
        Array.from({ length: COLS }, (_, c) => ({
          phi,
          base: (c + (r % 2 ? 0.5 : 0)) * (360 / COLS),
          study: work[(c + r * 3) % work.length],
          kind: KINDS[(c + r) % KINDS.length],
          n: c + r,
        })),
      ),
    [],
  )

  useEffect(() => {
    const look = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      look.tx = (e.clientX / window.innerWidth - 0.5) * 14
      look.ty = (e.clientY / window.innerHeight - 0.5) * -8
    }
    window.addEventListener('pointermove', onMove, { passive: true })

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
        const visible = Math.abs(theta) < VISIBLE
        el.style.visibility = visible ? 'visible' : 'hidden'
        if (visible) el.style.transform = `rotateY(${theta}deg) rotateX(${t.phi}deg) translateZ(${-R}px)`
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [layout])

  return (
    <div className="sphere" aria-hidden>
      <div className="sphere-scene" ref={scene}>
        {layout.map((t, i) => (
          <div
            key={i}
            ref={(el) => {
              tiles.current[i] = el
            }}
            className={`tile k-${t.kind}`}
            style={{ '--accent': t.study.accent } as React.CSSProperties}
          >
            <TileBody study={t.study} kind={t.kind} n={t.n} />
          </div>
        ))}
      </div>
      <div className="sphere-vignette" />
    </div>
  )
}
