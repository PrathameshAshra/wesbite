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
  // Stock photo from Unsplash (free licence), hotlinked by photo id. Replace with real screenshots later.
  photo: { id: string; alt: string }
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
    x: 'https://x.com/',
    youtube: 'https://www.youtube.com/',
    // TODO: resume PDF in /public
    resume: '',
  },
}

export const work: CaseStudy[] = [
  {
    id: 'events',
    eyebrow: 'Founding developer · Consumer social',
    // TODO: client name withheld until cleared
    name: 'Events platform',
    oneLiner: 'First developer on the founding team. Built every surface, then scaled it to live events across the country.',
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
  },
  {
    id: 'pearbae',
    eyebrow: 'Social app · India',
    name: 'Pearbae',
    oneLiner: 'A trust-first social app: verified people, real-time chat and in-app calling.',
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
  },
  {
    id: 'energy',
    eyebrow: 'Energy trading · via The Data Duck',
    name: 'Power trading',
    oneLiner: 'Five years building the trading tools a power-trading desk relies on every day.',
    role: 'Developer, long-term partner',
    years: '5 years',
    metrics: [
      { value: '5 yrs', label: 'and counting' },
      { value: '2', label: 'continents of markets' },
    ],
    problem:
      'An energy trading company trades electricity across Europe and Asia. Traders need fast, reliable tooling to build and run their trades in markets that never sit still.',
    built: [
      'Trading bundles traders use to set up and execute trades',
      'Tooling that spans multiple international power markets',
      'Steady delivery over five years as the desk and its markets grew',
    ],
    outcome: 'Still the team’s go-to for trading tooling, five years in.',
    stack: ['TypeScript', 'Node.js', 'Data pipelines'],
    accent: '#4da3ff',
    photo: { id: '1473341304170-971dccb5ac1e', alt: 'Electricity pylons and power lines against an orange sunset' },
  },
  {
    id: 'travel',
    eyebrow: 'Digital transformation · Travel',
    // TODO: agency name + impact numbers
    name: 'Travel, online',
    oneLiner: 'Five decades of offline operations, rebuilt into one online flow from enquiry to trip.',
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
  },
]

export type SideQuest = { name: string; blurb: string; cta: string; href: string; accent: string }

// TODO: real links
export const sideQuests: SideQuest[] = [
  {
    name: 'Content-Story',
    blurb: 'Stories, but for every platform at once. Post once, show up everywhere.',
    cta: 'Join the beta',
    href: '#',
    accent: '#ff7a59',
  },
  {
    name: 'Quantbook',
    blurb: 'A notebook for backtesting Indian equity strategies, hedged with options.',
    cta: 'Open Quantbook',
    href: 'https://quant.prathameshashra.com',
    accent: '#7c5cff',
  },
  {
    name: 'The Channel',
    blurb: 'Long-form talks on building AI products, from an engineer-turned-PM in India.',
    cta: 'Watch on YouTube',
    href: 'https://www.youtube.com/',
    accent: '#ff3b3b',
  },
]

export type Testimonial = { name: string; role: string; quote: string; photo?: string }

// TODO: real quotes only. The section stays hidden while this is empty.
export const testimonials: Testimonial[] = []
