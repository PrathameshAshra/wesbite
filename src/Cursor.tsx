import { useEffect, useRef } from 'react'
import { reducedMotion } from './scroll'

// Custom pointer, three states:
// - free: a soft translucent circle that follows the mouse (iPad-style, like the reference)
// - block: over a link or button it morphs into a highlight around it
// - select: over a product surface ([data-select]: the project cards) it snaps into a
//   Figma-style selection frame with handles, name label and size badge
// Once snapped, it holds still: small mouse movements inside the target (plus a margin) are
// ignored, and it only lets go when the pointer clearly leaves. Desktop mice only.
const enabled = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion

const DOT = 18
const PAD = 6 // highlight padding around a hovered button
const RELEASE = 14 // px the mouse must travel past a snapped target's edge before it lets go
const SELECT = '[data-select]'
const BLOCK = 'a, button, [role="button"]'

type Mode = 'free' | 'block' | 'select'

const inside = (r: DOMRect, x: number, y: number, m: number) => x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m

// Only button-sized links get the highlight. A link the size of a whole section (the "next
// project" banner) would stretch the highlight across the screen and lose the pointer, so the
// plain dot stays.
const MAX_BLOCK = { w: 480, h: 200 }
const buttonSized = (el: HTMLElement) => {
  const r = el.getBoundingClientRect()
  return r.width <= MAX_BLOCK.w && r.height <= MAX_BLOCK.h
}

const pick = (el: Element | null): { el: HTMLElement; mode: Mode } | null => {
  const sel = el?.closest<HTMLElement>(SELECT)
  if (sel) return { el: sel, mode: 'select' }
  const block = el?.closest<HTMLElement>(BLOCK)
  return block && buttonSized(block) ? { el: block, mode: 'block' } : null
}

export function Cursor() {
  const ptr = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const size = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!enabled()) return
    const p = ptr.current
    const d = dot.current
    if (!p || !d || !label.current || !size.current) throw new Error('Cursor elements missing')
    const labelEl = label.current
    const sizeEl = size.current
    document.documentElement.classList.add('custom-cursor')

    const mouse = { x: -100, y: -100 }
    const cur = { x: -100, y: -100, w: DOT, h: DOT, r: DOT / 2 }
    const drawn = { w: 0, h: 0, r: 0 }
    let target: { el: HTMLElement; mode: Mode } | null = null
    let raf = 0

    const setTarget = (next: { el: HTMLElement; mode: Mode } | null) => {
      if (next?.el === target?.el) return
      target = next
      const mode = next?.mode ?? 'free'
      p.classList.toggle('is-block', mode === 'block')
      p.classList.toggle('is-select', mode === 'select')
      d.classList.toggle('on', mode === 'select')
      if (next?.mode === 'select') labelEl.textContent = next.el.dataset.select ?? ''
    }

    // Keep the current target while the mouse is still on it (or within the release margin).
    const update = (hit: Element | null) => {
      if (target && target.el.isConnected && inside(target.el.getBoundingClientRect(), mouse.x, mouse.y, target.mode === 'select' ? RELEASE : 0)) {
        const next = pick(hit)
        // A button inside a selected surface still takes over.
        if (next?.mode === 'block' && target.mode === 'select' && target.el.contains(next.el)) setTarget(next)
        return
      }
      setTarget(pick(hit))
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      p.classList.add('on')
      update(e.target as Element)
    }
    const onLeave = () => {
      p.classList.remove('on')
      d.classList.remove('on')
    }

    const frame = () => {
      // Page scrolls under a still mouse: re-check what's underneath when we've slid off.
      if (target && !inside(target.el.getBoundingClientRect(), mouse.x, mouse.y, target.mode === 'select' ? RELEASE : 0)) {
        update(document.elementFromPoint(mouse.x, mouse.y))
      }
      let goal = { x: mouse.x - DOT / 2, y: mouse.y - DOT / 2, w: DOT, h: DOT, r: DOT / 2 }
      if (target) {
        const b = target.el.getBoundingClientRect()
        if (target.mode === 'select') {
          goal = { x: b.left, y: b.top, w: b.width, h: b.height, r: 0 }
          const label = `${Math.round(b.width)} × ${Math.round(b.height)}`
          if (sizeEl.textContent !== label) sizeEl.textContent = label
        } else {
          const radius = parseFloat(getComputedStyle(target.el).borderRadius) || 12
          goal = { x: b.left - PAD, y: b.top - PAD, w: b.width + PAD * 2, h: b.height + PAD * 2, r: Math.min(radius + PAD, (b.height + PAD * 2) / 2) }
        }
      }
      const k = target ? 0.38 : 0.55
      cur.x += (goal.x - cur.x) * k
      cur.y += (goal.y - cur.y) * k
      cur.w += (goal.w - cur.w) * k
      cur.h += (goal.h - cur.h) * k
      cur.r += (goal.r - cur.r) * k
      p.style.transform = `translate(${cur.x}px, ${cur.y}px)`
      // Size changes cost a layout, so they're only written while the pointer is still resizing.
      const w = Math.round(cur.w * 10) / 10
      const h = Math.round(cur.h * 10) / 10
      const r = Math.round(cur.r * 10) / 10
      if (w !== drawn.w || h !== drawn.h || r !== drawn.r) {
        p.style.width = `${w}px`
        p.style.height = `${h}px`
        p.style.borderRadius = `${r}px`
        drawn.w = w
        drawn.h = h
        drawn.r = r
      }
      d.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
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
      <div ref={ptr} className="ipad-pointer" aria-hidden>
        <i className="ptr-h tl" />
        <i className="ptr-h tr" />
        <i className="ptr-h bl" />
        <i className="ptr-h br" />
        <span ref={label} className="ptr-label" />
        <span ref={size} className="ptr-size" />
      </div>
      <div ref={dot} className="ptr-dot" aria-hidden />
    </>
  )
}
