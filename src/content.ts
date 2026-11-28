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

// One side project. The home section and /side-quests show `blurb`; /side-quests/<id> tells the
// full story: a hook, why it exists (with a before/after), a look inside (an illustrative screen with
// hotspots, never real screenshots), how it works, calls made along the way, where it's at, and what's
// next. Only real facts and numbers go here. The outbound button only shows once `href` is a real link.
export type Hotspot = { x: number; y: number; title: string; text: string } // x, y in % of the screen
export type SideQuest = {
  id: string
  name: string
  blurb: string
  cta: string
  href: string
  accent: string
  screen: 'stories' | 'chart' | 'video'
  status: string
  hook: string
  itch: string
  before: { label: string; points: string[] }
  after: { label: string; points: string[] }
  inside: { title: string; spots: Hotspot[] }
  steps: { title: string; text: string }[]
  calls: { call: string; why: string }[]
  stats: { value: string; label: string }[]
  milestones: { when: string; what: string }[]
  now: string
  next: string[]
  tags: string[]
}

// How many side quests the home page shows; the rest live on /side-quests.
export const HOME_QUESTS = 3

export const sideQuests: SideQuest[] = [
  {
    id: 'content-story',
    name: 'Content-Story',
    blurb: 'Follow a creator across every platform and read it all as one story, with links back to every post.',
    cta: 'See the beta',
    href: 'https://content-story.onrender.com/',
    accent: '#ff7a59',
    screen: 'stories',
    status: 'In beta',
    hook: 'What if you could read a creator’s whole week in one scroll?',
    itch:
      'Keeping up with one creator meant X for the take, YouTube for the long version and Reddit for the argument. By the time I had pieced it together, I had lost the thread. I wanted something that did the piecing for me.',
    before: { label: 'Six apps', points: ['X for the hot take', 'YouTube for the long version', 'Reddit for the argument', 'Three more apps for the rest'] },
    after: { label: 'One story', points: ['Every post in one readable story', 'Each line linked to where it came from', 'A verdict for each platform'] },
    inside: {
      title: 'content-story / creator',
      spots: [
        { x: 9, y: 9, title: 'One creator, six platforms', text: 'Pick who to follow once. It watches X, YouTube, LinkedIn, Instagram, TikTok and Reddit for you.' },
        { x: 52, y: 50, title: 'Every line has a source', text: 'Small badges link each line back to the original post, so you can check it yourself.' },
        { x: 95, y: 13, title: 'A verdict per platform', text: 'See how the same take landed in each place. Loved on one, argued with on another.' },
      ],
    },
    steps: [
      { title: 'Follow', text: 'Pick a creator. Content-Story finds them across six platforms.' },
      { title: 'Stitch', text: 'Their posts and the comments around them are joined, in order, into one story.' },
      { title: 'Read', text: 'You get the story with a source on every line and a verdict for each platform.' },
    ],
    calls: [
      { call: 'Landing page before the product is done', why: 'Getting people in early beats polishing in private, so the beta page went up first.' },
      { call: 'Priced in rupees', why: 'The first users are brands, agencies and newsletter writers here, so the pricing is in rupees.' },
      { call: 'No final name yet', why: 'The name has to feel like a real object and carry an emotion. Content-Story holds the spot until one does.' },
    ],
    stats: [
      { value: '6', label: 'platforms followed' },
      { value: 'Beta', label: 'live now' },
    ],
    milestones: [
      { when: 'Sep 2026', what: 'Beta page live' },
      { when: 'Now', what: 'In beta, picking the final name' },
    ],
    now: 'The beta is live. Pricing is in rupees and aimed at brands, agencies and newsletter writers. The final name is still being picked.',
    next: ['Pick the final name', 'Domain and social handles', 'Onboard the first brands'],
    tags: ['X', 'YouTube', 'LinkedIn', 'Instagram', 'TikTok', 'Reddit'],
  },
  {
    id: 'quantbook',
    name: 'Quantbook',
    blurb: 'A backtesting notebook for Indian stocks. Test an NSE strategy, hedge it with options, and see how it would have done.',
    cta: 'Open Quantbook',
    href: '',
    accent: '#7c5cff',
    screen: 'chart',
    status: 'Personal tool',
    hook: 'What if testing a trading idea took one sentence?',
    itch:
      'Every trading idea I had for Indian markets meant writing another backtest by hand. Most ideas died in the setup, not in the results. I wanted to say the theory and get the answer.',
    before: { label: 'Notebook', points: ['Write the backtest by hand', 'Wire up data for every idea', 'Most ideas die in the setup'] },
    after: { label: 'One sentence', points: ['Type the theory in plain English', 'Claude builds and runs the backtest', 'Charts to compare, then decide'] },
    inside: {
      title: 'quantbook / new study',
      spots: [
        { x: 3, y: 6, title: 'The theory, in plain words', text: 'Type the idea the way you would say it out loud. No code.' },
        { x: 40, y: 58, title: 'Strategy vs hedge', text: 'The backtest draws the strategy with and without its options hedge, side by side.' },
        { x: 95, y: 30, title: 'Notes that carry over', text: 'A running notes stream, so each new study builds on the last one.' },
        { x: 85, y: 9, title: 'Paper only', text: 'Nothing is bought or sold here. If a strategy holds up, I place the trade myself.' },
      ],
    },
    steps: [
      { title: 'State', text: 'Type a theory about Indian stocks or F&O in plain English.' },
      { title: 'Test', text: 'It pulls data from Zerodha Kite, builds the backtest and runs it.' },
      { title: 'Compare', text: 'Charts show how it would have done, hedged and unhedged. Then I decide.' },
    ],
    calls: [
      { call: 'Dropped the notebook', why: 'Writing cells was the slow part. Now I state the theory and the app does the rest.' },
      { call: 'A phone app, not a ChatGPT plug-in', why: 'An installable app with its own notes stream keeps every study’s context in one place.' },
      { call: 'Light on data, on purpose', why: 'Kite API calls add up, so it favours index-level strategies over huge stock lists.' },
    ],
    stats: [
      { value: '₹0', label: 'real money in the app' },
      { value: 'Weekly', label: 'Nifty iron condor, on paper' },
    ],
    milestones: [
      { when: 'Oct 2026', what: 'First version, notebook style' },
      { when: 'Oct 2026', what: 'Switched to plain-English theories' },
      { when: 'Oct 2026', what: 'Paper-trading a weekly Nifty iron condor' },
      { when: 'Now', what: 'Personal tool, stock F&O next' },
    ],
    now: 'Right now it is paper-trading a weekly Nifty iron condor. It is built for me, not as a product.',
    next: ['Stock options and futures', 'Hedging stocks with their own options', 'Option-chain snapshots'],
    tags: ['NSE', 'F&O', 'Zerodha Kite', 'Claude', 'PWA'],
  },
  {
    id: 'the-channel',
    name: 'The Channel',
    blurb: 'Long-form videos on building AI products, from someone who was an engineer before he became a PM.',
    cta: 'Watch on YouTube',
    href: '',
    accent: '#ff3b3b',
    screen: 'video',
    status: 'In production',
    hook: 'What if AI product talk came from someone who has sat on both sides?',
    itch:
      'Most talk about AI products comes from one camp, engineers or product people. I have been both, so the channel sits in the middle: how AI products actually get built, explained for PMs by someone who used to write the code.',
    before: { label: 'Two camps', points: ['Engineers talk models and metrics', 'PMs talk users and roadmaps', 'Nobody translates'] },
    after: { label: 'One room', points: ['Engineering ideas, explained for PMs', 'Examples from real product work', 'Long enough to go deep'] },
    inside: {
      title: 'The Channel · Episode 1',
      spots: [
        { x: 59, y: 11, title: 'Long-form, on purpose', text: 'Episodes run long enough to actually explain things, as video and as a podcast.' },
        { x: 30, y: 80, title: 'First up: evals', text: '“Evals explained for PMs by an ex-engineer”, in the works now.' },
        { x: 95, y: 13, title: 'One idea per episode', text: 'Each episode takes one engineering idea PMs keep running into and makes it usable.' },
      ],
    },
    steps: [
      { title: 'Pick one idea', text: 'One engineering idea that PMs keep running into.' },
      { title: 'Show it', text: 'Explain it through a real example, not a slide of definitions.' },
      { title: 'Ship it', text: 'Out as a long-form video and a podcast episode.' },
    ],
    calls: [
      { call: 'Long-form, not shorts', why: 'Long video and podcast is the format I can actually keep up every week.' },
      { call: 'No ads, no sponsors', why: 'The channel is not there to make money. It is there to share what I learn.' },
      { call: 'The demo has to earn its place', why: 'The first demo for the evals episode got scrapped for not feeling real enough. Still picking the right one.' },
    ],
    stats: [
      { value: '1', label: 'episode in the works' },
      { value: 'Weekly', label: 'long-form, once it starts' },
    ],
    milestones: [
      { when: 'Oct 2026', what: 'Channel planned, first topic picked' },
      { when: 'Now', what: 'Evals episode in the works' },
    ],
    now: 'First up is “Evals explained for PMs by an ex-engineer”, in the works now.',
    next: ['Ship the evals episode', 'Go weekly', 'Podcast feeds'],
    tags: ['YouTube', 'Podcast', 'AI products', 'Evals'],
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
