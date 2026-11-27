import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { reducedMotion } from './scroll'

// Line-by-line wipe. Text is split into words and each word is timed by the line it lands on
// (measured after wrapping, re-measured on resize) and how far along that line it sits, so each
// line wipes in left → right, one line after another. Leaving the view (either direction)
// plays it in reverse: right → left, bottom line first. Buttons, chips, images and gradient
// text can't be split, so each wipes as one piece in its line slot.

const LINE_IN = 0.14 // s between lines on the way in
const SWEEP_IN = 0.4 // s for the wipe to cross a line
const LINE_OUT = 0.07
const SWEEP_OUT = 0.22

// Pieces that wipe whole instead of word by word.
function isUnit(el: Element) {
  if (['A', 'BUTTON', 'IMG', 'VIDEO'].includes(el.tagName) || el instanceof SVGElement) return true
  const cs = getComputedStyle(el)
  if (cs.backgroundClip === 'text' || cs.getPropertyValue('-webkit-background-clip') === 'text') return true
  if (cs.backgroundImage !== 'none') return true
  if (!/rgba\(.*,\s*0\)|transparent/.test(cs.backgroundColor)) return true
  return parseFloat(cs.borderTopWidth) > 0 || cs.boxShadow !== 'none'
}

// Wrap every word in a span and tag every animated piece. Runs once; the copy inside a Reveal
// is static, so React never needs to touch these text nodes again.
function split(root: HTMLElement) {
  if (root.dataset.split) return
  root.dataset.split = '1'
  const visit = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? ''
        if (!text.trim()) continue
        const frag = document.createDocumentFragment()
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue
          if (/^\s+$/.test(part)) frag.append(part)
          else {
            const w = document.createElement('span')
            w.className = 'rv-u rv-w'
            w.textContent = part
            frag.append(w)
          }
        }
        child.replaceWith(frag)
      } else if (child instanceof Element) {
        if (isUnit(child)) child.classList.add('rv-u')
        else visit(child)
      }
    }
  }
  visit(root)
}

// Time every piece by its line (top position, after wrapping) and its x across the block.
function measure(root: HTMLElement, delay: number) {
  const box = root.getBoundingClientRect()
  const pieces = [...root.querySelectorAll<HTMLElement>('.rv-u')].map((el) => ({ el, r: el.getBoundingClientRect() }))
  pieces.sort((a, b) => a.r.top - b.r.top)
  const lines: number[] = []
  let line = -1
  let lineTop = -Infinity
  for (const p of pieces) {
    if (p.r.top - lineTop > 8) {
      line++
      lineTop = p.r.top
    }
    lines.push(line)
  }
  const last = Math.max(line, 0)
  pieces.forEach((p, i) => {
    const x = box.width ? (p.r.left - box.left) / box.width : 0
    p.el.style.setProperty('--rin', `${delay + lines[i] * LINE_IN + x * SWEEP_IN}s`)
    p.el.style.setProperty('--rout', `${(last - lines[i]) * LINE_OUT + (1 - x) * SWEEP_OUT}s`)
  })
}

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) throw new Error('Reveal inner missing')
    if (reducedMotion) return
    split(el)
    measure(el, delay)
    const ro = new ResizeObserver(() => measure(el, delay))
    ro.observe(el)
    return () => ro.disconnect()
  }, [delay])

  // The outer box is never clipped, so the browser can tell when it's on screen.
  useEffect(() => {
    const el = outer.current
    if (!el) throw new Error('Reveal outer missing')
    const io = new IntersectionObserver(([e]) => setShown(e.isIntersecting), { rootMargin: '-12% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={outer}>
      <div ref={inner} className={`${className ?? ''} rv${shown || reducedMotion ? ' shown' : ''}`}>
        {children}
      </div>
    </div>
  )
}
