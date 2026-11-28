// PostHog product analytics (iamprathameshashra@gmail.com account, shared project with codeamesh.com;
// filter by $host = prathameshashra.com). Loaded only after the page has finished loading, so it
// never competes with the first paint or adds to blocking time.
const POSTHOG_KEY = 'phc_8zTZ0eXMghBDkBi1dRend4BEnsjAHETZeM5cnBxHLuv' // public project key, safe in the browser
const POSTHOG_HOST = 'https://eu.i.posthog.com'

export function startAnalytics() {
  const load = () =>
    import('posthog-js').then(({ default: posthog }) =>
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: 'history_change', // the site routes client-side, so count each route change
        person_profiles: 'identified_only',
      }),
    )
  if (document.readyState === 'complete') load()
  else window.addEventListener('load', load, { once: true })
}
