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
  kicker: 'Senior software engineer · Mumbai',
  title: 'AI Product Builder',
  // Plain, factual summary for search engines and AI assistants: meta description, JSON-LD, llms.txt.
  // Keep it to facts a stranger could check.
  description:
    'Prathamesh Ashra is a senior software engineer in Mumbai, India, with eight years of building web, mobile and AI products. At The Data Duck he has spent five years building trading tools for a power-trading firm, and was the founding engineer of Spontaa and lead developer of the ID-verified social app Pearbae. Before that he moved the 50-year-old agency J M Mehta Tours and Travels online. He founded the app studio Codeamesh in 2020.',
  // Short version for the Google snippet (it cuts off around 160 characters).
  metaDescription: 'Senior software engineer in Mumbai. Eight years building web, mobile and AI apps, including Spontaa, Pearbae and trading tools for a power-trading firm.',
  // What he is known for, used as knowsAbout in structured data.
  expertise: ['AI products', 'React', 'React Native', 'Node.js', 'LLM features', 'Mobile app development', '0 to 1 product development', 'Trading UIs'],
  statement: ['Love shipping things', 'people actually'],
  statementWord: 'use',
  about:
    'I’ve been building software for about eight years. I’m a senior software engineer at The Data Duck, where I build trading tools for a power-trading firm. There I was also the first engineer on Spontaa and built Pearbae. I started Codeamesh in 2020.',
  status: 'Open to chat',
  services: ['Web & mobile apps', 'AI products', '0 → 1 MVPs', 'Product strategy'],
  contact: {
    email: 'iamprathameshashra@gmail.com',
    call: 'https://meetings-na2.hubspot.com/prathamesh-ashra?uuid=8213bdde-e0dc-404e-80fb-1cb748c9ffbe',
    // TODO: confirm LinkedIn slug; X and YouTube still placeholders
    linkedin: 'https://www.linkedin.com/in/prathamesh-ashra-b2318bab/',
    x: '', // TODO: X profile
    youtube: '', // TODO: channel URL
    resume: '/Prathamesh-Ashra-Resume.pdf',
  },
}

export const work: CaseStudy[] = [
  {
    id: 'events',
    eyebrow: 'Founding developer · Consumer social',
    name: 'Spontaa',
    oneLiner: 'I was the first engineer on Spontaa’s founding team. Two years later the app was live across India, on the web, Android and iOS.',
    role: 'Founding engineer, via The Data Duck',
    years: '2 years',
    metrics: [
      { value: '1M+', label: 'views' },
      { value: '3', label: 'platforms: web, iOS, Android' },
      { value: '2 yrs', label: 'zero to pan-India launch' },
    ],
    problem:
      'Spontaa wanted people to find real plans in their city and actually show up. When I joined there was no app, no team and no servers yet.',
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
    showcase: { url: 'spontaa.ai', web: '/shots/spontaa-web-lg.avif', app: '/shots/spontaa-app-lg.avif' },
  },
  {
    id: 'pearbae',
    eyebrow: 'Social app · India',
    name: 'Pearbae',
    oneLiner: 'A social app for India where every profile is checked with Aadhaar and you can call someone without giving out your number. Built and shipped to the App Store in about a year.',
    role: 'Lead developer, via The Data Duck',
    years: '1 year build · just launched',
    metrics: [
      { value: '100%', label: 'Aadhaar-checked' },
      { value: '1 yr', label: 'idea to App Store' },
      { value: '0', label: 'phone numbers shared to call' },
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
    showcase: { url: 'pearbae.com', web: '/shots/pearbae-web-lg.avif', app: '/shots/pearbae-app-lg.avif' },
  },
  {
    id: 'energy',
    eyebrow: 'Energy trading · embedded engineer',
    name: 'The Data Duck',
    oneLiner: 'Five years working inside a global power-trading firm, building the screens its quants and developers trade from.',
    role: 'Embedded engineer',
    years: '5 years',
    metrics: [
      { value: '5 yrs', label: 'on the trading desk' },
      { value: 'EU + Asia', label: 'power markets covered' },
      { value: 'Daily', label: 'used by the traders' },
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
      { value: '50 yrs', label: 'run on paper and phone calls' },
      { value: '100%', label: 'online now' },
      { value: '4 yrs', label: 'rollout, business never paused' },
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
  screen: 'stories' | 'chart' | 'video' | 'chat'
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
    id: 'payment-collect',
    name: 'Payment Collect',
    blurb: 'An idea for manufacturers: pull overdue bills from Tally and send the reminders on WhatsApp, with a payment link.',
    cta: 'Talk to me about it',
    href: site.contact.call,
    accent: '#25d366',
    screen: 'chat',
    status: 'Idea + POC',
    hook: 'Most manufacturers still chase payments over the phone.',
    itch:
      'Indian MSMEs wait 73 days on average to get an invoice paid (Recordent, 2026), and ₹7.34 lakh crore sits stuck in delayed payments (GAME, FISME and C2FO, 2024). In most factories I know, one person in accounts keeps Tally open and spends the day calling parties. I think most of that can run on its own.',
    before: {
      label: 'Today: phone and Tally',
      points: ['Someone checks Tally for who owes what', 'Calls each party, one by one', 'Ledgers sent by hand', 'The owner hears about it when cash gets tight'],
    },
    after: {
      label: 'How I’d fix it',
      points: ['Overdue bills read straight from Tally', 'A WhatsApp reminder with the ledger and a payment link', 'Firmer reminders on a schedule, calls only when needed', 'Paid invoices mark themselves'],
    },
    inside: {
      title: 'payment-collect / overdue',
      spots: [
        { x: 6, y: 30, title: 'Ledger and pay link in one message', text: 'The party would get their ledger PDF and a one-tap payment link on WhatsApp. So nobody has to reply asking for the details.' },
        { x: 6, y: 66, title: 'Firmer, on a schedule', text: 'Polite on the due date, firmer at day 7. VIP parties never get the firm one.' },
        { x: 63, y: 55, title: 'A person makes the hard call', text: 'At day 15 someone from accounts calls the party. At day 30 the owner gets an alert.' },
        { x: 63, y: 83, title: 'Paid marks itself', text: 'Money that comes in through the link would mark the invoice paid. Tally catches up when the receipt is entered.' },
      ],
    },
    steps: [
      { title: 'Sync', text: 'A small connector would read outstanding bills from Tally while it’s open. Nobody re-enters anything.' },
      { title: 'Remind', text: 'On the due date the party gets a WhatsApp with their ledger and a payment link.' },
      { title: 'Escalate', text: 'Firmer at day 7, flagged for a call at day 15, owner alerted at day 30.' },
      { title: 'Settle', text: 'Paying through the link marks the invoice paid on the owner’s dashboard.' },
    ],
    calls: [
      { call: 'Tally stays', why: 'Manufacturers here run on Tally, and asking them to switch kills the deal. Payment Collect would read Tally and leave it as the source of truth.' },
      { call: 'WhatsApp over email', why: 'Industry numbers put WhatsApp open rates near 98% and email around 21%, so email was never really an option.' },
      { call: 'Meta’s API directly, no reseller', why: 'WhatsApp resellers add a markup on every message. Going direct would keep each reminder at a few paise.' },
      { call: 'A payment link in every message', why: 'If paying means hunting for bank details, people put it off. The link also tells us when they’ve paid, so nobody has to check the bank.' },
      { call: 'A person makes the day-15 call', why: 'A lot of these parties have bought from the same manufacturer for ten years. I wouldn’t want a bot calling them about money.' },
      { call: 'VIP parties skip the firm reminder', why: 'Some customers you just don’t send a stern message to. The owner tags them once and they never get one.' },
    ],
    stats: [
      { value: '73 days', label: 'average wait to get an MSME invoice paid (Recordent, 2026)' },
      { value: '22%', label: 'lower DSO when receivables are automated (PYMNTS and Mastercard)' },
      { value: '98%', label: 'WhatsApp open rate, vs about 21% for email (industry benchmarks)' },
    ],
    milestones: [
      { when: 'Nov 2026', what: 'Research into how manufacturers chase payments' },
      { when: 'Nov 2026', what: 'A POC on a test Tally company to see how it should feel' },
    ],
    now: 'It isn’t a product yet. I built a rough POC on a test Tally company to work out how the Tally sync, WhatsApp reminders, payment links and the owner’s view should fit together.',
    next: ['Talk to manufacturers about how they follow up today', 'Shape a first version from what the POC showed', 'Try it with a first manufacturer'],
    tags: ['Tally', 'WhatsApp', 'Razorpay', 'Manufacturing', 'MSME'],
  },
  {
    id: 'threadline',
    name: 'Threadline',
    blurb: 'Follow a creator across every platform and read it all as one story, with links back to every post.',
    cta: '',
    href: '',
    accent: '#ff7a59',
    screen: 'stories',
    status: 'Personal tool',
    hook: 'A creator’s whole week, in one place.',
    itch:
      'Keeping up with one creator meant X for the take, YouTube for the long version and Reddit for the argument. By the time I had pieced it together, I had lost the thread. I wanted something that did the piecing for me.',
    before: { label: 'Six apps', points: ['X for the hot take', 'YouTube for the long version', 'Reddit for the argument', 'Three more apps for the rest'] },
    after: { label: 'One story', points: ['Every post in one readable story', 'Each line linked to where it came from', 'A verdict for each platform'] },
    inside: {
      title: 'threadline / creator',
      spots: [
        { x: 9, y: 9, title: 'One creator, six platforms', text: 'Pick who to follow once. It watches X, YouTube, LinkedIn, Instagram, TikTok and Reddit for you.' },
        { x: 52, y: 50, title: 'Every line has a source', text: 'Small badges link each line back to the original post, so you can check it yourself.' },
        { x: 95, y: 13, title: 'A verdict per platform', text: 'See how the same take landed in each place. Loved on one, argued with on another.' },
      ],
    },
    steps: [
      { title: 'Follow', text: 'Pick a creator. Threadline finds them across six platforms.' },
      { title: 'Stitch', text: 'Their posts and the comments around them are joined, in order, into one story.' },
      { title: 'Read', text: 'You get the story with a source on every line and a verdict for each platform.' },
    ],
    calls: [
      { call: 'Built for me, not for sale', why: 'It solves my own problem. No pricing, no sign-ups, no roadmap to please anyone else.' },
      { call: 'Sources over summaries', why: 'A summary I can’t check is useless to me, so every line points back to the post it came from.' },
    ],
    stats: [
      { value: '6', label: 'platforms followed' },
      { value: '1', label: 'user (me)' },
    ],
    milestones: [
      { when: 'Sep 2026', what: 'First version working' },
      { when: 'Now', what: 'Using it to keep up with the creators I follow' },
    ],
    now: 'I use it myself to keep up with the creators I follow. It isn’t a product and I’m not selling it.',
    next: ['Better verdicts when a take gets argued with', 'A weekly digest for the creators I follow', 'Cheaper runs so it can check more often'],
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
    hook: 'Testing a trading idea should take one sentence.',
    itch:
      'Every trading idea I had for Indian markets meant writing another backtest by hand. Most of them never got tested because the setup took too long. I wanted to just type the idea and see what happens.',
    before: { label: 'Notebook', points: ['Write the backtest by hand', 'Wire up data for every idea', 'Most ideas never get tested'] },
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
      { call: 'Its own app instead of a ChatGPT plug-in', why: 'An installable app with its own notes stream keeps every study’s context in one place.' },
      { call: 'Kept light on data', why: 'Kite API calls add up, so it favours index-level strategies over huge stock lists.' },
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
    now: 'Right now it is paper-trading a weekly Nifty iron condor. I built it for myself, it’s not a product.',
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
    hook: 'AI product stuff, from someone who’s been the engineer and the PM.',
    itch:
      'Most of what I watch on AI products is made by engineers or by PMs, rarely by someone who’s done both. I have, so that’s the channel: how AI products actually get built, explained for PMs by someone who used to write the code.',
    before: { label: 'Two camps', points: ['Engineers talk models and metrics', 'PMs talk users and roadmaps', 'Nobody translates'] },
    after: { label: 'Both sides', points: ['Engineering ideas, explained for PMs', 'Examples from real product work', 'Long enough to go deep'] },
    inside: {
      title: 'The Channel · Episode 1',
      spots: [
        { x: 59, y: 11, title: 'Long-form', text: 'Episodes run long enough to actually explain things, as video and as a podcast.' },
        { x: 30, y: 80, title: 'First up: evals', text: '“Evals explained for PMs by an ex-engineer”, in the works now.' },
        { x: 95, y: 13, title: 'One idea per episode', text: 'Each episode takes one engineering idea PMs keep running into and makes it usable.' },
      ],
    },
    steps: [
      { title: 'Pick one idea', text: 'One engineering idea that PMs keep running into.' },
      { title: 'Show it', text: 'Explain it with a real example.' },
      { title: 'Ship it', text: 'Out as a long-form video and a podcast episode.' },
    ],
    calls: [
      { call: 'Long videos over shorts', why: 'Long video and podcast is the format I can actually keep up every week.' },
      { call: 'No ads, no sponsors', why: 'I’m not doing this for money. I just want to share what I’m learning.' },
      { call: 'Scrapped the first example', why: 'The first example I built for the evals episode didn’t feel real enough, so I dropped it. Still looking for the right one.' },
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
const web = (src: string): Shot => ({ src: `/shots/${src}.avif`, kind: 'web' })
const app = (src: string): Shot => ({ src: `/shots/${src}.avif`, kind: 'app' })
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
