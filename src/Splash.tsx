import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Signature } from './Signature'
import { Stars } from './Stars'
import { reducedMotion } from './scroll'

const SEEN = 'splash-seen'
const WRITE_MS = 1900 // the signature writes itself left to right
const HOLD_MS = 450 // a beat to read it before it flies off
const FLY_S = 0.9
const ease = [0.32, 0.72, 0, 1] as const

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return false
  }
}

type Landing = { scale: number; x: number; y: number }

// Signature writes itself on a night sky, then flies into the logo spot while the sky fades
// to reveal the hero. Once per browser session; any click, key or scroll skips ahead.
// `onReveal` fires as the flight starts (hero can animate in underneath); the real logo stays
// hidden via [data-splash] until the signature has landed on it.
export function Splash({ onReveal }: { onReveal: () => void }) {
  const [skip] = useState(() => reducedMotion || alreadySeen())
  const [landing, setLanding] = useState<Landing | null>(null)
  const sig = useRef<HTMLDivElement>(null)

  // Layout effect: hide the real logo before the first paint, so it never flashes.
  useLayoutEffect(() => {
    if (skip) {
      onReveal()
      return
    }
    document.documentElement.setAttribute('data-splash', '')
  }, [skip, onReveal])

  // Phase 1 → 2: measure the logo, then start the flight. The landing has to be in state
  // before the splash unmounts, or the exit animation never sees it.
  useEffect(() => {
    if (skip || landing) return
    const fly = () => {
      const logo = document.querySelector('.logo-sig')
      if (!logo || !sig.current) throw new Error('Splash needs the .logo-sig logo to land on')
      const to = logo.getBoundingClientRect()
      const from = sig.current.getBoundingClientRect()
      setLanding({
        scale: to.width / from.width,
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
      })
    }
    const t = setTimeout(fly, WRITE_MS + HOLD_MS)
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const
    const early = () => {
      clearTimeout(t)
      fly()
    }
    events.forEach((e) => window.addEventListener(e, early, { once: true, passive: true }))
    return () => {
      clearTimeout(t)
      events.forEach((e) => window.removeEventListener(e, early))
    }
  }, [skip, landing])

  useEffect(() => {
    if (!landing) return
    try {
      sessionStorage.setItem(SEEN, '1')
    } catch {
      // Storage blocked; splash will simply play again next visit.
    }
    onReveal()
  }, [landing, onReveal])

  const landed = () => document.documentElement.removeAttribute('data-splash')

  return (
    // `custom` reaches the exiting signature, so it flies to where the logo was measured.
    <AnimatePresence custom={landing} onExitComplete={landed}>
      {!skip && !landing && (
        <motion.div className="splash" aria-hidden exit={{ opacity: 1 }} transition={{ duration: FLY_S }}>
          <motion.div className="splash-bg" exit={{ opacity: 0 }} transition={{ duration: FLY_S * 0.8, ease }}>
            <Stars count={160} />
          </motion.div>
          <motion.div
            ref={sig}
            className="splash-sig-wrap"
            variants={{ fly: (to: Landing) => to }}
            exit="fly"
            transition={{ duration: FLY_S, ease }}
          >
            <Signature className="splash-sig" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
