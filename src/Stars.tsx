import { useEffect, useRef, useState } from 'react'

// A starry sky drawn on three canvases. Each canvas holds a third of the stars and twinkles
// as one layer (CSS opacity on its own rhythm), so the sky costs three compositor animations
// instead of one animation per star.
const LAYERS = 3

type Star = { x: number; y: number; r: number; a: number }

function makeStars(count: number): Star[][] {
  const layers: Star[][] = Array.from({ length: LAYERS }, () => [])
  for (let i = 0; i < count; i++) {
    layers[i % LAYERS].push({ x: Math.random(), y: Math.random(), r: (1 + Math.random() * 1.8) / 2, a: 0.3 + Math.random() * 0.6 })
  }
  return layers
}

function draw(canvas: HTMLCanvasElement, stars: Star[]) {
  // CSS-pixel resolution on purpose: stars are 1-3px soft dots, and full retina canvases (up to
  // nine full screens on the home page) cost tens of MB of GPU memory on phones.
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Stars need a 2D canvas context')
  ctx.fillStyle = '#fff'
  for (const s of stars) {
    ctx.globalAlpha = s.a
    ctx.beginPath()
    ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function Stars({ count, className = 'stars' }: { count: number; className?: string }) {
  const [layers] = useState(() => makeStars(count))
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) throw new Error('Stars root missing')
    const canvases = [...el.querySelectorAll('canvas')]
    const redraw = () => canvases.forEach((c, i) => draw(c, layers[i]))
    const ro = new ResizeObserver(redraw)
    ro.observe(el)
    return () => ro.disconnect()
  }, [layers])

  return (
    <div ref={root} className={className} aria-hidden>
      {layers.map((_, i) => (
        <canvas key={i} className={`star-layer sl${i}`} />
      ))}
    </div>
  )
}
