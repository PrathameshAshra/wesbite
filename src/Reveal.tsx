import { motion } from 'framer-motion'
import { reducedMotion } from './scroll'

const ease = [0.32, 0.72, 0, 1] as const

// Hidden = clipped away from the right edge. Entering the view wipes it in left → right;
// leaving (either scroll direction) plays the same in reverse, wiping it out right → left.
// The vertical inset is negative so tall glyphs and shadows are never cut.
const hidden = { clipPath: 'inset(-25% 100% -25% 0%)', x: -24, opacity: 0.4 }
const shown = { clipPath: 'inset(-25% 0% -25% 0%)', x: 0, opacity: 1 }

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : hidden}
      whileInView={shown}
      viewport={{ once: false, margin: '-12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
