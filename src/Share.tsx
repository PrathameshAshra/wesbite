import { useState } from 'react'

// Share a page: LinkedIn, X and WhatsApp open their own share screens in a new tab; Copy link
// puts the URL on the clipboard.
export function Share({ url, text }: { url: string; text: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)
  const targets = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  ]
  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="share" role="group" aria-label="Share this page">
      <span className="share-label">Share</span>
      {targets.map((s) => (
        <a key={s.name} className="share-btn" href={s.href} target="_blank" rel="noreferrer" aria-label={`Share on ${s.name}`}>
          {s.name}
        </a>
      ))}
      <button className="share-btn" onClick={copy} aria-live="polite">
        {copied ? 'Link copied ✓' : 'Copy link'}
      </button>
    </div>
  )
}
