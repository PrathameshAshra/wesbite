import { useState } from 'react'

// Individual stars that twinkle on their own random rhythm, like the reference sky.
function makeStars(count: number) {
  return Array.from({ length: count }, () => {
    const size = 1 + Math.random() * 1.8
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      '--a': 0.3 + Math.random() * 0.6,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${-Math.random() * 5}s`,
    } as React.CSSProperties
  })
}

export function Stars({ count, className = 'stars' }: { count: number; className?: string }) {
  const [stars] = useState(() => makeStars(count))
  return (
    <div className={className} aria-hidden>
      {stars.map((s, i) => (
        <span key={i} style={s} />
      ))}
    </div>
  )
}
