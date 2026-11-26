import Lenis from 'lenis'

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth scrolling everywhere except for visitors who asked for reduced motion.
export function startScroll() {
  if (reducedMotion) return null
  const lenis = new Lenis({ lerp: 0.1 })
  const raf = (t: number) => {
    lenis.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}
