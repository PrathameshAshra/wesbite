import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { CaseStudy } from './content'
import { reducedMotion } from './scroll'

// Full-bleed photo for a case study, revealed with a clip-path wipe, with a slow scroll zoom
// on the photo and the metric chips drifting at a different speed for depth.

const WIDTHS = [800, 1200, 1600, 2000]
const src = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export function WorkVisual({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const zoom = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1.18, 1.02])
  const drift = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [60, -60])

  return (
    <motion.div
      ref={ref}
      className="teaser"
      style={{ '--accent': study.accent } as React.CSSProperties}
      initial={reducedMotion ? false : { clipPath: 'inset(14% 10% 14% 10% round 28px)', scale: 0.96 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.img
        className="tz-photo"
        style={{ scale: zoom }}
        src={src(study.photo.id, 1600)}
        srcSet={WIDTHS.map((w) => `${src(study.photo.id, w)} ${w}w`).join(', ')}
        sizes="(max-width: 820px) 92vw, min(1080px, 90vw)"
        alt={study.photo.alt}
        loading="lazy"
        decoding="async"
      />
      <div className="tz-shade" />
      <motion.div className="tz-metrics" style={{ y: drift }}>
        {study.metrics.map((m) => (
          <div key={m.label} className="tz-metric">
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
