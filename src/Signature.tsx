import { signature } from './signature'

type Props = { className?: string; weight?: number }

// Handwritten "prathamesh". The paths are glyph outlines from the font, so they are filled, not stroked.
// `weight` adds an outline stroke to thicken small renders.
export function Signature({ className, weight = 0 }: Props) {
  return (
    <svg className={className} viewBox={signature.viewBox} role="img" aria-label="prathamesh">
      {signature.letters.map((d, i) => (
        <path key={i} d={d} fill="currentColor" stroke={weight > 0 ? 'currentColor' : 'none'} strokeWidth={weight} strokeLinejoin="round" />
      ))}
    </svg>
  )
}
