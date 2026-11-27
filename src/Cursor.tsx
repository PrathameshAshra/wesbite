import { useEffect, useRef } from 'react'
import { reducedMotion } from './scroll'

// Custom pointer, three states:
// - free: a soft translucent circle that follows the mouse (iPad-style, like the reference)
// - block: over a link or button it morphs into a highlight around it
// - select: over a product surface ([data-select]: work tiles, project cards) it snaps into a
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

// A sphere card is a zero-size wrapper around its 3D strips: measure the strips instead.
const rectOf = (el: HTMLElement) => {
  const r = el.getBoundingClientRect()
  if (r.width > 0 || el.children.length === 0) return r
  const rs = [...el.children].map((c) => c.getBoundingClientRect())
  const left = Math.min(...rs.map((q) => q.left))
  const top = Math.min(...rs.map((q) => q.top))
  return new DOMRect(left, top, Math.max(...rs.map((q) => q.right)) - left, Math.max(...rs.map((q) => q.bottom)) - top)
}

const inside = (r: DOMRect, x: number, y: number, m: number) => x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m

// 3D-transformed children (the work sphere) aren't reported by the browser's hit-testing, which
// returns their container instead; find the selectable child under the point from its box.
const under = (el: Element, x: number, y: number) => {
  let best: HTMLElement | null = null
  let bestDist = Infinity
  for (const c of el.querySelectorAll<HTMLElement>(SELECT)) {
    if (c.style.visibility === 'hidden') continue
    const r = rectOf(c)
    if (!inside(r, x, y, 0)) continue
    const dist = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2))
    if (dist < bestDist) {
      best = c
      bestDist = dist
    }
  }
  return best
}

const pick = (el: Element | null, x: number, y: number): { el: HTMLElement; mode: Mode } | null => {
  const sel = el?.closest<HTMLElement>(SELECT) ?? (el ? under(el, x, y) : null)
  if (sel) return { el: sel, mode: 'select' }
  const block = el?.closest<HTMLElement>(BLOCK)
  return block ? { el: block, mode: 'block' } : null
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
      if (target && target.el.isConnected && inside(rectOf(target.el), mouse.x, mouse.y, target.mode === 'select' ? RELEASE : 0)) {
        const next = pick(hit, mouse.x, mouse.y)
        // A button inside a selected surface still takes over.
        if (next?.mode === 'block' && target.mode === 'select' && target.el.contains(next.el)) setTarget(next)
        return
      }
      setTarget(pick(hit, mouse.x, mouse.y))
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
      // Work tiles drift under a still mouse: re-check what's underneath when we've slid off.
      if (target && !inside(rectOf(target.el), mouse.x, mouse.y, target.mode === 'select' ? RELEASE : 0)) {
        update(document.elementFromPoint(mouse.x, mouse.y))
      }
      let goal = { x: mouse.x - DOT / 2, y: mouse.y - DOT / 2, w: DOT, h: DOT, r: DOT / 2 }
      if (target) {
        const b = rectOf(target.el)
        if (target.mode === 'select') {
          goal = { x: b.left, y: b.top, w: b.width, h: b.height, r: 0 }
          sizeEl.textContent = `${Math.round(b.width)} × ${Math.round(b.height)}`
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
      p.style.width = `${cur.w}px`
      p.style.height = `${cur.h}px`
      p.style.borderRadius = `${cur.r}px`
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
