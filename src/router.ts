import { useEffect, useState } from 'react'

// Minimal client-side routing: "/" is the home page, "/work/<id>" is a case study page.
// The server serves index.html for every path (Caddy try_files), so deep links load directly.

const CHANGE = 'routechange'

export function navigate(to: string) {
  history.pushState(null, '', to)
  window.dispatchEvent(new Event(CHANGE))
}

export function usePath() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const update = () => setPath(location.pathname)
    window.addEventListener('popstate', update)
    window.addEventListener(CHANGE, update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener(CHANGE, update)
    }
  }, [])
  return path
}

// onClick for internal <a href>: same-tab clicks route in-app; ctrl/cmd/middle clicks open a new tab as usual.
export function linkTo(to: string) {
  return (e: React.MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
}
