import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { CaseStudy } from './content'
import { ImpactCard } from './Impact'
import { reducedMotion } from './scroll'

// The Work card shows the real product, not a stock photo: a browser frame with the website
// and the app's store screenshot, staged on the project's own colour. Projects without
// screenshots show their animated impact card in the browser frame instead. The pieces drift
// at different speeds on scroll for depth. The outcome numbers sit under the card (App.tsx).

function Browser({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="sc-browser">
      <div className="sc-bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <div className="sc-view">{children}</div>
    </div>
  )
}

export function WorkVisual({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const slow = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [30, -30])
  const fast = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [80, -80])
  const sc = study.showcase

  return (
    <motion.div
      ref={ref}
      className={`teaser${sc ? '' : ' teaser-impact'}`}
      style={{ '--accent': study.accent } as React.CSSProperties}
      initial={reducedMotion ? false : { clipPath: 'inset(14% 10% 14% 10% round 28px)', scale: 0.96 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)', scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div className="sc-web" style={{ y: slow }}>
        {sc ? (
          <Browser url={sc.url}>
            <img src={sc.web} alt={`${study.name} website`} loading="lazy" decoding="async" />
          </Browser>
        ) : (
          <Browser url="internal tools">
            <div className="sc-impact">
              <ImpactCard study={study} />
            </div>
          </Browser>
        )}
      </motion.div>
      {sc && (
        <motion.img className="sc-app" style={{ y: fast }} src={sc.app} alt={`${study.name} app`} loading="lazy" decoding="async" />
      )}
    </motion.div>
  )
}
