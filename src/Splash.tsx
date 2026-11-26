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
  const [show, setShow] = useState(() => !reducedMotion && !alreadySeen())

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="stars" />
          <motion.div exit={{ scale: 0.35, y: '-42vh', opacity: 0 }} transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}>
            <Signature className="splash-sig" draw />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
