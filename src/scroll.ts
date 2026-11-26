import Lenis from 'lenis'

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const desktop = () => !window.matchMedia('(max-width: 820px)').matches

// Smooth scrolling everywhere except for visitors who asked for reduced motion.
// On desktop the wheel is handed to startSnap instead, which moves one screen per gesture.
export function startScroll() {
  if (reducedMotion) return null
  const lenis = new Lenis({
    lerp: 0.1,
    virtualScroll: (e) => !(desktop() && e.event.type === 'wheel'),
  })
  const raf = (t: number) => {
    lenis.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

const NEXT_KEYS = ['ArrowDown', 'PageDown', ' ']
const PREV_KEYS = ['ArrowUp', 'PageUp']

// One wheel gesture or key press = one [data-snap] screen, like the reference site.
// Trackpad inertia keeps firing wheel events after a jump; those are ignored until the
// wheel goes quiet for a moment, so one flick never skips two screens.
export function startSnap(lenis: Lenis) {
  if (!desktop()) return null
  let busy = false
  let lastWheelAt = 0
  let cooldownUntil = 0

  const tops = () => [...document.querySelectorAll<HTMLElement>('[data-snap]')].map((el) => el.offsetTop)

  const jump = (dir: 1 | -1) => {
    const y = lenis.scroll
    const points = tops()
    if (points.length === 0) throw new Error('No [data-snap] sections found')
    const target = dir > 0 ? (points.find((t) => t > y + 4) ?? lenis.limit) : ([...points].reverse().find((t) => t < y - 4) ?? 0)
    if (Math.abs(target - y) < 2) return
    busy = true
    lenis.scrollTo(target, {
      duration: 1.1,
      lock: true,
      onComplete: () => {
        busy = false
        cooldownUntil = performance.now() + 500
      },
    })
  }

  const onWheel = (e: WheelEvent) => {
    if (lenis.isStopped || Math.abs(e.deltaY) < 2) return
    e.preventDefault()
    const now = performance.now()
    const gap = now - lastWheelAt
    lastWheelAt = now
    if (busy) return
    if (now < cooldownUntil && gap < 200) return
    jump(e.deltaY > 0 ? 1 : -1)
  }

  const onKey = (e: KeyboardEvent) => {
    if (lenis.isStopped || busy) return
    const target = e.target as HTMLElement
    if (target.closest('input, textarea, [contenteditable]')) return
    if (NEXT_KEYS.includes(e.key)) {
      e.preventDefault()
      jump(1)
    } else if (PREV_KEYS.includes(e.key)) {
      e.preventDefault()
      jump(-1)
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  return {
    destroy() {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    },
  }
}
