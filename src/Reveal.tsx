import { motion } from 'framer-motion'
import { reducedMotion } from './scroll'

const ease = [0.32, 0.72, 0, 1] as const

// Hidden = clipped away from the right edge. Entering the view wipes it in left → right;
// leaving (either scroll direction) plays the same in reverse, wiping it out right → left.
// The vertical inset is negative so tall glyphs and shadows are never cut.
const wipe = {
  hidden: { clipPath: 'inset(-25% 100% -25% 0%)', x: -24, opacity: 0.4 },
  shown: { clipPath: 'inset(-25% 0% -25% 0%)', x: 0, opacity: 1 },
}

// The outer box is what's watched for visibility and is never clipped: browsers count
// clip-path when deciding if something is on screen, so a fully clipped element would never
// be seen to enter. The inner box carries the wipe.
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={reducedMotion ? false : 'hidden'} whileInView="shown" viewport={{ once: false, margin: '-12% 0px' }}>
      <motion.div className={className} variants={wipe} transition={{ duration: 0.9, ease, delay }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
