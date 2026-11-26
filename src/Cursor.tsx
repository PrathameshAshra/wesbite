import { useEffect, useRef } from 'react'
import { reducedMotion } from './scroll'

// Custom pointer: an arrow that tracks the mouse exactly, plus a soft dot that trails behind it.
// Desktop mice only; touch, pens and reduced-motion visitors keep the system cursor.
const enabled = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion

export function Cursor() {
  const arrow = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled()) return
    document.documentElement.classList.add('custom-cursor')
    const pos = { x: -100, y: -100, dx: -100, dy: -100 }
    let raf = 0

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      const interactive = (e.target as Element).closest('a, button, [role="button"], .media-wrap')
      arrow.current?.classList.toggle('over', !!interactive)
      arrow.current?.classList.add('on')
      dot.current?.classList.add('on')
    }
    const onLeave = () => {
      arrow.current?.classList.remove('on')
      dot.current?.classList.remove('on')
    }
    const frame = () => {
      pos.dx += (pos.x - pos.dx) * 0.18
      pos.dy += (pos.y - pos.dy) * 0.18
      if (arrow.current) arrow.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      if (dot.current) dot.current.style.transform = `translate(${pos.dx}px, ${pos.dy}px)`
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={arrow} className="cursor-arrow" aria-hidden>
        <svg viewBox="0 0 24 28" width="24" height="28">
          <path d="M2 2 L2 22 L7.5 17 L11 25.5 L14.5 24 L11 15.8 L18.5 15.5 Z" fill="#fff" stroke="#0b1626" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  )
}
