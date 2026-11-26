import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Signature } from './Signature'
import { reducedMotion } from './scroll'

const SEEN = 'splash-seen'
const DURATION_MS = 3200

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return false
  }
}

// Signature draws itself on a night sky, then lifts away. Once per browser session.
export function Splash({ onDone }: { onDone: () => void }) {
  const [skip] = useState(() => reducedMotion || alreadySeen())
  const [show, setShow] = useState(!skip)

  // Skipped splash: hand over straight away. Played splash: hand over when the exit finishes (onExitComplete).
  useEffect(() => {
    if (skip) onDone()
  }, [skip, onDone])

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN, '1')
      } catch {
        // Storage blocked; splash will simply play again next visit.
      }
      setShow(false)
    }, DURATION_MS)
    return () => clearTimeout(t)
  }, [show, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="splash"
          aria-hidden
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {/* Night sky fades away to reveal the work sphere behind it. */}
          <motion.div className="splash-bg" exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}>
            <div className="stars" />
          </motion.div>
          {/* Shrinks onto the logo spot at the top centre, then the logo takes over. */}
          <motion.div
            className="splash-sig-wrap"
            exit={{ scale: 0.112, y: 'calc(-50vh + 26px)' }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          >
            <Signature className="splash-sig" draw />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
