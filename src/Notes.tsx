import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Testimonial } from './content'
import { holdScroll, reducedMotion } from './scroll'

const ease = [0.32, 0.72, 0, 1] as const
const grow = { duration: reducedMotion ? 0 : 0.5, ease }

// Framer scale-corrects border-radius and a single box-shadow only when they're set through
// style/animate, so the card's drop shadow lives here, not in CSS.
const shadow = {
  rest: '0px 10px 30px -12px rgba(8, 28, 64, 0.5)',
  hover: '0px 18px 40px -12px rgba(8, 28, 64, 0.6)',
  open: '0px 30px 80px -20px rgba(4, 10, 26, 0.6)',
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

// Testimonials as a stack of notifications. Tapping one expands that same card in place
// (not a modal): the page blurs behind it, the full quote opens up, and a Close pill appears.
export function Notes({ items }: { items: Testimonial[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = () => setOpen(null)

  useEffect(() => {
    if (open === null) return
    const release = holdScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => {
      release()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="notes-blur"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          />
        )}
      </AnimatePresence>
      <ul className="notes">
        {items.map((t, i) => {
          const isOpen = open === i
          return (
            <li key={t.name} className={isOpen ? 'up' : undefined}>
              <motion.button
                layout
                className={`note ${isOpen ? 'open' : ''}`}
                style={{ borderRadius: 22 }}
                initial={false}
                animate={{ boxShadow: isOpen ? shadow.open : shadow.rest }}
                transition={{ layout: grow, scale: { duration: 0.3, ease }, boxShadow: grow }}
                whileHover={isOpen ? undefined : { scale: 1.03, boxShadow: shadow.hover }}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {/* Glass edge: a 1px border can't be scale-corrected, so it is hidden for the whole
                    resize and fades back in once the card has settled. */}
                <motion.span
                  className="note-ring"
                  aria-hidden
                  initial={false}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: isOpen ? 0.1 : 0.25, delay: isOpen ? 0 : grow.duration }}
                />
                <motion.span layout="position" className="note-face" transition={{ layout: grow }}>
                  {t.logo ? <img src={t.logo} alt="" width={44} height={44} loading="lazy" /> : <span className="note-initials">{initials(t.name)}</span>}
                </motion.span>
                <span className="note-body">
                  <motion.span layout="position" className="note-who" transition={{ layout: grow }}>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </motion.span>
                  <motion.span
                    key={isOpen ? 'full' : 'short'}
                    layout="position"
                    className="note-quote"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: isOpen ? 0.15 : 0 }}
                  >
                    {isOpen ? t.quote : t.short}
                  </motion.span>
                </span>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.button
                    className="note-close"
                    onClick={close}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease, delay: 0.1 }}
                  >
                    <span aria-hidden>✕</span> Close
                  </motion.button>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </>
  )
}
