// ─────────────────────────────────────────────────────
//  CMS, edit this file to update all content
//  Structure matches Tony Jin Google Photos case study depth
// ─────────────────────────────────────────────────────

export type Metric = {
  value: string
  label: string
  context: string
}

export type Principle = {
  label: string
  description: string
}

export type Change = {
  label: string
  description: string
}

// Tony Jin's "Functions in Use" style panels
export type ShowcasePanel = {
  number: string       // "01", "02", "03"
  title: string        // "Browsing Past Photos"
  subtitle: string     // "With Photo Groups, find your best memories more quickly."
  body: string
  image?: string
  video?: string       // mp4 path — overrides image if set
}

// Tony Jin's Design Alternatives with pros/cons
export type DesignAlternative = {
  number: string
  title: string
  description: string
  pros: string[]
  cons: string[]
  image?: string
  video?: string             // mp4 path — overrides image if set
  decision?: 'rejected' | 'chosen'   // shows REJECTED/CHOSEN badge per Allstate deck slide 05 + 11
}

// "Beyond the Home Screen" flows — each with its own UI image
export type BeyondFlow = {
  number: string        // "01", "02", "03"
  category: string      // "ARTICLE DETAIL VIEW"
  title: string         // Short title for the flow
  problem: string       // 1 sentence
  decision: string      // 1-2 sentences
  outcome: string       // 1 sentence
  image?: string        // path to UI image
}

// ── Usability Testing section types ──────────────────
export type UsabilityFinding = {
  number: string             // "01", "02", "03", "04"
  finding: string            // What we discovered
  evidence: string           // Specific quote or data point
  refinement: string         // What we changed in response
  refinementReason: string   // Why this fix specifically
  image?: string             // Optional before/after screenshot
}

export type UsabilityTesting = {
  round: string              // "Round 1: Figma Prototype Testing"
  context: string            // Why we tested
  participants: string       // n=22, demographic note
  method: string             // Maze prototype, 3 tasks, follow-up
  metrics: Metric[]          // Quant data from test
  findings: UsabilityFinding[]
  conclusion: string         // What this round produced, next step
  cultureNote?: string       // e.g. "First usability test in company history"
  image?: string             // Optional hero image for the section
}

// ── Prototype Spotlight section types ────────────────
export type WhyCodedItem = {
  label: string
  description: string
}

export type PrototypeVideo = {
  src: string
  caption: string
}

export type PrototypeSpotlight = {
  title: string
  subtitle: string
  body: string
  whyCoded: WhyCodedItem[]
  liveLink?: string
  liveLinkLabel?: string
  videos?: PrototypeVideo[]   // mp4 demos of key interactions
  fallbackImage?: string      // shown if videos aren't ready
}

// ── Persona section types ────────────────────────────
// Compact persona cards rendered by components/PersonaCard.tsx in a 2 or
// 3-column grid alongside the Research section.
export type Persona = {
  number: string             // "01", "02", "03"
  archetype: string          // "THE RELIABILITY-DRIVEN COMMUTER"
  name: string               // "Sarah Kim" OR "Kids, ages 8 to 15"
  meta: string               // 1 short line, e.g. "Age 29 · Daily commuter"
  quote: string              // single short quote, ideally <14 words
  quoteAttribution?: string  // optional, used when name is a group label
  image: string              // path to AI-generated portrait JPEG (rendered at top of card)
  keyNeeds: string[]         // exactly 3, ~6-10 words each, the sharpest needs
  designImplication: string  // one sentence
}

export type Project = {
  slug: string
  title: string
  description: string
  year: string
  category: string
  featured: boolean
  order: number
  coverImage: string    // 홈페이지 카드 썸네일
  heroImage?: string    // 케이스 스터디 상단 hero (없으면 coverImage 사용)
  heroImageMobile?: string
  thumbBg: string

  // Meta
  role: string
  team: string
  timeline: string
  tools: string
  impact: string

  // ── OVERVIEW (Tony Jin: Problem + Solution + 3 showcase panels) ──
  problemTitle: string
  problemBody: string
  problemPoints: string[]
  solutionTitle: string
  solutionBody: string

  // 3 showcase panels (Tony Jin's mockup + title + subtitle + body)
  showcasePanels: ShowcasePanel[]

  // ── RESEARCH (Tony Jin: Why + Domain + User Needs + Design Goals) ──
  researchWhyTitle: string
  researchWhyBody: string[]          // array of paragraphs

  researchDomainTitle: string
  researchDomainBody: string
  researchDomainInsight: string      // bold key finding

  researchUserTitle: string
  researchUserBody: string[]         // paragraphs
  researchUserFindingsTitle: string
  researchUserFindings: string[]     // bullet points
  researchQuote?: string
  researchQuoteAuthor?: string
  researchMethod: string

  researchPersonasBody: string
  personas?: Persona[]               // rich persona cards rendered below the body
  researchGoalsTitle: string
  researchGoalsBody: string

  // ── DESIGN (Tony Jin: Where + Alternatives + Feedback + Hi-Fi) ──
  designIntro: string

  // Sub-section 1: Where / Framing
  designWhereTitle: string
  designWhereBody: string[]

  // Sub-section 2: Design alternatives explored
  designAlternativesTitle: string
  designAlternativesIntro: string
  designAlternatives: DesignAlternative[]
  designAlternativesFeasibility?: string
  designAlternativesConclusion: string

  // Sub-section 3: User feedback / unexpected finding
  designFeedbackTitle: string
  designFeedbackBody: string[]

  // Sub-section 4: Final design decisions
  designDecisionsTitle: string
  designDecisionsBody: string
  strategyPrinciples: Principle[]
  strategyRejected?: string

  // Final redesign
  redesignTitle: string
  redesignBody: string
  redesignChanges: Change[]

  beforeImage?: string
  afterImage?: string
  outcomeImage?: string

  // ── USABILITY TESTING (optional, FiPet only for now) ──
  usabilityTesting?: UsabilityTesting

  // ── PROTOTYPE SPOTLIGHT (optional, FiPet only for now) ──
  prototypeSpotlight?: PrototypeSpotlight

  // ── FUTURE STEPS (Tony Jin: 3-4 sub-sections) ──
  futureStepsTitle: string
  futureSteps: Array<{
    title: string
    body: string[]
  }>

  // ── WHAT I LEARNED / REFLECTION ──
  reflectionTitle: string
  reflections: Array<{
    title: string
    body: string
  }>

  // ── OUTCOME ──
  impactTitle: string
  impactBody: string
  impactMethod: string
  metrics: Metric[]

  // ── BEYOND THE HOME SCREEN (optional) ──
  beyondIntro?: string
  beyondFlows?: BeyondFlow[]
}

export const projects: Project[] = [
  {
    slug: "biasly",
    title: "Biasly Mobile App",
    description: "Biasly helps users understand political bias before engaging with content. The feed made that context easy to miss.",
    year: "2025",
    category: "Mobile",
    featured: true,
    order: 1,

    coverImage: "/images/biasly-cover.webp",
    heroImage: "/images/biasly-hero.webp",
    heroImageMobile: "/images/biasly-mobile-hero.webp",
    thumbBg: "#1c2340",

    role: "Product Design Intern",
    team: "PM, 2 Engineers",
    timeline: "3 months",
    tools: "Figma, Maze, Notion",
    // TODO(dean): verify 31-to-78 against session data
    impact: "Led the mobile feed redesign end-to-end. Bias recognition improved from 31% to 78%, and users identified bias 3× faster in testing.",

    // ── OVERVIEW ──────────────────────────────────────
    problemTitle: "The Problem",
    problemBody: "Casual news readers who use Biasly to stay politically informed often find themselves reacting to headlines before ever registering bias context beneath them. The bias indicator existed, but it just appeared too late. By the time users reached it, they had already formed an opinion.",
    problemPoints: [
      "Bias indicators appeared below the primary scan path and were frequently missed",
      "Text labels communicated category only, not direction or strength at a glance",
      "Large article images dominated the card, leaving bias information visually secondary",
    ],

    solutionTitle: "The Solution",
    solutionBody: "I redesigned the mobile news feed to place bias context at the top of every card, anchored before the headline. A visual spectrum replaced text labels, encoding direction and intensity at scan speed. Image size was reduced to rebalance the visual hierarchy in favor of the information the product was built to surface.",

    showcasePanels: [
      {
        number: "01",
        title: "Bias Before the Headline",
        subtitle: "Political context appears before users form an opinion.",
        body: "The redesigned card anchors bias at the top, next to the source name. Users see direction and intensity before reading a single word of the headline, shifting the moment of awareness from after-the-fact to before the first impression.",
        image: "/images/biasly-panel-1.webp",
      },
      {
        number: "02",
        title: "Instantly Read the Spectrum",
        subtitle: "Direction and intensity at a glance. No reading required.",
        body: "A left-to-right color-coded spectrum replaces the vague text label. Blue for Left, Purple for Center, Red for Right. The position and intensity of the fill communicates both direction and strength simultaneously, the way a gauge communicates data, not a label.",
        image: "/images/biasly-panel-2.jpg",
        video: "/images/biasly-panel-2.mp4",
      },
      {
        number: "03",
        title: "You Stay in Control",
        subtitle: "Tap any card to read the full article with full bias context intact.",
        body: "The article view preserves the same bias encoding at the top of the page. Users who want to read a story have full context visible throughout, not just on the feed. The system stays consistent so the encoding becomes second nature.",
        image: "/images/biasly-panel-3.webp",
      },
    ],

    // ── RESEARCH ──────────────────────────────────────
    researchWhyTitle: "Why Redesign the Feed?",
    researchWhyBody: [
      "I use Biasly myself. As a user, I noticed that I'd often read a headline, form a reaction, and only then notice the bias tag at the bottom of the card, at which point I'd already processed the content through whatever lens I brought to it. The app was designed to change my behavior, but the layout was letting me off the hook.",
      "As a designer, I wanted to understand whether this was a personal pattern or a systemic one. The product's value depends entirely on users engaging with bias context before they read. If the layout is preventing that, the app isn't delivering on its promise, regardless of how good the bias detection engine is.",
      "I approached the research with one specific question: is the problem that users don't care about bias information, or that the design isn't giving them a chance to see it in time?",
    ],

    researchDomainTitle: "Competitive Landscape",
    researchDomainBody: "I reviewed how other news apps handle political context and source labeling. AllSides and Ground News both surface bias information, but primarily at the article level, after the user has already clicked. None of the products I reviewed positioned bias metadata at the moment of feed browsing, before the headline is read.",
    researchDomainInsight: "No existing product intervenes at the moment users actually form impressions, which is during fast-scroll browsing, not after clicking into an article.",

    researchUserTitle: "Defining What Users Actually Do",
    researchUserBody: [
      "I ran 12 moderated usability sessions with participants aged 22–45 who identified as regular news readers. The task was simple: browse the feed naturally for 3 minutes, then answer questions about the bias of articles they had seen.",
      "The results were consistent: 69% of participants could not correctly identify the bias of articles they had spent time reading. When probed, almost all of them said the same thing, they hadn't noticed it. Not because they didn't care. The indicator never showed up at the right moment.",
      "I asked participants to walk me through a session using think-aloud protocol. The pattern was immediate. Every participant followed the same path: headline → image → scroll. The bias tag at the bottom was processed, when it was processed at all, as an afterthought.",
    ],
    researchUserFindingsTitle: "Key Research Findings",
    researchUserFindings: [
      "69% of participants could not identify bias on articles they had spent time reading",
      "100% of participants began scanning at the top of each card",
      "The bias label was the last element registered in card scan order",
      "When told where to look, users found the bias information immediately useful",
      "No participant voluntarily scrolled back up to re-check bias after forming an impression",
    ],
    researchQuote: "I usually just read the headline. I didn't even see the bias tag.",
    researchQuoteAuthor: "Maksym, 28, usability participant",
    researchMethod: "12 moderated sessions · 5-second exposure test · think-aloud protocol · n=12, aged 22–45",

    researchPersonasBody: "The primary user is a politically aware news reader who wants to be informed without being manipulated. They open the feed to get a fast read on the day, not to spend time evaluating each source. The anti-persona is a user who has already decided which sources to trust and has no interest in being challenged. The redesign is not for them.",

    researchGoalsTitle: "Design Goals",
    researchGoalsBody: "Based on the research, I defined three goals for the redesign: (1) make bias context visible before users read the headline, (2) encode bias visually so it registers without requiring active reading, and (3) maintain the speed and scannability of the feed so the change doesn't create friction.",

    // ── DESIGN ────────────────────────────────────────
    designIntro: "The further I got into the research, the more it stopped feeling like a visibility problem. It wasn't that users couldn't see the indicator. It was that they saw it in the wrong order. That's when it clicked, the fix wasn't making the indicator bigger or bolder. It was when it showed up that mattered.",

    designWhereTitle: "Where Should the Change Happen?",
    designWhereBody: [
      "My first instinct was to move the bias tag higher on the card. But before committing to that, I asked whether the feed was the right surface at all. Could the problem be addressed through onboarding, article pages, or a dedicated bias dashboard instead?",
      "I went back to the session recordings. Users who engaged most with bias information did so during feed browsing, not after clicking into articles. The feed is where impressions are formed and decisions are made about what to read. That's the intervention point. Changing any other surface leaves the core behavior untouched.",
      "So the feed was the right place. The question was how much to change.",
    ],

    designAlternativesTitle: "Design Alternatives",
    designAlternativesIntro: "I explored three structural approaches to surfacing bias earlier in the scan path. Each made a different trade-off between visibility, disruption to existing patterns, and technical complexity.",
    designAlternativesFeasibility: "I had access to the PM and two engineers for feedback on feasibility. The main technical constraint: any overlay or animation approach would require client-side state tracking that added complexity. A static position change, moving the bias element to the card header, was the cleanest implementation path and the most reliable behavior across scroll speeds.",
    designAlternatives: [
      {
        number: "01",
        title: "Floating overlay on scroll pause",
        description: "A bias badge appears when the user pauses scrolling over a card, overlaid on the image.",
        pros: ["No layout change required", "Preserves existing card hierarchy"],
        cons: ["Dismissed as an ad within 1 second in every test session", "Conditional visibility means users who scroll at constant speed never see it", "Overlays can be trained out, structural position cannot"],
        image: "/images/biasly-alt-1.jpg",
        video: "/images/biasly-alt-1.mp4",
      },
      {
        number: "02",
        title: "Bias bar below headline",
        description: "A thin color bar replaces the text label, positioned between the headline and the article body text.",
        pros: ["Visual encoding improves on text label", "Lower disruption to card layout"],
        cons: ["Still below the headline, users form impressions before reaching it", "Thin bar is easy to overlook during fast scrolling", "Does not solve the sequence problem"],
        image: "/images/biasly-alt-2.webp",
      },
      {
        number: "03",
        title: "Bias anchored to card header",
        description: "Bias pill and spectrum bar move to the top of the card, adjacent to the source name, before the headline.",
        pros: ["Appears before the headline in every scan sequence", "Cannot be skipped without seeing it", "Consistent position across all cards builds pattern recognition"],
        cons: ["Requires image size reduction to maintain visual balance", "More layout change than the other options"],
        image: "/images/biasly-alt-3.webp",
      },
    ],
    designAlternativesConclusion: "I developed Alternative 03 further. The floating overlay and the below-headline bar both left the core sequence problem unsolved, they were just moving the label to a marginally better position. Moving bias to the header was the only option that structurally guaranteed it would be seen before the headline.",

    designFeedbackTitle: "An Unexpected Feedback Pattern",
    designFeedbackBody: [
      "When I showed the header-positioned prototype to users, one piece of feedback surprised me. Two participants said they found the bias label distracting when it appeared before the headline for topics they already had strong opinions on. They didn't want to know the source's political leaning before deciding whether to read, they wanted to evaluate the headline first.",
      "That was something I hadn't anticipated. The design I was building to increase bias awareness was creating friction for users who were already politically engaged. I had to decide: is the product for users who want to be more aware, or for users who already are?",
      "I brought this back to the PM. The product's positioning is squarely around helping users become more aware of bias, not serving users who are already expert at it. The header position stays. But the finding influenced the onboarding copy, which now sets clearer expectations about how the feed works.",
    ],

    designDecisionsTitle: "Key Design Decisions",
    designDecisionsBody: "I changed the order of what users see first. Everything else followed from that. Three decisions shaped how that played out in practice.",
    strategyPrinciples: [
      {
        label: "Move bias into the scan path",
        description: "Bias information was placed at the top of the card, where users naturally begin scanning. This is not about visual preference, it is about sequence. If bias appears after the headline, users have already formed their first impression. The only way to change that is to intervene before it happens.",
      },
      {
        label: "Encode information visually",
        description: "A left-to-right spectrum communicates direction and intensity simultaneously without requiring the user to read and interpret text. At scroll speed, the difference between a text label and a visual encoding determines whether the information registers at all.",
      },
      {
        label: "Rebalance visual hierarchy",
        description: "Images were scaled from full-width banners to constrained thumbnails. This was not an aesthetic decision, it was the only way to give bias information enough visual weight to compete for attention when a large image is also present. The image reduction and the bias elevation are the same decision.",
      },
    ],
    strategyRejected: "I explored a floating overlay that appeared when users paused on a card. It was dismissed as an ad within one second in every test session. Users have been trained to ignore overlays. Structural position cannot be ignored the same way. The overlay direction was abandoned after three test sessions confirmed the pattern.",

    redesignTitle: "The Redesign",
    redesignBody: "The redesigned feed makes one structural change: bias shows up before users even start reading the headline. Every other decision supports that.",
    redesignChanges: [
      {
        label: "Bias moved into the header",
        description: "The bias pill was relocated from the bottom of the card to the header, positioned next to the source name. It is now the first element visible before the eye reaches the headline, restructuring the scan sequence rather than just repositioning a label.",
      },
      {
        label: "Spectrum replaces text label",
        description: "A color-coded left-to-right scale replaced the text label. Blue for Left, Purple for Center, Red for Right. The spectrum encodes direction and intensity simultaneously, without requiring the user to parse a text string. It works at scan speed.",
      },
      {
        label: "Images reduced to thumbnails",
        description: "Article images were scaled from full-width banners to constrained thumbnails. This gives bias data enough visual weight to register. The image reduction and the bias elevation are the same decision, a hierarchy rebalance.",
      },
      {
        label: "Consistent encoding across surfaces",
        description: "The same color encoding was applied to the article view and all detail surfaces. Once learned on the feed, the system requires no re-interpretation on any other surface. Consistency reduces cognitive load over time.",
      },
    ],

    beforeImage: "/images/biasly-before.webp",
    afterImage: "/images/biasly-after.webp",
    outcomeImage: "/images/biasly-outcome.webp",


    // ── FUTURE STEPS ──────────────────────────────────
    futureStepsTitle: "Future Steps",
    futureSteps: [
      {
        title: "Onboarding the Color System",
        body: [
          "The spectrum bar assumes users understand that blue represents Left and red represents Right in the US political context. That assumption is not universal, it depends on familiarity with American political color coding, which is not shared globally and is relatively recent even domestically.",
          "If I returned to this project, I would design a single annotated card that appears on first use, not a tutorial, just one card with labels explaining the spectrum. That one touchpoint would calibrate expectations without creating meaningful friction. I would test whether users who received this onboarding card demonstrated higher bias recognition accuracy in the first session.",
        ],
      },
      {
        title: "Evaluating Behavioral Change Over Time",
        body: [
          "The usability testing I ran measured recognition accuracy in a controlled session. What I couldn't measure was whether the redesign actually changed reading behavior over time, whether users who browsed the redesigned feed were more likely to notice bias before forming opinions in their daily news consumption.",
          "A longer-term study tracking reading behavior across sessions would answer this. Are users clicking into articles from sources with opposing bias more often? Are they flagging bias less (suggesting the indicator is doing its job) or more (suggesting increased engagement)? These longitudinal signals would tell me whether the redesign achieved its actual goal.",
        ],
      },
      {
        title: "Extending the System to the Article View",
        body: [
          "The redesign currently applies to the feed card only. The article view still uses a smaller, text-based bias indicator. Extending the spectrum encoding to the article header, keeping the same visual language throughout the reading experience, would reinforce the system and maintain context as users move from scanning to reading.",
        ],
      },
    ],

    // ── REFLECTION ────────────────────────────────────
    reflectionTitle: "What I Learned",
    reflections: [
      {
        title: "Structural changes are harder to advocate for than visual ones",
        body: "Moving the bias indicator from the bottom to the top of the card sounds like a small change. In practice, it required renegotiating the entire visual hierarchy of the card, which affected image treatment, source name positioning, and the overall balance of the design. Every stakeholder I showed it to had a reaction to the image reduction before they noticed the bias placement change. Advocating for a structural change means being prepared to defend every downstream consequence of it.",
      },
      {
        title: "The unexpected finding was the most valuable output",
        body: "The feedback from politically engaged users who found the upfront bias labeling distracting was more useful than the confirming data. It clarified who the product is actually for and influenced decisions beyond the feed redesign. The most important research outputs are often the ones that challenge the design direction, not the ones that confirm it.",
      },
    ],

    // ── OUTCOME ───────────────────────────────────────
    impactTitle: "Outcome",
    impactBody: "Post-redesign sessions used the same participants, same task, same duration. One variable: the layout. Users were now seeing bias before they reacted to the headline, and it showed in the numbers. The shift was not marginal. After handoff and QA, a version based on this design is rolling out with team refinements.",
    impactMethod: "12 sessions · matched profile · 3-min exposure · 5-article recall · observer-coded",
    metrics: [
      { value: "3×", label: "Faster recognition", context: "9s → 3s median time-to-identify (n=12)" },
      // TODO(dean): verify 31-to-78 against session data (renders in both the case hero and the outcome section)
      { value: "78%", label: "Accuracy", context: "Up from 31%, same task, different layout (n=12)" },
      { value: "60%", label: "Drop in missed indicators", context: "Observer-coded overlooked bias data (n=12)" },
    ],
  },

  {
    slug: "fipet",
    title: "FiPet",
    description: "FiPet shipped to the App Store without a single usability test. I led the redesign around a new 1v1 Quiz Battle feature, established a design system the whole team adopted, and ran the company's first usability test.",
    year: "2026",
    category: "Mobile",
    featured: true,
    order: 2,

    coverImage: "/images/fipet-cover.webp",
    heroImage: "/images/fipet-hero.webp",
    heroImageMobile: "/images/fipet-mobile-hero.webp",
    thumbBg: "#2d1810",

    role: "UI/UX Intern, Lead on Quiz Battle",
    team: "1 PM, 2 other designers, 10 engineers",
    timeline: "Jan – May 2026",
    tools: "Figma, Maze, Claude Code",
    impact: "Led design end-to-end for the 1v1 Quiz Battle feature on a 13-person team. Established a design system the entire team adopted for a broader app redesign. Introduced usability testing as a default practice, the first in company history.",

    // ── OVERVIEW ──────────────────────────────────────
    problemTitle: "The Problem",
    problemBody: "FiPet shipped to the App Store with no usability testing. Few downloads. Poor reviews. Users weren't coming back. The original design was too complex for the 8–15 audience it was built for, heavy gradients, ambiguous icons, a flow no one could follow on the first try. No one described the app as fun. The team had built a financial literacy product for kids and shipped it the way you'd ship enterprise software.",
    problemPoints: [
      "Heavy gradients and visual complexity that didn't fit a kids' app",
      "Ambiguous custom icons users had to guess at",
      "Confusing flow, users didn't know what to do next on first open",
      "No fun factor, one interview participant described it as homework",
    ],

    solutionTitle: "The Solution",
    solutionBody: "I led the redesign around a new feature the team aligned on in a company-wide meeting: 1v1 Quiz Battle. Sixty-second matches against a friend, competitive framing, learning happens inside play rather than before it. I built a design system around a single primary color (#FF8C2E), Inter typography, SVG line icons, and an 8pt grid, and the entire team adopted it for a broader app redesign beyond my feature. And I introduced usability testing as a default practice. The original ship had skipped it. This one didn't.",

    showcasePanels: [
      {
        number: "01",
        title: "A Reason to Open the App",
        subtitle: "The home screen leads with a pending battle, not a menu.",
        body: "The original FiPet opened to a lesson list, the default of an app built around content. The redesign opens to a Quick Battle card: challenge a friend to a 1v1 quiz in 60 seconds. Below it sits a win streak counter, friends online, and a leaderboard. The screen answers 'why am I here?' before the user has to ask. Coming back becomes the natural action, not the disciplined one.",
        video: "/images/fipet-panel-1.mp4",
      },
      {
        number: "02",
        title: "Learning Inside the Play",
        subtitle: "Five questions, twelve seconds each, reveal between every round.",
        body: "Each battle runs five questions on a twelve-second timer per round. The reveal screen shows both players' answers side by side with a Referee Owl commenting on the round. Learning isn't a separate screen users opt into, it's what happens between answer taps. The pacing matches what tested well for 8–15 year olds: short bursts, visible competition, immediate feedback. Speed without slowness, structure without lecture.",
        video: "/images/fipet-panel-2.mp4",
      },
      {
        number: "03",
        title: "Play Again, Not Buy with Coins",
        subtitle: "The post-win moment protects momentum instead of converting it.",
        body: "When users win, the primary CTA is 'Play Again', not 'Buy with earned coins'. This was the call where I pushed back hardest against the PM. The argument I built was grounded in Flow Theory and research on children's sensitivity to flow interruption: the moment right after winning is the worst possible moment to send a kid into a shop. Round 1 testing later validated the call. Ninety percent of participants said they'd play again.",
        image: "/images/fipet-panel-3.webp",
      },
    ],

    // ── RESEARCH ──────────────────────────────────────
    researchWhyTitle: "Why Redesign Now",
    researchWhyBody: [
      "FiPet had already shipped to the App Store, which was the central fact I came into. The decision had been made to launch without usability testing, and the result was visible in every available signal: App Store reviews kept flagging the same handful of problems, downloads were slow, retention was poor. The team had built a financial literacy app for kids and shipped it without verifying that the kids could actually use it.",
      "The brief I was given was to redesign the experience around a new 1v1 Quiz Battle feature that the team had aligned on in a company-wide meeting. But before designing anything new, I wanted to understand what was wrong with the current product. App Store reviews told part of the story. I needed to hear from real users to get the rest.",
      "I ran 10 user interviews with parents and kids, intercepted in public spaces over the course of a week, audited App Store feedback, and did a competitive audit of how other kids' apps handled engagement. The interviews kept circling the same insight: the product wasn't failing because the content was bad. It was failing because nothing about the experience around the content was built for kids.",
    ],

    researchDomainTitle: "What Other Kids' Apps Get Right",
    researchDomainBody: "Apps that hold 8–15 year olds, Duolingo, Roblox, even Khan Kids, share a pattern: short sessions, visible progress, and a clear reason to come back. None of them lead with content. They lead with a hook. FiPet had content. It didn't have a hook. The original home screen treated kids like adult learners with a curriculum to complete, which is the opposite of how kids actually use their phones.",
    researchDomainInsight: "Apps that succeed with 8–15 year olds make a habit before they make a curriculum.",

    researchUserTitle: "What the Interviews Surfaced",
    researchUserBody: [
      "Across the 10 interviews, the most consistent feedback wasn't about the financial content. It was about the experience wrapping it. Parents described the app as 'too much', visually overwhelming for their kids. One participant compared it to a textbook. Another said it felt like homework, which was exactly the frame the product was trying to avoid.",
      "I ran the interviews in my first week at the company. Public intercepts in coffee shops, parks, and on the street, ten participants, parents alongside their kids, so I could observe how kids actually approached the app and how parents read what they were seeing. A formal focus group would have been better. Setting one up wasn't realistic in the time available. The pattern was unambiguous: kids opened the app once, weren't sure what to do, and didn't come back. The drop-off was at the moment of confusion, not at the moment of disengagement with financial content. Most kids never got far enough to be bored by the curriculum.",
      "The design system was a significant part of the problem. Heavy gradients, mixed custom icons, and inconsistent type made the interface hard to parse before users could even engage with the content. A 10-year-old shouldn't have to decode the UI before they can learn about a budget.",
    ],
    researchUserFindingsTitle: "Key Research Findings",
    researchUserFindings: [
      "10 of 10 interview participants described the original FiPet as visually complex or overwhelming",
      "Parents reported their kids opened the app once and did not return",
      "App Store reviews repeated the same handful of issues: confusing flow, ambiguous icons, no fun factor",
      "Competitive audit showed every successful kids' app led with a hook, not a curriculum",
      "Industry research (Commonwealth Bank / Kit, 2023) found 78% of parents say gamification improves their kids' financial capability, supporting the team's instinct that competitive framing could work",
    ],
    researchQuote: "It feels like homework. I don't expect my kids to play and learn through this app.",
    researchQuoteAuthor: "Interview participant, age 35",
    researchMethod: "10 user interviews · App Store review analysis · competitive audit (Duolingo, Khan Kids, Greenlight)",

    researchPersonasBody: "Two groups shaped the design, and both got interviewed in the same session. The kids are the users. The parents are the decision-makers, the ones who install the app, watch their kid use it, and decide whether it stays on the phone. The redesign had to land for both, and the failure modes for each were different.",
    personas: [
      {
        number: "01",
        archetype: "THE OVERWHELMED KID",
        name: "Kids, ages 8 to 15",
        meta: "First-time users · Public intercepts",
        quote: "It's so confusing. I don't even know what this app is for.",
        quoteAttribution: "— kid, intercepted in a public space",
        image: "/images/persona-kid.webp",
        keyNeeds: [
          "Something to tap within the first ten seconds",
          "A clear signal that this isn't homework",
          "One consistent visual language, not five",
        ],
        designImplication: "Rebuild the visual layer first. No new feature can be tested honestly until the product reads as a single system.",
      },
      {
        number: "02",
        archetype: "THE SKEPTICAL PARENT",
        name: "Parents of kids 8 to 15",
        meta: "Decision-makers · Interviewed with their kid",
        quote: "It's too overwhelming. I don't even know where to tap first.",
        quoteAttribution: "— parent, watching their child use the app",
        image: "/images/persona-parent.webp",
        keyNeeds: [
          "Visible proof their kid is engaged, not bored",
          "Something polished enough to justify keeping",
          "A first interaction that produces a 'fun' moment",
        ],
        designImplication: "Design the first interaction to produce a 'this is fun for my kid' signal within seconds, not after onboarding.",
      },
    ],

    researchGoalsTitle: "Design Goals",
    researchGoalsBody: "Three goals shaped the design phase, and I kept them visible in every working session: (1) establish a clean design system the whole team could use for the broader redesign, not just my feature; (2) design 30 hi-fi screens for the 1v1 Quiz Battle feature on an 8pt grid; (3) introduce usability testing as a practice so future decisions came from evidence, not gut feeling. The third goal was the one no one had asked for. It ended up mattering the most.",

    // ── DESIGN ────────────────────────────────────────
    designIntro: "The design phase had one constraint that shaped everything: 1v1 Quiz Battle had already been chosen as the feature. My job wasn't to invent it, it was to figure out the experience around it. That meant the design alternatives weren't about whether to ship a quiz battle. They were about how the home screen and battle loop framed it, and what made users want to come back. I explored two directions before the chosen one, and both got rejected for the same underlying reason.",

    designWhereTitle: "Where the Real Problem Was",
    designWhereBody: [
      "My first instinct was to redesign the lessons themselves, shorter modules, more visuals, gamification inside each one. The interviews kept pointing somewhere else. Kids weren't dropping off in the middle of a lesson. They were dropping off before the lesson started. The intervention point wasn't inside the curriculum. It was the home screen, and whether it answered the question of why anyone should open the app on day two.",
      "So the design work focused on the loop, not the content. What does the user see first? What happens in the first 60 seconds? What makes them come back tomorrow? Every screen had to earn its place inside that question.",
    ],

    designAlternativesTitle: "Two Directions Rejected",
    designAlternativesIntro: "I explored three directions for the home screen, each built around a different theory of what would make Gen Z and Gen Alpha return to a financial literacy app. Two got rejected. The reasons matter as much as the result.",

    designAlternativesFeasibility: "I scoped feasibility with the PM and the 10-person engineering team early. Multiplayer infrastructure was the biggest unknown, achievable in the timeline but expensive enough that the chosen direction had to justify the investment. The other two directions were both lower-effort to ship, which raised the bar for choosing the third, not lowered it.",

    designAlternatives: [
      {
        number: "01",
        title: "Daily lesson with streak",
        description: "A Duolingo-style daily lesson with a visible streak counter on the home screen. Familiar pattern, low engineering effort.",
        pros: [
          "Familiar pattern, low effort entry",
          "Clear learning progression visible at a glance",
          "Streak is a proven retention mechanic in adjacent products",
        ],
        cons: [
          "Still solo, no social hook for an audience that lives socially",
          "Streak alone wasn't enough for users who were already disengaged",
          "No reason to open the app beyond self-discipline, which isn't an 8–15 year old strength",
        ],
        image: "/images/fipet-alt-1.webp",
        decision: "rejected",
      },
      {
        number: "02",
        title: "Social feed of friend activity",
        description: "A home screen feed showing what friends are learning and earning, badges, streaks, level-ups. Passive social presence instead of active engagement.",
        pros: [
          "Introduces social presence, which interviews said users wanted",
          "Peer visibility creates curiosity around what friends are doing",
          "Low commitment, browsable without forcing an action",
        ],
        cons: [
          "Too passive, no clear action to take",
          "Users in concept tests said it looked like another Instagram",
          "Hard to populate with meaningful content early on when the network is sparse",
        ],
        image: "/images/fipet-alt-2.webp",
        decision: "rejected",
      },
      {
        number: "03",
        title: "1v1 Quiz Battle as core action",
        description: "Sixty-second quiz battles against a friend. The home screen leads with pending matches and invites. Competitive framing creates urgency to return.",
        pros: [
          "Active, social, and time-bound, all three at once",
          "Competitive framing tested strongest in concept reviews",
          "Short session matches Gen Z attention patterns",
          "Creates a real reason to open the app on day two",
        ],
        cons: [
          "Required multiplayer infrastructure, the most expensive option to ship",
          "Risks alienating users without friends on the app yet (handled with bot opponents at first)",
        ],
        image: "/images/fipet-alt-3.webp",
        decision: "chosen",
      },
    ],
    designAlternativesConclusion: "Neither rejected direction created a real reason to open the app. The Daily Lesson was familiar but solo. The Social Feed was social but passive. The 1v1 Quiz Battle was the only direction where active, social, and time-bound held at once, and the only one where learning happened inside play, not before it. That phrasing surfaced during research and ended up shaping every downstream decision.",

    designFeedbackTitle: "PM Pushback: Play Again vs. Buy with Coins",
    designFeedbackBody: [
      "The hardest disagreement on this project happened after the chosen direction was locked. The Result screen, what users see right after winning a battle, became a real argument about who the product was for and what moment we were designing for.",
      "The PM's position was 'Buy with earned coins' as the primary CTA. The logic was reasonable: users had just earned coins, conversion would never be higher, and a clear path to the shop reinforces the in-app economy. From a product perspective, this is exactly what you would build for a transactional adult user.",
      "My pushback was about who the user actually was. 8–15 year olds aren't transactional. They're momentum-driven. The moment after winning a battle is an emotional high, competitive satisfaction, social proof, the visceral 'I want to do that again' feeling. Sending a kid to a shop in that exact moment interrupts the feedback loop the game was built to create. The shop should be reachable, not pushed.",
      "I backed the position with three specific things: Flow Theory (Csikszentmihalyi, 1990) on the cost of interrupting peak engagement; a 2020 study (PMC) showing children are more sensitive to flow interruption than adults; and the 2023 Commonwealth Bank / Kit study showing 78% of parents say gamification improves their kids' financial capability, which means the metric that matters is habit formation, not transactions per session. The PM agreed. 'Play Again' became the primary CTA, with the shop accessible but not the primary path.",
      "Round 1 usability testing later validated this. Ninety percent of participants said they'd play again. That number is what I'd point to if anyone ever revisited the call.",
    ],

    designDecisionsTitle: "Key Design Decisions",
    designDecisionsBody: "Four decisions held the design together. Each came from a different source, some from interviews, some from heuristics, one from a research-backed argument with the PM. They all earned their place.",
    strategyPrinciples: [
      {
        label: "Visual simplification for a kids' audience",
        description: "Interviews kept describing the original design as 'too much' for kids. I replaced the multi-color gradient palette with a flat cream background and a single orange accent (#FF8C2E). The interface had to be parseable by an 8-year-old before they could engage with the content. Visual complexity wasn't decoration, it was a barrier to entry.",
      },
      {
        label: "Familiar UI conventions over visual novelty",
        description: "The original app used custom icons users had to guess at. I replaced them with standard SVG line icons familiar from everyday mobile experiences. Clarity over novelty. A kid who already knows what a shopping cart icon means shouldn't have to learn a new symbol for the same thing.",
      },
      {
        label: "Protect post-win emotional momentum",
        description: "Backed by Flow Theory and research on children's sensitivity to flow interruption. I argued the post-win moment should preserve momentum, not interrupt it with commerce. The PM initially wanted commerce-first; the team adopted my proposal after the research-backed pushback. Round 1 testing later validated: 90% would play again.",
      },
      {
        label: "Build a system, not just a screen",
        description: "My tokens, #FF8C2E orange, Inter, 8pt grid, SVG icons, became the foundation for a broader app redesign beyond the Quiz Battle feature. Other designers used the same system for the screens they owned. The impact scaled past my feature, which turned out to be one of the more useful outcomes of the project.",
      },
    ],
    strategyRejected: "I initially prototyped a Lottie-based celebration on every correct answer, more energy, more fun. Once it was in the flow, the pacing got worse, not better: the animation broke the quick-question rhythm and added friction to a loop that was supposed to feel fast. I cut it down to a subtle scale-up on the Referee Owl and a color flash on the correct answer. The lesson: in a fast quiz loop, more motion isn't more engagement. It's more interruption.",

    redesignTitle: "What Shipped to Prototype",
    redesignBody: "The final hi-fi prototype was 30 screens at 402×874, built on an 8pt grid, with Boolean variables driving state changes (the Done button is gray when disabled, orange when an answer is selected). The system extended past the Quiz Battle: other designers adopted it for the rest of the app redesign.",
    redesignChanges: [
      {
        label: "Single primary color: #FF8C2E",
        description: "I reduced the multi-color palette to a single orange accent on a flat cream background. The original gradient-heavy palette had created visual noise that made the interface harder to parse, especially for the 8–15 audience who shouldn't have to decode the UI before learning about money. One accent color, applied consistently, gave the system an identity and gave kids fewer things to process at once.",
      },
      {
        label: "SVG line icons familiar from mobile",
        description: "The original app had custom icons whose meaning users had to guess at, plus emojis that rendered inconsistently across iOS and Android. I replaced both with standard SVG line icons from common mobile patterns. Clarity over novelty. The cross-platform rendering issue resolved itself once the icons standardized, an engineering complaint that fixed itself.",
      },
      {
        label: "Inter throughout, migrated from Nunito",
        description: "The original system used Nunito, which had weight inconsistencies at the small sizes our 14 base screens required. I migrated to Inter, which solved the consistency problem and gave the system a more neutral foundation. This was a legibility decision, not a brand decision. Kids need the type to recede so the content lands.",
      },
      {
        label: "Quick Battle card as the primary home action",
        description: "The original home screen led with a lesson list. The redesign leads with a Quick Battle card, challenge a friend now, win streak counter below it, friends online below that. The primary action on the home screen is the action we actually want users to take. That alignment between visual hierarchy and behavioral intent was what was missing in the original.",
      },
    ],

    beforeImage: "/images/fipet-before.webp",
    afterImage: "/images/fipet-after.webp",
    outcomeImage: "/images/fipet-outcome.webp",

    // ── USABILITY TESTING (Round 1) ───────────────────
    usabilityTesting: {
      round: "Round 1 — Figma Prototype Testing",
      context: "FiPet had shipped without a single usability test, which was the original problem. After designing the 1v1 Quiz Battle feature, the question wasn't whether to test. It was how fast we could get evidence before shipping the next iteration. I built the test plan in Maze, ran it against the hi-fi Figma prototype, and made it the first usability test in the company's history.",
      participants: "22 participants completed the core task flow; 10 completed the post-task opinion scales (33 total responses across all tasks and follow-ups). Recruited as adults briefed as proxies for the 8–15 target audience, direct child testing required parental consent infrastructure we didn't have yet, so adults walked through the task flows imagining they were the target age. 97% of participants were aged 16 or older.",
      method: "Maze prototype test with three core tasks: start a quiz battle, answer a question, complete all five questions. Each task surfaced a different layer of friction. Open-ended follow-up questions captured the reasoning behind specific moments of confusion or surprise. Three task flows, fourteen blocks total.",
      metrics: [
        { value: "100%", label: "Task success", context: "All participants completed the core flow (n=22)" },
        { value: "4.2/5", label: "Fun rating", context: "Average on the post-task opinion scale (n=10)" },
        { value: "90%", label: "Would play again", context: "9 of 10 said yes, validated the Play Again CTA call (n=10)" },
        { value: "0%", label: "Drop-off", context: "No participants abandoned mid-task on any of the three tasks (n=22)" },
      ],
      findings: [
        {
          number: "01",
          finding: "Start button below the fold caused a 65.9% misclick rate on the first task",
          evidence: "22 participants tried to start a battle. 65.9% misclicked at least once before finding the right action. One participant put it plainly: \"I didn't realize the start button was under the page, so I confused that as a buffer.\" Average task duration was 228 seconds, slow for what should have been an obvious entry point.",
          refinement: "Repositioned the Start button above the fold in the V2 prototype, with a visible hint that it was the primary action.",
          refinementReason: "A 65.9% misclick rate isn't a discoverability nudge, it's the design failing. The fix had to be structural, not visual. Moving the button above the fold was the only change that addressed the cause rather than the symptom.",
        },
        {
          number: "02",
          finding: "The auto-transition between questions felt too fast",
          evidence: "Multiple participants flagged this directly. \"It just turned to the next page too fast, so I'd say I need more time to read.\" Another participant was actively startled by the speed: \"A new window suddenly popped up. I was expecting to move on to solving the next problem.\" Speed wasn't reading as engagement, it was reading as disorientation.",
          refinement: "Added a 1.5-second delay between the answer reveal and the next question, giving users time to process the result before the next round started.",
          refinementReason: "8–15 year olds aren't speed-readers. The original pacing matched what felt right to me as a designer, not what worked for the target audience. Speed isn't engagement at this age, comprehension is.",
        },
        {
          number: "03",
          finding: "The rival felt absent. The battle played like a solo quiz with a score at the end.",
          evidence: "Direct participant quote: \"It'd be nice to see what the rival responded and whether or not they answered correctly. Would make it feel like more of a quiz battle, rather than a quiz where you just find out your score at the end.\" In the favorite-element question, only 20% chose \"Competing against a rival\", the lowest of three options, behind \"Seeing if I got the answer right\" (50%) and \"Learning about money\" (30%).",
          refinement: "Added the rival's answer visible alongside the user's on the reveal screen, plus a \"rival is choosing their answer\" waiting state during their turn so the back-and-forth was visible in real time.",
          refinementReason: "The feature was named 1v1 Quiz Battle, but it played like a single-player quiz with a score comparison. The competitive tension had to be visible during the play, not just in the result. Naming a feature 1v1 isn't enough if the experience is functionally solo.",
        },
        {
          number: "04",
          finding: "Question text alone was hard for the target age to comprehend",
          evidence: "Multiple participants asked for visual support. \"Add images next to the question for better understanding.\" \"Children might be confused with words.\" Another: \"Maybe simple drawings? Cause it will be easier to understand by short memory than reading it.\" The pattern wasn't a stylistic preference, it was a comprehension request.",
          refinement: "Added a small illustration alongside each question, themed to the question's financial concept.",
          refinementReason: "Reading load is a different problem for 8–15 year olds than for adults. The question screen had to communicate the concept before it had to be read. The illustration carries half of that load and lets the text focus on the specific question.",
        },
        {
          number: '05',
          finding: 'Round 1 participants wanted reward variability beyond winning the match',
          evidence: '3 users quoted that they wanted more gamification elements and more dynamic reward layers throughout the quizzes to entertain the users',
          refinement: 'Added three Round 2 mechanics: a combo system (chaining correct answers triggers a streak multiplier on points), a mystery box reveal after each battle (variable reward instead of a fixed coin payout), and a daily missions track that funnels into the same mystery box reward on full completion.',
          refinementReason: 'Variable reward schedules sustain the "one more game" loop without forcing transactions, which extends the Play Again primary CTA decision from earlier. The mystery box becomes reachable through two parallel paths — in-session (post-battle) and cross-session (daily missions) — so the same reward anchors both immediate replay and next-day return. The Round 2 coded prototype tests whether this multi-path structure raises retention over Round 1 baseline.',
        },
      ],
      conclusion: "Round 1 validated the macro design (90% would play again, 4.2/5 fun rating, 100% task success on the core flow) and surfaced four refinements specific enough to act on. Rather than iterate on the Figma prototype, I moved the refinements into a coded React prototype. Real timer behavior, real rival turn-taking, and real answer-switching couldn't be faithfully simulated in a static prototype, and Round 1 had made it clear those exact behaviors were where the remaining unknowns lived. Round 2 is currently running on the coded build.",
      cultureNote: "This was the first usability test in the company's history. The shift mattered more than any single screen: decisions moved from gut feeling to evidence. The team adopted testing as a default practice for the features that came after.",
      image: "/images/fipet-usability-hero.jpg",
    },

    // ── PROTOTYPE SPOTLIGHT ──────────────────────────
    prototypeSpotlight: {
      title: "From Figma to Coded Prototype",
      subtitle: "Some things a static prototype couldn't validate.",
      body: "After Round 1, the obvious next step was another Figma iteration. I argued against it. The remaining unknowns, real timer behavior, live score updates, rival turn-taking, answer-switching mid-question, couldn't be tested faithfully in a static prototype. So I built the next iteration in React, deployed it to Vercel, and ran Round 2 testing against the live build. The trade-off was time. The payoff was that the validation could now reflect the real behavior, not a Figma approximation of it.",
      whyCoded: [
        {
          label: "Real 12-second timer",
          description: "Figma can mimic countdown UI but can't enforce timing. A coded prototype lets us observe what users actually do when the timer pressure is real, do they answer faster, switch answers, freeze, or rush?",
        },
        {
          label: "Live score updates after each round",
          description: "The score bar updating between rounds is part of the competitive tension. In Figma, this was a screen transition; in code, it's a state change with motion. The difference shapes whether users perceive the battle as live or scripted.",
        },
        {
          label: "Answer-switching mid-question",
          description: "Round 1 participants sometimes wanted to change their answer before the reveal. Figma's prototype mode couldn't support that. The coded version does, and Round 2 will tell us whether the option helps comprehension or creates indecision.",
        },
        {
          label: "Rival turn-taking state",
          description: "The 'rival is choosing their answer' waiting state needs real timing to feel like a 1v1, not a fake delay. The coded prototype runs the actual state machine for the turn handoff.",
        },
      ],
      liveLink: "https://fipet-quiz-battle.vercel.app/",
      liveLinkLabel: "Try the prototype",
      videos: [
        {
          src: "/videos/timer-reveal-raw.mp4",
          caption: "12-second timer + answer reveal flow",
        },
        {
          src: "/videos/turn-switching-raw.mp4",
          caption: "Rival turn-taking + answer switching",
        },
      ],
      fallbackImage: "/images/fipet-prototype-hero.jpg",
    },

    // ── FUTURE STEPS ──────────────────────────────────
    futureStepsTitle: "Future Steps",
    futureSteps: [
      {
        title: "Complete Round 2 Testing on the Coded Prototype",
        body: [
          "Round 2 is currently running. All four Round 1 refinements, Start button repositioning, 1.5s transition delay, rival visibility, question illustrations, are live in the coded build. The questions I want answered: does fixing the misclick close it to single digits? Does rival visibility actually shift the 20% 'competing against a rival' number on the favorite-element question? And does the 1.5s pacing land for the target age or feel too slow?",
          "The most valuable signal from Round 2 will be whether the behavioral evidence matches the qualitative requests from Round 1. Participants told us what they wanted. Round 2 tells us whether what they wanted actually solved the problem they were describing.",
        ],
      },
      {
        title: "Ship the MVP and Collect Real User Reviews",
        body: [
          "Usability testing answers questions a controlled task can answer. It can't answer whether users return on day three or day thirty. That's a production-data question, and the original FiPet ship had skipped both the testing and the measurement. The plan is to ship the MVP and track day-1, day-7, and day-30 return rates against the original baseline.",
          "App Store reviews are part of the measurement plan too. The original ship was hurt most by the public review feedback. The redesign should be visible in that signal first, before any internal metric moves.",
        ],
      },
      {
        title: "Integrate Gamification Effects per Engineer Feedback",
        body: [
          "Engineers proposed adding a combo system and a Mystery Box reward (both detailed in the Beyond section below). These weren't from Round 1 user findings. They came from designer- and engineer-anticipated patterns based on what makes similar games engaging. Round 2 includes both, and the test will tell us whether they materially shift the 4.2/5 fun rating, or whether they read as decorative.",
        ],
      },
      {
        title: "Track Play Again vs. Buy Engagement Post-Launch",
        body: [
          "The PM and I agreed to revisit the 'Play Again' vs. 'Buy with coins' CTA decision post-launch with real engagement data. If shop entry rate is healthy through the secondary path, the call holds. If commerce conversion craters in a way that doesn't show up in usability testing, we revisit. This was the deal that made the pushback land in the first place, I argued the call; we agreed to test it in production.",
        ],
      },
    ],

    // ── REFLECTION ────────────────────────────────────
    reflectionTitle: "What I Learned",
    reflections: [
      {
        title: "Introducing testing changed the team's culture more than any single screen",
        body: "FiPet had shipped without usability testing. Adding it wasn't a process tweak, it shifted how the team made decisions across the board. The PM stopped defending preferences with intuition; engineers stopped pushing back on UI choices with their own assumptions. Once everyone had a shared evidence base, the arguments got smaller and the work got faster. That cultural shift was probably more valuable than any specific finding the test produced.",
      },
      {
        title: "A design system is judged by adoption, not coverage",
        body: "I built the tokens for my feature, #FF8C2E orange, Inter, 8pt grid, SVG icons. The unexpected outcome was that the rest of the team adopted the same system for the broader app redesign. That happened because the system was scoped tight enough to actually use, four decisions, not forty, and because I shipped a short documentation set alongside the Figma file. A design system that's complete but unused is worse than a smaller one that ships. Adoption is the metric.",
      },
      {
        title: "Research-backed pushback works when it's specific",
        body: "The 'Play Again' vs. 'Buy with coins' argument was won by three specific citations: Flow Theory, the children's flow-interruption study, the gamification capability research. Not by 'I think kids will prefer this.' The PM had a defensible position, and my position needed to be more defensible. Specificity is what made the pushback land instead of stalling, and what made the PM willing to update.",
      },
    ],

    // ── OUTCOME ───────────────────────────────────────
    impactTitle: "Outcome",
    impactBody: "Round 1 was the company's first usability test. It validated the macro design (90% would play again, 4.2/5 fun, 100% task success on the core flow) and produced four specific refinements that moved into a coded React prototype for Round 2. The design system I built for the Quiz Battle feature was adopted across the team for the broader app redesign. The shift the team is still feeling, the one that won't show up in a portfolio metric, is that decisions now start from data, not intuition.",
    impactMethod: "Round 1: 22 participants on the core task · Maze prototype testing · 3 task flows · open-ended follow-up · adults briefed as proxies for the 8–15 target audience. Round 2 currently running on the coded prototype.",
    metrics: [
      { value: "90%", label: "Would play again", context: "Validated my Play Again CTA over PM's commerce-first preference (n=10)" },
      { value: "4.2/5", label: "Fun rating", context: "First measurable engagement signal in the product's history (n=10)" },
      { value: "First", label: "Usability test in company history", context: "Introduced testing as a default practice for future features" },
    ],
  },

  {
    slug: "ride-availability",
    title: "Lyft Bike Redesign",
    description: "Lyft has the prediction algorithms, real-time monitoring, and incentive programs already built. None of it reaches riders. I designed the UX layer that puts it in front of them.",
    year: "2026",
    category: "Mobile",
    featured: true,
    order: 3,

    coverImage: "/images/lyft-cover.webp",
    heroImage: "/images/lyft-hero.webp",
    heroImageMobile: "/images/lyft-mobile-hero.webp",
    thumbBg: "#1a1a2e",

    role: "Solo designer",
    team: "Self-directed personal project",
    timeline: "Ongoing, Round 2 testing in progress",
    tools: "Figma, Maze",
    impact: "Reframed the project from 'add dock info' to 'surface the infrastructure Lyft already has.' That reframing shaped everything downstream. In testing: 4.5/5 dock confidence (n=8), 4.3/5 trust in the system, and 83% of station choices influenced by dynamic pricing, which showed that a price embedded in the existing UI changes behavior without any new infrastructure.",

    // ── OVERVIEW ──────────────────────────────────────
    problemTitle: "Three problems Lyft already had the tools to solve.",
    problemBody: "I'm a Lyft bike user. I'd check availability at home, ride 15 minutes, and arrive to find every dock taken. It happened more than once. After the third time I stopped calling it bad luck and started asking why it kept happening. Three failures that looked unrelated turned out to share one cause: Lyft can predict dock availability, but that prediction stays on the operations side and never reaches riders.",
    problemPoints: [
      "Riders can't see whether a dock will be open when they arrive, so every ride is a gamble",
      "If the docks fill up mid-ride, there's no recovery and the rider gets stranded",
      "Dock imbalance costs Lyft millions in truck redistribution. Rebalancing moves dropped 80% from 2014 to 2022, but the cost is still material (NYC Comptroller, 2023)",
    ],

    solutionTitle: "The Solution",
    solutionBody: "Lyft already has everything it needs. AirControl monitors stations in real time. Bike Angels pays riders to rebalance the network, with top users earning $3K a month (Bloomberg, 2022). Internal prediction algorithms forecast dock availability. The iOS Live Activities API can deliver mid-ride notifications without making the rider touch their phone. None of this reaches riders today. My design is the UX layer that exposes it. There's no new technology involved, mostly a frontend lift.",

    showcasePanels: [
      {
        number: "01",
        title: "Dynamic pricing at station selection",
        subtitle: "Price is the incentive. No badges, no banners.",
        body: "The per-minute rate moves with station supply. Overstocked stations price lower ($0.39/min) to clear bikes for riders arriving later. Understocked stations price higher ($0.49/min) to protect what's left. The incentive sits inside a number riders already compare, so it needs no new UI. Published research on departure-side pricing backs this up: +300% revenue and -76% rebalancing cost versus fixed pricing (PMC, 2025).",
        image: "/images/ride-panel-1.webp",
      },
      {
        number: "02",
        title: "Recommended routes with dock confidence",
        subtitle: "Every dock decision happens before the ride starts.",
        body: "Once a rider adds a destination, three route options appear (Fastest, Cheapest, Closest), and each one shows how likely a dock will be open on arrival. The signal has three levels: very likely available, likely available, and limited availability. Because the rider decides before the bike unlocks, there's no reason to check the phone mid-ride.",
        image: "/images/ride-panel-2.webp",
      },
      {
        number: "03",
        title: "Live Activity mid-ride",
        subtitle: "Glance-only alerts via the iOS Dynamic Island.",
        body: "If a destination dock starts filling up, the Live Activity updates with a passive alert. The rider doesn't open the app or tap anything. If the dock fills before they arrive, the system reroutes to the nearest alternative and issues a $1.00 credit for getting the prediction wrong. Owning the failure is what keeps riders trusting the prediction next time.",
        image: "/images/ride-panel-3.webp",
      },
    ],

    // ── RESEARCH ──────────────────────────────────────
    researchWhyTitle: "Why redesign Lyft's bike experience?",
    researchWhyBody: [
      "I'm a Lyft bike user. The frustration started with one ride. I checked availability at home, found a station with bikes nearby, rode 15 minutes, and arrived to find every dock taken. I had to ride another 8 minutes to a station that wasn't full. The next week it happened again.",
      "When the same frustration shows up over and over, it's worth treating as a signal instead of bad luck. So I mapped the full ride flow, from the station check at home to the bike unlock to the moment of arrival, and looked for the points where Lyft's existing infrastructure could have caught the failure.",
      "What I found changed how I thought about the project. Lyft already has the data. It just doesn't show it to riders.",
    ],

    researchDomainTitle: "What Lyft already operates internally",
    researchDomainBody: "I looked at how Lyft manages its bike-share network on the operations side. Four systems stood out. AirControl gives ops teams real-time station monitoring. Bike Angels is a rider-facing program that pays people for rebalancing trips ($3K a month for top users, per Bloomberg). Internal demand-prediction algorithms forecast dock availability with measurable accuracy. And the iOS Live Activities API can push passive notifications during a ride without making the rider touch the phone. Three of these four were already user-facing in some form, but none of them showed predicted availability before a ride, and none of them talked to each other in the rider flow.",
    researchDomainInsight: "Lyft's internal tools are a tell. AirControl and Bike Angels exist to manage a network whose behavior couldn't be steered through the rider-facing product. When a company builds tooling that operates around its primary product, that's usually a sign the primary product has a gap.",

    researchUserTitle: "Where the trust gap shows up",
    researchUserBody: [
      "I mapped the journey from intent-to-ride to post-ride and marked every point where prediction information was needed but missing. The biggest gap was at station selection. Riders pick a starting station with no idea whether the destination dock will be open when they get there. The decision to ride is made on incomplete data, and there's no way to recover if conditions change mid-ride.",
      "I wrote three personas around different rider contexts: a reliability-driven commuter, a multi-modal navigator combining bikes with transit, and an occasional explorer. All three needed dock availability prediction before unlocking the bike, and none of them had it.",
      "The same gap shows up on the operations side. Dock imbalance, too many bikes at one station and too few at another, is a daily problem Lyft solves with trucks. NYC Comptroller data shows rebalancing moves dropped 80% from 2014 to 2022, but the imbalance is still handled mostly through manual logistics rather than rider behavior.",
    ],
    researchUserFindingsTitle: "Three findings that defined the brief",
    researchUserFindings: [
      "Rider-side prediction doesn't exist in the current product. Every ride is a bet on whether a dock will be open",
      "Lyft has the prediction infrastructure but treats it as an operations-only resource",
      "The operations-side fixes (trucks, Bike Angels) are responses to a UX gap. Riders can't make the decisions that would prevent the imbalance in the first place",
      "Every dock decision has to happen before the ride starts. Active phone use while cycling is a safety constraint, not a design preference",
    ],
    researchQuote: "I'd check availability at home, ride 15 minutes, and find all docks taken. Repeatedly.",
    researchQuoteAuthor: "Personal ride log, the design brief in one sentence",
    researchMethod: "Personal ride logging · journey mapping · 3 user personas · dock network health model · review of Lyft operational tools",

    researchPersonasBody: "Three rider contexts shaped the design: a reliability-driven commuter, a multi-modal navigator who chains bikes with transit, and an occasional explorer who rides without a system in their head. They all land on the same need at station selection, which is some signal of whether the destination dock will actually take their bike. Where they differ is how each one weighs price against time against certainty.",
    personas: [
      {
        number: "01",
        archetype: "THE RELIABILITY-DRIVEN COMMUTER",
        name: "Sarah Kim",
        meta: "Age 29 · Daily commuter",
        quote: "If I can't rely on it every morning, I'll just take the train.",
        image: "/images/persona-sarah.webp",
        keyNeeds: [
          "A dock guaranteed to be open at arrival",
          "Reliability she can build a schedule on",
          "Recovery options that don't burn commute time",
        ],
        designImplication: "Support predictive reliability and dock reservation during peak commuting hours.",
      },
      {
        number: "02",
        archetype: "THE MULTI-MODAL NAVIGATOR",
        name: "Luis Martinez",
        meta: "Age 24 · Bike + transit rider",
        quote: "Bikes make the city feel connected, but availability is unpredictable.",
        image: "/images/persona-luis.webp",
        keyNeeds: [
          "Stations that connect cleanly with transit hubs",
          "A clear next-best option when one station fails",
          "Recommendations based on network signal, not just proximity",
        ],
        designImplication: "Recommend the best nearby station based on live network conditions, not just proximity.",
      },
      {
        number: "03",
        archetype: "THE OCCASIONAL EXPLORER",
        name: "David Okafor",
        meta: "Age 35 · Weekend rider",
        quote: "I just want to grab a bike and ride without figuring out the system.",
        image: "/images/persona-david.webp",
        keyNeeds: [
          "A bike he can grab without learning the system",
          "Confidence the dock will accept his return",
          "Visual cues at the station, not buried in the app",
        ],
        designImplication: "Physical dock stations should communicate availability clearly without requiring the app.",
      },
    ],

    researchGoalsTitle: "Design Goals",
    researchGoalsBody: "Three goals shaped the design. First, show dock prediction before the ride starts so riders choose a station with full information. Second, guarantee that the ride can be completed through a safety net that adapts to changing conditions mid-ride without making the rider touch the phone. Third, cut dock imbalance through rider behavior instead of truck redistribution, by lining up rider incentives with what the network actually needs. One constraint cuts across all three: every dock-related decision has to happen before the ride begins.",

    // ── DESIGN ────────────────────────────────────────
    designIntro: "The research made one thing clear: this is a problem of surfacing what already exists, not a problem of building new technology. Lyft already has the prediction algorithms. What's missing is the infrastructure being honest about what it knows and showing that to the rider at the moment they're deciding.",

    designWhereTitle: "Reframing the brief",
    designWhereBody: [
      "The framing I started with was 'add dock availability info to the ride flow.' That treats the problem as a missing screen or a missing notification, a feature gap.",
      "After the research I reframed it as 'surface Lyft's existing infrastructure as user-facing UX.' That's a different problem with a different set of answers. If the brief is 'add info,' the design response is to wedge a status indicator somewhere on the screen. If the brief is 'surface infrastructure,' the response is to walk through every internal tool Lyft already runs and ask where it belongs in the rider flow.",
      "That reframing was the most important thing the research produced. Every decision after it, including the two directions I ended up rejecting, came out of that shift.",
    ],

    designAlternativesTitle: "Two Directions Rejected",
    designAlternativesIntro: "I explored three ways to surface dock prediction. Each one traded off visibility, behavior change, and complexity differently. The two I rejected are worth showing, because they look perfectly reasonable on paper.",
    designAlternativesFeasibility: "All three worked within Lyft's existing infrastructure, so the choice wasn't technical. It came down to which approach would actually change rider behavior without piling more onto an already-busy comparison screen.",
    designAlternatives: [
      {
        number: "01",
        title: "Explicit incentive badges",
        description: "'Save $0.30' badges layered onto dock options, putting financial incentive directly on the route selection screen.",
        pros: ["Clear value proposition", "Riders immediately understand the savings"],
        cons: ["Information overload on dock selection. Riders are already processing three options plus time and distance", "Adds another visual element to a screen that's already busy", "Badge fatigue from other apps means financial badges get tuned out anyway"],
        image: "/images/ride-alt-1.webp",
        decision: "rejected",
      },
      {
        number: "02",
        title: "Passive banner notifications",
        description: "'Earn $0.50 credit for starting here.' Surface rebalancing incentives through a dismissible banner near the station selection.",
        pros: ["Low implementation cost", "Doesn't change the existing UI structure"],
        cons: ["Banners are easy to dismiss or ignore", "Reads like an ad, not a system message", "Doesn't tap into the comparison riders already do. They naturally compare price and time, but they don't read banners while doing it"],
        image: "/images/ride-alt-2.webp",
        decision: "rejected",
      },
      {
        number: "03",
        title: "Dynamic pricing in existing UI",
        description: "Per-minute rate adjusts by station supply and demand. The price riders already compare becomes the incentive. No badges, no banners.",
        pros: ["No information overload, since it uses data riders already process", "Taps into the comparison riders already make", "Backed by published research: +300% revenue, -76% rebalancing cost vs fixed pricing (PMC, 2025)", "Works within existing infrastructure. The pricing logic is on the backend, and the only visible change is the rate"],
        cons: ["Requires pricing-logic adjustments on the backend", "Riders may not notice small price differences without prompting"],
        image: "/images/ride-alt-3.webp",
        decision: "chosen",
      },
    ],
    designAlternativesConclusion: "Neither rejected direction actually changed behavior. Badges added noise. Banners got ignored. The chosen direction puts the incentive inside a number riders already compare, so there's no new UI to learn and no new behavior to adopt, and it's backed by published research on departure-side pricing (+300% revenue, -76% rebalancing cost versus fixed pricing).",

    designFeedbackTitle: "Why departure-side pricing, not destination-side",
    designFeedbackBody: [
      "Once dynamic pricing was the direction, the next question was where to apply it. The intuitive answer is destination-side: charge more to dock at understocked stations and less at overstocked ones, so riders go where Lyft needs the bikes.",
      "I rejected that. Destination-side pricing puts the financial decision at the wrong moment. The rider has already committed to a route and the bike is already moving. Asking them to reroute mid-ride to save $0.30 is exactly the kind of active phone use the safety constraint rules out.",
      "Departure-side pricing handles both halves of the problem at the start. Overstocked stations have bikes sitting idle that Lyft wants gone, and full docks at the receiving end that Lyft wants cleared. Pricing departures from those stations lower clears space for incoming riders and cuts down on truck redistribution. It's one change to the price, applied before the ride, and it needs no new infrastructure.",
    ],

    designDecisionsTitle: "Key design decisions",
    designDecisionsBody: "Four decisions shaped the final design. Each one came out of the same constraint: every dock-related choice has to happen before the ride begins.",
    strategyPrinciples: [
      {
        label: "Pink pill for pricing, not green",
        description: "Green is reserved for availability (a green dot means a bike is available). Pink is the Lyft brand color and gets used only for pricing. Keeping them separate stops riders from confusing 'is the bike available?' with 'how much does it cost?'",
      },
      {
        label: "Removed Nearby Stations from the ride flow",
        description: "Showing dock options mid-ride is a safety problem. It invites the rider to use the phone while cycling. I replaced the Nearby Stations feature with a passive Live Activity in the iOS Dynamic Island, which surfaces a dock-filling alert without the rider opening the app.",
      },
      {
        label: "Dynamic pricing over incentive badges",
        description: "A 'Save $0.30' badge adds a fifth visual element to a screen that's already crowded. The price itself, sitting in the data riders already read, is the incentive. No extra UI, and it rides on comparison behavior riders already do.",
      },
      {
        label: "$1.00 credit when the prediction fails",
        description: "If the system reroutes a rider because the predicted dock filled up, it issues a $1.00 credit automatically. This is a trust mechanism. A rider who gets burned once won't trust the prediction again unless the system owns the mistake and absorbs the cost of it.",
      },
    ],
    strategyRejected: "I considered making destination dock availability a hard requirement: refuse to unlock the bike unless a dock could be reserved in advance. I rejected it because it would have killed the casual ride, which is where most Lyft bike trips actually live. Someone grabbing a bike for a 6-minute trip to the store doesn't have a destination dock in mind. Forcing that choice up front would break the spontaneity that makes bike-share work in the first place.",

    redesignTitle: "Dynamic pricing in existing UI",
    redesignBody: "The final design adds the one thing the rider-facing product was missing: a price that reflects network health. Everything else in the design follows from that price signal, including the Live Activity, the rerouting, and the $1.00 credit. And the signal itself reuses infrastructure Lyft already runs internally.",
    redesignChanges: [
      {
        label: "Three-tier dynamic pricing",
        description: "Overstock (75% or more bikes): $0.39/min, to encourage clearing the station. Normal (25 to 74%): $0.44/min, the standard rate with no nudge. Understock (under 25%): $0.49/min, to protect what's left. The price is set on the backend and applied at unlock. Riders see the rate label ('Lower rate' or 'Higher rate') on the station card.",
      },
      {
        label: "Pre-ride dock prediction",
        description: "After adding a destination, riders see three route options (Fastest, Cheapest, Closest), each with a predicted dock availability badge at the arrival station. The badge has three states: Very likely, Likely, and Limited availability. All three options can be compared at once, with no extra taps.",
      },
      {
        label: "Live Activity mid-ride",
        description: "The iOS Dynamic Island shows ride state in four phases: Normal ('Arriving in 2 min'), Dock Alert ('Dock filling up'), Rerouted ('Arriving in 4 min, follow new route'), and All Full (alternative station plus a $1.00 credit). It's glance-only, with no app to open and nothing to tap unless the rider wants to override the reroute.",
      },
      {
        label: "Departure-side incentive design",
        description: "All the pricing nudges live at the start of the ride, not the end. That puts the financial decision at the moment the rider is already comparing options, before the bike is unlocked. After unlock, the only Live Activity interaction is acknowledging a state change.",
      },
    ],

    beforeImage: "/images/lyft-before.webp",
    afterImage: "/images/ride-after.webp",
    outcomeImage: "/images/ride-outcome.webp",

    // ── USABILITY TESTING ─────────────────────────────
    usabilityTesting: {
      round: "Round 1",
      context: "The first Maze test on this project, a structured check on the dynamic pricing direction and the dock prediction display. Round 2 is in progress.",
      participants: "8 participants across two task flows (Plan Your Ride: n=8 · Compare Stations: n=6 · Trust + Ease: n=4)",
      method: "Maze · 15 blocks · 2 prototype task flows · opinion scales · open response · 5-second tests",
      metrics: [
        { value: "4.5/5", label: "Dock confidence", context: "How confident did you feel you'd find an available dock at your destination? 63% rated 5, 25% rated 4, 13% rated 3 (n=8)" },
        { value: "4.3/5", label: "Trust in system", context: "Would you trust this system to help you find a dock on future rides? 100% rated 4 to 5, though only 4 of 8 participants completed this scale, so I read it as directional (n=4)" },
        { value: "83%", label: "Chose by price", context: "Station choice influenced by price per minute (50%) plus the Lower/Higher rate label (33%), which validates the dynamic pricing direction (n=6)" },
        { value: "100%", label: "Task success rate", context: "Both Task 1 (Plan Your Ride) and Task 2 (Compare Stations) hit 100% success with 0% drop-off" },
      ],
      findings: [
        {
          number: "01",
          finding: "45% misclick rate on dock selection",
          evidence: "Task 1 had a 45% misclick rate even though everyone eventually succeeded. Participants got to the goal, but with measurable friction along the way, which means the tap targets and visual affordances on the dock selection screen need work.",
          refinement: "Increase the tap target size on the dock option cards and make it clearer which part of each option is interactive. Tested in Round 2.",
          refinementReason: "Eventual success hides an affordance failure. A 45% misclick rate would mean real frustration in production even when the funnel completes, so I want it fixed before scaling the testing.",
        },
        {
          number: "02",
          finding: "Dynamic pricing validated by behavior, not just opinion",
          evidence: "When asked what influenced station choice most, 50% said price per minute, 33% said the 'Lower rate' / 'Higher rate' label, and 17% said location or convenience. 67% noticed the price difference between stations without being prompted.",
          refinement: "Direction confirmed. The rate label is doing real work, so I'll keep it alongside the explicit per-minute price rather than picking one over the other. No changes to the pricing mechanism in V2.",
          refinementReason: "This was the central hypothesis of the whole design. The data shows that price embedded in the existing comparison is enough on its own, which confirms the call to reject explicit badges and banners.",
        },
        {
          number: "03",
          finding: "'Predicted 8 → Actual 6' split comprehension",
          evidence: "Half the participants read the predicted-vs-actual display correctly. The other half misread it. One took it as walking-speed prediction variance, another as the number of riders currently trying to unlock bikes.",
          refinement: "Redesign the prediction display in V2 and lean less on the '→' notation. Test simpler framings like 'Expected: 6 docks' or 'Likely 4 to 8 docks' with a confidence band.",
          refinementReason: "A comprehension split means the display is doing different things for different riders. Trust needs everyone reading it the same way, so this is the highest-priority V2 fix.",
        },
        {
          number: "04",
          finding: "Information density flagged repeatedly in open response",
          evidence: "Participant feedback: 'There were times when there was a lot of separate text boxes with different information which made it somewhat difficult to focus on one thing.' Another: 'There was still too much info. If I was seeking for only docks it should be more direct.'",
          refinement: "Consolidate the station card hierarchy in V2 and cut the number of separate text containers. Test progressive disclosure for secondary information like the per-minute breakdown, predicted dock count, and route comparison.",
          refinementReason: "When several participants independently flag the same density problem, it's the design's fault, not theirs. The cognitive load is real and it will only compound in production.",
        },
      ],
      conclusion: "Round 1 confirmed the central hypothesis. Dynamic pricing in the existing UI changed behavior measurably, with 83% of station choice influenced by the price signal. It also surfaced three things to fix: affordance on dock selection, clarity on the prediction display, and overall information density. Round 2 is in progress with the refined design.",
      cultureNote: "The project started from my own frustration, but frustration is only a signal until you do something with it. When the same problem keeps hitting the same rider, it's worth treating as a system failure instead of bad luck. The Maze test was where I turned that signal into evidence other people could actually evaluate.",
    },

    // ── FUTURE STEPS ──────────────────────────────────
    futureStepsTitle: "Further Steps",
    futureSteps: [
      {
        title: "Continue Round 2 Maze testing",
        body: [
          "Target 10–15 participants for Round 2 with the refined prototype. Same two task flows, same opinion scales, but with the prediction display simplified and dock selection affordance improved.",
          "Specific targets: misclick rate below 25% on Task 1, comprehension on the prediction display above 80%, dock confidence rating maintained at 4.4+.",
        ],
      },
      {
        title: "A/B test the pricing threshold",
        body: [
          "The current model triggers Overstock pricing at 75% capacity. Published bike-share research uses both 75% and 80% as thresholds. Neither is conclusively better, and the difference matters for how well the pricing lines up with rebalancing behavior.",
          "An A/B test on the threshold would surface which value drives more rebalancing-aligned behavior without making the price differences feel arbitrary to riders.",
        ],
      },
      {
        title: "Live Activity-only flow",
        body: [
          "Round 1 confirmed that the Nearby Stations panel during the ride is a leftover from earlier exploration and adds nothing to the active-ride experience. The next iteration removes it entirely, leaving only the Live Activity as the mid-ride interface.",
          "This aligns the design with the original safety constraint: no active phone use during cycling. The Live Activity is glance-only by design; the Nearby Stations panel invites interaction.",
        ],
      },
      {
        title: "Destination-side dynamic pricing",
        body: [
          "Departure-side pricing handles one half of the imbalance equation, which is clearing overstocked stations. Destination-side pricing could handle the other half by adjusting dock-reservation fees based on how full the receiving station is.",
          "This was deliberately out of scope for Round 1 because mid-ride financial decisions violate the safety constraint. A future version could surface destination-side pricing at the pre-ride choice (so the decision still happens before the bike unlocks), letting riders pay slightly more to dock at understocked stations.",
        ],
      },
      {
        title: "Station Reliability Score",
        body: [
          "Some stations are more predictable than others. Older docks with stable usage patterns produce accurate forecasts, while newer or seasonal stations don't. A per-station Reliability Score would let riders tell a high-confidence prediction apart from a best-guess one before they unlock.",
          "This is the natural extension of the Dock Network Health Model documented in Figma. Building the score requires historical prediction-vs-actual data from AirControl, which exists internally but hasn't been exposed as a rider-facing signal.",
        ],
      },
    ],

    // ── REFLECTION ────────────────────────────────────
    reflectionTitle: "What I Learned",
    reflections: [
      {
        title: "Existing tools are a tell",
        body: "AirControl and Bike Angels are workarounds for a UX problem. Lyft built them because the rider-facing product couldn't steer the network, so the network had to be managed from outside it. When a company builds tooling that operates around its primary product, that's usually a sign the primary product has a gap. The most useful question I now ask at the start of a project is what the operations team is using that the rider-facing product can't do.",
      },
      {
        title: "Reframing the brief is itself a design decision",
        body: "Changing the scope from 'add dock info to the ride flow' to 'surface existing infrastructure as UX' wasn't a small adjustment. It changed what I was solving for, how I'd measure success, and which directions were even worth exploring. Two approaches that looked obvious at the start got rejected once the brief shifted. The reframing mattered more than any single screen I designed, and it's the part of the project I'd point to first.",
      },
      {
        title: "Personal frustration is research, but only after you treat it as data",
        body: "This started because I personally got burned by dock unavailability. On its own that's an anecdote, not research. It turned into research the moment I stopped riding around the problem and started logging it, mapping the journey, and looking for the systemic cause. Frustration you treat as data becomes a brief. Frustration you treat as bad luck stays frustration.",
      },
    ],

    // ── OUTCOME ───────────────────────────────────────
    impactTitle: "No new technology needed.",
    impactBody: "Every feature in the redesign maps to something Lyft already runs. AirControl supplies the real-time station state. Bike Angels already proves riders will rebalance for an incentive. The Live Activities API delivers the passive mid-ride alerts. Internal demand prediction supplies the dock forecasts. The contribution wasn't new technology. It was the UX layer that puts what Lyft already has in front of riders. Round 1 testing validated the central direction (4.5/5 dock confidence, 4.3/5 trust, 83% of station choice influenced by price) and surfaced specific fixes for Round 2. The project is ongoing.",
    impactMethod: "Maze remote usability testing · 8 participants Round 1 · 15 blocks · 2 task flows · Round 2 targeting 10–15 participants",
    metrics: [
      { value: "4.5/5", label: "Dock confidence", context: "How confident did you feel you'd find an available dock at your destination? (n=8)" },
      // Trust stat (4.3/5, n=4) lives in the Usability Testing section with its sample-size caveat; n=4 is too thin to headline
      { value: "83%", label: "Chose by the price signal", context: "Station choice influenced by price per minute (50%) plus the Lower/Higher rate label (33%) (n=6)" },
      { value: "Zero", label: "New technology required", context: "Every feature maps to AirControl, Bike Angels, Live Activities, or Lyft's internal prediction algorithms. The engineering lift is mostly frontend" },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug) ?? null
}

export function getFeatured() {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order)
}

export function getAllSorted() {
  return [...projects].sort((a, b) => a.order - b.order)
}