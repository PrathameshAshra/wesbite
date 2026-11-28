// PostHog product analytics (iamprathameshashra@gmail.com account, shared project with codeamesh.com;
// filter by $host = prathameshashra.com). The library is as big as the whole site, so it loads on the
// visitor's first scroll, tap or key press, or 5s after the page has loaded, whichever comes first.
// That keeps it out of the first paint and the page's busiest seconds.
const POSTHOG_KEY = 'phc_8zTZ0eXMghBDkBi1dRend4BEnsjAHETZeM5cnBxHLuv' // public project key, safe in the browser
const POSTHOG_HOST = 'https://eu.i.posthog.com'
const IDLE_MS = 5000
const FIRST_INPUT = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const

export function startAnalytics() {
  let started = false
  let timer = 0
  const load = () => {
    if (started) return
    started = true
    clearTimeout(timer)
    FIRST_INPUT.forEach((e) => window.removeEventListener(e, load))
    import('posthog-js').then(({ default: posthog }) =>
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: 'history_change', // the site routes client-side, so count each route change
        person_profiles: 'identified_only',
      }),
    )
  }
  FIRST_INPUT.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
  const arm = () => {
    timer = window.setTimeout(load, IDLE_MS)
  }
  if (document.readyState === 'complete') arm()
  else window.addEventListener('load', arm, { once: true })
}
