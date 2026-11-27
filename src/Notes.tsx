import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Testimonial } from './content'
import { holdScroll, reducedMotion } from './scroll'

const ease = [0.32, 0.72, 0, 1] as const
const grow = { duration: reducedMotion ? 0 : 0.5, ease }

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
                transition={{ layout: grow }}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <motion.span layout="position" className="note-face" transition={{ layout: grow }}>
                  {t.logo ? <img src={t.logo} alt="" width={44} height={44} loading="lazy" /> : <span className="note-initials">{initials(t.name)}</span>}
                </motion.span>
                <span className="note-body">
                  <span className="note-who">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                  <motion.span
                    key={isOpen ? 'full' : 'short'}
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
