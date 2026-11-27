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
  // TODO: replace placeholder hook + title
  kicker: 'An engineer who thinks like a PM',
  title: 'Product Builder',
  hook: 'I build products that make it out of the demo and into people’s pockets.',
  statement: ['Love shipping things', 'people actually'],
  statementWord: 'use',
  about:
    'A decade of shipping software across web, mobile and AI. I founded Codeamesh in 2020, led builds from first commit to pan-India launch, and now think about products as much as I build them.',
  status: 'Open to chat',
  services: ['Web & mobile apps', 'AI products', '0 → 1 products', 'Product strategy'],
  contact: {
    // TODO: confirm email
    email: 'hello@prathameshashra.com',
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
    oneLiner: 'Founding developer. Took a spontaneous-plans app from zero to a pan-India launch in two years.',
    role: 'Lead developer, founding team',
    years: '2 years',
    metrics: [
      { value: '1M+', label: 'views' },
      { value: '2 yrs', label: 'to a pan-India launch' },
      { value: '3', label: 'platforms shipped' },
    ],
    problem:
      'A young startup wanted people to discover and show up to real-world plans in their city. There was no product, no team and no infrastructure yet.',
    built: [
      'Web, Android and iOS apps end to end, as the first engineer on the founding team',
      'AI curation that finds good places and plans using maps and live data, with city-boundary logic',
      'Interactive in-app games to keep people coming back between events',
      'An AWS-only backend that grew from first users to thousands of downloads',
    ],
    outcome:
      'Thousands of downloads, over a million views, and events running live across India within two years.',
    stack: ['React', 'React Native', 'Node.js', 'AWS', 'AI curation'],
    accent: '#ff8a3d',
    photo: { id: '1501281668745-f7f57925c3b4', alt: 'A crowd at a live concert, phones up filming the stage' },
    showcase: { url: 'spontaa.ai', web: '/shots/spontaa-web-lg.jpg', app: '/shots/spontaa-app-lg.jpg' },
  },
  {
    id: 'pearbae',
    eyebrow: 'Social app · India',
    name: 'Pearbae',
    oneLiner: 'Shipped a trust-first social app in a year: every profile ID-verified, calls without sharing numbers.',
    role: 'Lead developer',
    years: '1 year build · just launched',
    metrics: [
      { value: '1 yr', label: 'commit to launch' },
      { value: '0', label: 'numbers shared to call' },
    ],
    problem:
      'Meeting new people online in India runs on trust, and most apps can’t prove anyone is real. The brief: make every profile verifiable without killing the vibe.',
    built: [
      'Aadhaar-based identity verification built into onboarding',
      'In-app VoIP calling so numbers never have to be shared',
      'Real-time chat, presence and live updates across the app',
      'The full iOS build through App Store review to launch',
    ],
    outcome: 'A year of building, now live for users across India.',
    stack: ['React Native', 'Node.js', 'WebRTC / VoIP', 'Real-time sync'],
    accent: '#ff5d8f',
    photo: { id: '1511632765486-a01980e01a18', alt: 'Four friends with arms around each other watching a sunset' },
    showcase: { url: 'pearbae.com', web: '/shots/pearbae-web-lg.jpg', app: '/shots/pearbae-app-lg.jpg' },
  },
  {
    id: 'energy',
    eyebrow: 'Energy trading · embedded engineer',
    name: 'The Data Duck',
    oneLiner: 'Five years embedded with a global power-trading firm, building the UIs its quants and developers trade on.',
    role: 'Embedded engineer',
    years: '5 years',
    metrics: [
      { value: '5 yrs', label: 'and counting' },
      { value: '2', label: 'continents of markets' },
    ],
    problem:
      'A global power-trading firm trades electricity across Europe and Asia. Its quants and developers need interfaces that keep up with fast markets and complex models, built to the standard of a firm operating at that scale.',
    built: [
      'Trading UIs the firm’s quants and developers use to build, run and watch their trades',
      'Research into the tools and approaches the desk takes on',
      'Specs and write-ups the team builds from, across multiple international power markets',
    ],
    outcome: 'Five years in, still the firm’s go-to for the interfaces its traders work in.',
    stack: ['TypeScript', 'Node.js', 'Data pipelines'],
    accent: '#4da3ff',
    photo: { id: '1473341304170-971dccb5ac1e', alt: 'Electricity pylons and power lines against an orange sunset' },
    showcase: null,
  },
  {
    id: 'travel',
    eyebrow: 'Digital transformation · Travel',
    // TODO: agency name + impact numbers
    name: 'Travel, online',
    oneLiner: 'Took a 50-year-old travel agency fully online over four years, without the business ever stopping.',
    role: 'Tech lead',
    years: '4 years',
    metrics: [
      { value: '50 yrs', label: 'of offline, modernised' },
      { value: '100%', label: 'online now' },
      { value: '4 yrs', label: 'steady rollout' },
    ],
    problem:
      'A trusted agency with 50 years of history ran almost everything on phone calls, paper and memory. Growing meant going digital without losing what customers loved.',
    built: [
      'An end-to-end online flow, from first enquiry to booked trip',
      'Internal tools that replaced paper-based operations',
      'A gradual rollout over four years so the business never stopped',
    ],
    outcome: 'The agency now runs online, start to finish.',
    stack: ['React', 'Node.js', 'Cloud'],
    accent: '#2ec4a6',
    photo: { id: '1512343879784-a960bf40e7f2', alt: 'A palm-lined tropical beach with turquoise water' },
    showcase: null,
  },
]

// The button only shows once `href` is a real link.
export type SideQuest = { name: string; blurb: string; cta: string; href: string; accent: string }

// TODO: real links
export const sideQuests: SideQuest[] = [
  {
    name: 'Content-Story',
    blurb: 'Stories, but for every platform at once. Post once, show up everywhere.',
    cta: 'Join the beta',
    href: '', // TODO: beta sign-up link
    accent: '#ff7a59',
  },
  {
    name: 'Quantbook',
    blurb: 'A notebook for backtesting Indian equity strategies, hedged with options.',
    cta: 'Open Quantbook',
    href: '', // TODO: quant.prathameshashra.com is down since the server wipe
    accent: '#7c5cff',
  },
  {
    name: 'The Channel',
    blurb: 'Long-form talks on building AI products, from an engineer-turned-PM in India.',
    cta: 'Watch on YouTube',
    href: '', // TODO: channel URL
    accent: '#ff3b3b',
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
    name: 'J.M. Mehta Travel & Tour Co. Pvt. Ltd.',
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
