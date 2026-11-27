import { signature } from './signature'

type Props = { className?: string; draw?: boolean; weight?: number }

// Handwritten "prathamesh". The paths are glyph outlines from the font, so they are filled, not stroked.
// `weight` adds an outline stroke to thicken small renders. With `draw`, each letter traces its
// outline in sequence and then fills in.
export function Signature({ className, draw = false, weight = 0 }: Props) {
  const per = 0.22
  return (
    <svg className={className} viewBox={signature.viewBox} role="img" aria-label="prathamesh">
      {signature.letters.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill="currentColor"
          stroke={draw || weight > 0 ? 'currentColor' : 'none'}
          strokeWidth={draw ? 2.5 : weight}
          strokeLinejoin="round"
          className={draw ? 'sig-draw' : undefined}
          style={
            draw
              ? {
                  animationDelay: `${0.25 + i * per}s, ${0.25 + i * per + per * 1.6}s`,
                  animationDuration: `${per * 2.4}s, 0.35s`,
                }
              : undefined
          }
        />
      ))}
    </svg>
  )
}
