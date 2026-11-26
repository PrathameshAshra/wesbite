export type Theme = 'light' | 'dark'

const KEY = 'theme'

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export function initialTheme(): Theme {
  return stored() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#070b1f' : '#4a9df5')
  try {
    localStorage.setItem(KEY, t)
  } catch {
    // Storage blocked (private mode); theme still applies for this visit.
  }
}
