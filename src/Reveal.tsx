import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { reducedMotion } from './scroll'

// Line-by-line wipe. Text is split into words, then grouped into the lines they land on
// (measured after wrapping, re-measured on resize). Each line is revealed by one edge that
// sweeps across it left → right at a steady speed: every word starts when the edge reaches
// it and finishes when the edge passes it, so the line reads as a single wipe. Lines go one
// after another. It plays once, the first time the text scrolls into view, and then stays
// revealed. Buttons, chips, images and gradient text can't be split, so the edge crosses
// each as one piece.

const LINE_IN = 0.22 // s between line starts on the way in
const SWEEP_IN = 0.6 // s for the edge to cross a full line

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

// Group pieces into lines (by top, after wrapping), then time each piece by where it sits
// along its line, so a single edge crosses the line at a steady speed.
function measure(root: HTMLElement, delay: number) {
  const pieces = [...root.querySelectorAll<HTMLElement>('.rv-u')].map((el) => ({ el, r: el.getBoundingClientRect() }))
  pieces.sort((a, b) => a.r.top - b.r.top)
  const lines: (typeof pieces)[] = []
  let lineTop = -Infinity
  for (const p of pieces) {
    if (p.r.top - lineTop > 8) {
      lines.push([])
      lineTop = p.r.top
    }
    lines[lines.length - 1].push(p)
  }
  lines.forEach((line, li) => {
    const left = Math.min(...line.map((p) => p.r.left))
    const right = Math.max(...line.map((p) => p.r.right))
    const width = Math.max(right - left, 1)
    for (const p of line) {
      const from = (p.r.left - left) / width
      const span = p.r.width / width
      p.el.style.setProperty('--rin', `${delay + li * LINE_IN + from * SWEEP_IN}s`)
      p.el.style.setProperty('--rin-d', `${span * SWEEP_IN}s`)
    }
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
    // ResizeObserver fires once on observe, after layout and before paint, so this is also the
    // first measure. Measuring here directly as well forced an extra reflow per block on load.
    const ro = new ResizeObserver(() => measure(el, delay))
    ro.observe(el)
    return () => ro.disconnect()
  }, [delay])

  // The outer box is never clipped, so the browser can tell when it's on screen.
  // First time in view: reveal and stop watching, so it never plays backwards or again.
  useEffect(() => {
    const el = outer.current
    if (!el) throw new Error('Reveal outer missing')
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { rootMargin: '-12% 0px' },
    )
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
