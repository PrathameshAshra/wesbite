import { useEffect, useRef } from 'react'
import { reducedMotion } from './scroll'

// iPad-style pointer, like the reference: a soft translucent circle that follows the mouse and,
// over a link or button, morphs into a highlight around it (pulled slightly toward the mouse).
// Desktop mice only; touch, pens and reduced-motion visitors keep the system cursor.
const enabled = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion

const DOT = 18
const PAD = 6 // highlight padding around a hovered element
const PULL = 0.12 // how far the highlight leans toward the mouse
const TARGETS = 'a, button, [role="button"]'

export function Cursor() {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled()) return
    const ptr = el.current
    if (!ptr) throw new Error('Cursor element missing')
    document.documentElement.classList.add('custom-cursor')

    const mouse = { x: -100, y: -100 }
    const cur = { x: -100, y: -100, w: DOT, h: DOT, r: DOT / 2 }
    let target: HTMLElement | null = null
    let raf = 0

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      target = (e.target as Element).closest<HTMLElement>(TARGETS)
      ptr.classList.add('on')
      ptr.classList.toggle('is-block', !!target)
    }
    const onLeave = () => ptr.classList.remove('on')

    const frame = () => {
      let goal = { x: mouse.x - DOT / 2, y: mouse.y - DOT / 2, w: DOT, h: DOT, r: DOT / 2 }
      if (target && target.isConnected) {
        const b = target.getBoundingClientRect()
        const radius = parseFloat(getComputedStyle(target).borderRadius) || 12
        goal = {
          x: b.left - PAD + (mouse.x - (b.left + b.width / 2)) * PULL,
          y: b.top - PAD + (mouse.y - (b.top + b.height / 2)) * PULL,
          w: b.width + PAD * 2,
          h: b.height + PAD * 2,
          r: Math.min(radius + PAD, (b.height + PAD * 2) / 2),
        }
      }
      const k = target ? 0.25 : 0.5
      cur.x += (goal.x - cur.x) * k
      cur.y += (goal.y - cur.y) * k
      cur.w += (goal.w - cur.w) * 0.25
      cur.h += (goal.h - cur.h) * 0.25
      cur.r += (goal.r - cur.r) * 0.25
      ptr.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      ptr.style.width = `${cur.w}px`
      ptr.style.height = `${cur.h}px`
      ptr.style.borderRadius = `${cur.r}px`
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

  return <div ref={el} className="ipad-pointer" aria-hidden />
}
