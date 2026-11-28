// All site copy lives here. Edit this file to change text; no scene code needed.
// Lines marked TODO are placeholders waiting on real content.

export type CaseStudy = {
  id: string
  eyebrow: string
  name: string
  oneLiner: string
  role: string
  years: string
  metrics: { value: string; label: string }[]
  problem: string
  built: string[]
  outcome: string
  stack: string[]
  accent: string
  // Stock photo from Unsplash (free licence), hotlinked by photo id. Case page hero only.
  photo: { id: string; alt: string }
  // The real product on the Work card: a website shot in a browser frame plus an app shot in a
  // phone. Projects without screenshots (null) show their animated impact card instead.
  showcase: { url: string; web: string; app: string } | null
}

export const site = {
  name: 'Prathamesh Ashra',
  url: 'https://prathameshashra.com',
  kicker: 'Engineer turned product manager · Mumbai',
  title: 'AI Product Builder',
  // Plain, factual summary for search engines and AI assistants: meta description, JSON-LD, llms.txt.
  // Keep it to facts a stranger could check.
  description:
    'Prathamesh Ashra is a product manager and software engineer in Mumbai, India, with ten years of building web, mobile and AI products. He founded the app studio Codeamesh in 2020, was the founding developer of Spontaa, built the ID-verified social app Pearbae, has spent five years building trading tools for the power-trading firm The Data Duck, and moved the 50-year-old agency J M Mehta Tours and Travels online.',
  // Short version for the Google snippet (it cuts off around 160 characters).
  metaDescription: 'Product manager and engineer in Mumbai. Ten years building web, mobile and AI apps, including Spontaa and Pearbae. Founder of Codeamesh.',
  // What he is known for, used as knowsAbout in structured data.
  expertise: ['AI product management', 'React', 'React Native', 'Node.js', 'LLM features', 'Mobile app development', '0 to 1 product development', 'Trading UIs'],
  statement: ['Love shipping things', 'people actually'],
  statementWord: 'use',
  about:
    'I’ve been building software for about ten years. I started Codeamesh in 2020, was the first engineer at Spontaa, built Pearbae, and these days I work as a product manager.',
  status: 'Open to chat',
  services: ['Web & mobile apps', 'AI products', '0 → 1 MVPs', 'Product strategy'],
  contact: {
    email: 'iamprathameshashra@gmail.com',
    call: 'https://meetings-na2.hubspot.com/prathamesh-ashra?uuid=8213bdde-e0dc-404e-80fb-1cb748c9ffbe',
    // TODO: confirm LinkedIn slug; X and YouTube still placeholders
    linkedin: 'https://www.linkedin.com/in/prathamesh-ashra-b2318bab/',
    x: '', // TODO: X profile
    youtube: '', // TODO: channel URL
    // TODO: resume PDF in /public
    resume: '',
  },
}

export const work: CaseStudy[] = [
  {
    id: 'events',
    eyebrow: 'Founding developer · Consumer social',
    name: 'Spontaa',
    oneLiner: 'I was the first engineer on Spontaa’s founding team. Two years later the app was live across India, on the web, Android and iOS.',
    role: 'Lead developer, founding team',
    years: '2 years',
    metrics: [
      { value: '1M+', label: 'views' },
      { value: '2 yrs', label: 'to a pan-India launch' },
      { value: '3', label: 'platforms shipped' },
    ],
    problem:
      'Spontaa wanted people to find real plans in their city and actually show up. When I joined there was nothing yet. No app, no team, no servers.',
    built: [
      'Web, Android and iOS apps end to end, as the first engineer on the founding team',
      'AI that picks places and plans from maps and live data, and knows where one city ends and the next starts',
      'Small in-app games, so people had a reason to open the app between events',
      'The whole backend on AWS, from our first users to thousands of downloads',
    ],
    outcome:
      'Within two years we had thousands of downloads, over a million views, and events running in cities across India.',
    stack: ['React', 'React Native', 'Node.js', 'AWS', 'AI curation'],
    accent: '#ff8a3d',
    photo: { id: '1501281668745-f7f57925c3b4', alt: 'A crowd at a live concert, phones up filming the stage' },
    showcase: { url: 'spontaa.ai', web: '/shots/spontaa-web-lg.jpg', app: '/shots/spontaa-app-lg.jpg' },
  },
  {
    id: 'pearbae',
    eyebrow: 'Social app · India',
    name: 'Pearbae',
    oneLiner: 'A social app for India where every profile is checked with Aadhaar and you can call someone without giving out your number. Built and shipped to the App Store in about a year.',
    role: 'Lead developer',
    years: '1 year build · just launched',
    metrics: [
      { value: '1 yr', label: 'commit to launch' },
      { value: '0', label: 'numbers shared to call' },
    ],
    problem:
      'On most social apps in India you can’t tell who’s real. Pearbae wanted every profile verified, and the app still had to feel fun to use.',
    built: [
      'Aadhaar-based identity verification built into onboarding',
      'In-app VoIP calling so numbers never have to be shared',
      'Real-time chat, presence and live updates across the app',
      'The full iOS build through App Store review to launch',
    ],
    outcome: 'It took a year. Pearbae is live in India now.',
    stack: ['React Native', 'Node.js', 'WebRTC / VoIP', 'Real-time sync'],
    accent: '#ff5d8f',
    photo: { id: '1511632765486-a01980e01a18', alt: 'Four friends with arms around each other watching a sunset' },
    showcase: { url: 'pearbae.com', web: '/shots/pearbae-web-lg.jpg', app: '/shots/pearbae-app-lg.jpg' },
  },
  {
    id: 'energy',
    eyebrow: 'Energy trading · embedded engineer',
    name: 'The Data Duck',
    oneLiner: 'Five years working inside a global power-trading firm, building the screens its quants and developers trade from.',
    role: 'Embedded engineer',
    years: '5 years',
    metrics: [
      { value: '5 yrs', label: 'and counting' },
      { value: '2', label: 'continents of markets' },
    ],
    problem:
      'The firm trades electricity in markets across Europe and Asia. Prices move fast and the models behind each trade are complicated, so the tools on screen have to keep up.',
    built: [
      'Trading UIs the quants and developers use to build, run and watch their trades',
      'Research on tools and approaches the desk is weighing up',
      'Specs and write-ups the team builds from, for power markets in several countries',
    ],
    outcome: 'Five years on, I’m still who they call when their traders need a new screen.',
    stack: ['TypeScript', 'Node.js', 'Data pipelines'],
    accent: '#4da3ff',
    photo: { id: '1473341304170-971dccb5ac1e', alt: 'Electricity pylons and power lines against an orange sunset' },
    showcase: null,
  },
  {
    id: 'travel',
    eyebrow: 'Digital transformation · Travel',
    name: 'J M Mehta Tours and Travels',
    oneLiner: 'A travel agency that ran offline for 50 years. Over four years I moved the whole business online while it kept running.',
    role: 'Tech lead',
    years: '4 years',
    metrics: [
      { value: '50 yrs', label: 'offline before we started' },
      { value: '100%', label: 'online now' },
      { value: '4 yrs', label: 'steady rollout' },
    ],
    problem:
      'For 50 years the agency ran on phone calls, paper files and people’s memory. Growing meant moving online, slowly enough that nothing broke for customers.',
    built: [
      'One online flow, from the first enquiry to the booked trip',
      'Internal tools that replaced the paper files',
      'A slow rollout over four years, so the business kept running the whole time',
    ],
    outcome: 'The agency runs fully online now.',
    stack: ['React', 'Node.js', 'Cloud'],
    accent: '#2ec4a6',
    photo: { id: '1512343879784-a960bf40e7f2', alt: 'A palm-lined tropical beach with turquoise water' },
    showcase: null,
  },
]

// The button only shows once `href` is a real link. `screen` picks the mini UI drawn in the phone.
export type SideQuest = { name: string; blurb: string; cta: string; href: string; accent: string; screen: 'stories' | 'chart' | 'video' }

// How many side quests the home page shows; the rest live on /side-quests.
export const HOME_QUESTS = 3

// TODO: real links
export const sideQuests: SideQuest[] = [
  {
    name: 'Content-Story',
    blurb: 'Write a story once and post it to every platform in one go. It’s in beta.',
    cta: 'Join the beta',
    href: '', // TODO: beta sign-up link
    accent: '#ff7a59',
    screen: 'stories',
  },
  {
    name: 'Quantbook',
    blurb: 'A backtesting notebook for Indian stocks. Test an NSE strategy, hedge it with options, and see how it would have done.',
    cta: 'Open Quantbook',
    href: '', // TODO: quant.prathameshashra.com is down since the server wipe
    accent: '#7c5cff',
    screen: 'chart',
  },
  {
    name: 'The Channel',
    blurb: 'Long-form videos on building AI products, from someone who was an engineer before he became a PM.',
    cta: 'Watch on YouTube',
    href: '', // TODO: channel URL
    accent: '#ff3b3b',
    screen: 'video',
  },
]

// `short` is the one-liner on the collapsed card; `quote` is the full text when it expands.
export type Testimonial = { name: string; role: string; short: string; quote: string; logo?: string }

// Client quotes, shown by company name to every visitor.
export const testimonials: Testimonial[] = [
  {
    name: 'The Data Duck',
    role: 'Power-trading desk',
    logo: '/logos/thedataduck.png',
    short: 'Five years of trading tools our desk relies on every day.',
    quote:
      'Prathamesh has built and looked after the tools our power-trading desk uses daily for five years. Reliable, quick to pick up new needs, and he understands the business, not just the ticket.',
  },
  {
    name: 'Pearbae',
    role: 'iOS social app',
    logo: '/logos/pearbae.png',
    short: 'Took Pearbae from idea to App Store with trust built in.',
    quote:
      'Prathamesh built Pearbae end to end: Aadhaar verification, in-app calling and real-time chat. He thought about safety and trust like a product person, not just a developer, and shipped it in a year.',
  },
  {
    name: 'J M Mehta Tours and Travels Pvt Ltd',
    role: '50-year-old travel agency',
    short: 'Took our 50-year-old business fully online.',
    quote:
      'We had run offline for five decades. Over four years Prathamesh rebuilt everything into one online flow, from enquiry to trip, without breaking how our team actually works. Today we are fully online.',
  },
]

// Real screenshots for the hero sphere. Each shot tile is one project and cycles through
// only that project's frames, like a GIF. `web` frames fill the card; `app` frames sit as a phone.
export type Shot = { src: string; kind: 'web' | 'app' }
export type BannerProject = { name: string; shots: Shot[] }
const web = (src: string): Shot => ({ src: `/shots/${src}.jpg`, kind: 'web' })
const app = (src: string): Shot => ({ src: `/shots/${src}.jpg`, kind: 'app' })
export const bannerProjects: BannerProject[] = [
  {
    name: 'Spontaa',
    shots: [web('spontaa-web'), app('spontaa-app-1'), web('spontaa-web-2'), app('spontaa-app-2'), app('spontaa-app-3'), app('spontaa-app-4'), app('spontaa-app-5'), app('spontaa-app-6')],
  },
  {
    name: 'Pearbae',
    shots: [web('pearbae-web'), app('pearbae-app-1'), web('pearbae-web-2'), app('pearbae-app-2'), web('pearbae-web-3'), app('pearbae-app-3'), app('pearbae-app-4'), app('pearbae-app-5')],
  },
  { name: 'The Data Duck', shots: [web('tdd-web'), web('tdd-web-2'), web('tdd-web-3')] },
  { name: 'Chandan Mukhwas', shots: [web('chandan-web'), web('chandan-web-2'), web('chandan-web-3')] },
  { name: 'Sva Life', shots: [web('svalife-web'), app('svalife-grid')] },
]
