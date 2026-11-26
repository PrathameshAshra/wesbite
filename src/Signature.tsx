import { signature } from './signature'

type Props = { className?: string; draw?: boolean; strokeWidth?: number }

// Handwritten "prathamesh". With `draw`, each letter traces itself in sequence.
export function Signature({ className, draw = false, strokeWidth = 9 }: Props) {
  const per = 0.22
  return (
    <svg className={className} viewBox={signature.viewBox} role="img" aria-label="prathamesh">
      {signature.letters.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={draw ? 'sig-draw' : undefined}
          style={draw ? { animationDelay: `${0.25 + i * per}s`, animationDuration: `${per * 2.2}s` } : undefined}
        />
      ))}
    </svg>
  )
}
