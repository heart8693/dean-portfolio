// ─────────────────────────────────────────────────────────
//  CMS. 케이스 스터디 내용은 전부 여기서 고친다.
//
//  구조
//    1. 타입          어떤 필드가 있는지
//    2. 케이스 4개     siftCaseV2 / fipetCaseV2 / lyftCaseV2 / biaslyCaseV2
//    3. 레지스트리     slug -> 케이스
//    4. 홈 목록 헬퍼   카드 정보는 각 케이스의 card 블록에서 나온다
//
//  고치는 법
//    - 카피, 수치, 이미지 경로, 링크: 해당 케이스 객체 안에서 바꾼다
//    - 굵게 표시할 구절: body.bold 배열에 원문 그대로 넣는다.
//      본문에 없는 문자열을 넣으면 조용히 무시된다
//    - 섹션을 빼고 싶으면 필드를 통째로 지운다.
//      beforeAfter / evidence / solution2 / exploration / underHood /
//      research 는 선택 사항이라 없으면 코드가 알아서 건너뛴다
//    - 새 케이스: 객체 하나 더 만들고 casesV2 에 slug 를 등록한다
// ─────────────────────────────────────────────────────────

export type V2Body = {
  text: string
  bold?: string[]          // 잉크 볼드로 강조할 구절 (본문 회색 위)
}

export type V2Result = {
  value: number
  decimals?: number
  suffix?: string
  label: string            // mono 소라벨
  desc: string
  hot?: boolean            // true = 코발트
}

export type V2BentoData = {
  a: {
    tag: string            // "ON THE TICKET"
    level: string          // "Low confidence"
    pct: string            // "41%"
    sentence: string
    whyTag: string         // "WHY THIS IS UNCERTAIN"
    rows: [string, string][]   // [라벨, 모노값]
  }
  b: {
    tag: string
    title: string
    pills: { label: string; active: boolean }[]
    sliderPct: number      // 0–100
    note: string
  }
  c: {
    tag: string
    ticketTitle: string
    ticketMeta: string
    lockLabel: string
    rightTitle: string
    rightSub: string
    caption: string
  }
}

export type V2Persona = {
  label: string
  name: string
  meta: string
  quote: string
  needs: string[]
  implication: string
}

/* 저니. 화면 목록이 아니라 신뢰가 깨지는 순간의 목록이다. */
export type V2Moment = {
  phase: string
  question: string
  surface: string
  breaks: string
}

/* 이미지 위 변경점 표식. x, y 는 이미지 좌상단 기준 % 이고 눈으로 맞추는 값이다. */
export type V2Hotspot = {
  x: string
  y: string
  title: string
  body: string
}

/* 3안 비교. 스크린샷 대신 코드로 그린다.
   모바일 화면을 3:2 로 자르면 정보가 잘려서 차이가 안 보인다.
   보여줘야 할 건 화면이 아니라 세 안의 차이다. */
export type V2Alternative = {
  verdict: '✗' | '✓'
  title: string
  what: string     // 이 안이 무엇인가, 한 줄
  why: string      // 왜 떨어졌나 / 왜 남았나
}

export type V2FlowCard = {
  title: string
  sub: string
  tone: 'cobalt' | 'amber' | 'red'
}

export type V2DotRound = {
  label: string
  n: number
  avg: number
  data: Record<number, number>   // {점수: 인원}
}


/* ── 새 도해 다섯의 데이터 ──────────────────────────────
   전부 선택 필드. 없으면 코드가 섹션을 건너뛴다. */

export type V2Bars = {
  label: string
  statement: string
  body: V2Body
  rows: { label: string; value: number; display?: string; note?: string; hot?: boolean }[]
  axisNote?: string
}

export type V2FlowCompare = {
  label: string
  statement: string
  body: V2Body
  paths: {
    label: string
    chosen?: boolean
    steps: { label: string; fork?: boolean }[]
    note: string
  }[]
  forkNote: string
}

export type V2SystemGap = {
  label: string
  statement: string
  body: V2Body
  leftLabel: string
  rightLabel: string
  left: { name: string; detail: string }[]
  right: { name: string; detail: string; missing?: boolean }[]
  note: string
}

export type V2ResearchNotes = {
  label: string
  statement: string
  body: V2Body
  rows: { kind: 'Verified' | 'Directional'; claim: string; source: string; use?: string }[]
  note?: string
}

export type V2Redacted = {
  label: string
  statement: string
  body: V2Body
  items: { tag: string; what: string; why: string }[]
  note: string
}


/* 이미지 섹션을 개수 제한 없이 넣기 위한 타입.
   지금까지는 solution2 하나만 이미지를 가질 수 있어서, 새 이미지를 넣으려면
   매번 새 타입을 만들어야 했다. 이 배열 하나로 케이스마다 원하는 만큼 넣는다.
   layout 으로 폭과 배치를 바꿔 섹션이 전부 같은 모양으로 읽히는 것을 막는다. */
export type V2Figure = {
  label: string
  statement: string
  body?: V2Body
  image: string
  imageAlt: string
  caption?: string
  /* full = 1120 전폭 / inset = 들여쓴 좁은 폭 / pair = 좌측 텍스트 + 우측 이미지 */
  layout?: 'full' | 'inset' | 'pair'
  ratio?: string
  /* 이미지 아래 짧은 수치 스트립. 없으면 생략. */
  specs?: { v: string; l: string; hot?: boolean }[]
}


/* 하루 두 번 역할이 뒤집히는 두 지역. 정지 이미지 대신 토글로 보여준다. */
export type V2DemandCycle = {
  label: string
  statement: string
  body: V2Body
  left: string
  right: string
  am: { label: string; from: { label: string; detail: string; empty?: boolean }
                     ; to:   { label: string; detail: string; empty?: boolean } }
  pm: { label: string; from: { label: string; detail: string; empty?: boolean }
                     ; to:   { label: string; detail: string; empty?: boolean } }
  failures: { title: string; body: string }[]
}


/* 좌측 레일 항목. 자동 생성하지 않는 이유는 섹션이 열넷까지 있어서다.
   전부 나열하면 목록이 스크롤되고, 그 순간 목차 구실을 못 한다.
   라벨은 내부 필드명이 아니라 읽는 사람의 말로 다시 쓴다. */
export type V2NavItem = { id: string; label: string }

/* 홈 목록 카드에 쓰는 정보. 케이스 본문과 한 곳에서 관리한다. */
export type CaseCard = {
  slug: string
  title: string
  description: string
  year: string
  /* 제목 옆 아웃라인 태그. 두 개까지. 연도는 코드가 마지막 태그로 붙인다. */
  tags: string[]
  category: string        // 레거시. tags 로 교체 중
  featured: boolean
  order: number
  coverImage: string
  thumbBg: string
}

export type CaseV2 = {
  card: CaseCard
  meta: string
  h1: [string, string]           // 두 줄
  heroImage: string
  heroAlt: string
  nav?: V2NavItem[]
  demandCycle?: V2DemandCycle
  figures?: V2Figure[]
  bars?: V2Bars
  flowCompare?: V2FlowCompare
  systemGap?: V2SystemGap
  researchNotes?: V2ResearchNotes
  redacted?: V2Redacted
  heroOverlays?: {
    src: string
    alt?: string
    left: string        // 히어로 이미지 기준 %
    top: string
    width: string       // height 는 자동, PNG 원본 비율 유지
  }[]
  roleMeta: { label: string; value: string }[]

  statCard: { text: string; bold: string }

  /* 링크는 선택. 보여줄 것이 없으면 필드를 비운다. */
  overview: { label: string; body: V2Body; linkLabel?: string; linkHref?: string }

  outcome: { label: string; body: V2Body; results: V2Result[] }

  persona?: V2Persona
  journey?: { label: string; statement: string; body: V2Body; moments: V2Moment[] }

  beforeAfter?: {
    r1Image: string; r2Image: string
    r1Alt: string; r2Alt: string
    r1Chip: string; r2Chip: string
    hint: string
    r1Hotspots: V2Hotspot[]
    r2Hotspots: V2Hotspot[]
  }

  evidence?: {
    label: string; statement: string; body: V2Body
    rounds?: V2DotRound[]
    axisNote?: string
    pauseMs?: number
  }

  solution1: { label: string; statement: string; body: V2Body; bento: V2BentoData }
  solution2?: { label: string; statement: string; body: V2Body; image: string; imageAlt: string }

  exploration?: {
    label: string; statement: string; body: V2Body
    alternatives: V2Alternative[]
    flowIntro?: { title: string; chips: string }
    flowCards?: V2FlowCard[]
    flowNote?: string
  }

  underHood?: {
    label: string; statement: string; body: V2Body
    specs: { v: string; l: string; hot?: boolean }[]
    linkLabel?: string; linkHref?: string
    demo?: 'sift-model'          // 라이브 데모 위젯을 붙일 케이스에만
  }

  quote?: { text: string; attribution: string }   // 페이지에서 더 이상 쓰지 않음

  research?: { label: string; statement: string; body: V2Body }

  fullStory?: {
    heading: string
    paragraphs: { title: string; body: V2Body }[]
  }

  reflections: { num: string; title: string; body: string }[]

  footer: { copyright: string; links: { label: string; href: string }[] }
}

// ── V2 content ────────────────────────────────────────
export const siftCaseV2: CaseV2 = {
  card: {
    slug: 'triage',
    tags: ['Product design', 'Machine learning'],
    title: 'Sift · AI ticket triage',
    description: 'AI ticket tools compete on how much they can automate. Agents don’t need more automation, they need to see what the AI did, why, and how to take it back.',
    year: '2026',
    category: 'Concept · B2B SaaS',
    featured: true,
    order: 1,
    coverImage: '/images/triage-cover.webp',
    thumbBg: '#101a3a',
  },
  meta: 'Jun – Jul 2026 · Self-directed concept',
  h1: ['When the AI files it,', 'someone answers for it'],
  heroImage: '/images/sift-hero-inbox.png',
  heroAlt: 'Sift inbox, AI-sorted queue with confidence, category and undo',

  // 배경·그림자·토스트·툴팁이 전부 heroImage PNG 안에 구워져 있으므로 비워 둔다.
  // 여기에 뭔가 넣으면 히어로 위에 그대로 얹힌다. 파일이 없으면 깨진 이미지가 뜬다.
  heroOverlays: [],

  roleMeta: [
    { label: 'Role',  value: 'Solo designer, end to end' },
    { label: 'Scope', value: 'Product design, research, model training, prototyping' },
    { label: 'Tools', value: 'Figma, FigJam, Maze' },
  ],

  statCard: {
    text: '83.5% of support professionals clicked everywhere except the control that decides how much the AI does.',
    bold: '83.5% of support professionals',
  },

  nav: [
    { id: 'overview', label: 'Overview' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'evidence', label: 'What testing found' },
    { id: 'solution-1', label: 'Confidence' },
    { id: 'solution-2', label: 'Controls' },
    { id: 'exploration', label: 'Three architectures' },
    { id: 'under-hood', label: 'The model' },
  ],

  overview: {
    label: 'Overview',
    body: {
      text: 'Agents do not need more automation. They need to see what the AI did, why, and how to take it back. Designed end to end, tested in two rounds with twelve CX professionals, model fine-tuned by me.',
      bold: ['see what the AI did, why, and how to take it back', 'fine-tuned the classification model myself'],
    },
    linkLabel: 'Open the prototype',
    linkHref: 'https://www.figma.com/proto/WnhBcVjCxsqABf2mBbvPXf/Ticket-Triage-%E2%80%94-Early-Exploration?node-id=206-2&p=f&viewport=241%2C97%2C0.12&t=qmneUfYqf8vRVwBQ-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=206%3A2&show-proto-sidebar=1&page-id=64%3A2',
  },

  outcome: {
    label: 'Outcome',
    body: {
      text: '21 wired screens and a live in-browser demo. Not a mockup of intelligence, but the thing itself.',
      bold: ['21 wired screens with a live in-browser demo', 'not a mockup of intelligence, but the thing itself'],
    },
    results: [
      { value: 0, suffix: '%', label: 'misclick rate', hot: true,
        desc: 'Down from 83.5% on the critical task. Same mission, same population, one redesign in between.' },
      { value: 4.4, decimals: 1, suffix: '/5', label: 'perceived control',
        desc: 'Up from 3.0. Twelve working CX professionals, two rounds, identical task blocks.' },
      { value: 99.67, decimals: 2, suffix: '%', label: 'model intent accuracy',
        desc: 'A classifier I fine-tuned myself, calibrated to ECE 0.0016 and running client-side.' },
    ],
  },

  persona: {
    label: 'Who it is for',
    name: 'Maya Chen',
    meta: 'Support agent · 142 open tickets today',
    quote: '“If it files something wrong, I’m the one who hears about it.”',
    needs: [
      'See why the AI chose, not only what it chose',
      'Take back any automated action in one tap',
      'Decide how much the AI does, category by category',
    ],
    implication: 'One persona, deliberately. Team leads set policy and read audit trails, and scoping them out is what let the agent seat go deep instead of wide.',
  },


  beforeAfter: {
    r1Image: '/images/sift-ba-r1-settings.png',
    r2Image: '/images/sift-ba-r2-inbox.png',
    r1Alt: 'Round 1: the only control, buried in Settings',
    r2Alt: 'Round 2: automation controls surfaced as four doors in the inbox',
    r1Chip: 'Round 1 · one entry, buried in Settings',
    r2Chip: 'Round 2 · four doors, in the flow',
    hint: 'Same mission, same population, one redesign apart. Hover a marker to see what moved.',

    r1Hotspots: [
      { x: '48%', y: '52%',
        title: 'The only way in',
        body: 'Round 1 shipped one entry to the automation control, inside Settings. 83.5% of participants misclicked looking for it, and one searched thirteen screens for five minutes before giving up.' },
    ],

    r2Hotspots: [
      { x: '90%', y: '11%',
        title: 'AI assist toggle',
        body: 'The heatmap showed people clicking here first in Round 1, where nothing happened. In Round 2 it opens the control, and it became the busiest door.' },
      { x: '18%', y: '25%',
        title: 'Auto-triage status card',
        body: 'The banner reports what the AI did today. Making the report itself clickable turned a status line into an entry point.' },
      { x: '76%', y: '25%',
        title: 'Adjust automation',
        body: 'A named link in the flow, not a settings icon. People who wanted the dial no longer had to guess where it lived.' },
      { x: '58%', y: '48%',
        title: 'Confidence cell',
        body: 'The threshold line on a ticket is where the number gets questioned, so the control opens from there too.' },
    ],
  },

  evidence: {
    label: 'Evidence',
    statement: 'Averages hide fights. Distributions show them.',
    body: {
      text: 'A cluster at 4 and a cluster at 1 to 2, split by whether people ever found the control. Round 2 asked the same question of the same population.',
      bold: ['a cluster at 4 and a cluster at 1 to 2', 'every participant answered 4 or 5'],
    },
    rounds: [
      { label: 'Round 1', n: 7, avg: 3.0, data: { 1: 1, 2: 2, 4: 4 } },
      { label: 'Round 2', n: 5, avg: 4.4, data: { 4: 3, 5: 2 } },
    ],
    axisNote: 'Felt sense of control · 1 = none → 5 = full',
    pauseMs: 600,
  },

  solution1: {
    label: 'Solution 01',
    statement: 'Confidence, written as a sentence people can calibrate',
    body: {
      text: 'Raw percentages lie to the gut. Every number carries a frequency line: right about 41 of 100 on tickets like this.',
      bold: ['right about 41 of 100', 'all three places'],
    },
    bento: {
      a: {
        tag: 'On the ticket',
        level: 'Low confidence',
        pct: '41%',
        sentence: 'On tickets like this, the AI has been right about 41 of 100.',
        whyTag: 'Why this is uncertain',
        rows: [
          ['Matched', 'refund · order reference'],
          ['Signal', 'billing dispute, 0.41'],
          ['Lowered by', 'overlap with account access'],
        ],
      },
      b: {
        tag: 'In settings',
        title: 'Confidence threshold',
        pills: [
          { label: 'Conservative · 90%', active: false },
          { label: 'Balanced · 85%', active: true },
          { label: 'Aggressive · 70%', active: false },
        ],
        sliderPct: 75,
        note: 'At 85%, the AI has been right about 96 of every 100 similar tickets.',
      },
      c: {
        tag: 'In the queue',
        ticketTitle: 'Delete my account and all data',
        ticketMeta: '#48196 · Tom Kim · 11m',
        lockLabel: 'Always human',
        rightTitle: 'Not scored',
        rightSub: 'the AI did not judge this',
        caption: 'Risk policy visible where the work happens.',
      },
    },
  },

  solution2: {
    label: 'Solution 02',
    statement: 'A dial the agent owns, and friction only where it earns its cost',
    body: {
      text: 'One threshold per category, because a bug report and an account deletion are not the same risk. Account deletion stays Always human.',
      bold: ['a setting, not a policy', 'Always human, permanently'],
    },
    image: '/images/sift-friction-confirm.png',
    imageAlt: 'Glass confirmation: friction only for expensive mistakes',
  },

  exploration: {
    label: 'Exploration',
    statement: 'Three architectures. One survived.',
    body: {
      text: 'Review everything and the queue becomes rubber-stamping. Automate everything and trust never forms. The survivor routes by confidence, and by risk.',
      bold: ['routes by confidence', 'and by risk'],
    },
    alternatives: [
      {
        verdict: '✗',
        title: 'Review everything',
        what: 'Every AI suggestion lands in an approval queue. Nothing moves until a human confirms it.',
        why: 'At 142 tickets a day, approval becomes rubber-stamping. That is overreliance wearing a safety costume, and it throws away the volume relief that justifies AI triage.',
      },
      {
        verdict: '✗',
        title: 'Automate everything, undo after',
        what: 'The AI files every ticket on its own. The agent gets a complete activity log and a global undo.',
        why: 'When everything is automatic, review atrophies. An auto-processed account deletion is an incident.',
      },
      {
        verdict: '✓',
        title: 'Confidence-routed, per category',
        what: 'Auto-sort above a threshold the agent sets per category, route everything below it to a person, never touch locked categories.',
        why: 'The only architecture where speed and judgment coexist. At threshold 100 it degrades into option 01, so a cautious team can start there and move.',
      },
    ],
    flowIntro: { title: 'Every incoming ticket gets a proposal', chips: 'category · priority · confidence' },
    flowCards: [
      { title: 'Above threshold', sub: 'Auto-sorted · undo stays open', tone: 'cobalt' },
      { title: 'Below threshold', sub: 'Needs review · routed to a human first', tone: 'amber' },
      { title: 'Sensitive category', sub: 'Always human · never auto, permanently', tone: 'red' },
    ],
    flowNote: 'one dial per category · every automated action reversible',
  },

  underHood: {
    label: 'Under the hood',
    statement: 'The model is real, and it runs in the browser',
    body: {
      text: 'A DistilBERT classifier fine-tuned on 24,370 tickets, calibrated to ECE 0.0016, quantized to 68 MB, deployed with transformers.js. Nothing you type leaves the page.',
      bold: ['I built it', 'calibrated to ECE 0.0016', 'nothing you type leaves the page'],
    },
    specs: [
      { v: '24,370', l: 'tickets fine-tuned on' },
      { v: '99.67%', l: 'intent accuracy' },
      { v: '0.0016', l: 'expected calibration error', hot: true },
      { v: '68 MB', l: 'quantized, in-browser' },
    ],
    demo: 'sift-model',
    linkLabel: 'Model card on Hugging Face',
    linkHref: 'https://huggingface.co/heart8693/sift-intent-classifier',
  },

  quote: {
    text: '“If it files something wrong, I’m the one who hears about it.”',
    attribution: 'the agent this was designed for',
  },

  research: {
    label: 'Research',
    statement: 'Even at 95%, experts still read the ticket',
    body: {
      text: 'Three of five checked the source before accepting at 95%. That is not distrust. It is their name on the decision, so the design stopped asking for trust and made verifying fast.',
      bold: ['Three of five professionals checked the source', 'making verifying fast'],
    },
  },


  reflections: [
    { num: '01', title: 'Failing in front of seven people',
      body: 'Round 1 broke publicly on my own site. Nobody made me run it, and rebuilding after it is the part of this project I would defend hardest.' },
    { num: '02', title: 'Honesty is a set of decisions that don’t demo',
      body: 'A frequency sentence, a Not scored label, an error banner whose first message is that the human can keep working. Each one is skippable and none of them show up in a demo.' },
  ],

  footer: {
    copyright: '© 2026 Dean Yoo',
    links: [
      { label: 'Email', href: 'mailto:hyart2021@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/dean-yoo' },
      { label: 'Resume', href: '/resume' },
    ],
  },
}
// ═══════════════════════════════════════════════════════
//  cms.ts 맨 아래에 붙여넣기.
//  siftCaseV2 와 같은 CaseV2 타입을 쓴다. 새 타입 없음.
//  모든 수치와 인용은 기존 projects[] 데이터에서 가져온 것이고
//  새로 지어낸 사실은 없다.
// ═══════════════════════════════════════════════════════

export const fipetCaseV2: CaseV2 = {
  card: {
    slug: 'fipet',
    tags: ['Product design', 'Design systems'],
    title: 'FiPet',
    description: 'FiPet shipped to the App Store without a single usability test. I led the redesign around a new 1v1 Quiz Battle feature and ran the company’s first usability test.',
    year: '2026',
    category: 'Internship · Mobile',
    featured: true,
    order: 2,
    coverImage: '/images/fipet-cover.webp',
    thumbBg: '#2d1810',
  },
  meta: 'Mar – May 2026 · Internship',
  h1: ['They shipped to the App Store', 'without testing it once'],
  heroImage: '/images/fipet-hero-v2.webp',
  heroAlt: 'FiPet 1v1 Quiz Battle, home screen and battle loop',
  heroOverlays: [],

  roleMeta: [
    { label: 'Role',  value: 'Product design intern, lead on Quiz Battle' },
    { label: 'Team',  value: '1 PM, 2 designers, 10 engineers' },
    { label: 'Tools', value: 'Figma, Maze, React' },
  ],

  statCard: {
    text: '10 of 10 interview participants called the app overwhelming. One said it felt like homework, which is the exact word a financial literacy app for kids cannot afford.',
    bold: '10 of 10 interview participants',
  },

  nav: [
    { id: 'overview', label: 'Overview' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'bars', label: 'Round 1 numbers' },
    { id: 'evidence', label: 'What testing found' },
    { id: 'solution-1', label: 'The disagreement' },
    { id: 'solution-2', label: 'Design system' },
    { id: 'exploration', label: 'Three home screens' },
    { id: 'under-hood', label: 'Coded prototype' },
  ],

  overview: {
    label: 'Overview',
    body: {
      text: 'Launched with no usability testing and reviews that repeated the same complaints. I led design on a new 1v1 Quiz Battle, built the design system the team adopted, and ran the company’s first usability test.',
      bold: ['no usability testing', 'the first usability test in the company’s history'],
    },
    linkLabel: 'Open the coded prototype',
    linkHref: 'https://fipet-quiz-battle.vercel.app/',
  },

  outcome: {
    label: 'Outcome',
    body: {
      text: 'Thirty screens, a design system adopted beyond my feature, and a testing practice the team kept.',
      bold: ['a design system adopted beyond my feature', 'the company’s first test'],
    },
    results: [
      { value: 90, suffix: '%', label: 'would play again', hot: true,
        desc: '9 of 10 full completions. This is the number that settled the Play Again versus Buy with coins argument.' },
      { value: 4.2, decimals: 1, suffix: '/5', label: 'fun rating',
        desc: 'The first measurable engagement signal in the product’s history.' },
      { value: 22, suffix: '', label: 'sessions recorded',
        desc: 'The company had never run a usability test. This was the first, and the practice stayed after I left.' },
    ],
  },

  persona: {
    label: 'Who it is for',
    name: 'Kids, ages 8 to 15',
    meta: 'First-time users · intercepted in public spaces',
    quote: '“It’s so confusing. I don’t even know what this app is for.”',
    needs: [
      'Something to tap within the first ten seconds',
      'A clear signal that this is not homework',
      'One consistent visual language, not five',
    ],
    implication: 'Parents are the second audience and the decision-makers, but the failure happened before they mattered. Kids opened the app once, could not tell what to do, and never came back.',
  },


  evidence: {
    label: 'Evidence',
    statement: 'The first task failed before anyone reached the game.',
    body: {
      text: 'Task success was 100%, which looked fine until misclicks came in at 65.9%. The Start button sat below the fold, so people read the page as a buffer screen.',
      bold: ['65.9% on the first task', 'the Start button sat below the fold'],
    },
  },

  research: {
    label: 'Research',
    statement: 'Naming a feature 1v1 is not enough if it plays solo.',
    body: {
      text: 'Only 20% chose competing against a rival, the lowest of three options. They wanted to see what the rival answered, not a score at the end.',
      bold: ['only 20% chose competing against a rival'],
    },
  },

  solution1: {
    label: 'Solution 01',
    statement: 'Play Again, not Buy with earned coins',
    body: {
      text: 'The PM wanted the shop as the primary action. Conversion would never be higher. I argued the opposite, and the disagreement was about who the user actually is.',
      bold: ['The PM wanted the shop as the primary action'],
    },
    bento: {
      a: {
        tag: 'The argument',
        level: 'Momentum, not transaction',
        pct: '8 to 15',
        sentence: 'Kids this age are momentum-driven. The moment after winning is an emotional high, and a shop interrupts the loop the game just built.',
        whyTag: 'What the position rested on',
        rows: [
          ['Verified', 'Flow Theory, Csikszentmihalyi 1990'],
          ['Verified', 'children more flow-sensitive, PMC 2020'],
          ['Directional', '78% of parents, Commonwealth Bank 2023'],
        ],
      },
      b: {
        tag: 'What shipped',
        title: 'Play Again as primary, shop reachable from home',
        pills: [
          { label: 'Play Again · primary', active: true },
          { label: 'Home · secondary', active: false },
          { label: 'Shop · from home', active: false },
        ],
        sliderPct: 90,
        note: 'Round 1 later validated the call: 90% said they would play again.',
      },
      c: {
        tag: 'Why it landed',
        ticketTitle: 'Specificity, not preference',
        ticketMeta: 'three citations, not one opinion',
        lockLabel: 'Agreed and shipped',
        rightTitle: 'Revisit post-launch',
        rightSub: 'with real engagement data',
        caption: 'The PM had a defensible position, so mine had to be more defensible.',
      },
    },
  },

  solution2: {
    label: 'Solution 02',
    statement: 'A system four decisions wide, so the team could actually use it',
    body: {
      text: 'One orange accent, Inter, SVG icons, an 8pt grid. Scoped small on purpose. The team adopted it for the broader redesign, which is the only measure that matters.',
      bold: ['I scoped it small on purpose', 'the only measure of a design system that matters'],
    },
    image: '/images/fipet-system-v2.webp',
    imageAlt: 'FiPet design system, one accent color, Inter, SVG line icons, 8pt grid',
  },


  /* 라운드 1 지표. 전부 evidence / outcome 섹션에 이미 있는 숫자다.
     문장 안에 박혀 있던 것을 눈에 보이게 옮겼을 뿐, 새 수치는 없다. */

  figures: [
    {
      label: 'Exploration',
      statement: 'Three home screens. Only one gave a reason to come back.',
      body: {
        text: 'Two of them are things you watch. The third is something you do with someone else.',
        bold: ['something you do with someone else'],
      },
      image: '/images/fipet-alternatives.webp',
      imageAlt: 'Daily lesson, social feed, and quiz battle home screens with the verdict on each',
      caption: 'Only the third had a second player in it.',
      layout: 'full',
      ratio: '1536 / 660',
    },
    {
      label: 'Fidelity',
      statement: 'The argument was settled in greyscale',
      body: {
        text: 'Button order is a hierarchy question, not a visual one. Deciding it in wireframe meant nobody in the room could argue that the orange was doing the persuading.',
        bold: ['nobody in the room could argue that the orange was doing the persuading'],
      },
      image: '/images/fipet-fidelity.webp',
      imageAlt: 'The win screen as a wireframe and as the final design, with the three decisions fixed before colour',
      caption: '90% said they would play again.',
      layout: 'full',
      ratio: '1536 / 765',
    },
    {
      label: 'Mascot',
      statement: 'Two mascots, two jobs',
      body: {
        text: 'A pet cannot announce that its owner lost, so the referee had to be someone else.',
        bold: ['A pet cannot announce that its owner lost'],
      },
      image: '/images/fipet-mascots.webp',
      imageAlt: 'The existing fox mascot beside the four Referee Owl variants',
      caption: 'Drawn to read at 40px as well as full size.',
      layout: 'full',
      ratio: '1536 / 696',
    },
    {
      label: 'Character system',
      statement: 'One owl carries every system message',
      body: {
        text: 'Four variants, held to that number so every state still reads from copy alone.',
        bold: [],
      },
      image: '/images/fipet-owl-states.webp',
      imageAlt: 'Referee Owl variants and the two screens where the owl appears',
      caption: 'Held to that size on purpose.',
      layout: 'inset',
      ratio: '1536 / 775',
    },
  ],

  bars: {
    label: 'Round 1, by the numbers',
    statement: 'Task success said the flow worked. Everything else said it did not.',
    body: {
      text: 'Every participant eventually finished. The cost of finishing is what the other three numbers measure.',
      bold: ['it is the one that hid the problem here'],
    },
    rows: [
      { label: 'task success', value: 100, display: '100%',
        note: 'Per task block, across 22 recorded sessions on the core flow.' },
      { label: 'misclick rate, task 1', value: 65.9, display: '65.9%', hot: true,
        note: 'The Start button sat below the fold, so the page read as a buffer screen.' },
      { label: 'avg duration, task 1', value: 228, display: '228s',
        note: 'For an entry point that should have been obvious.' },
      { label: 'would play again', value: 90, display: '90%',
        note: 'Nine of ten full completions. This is the number that settled the result screen argument.' },
    ],
    axisNote: 'Bars are scaled within each metric, not against each other. Round 1, unmoderated, Maze.',
  },

  /* 결과 화면 논쟁. solution1 의 bento 가 결론을 보여준다면
     여기는 두 경로가 어디서 갈라지는지를 보여준다. */
  flowCompare: {
    label: 'The fork',
    statement: 'Same screen, two exits',
    body: {
      text: 'The disagreement was one tap wide, and it decided whether the session continued or ended at the shop.',
      bold: ['one tap wide'],
    },
    paths: [
      {
        label: 'What the PM proposed',
        steps: [
          { label: 'Match ends' }, { label: 'Coins awarded' },
          { label: 'Buy with earned coins', fork: true }, { label: 'Shop' }, { label: 'Session ends' },
        ],
        note: 'Conversion is highest here, and that is a real argument. It also spends the moment the game just built.',
      },
      {
        label: 'What shipped',
        chosen: true,
        steps: [
          { label: 'Match ends' }, { label: 'Coins awarded' },
          { label: 'Play Again', fork: true }, { label: 'Next match' }, { label: 'Shop, from home' },
        ],
        note: 'The shop stays one tap from home. What changes is which action gets the emotional peak.',
      },
    ],
    forkNote: 'Round 1 later measured the call: 90% said they would play again.',
  },

  /* 라운드 1 이 낳은 기능 결정. research 섹션의 20% 를 근거로 삼는다. */
  researchNotes: {
    label: 'What testing changed',
    statement: 'A feature named 1v1 that played like solo',
    body: {
      text: 'Participants could not see the rival during the match, so the competition existed only as a number at the end.',
      bold: ['the thing the feature is named after'],
    },
    rows: [
      { kind: 'Verified', claim: 'Only 20% chose competing against a rival as what they liked most',
        source: 'Round 1, multiple choice, lowest of three options',
        use: 'Rival answer moved to the reveal screen.' },
      { kind: 'Verified', claim: 'Participants asked to see what the rival answered',
        source: 'Round 1, open response',
        use: 'Added a waiting state so the match reads as turn-taking.' },
      { kind: 'Directional', claim: 'Requests for more game-like mechanics beyond the quiz',
        source: 'Round 1, open response, unprompted',
        use: 'Logged, not built. Widening the format before the core reads well would hide which change did the work.' },
    ],
    note: 'Three changes shipped into the coded build. The fourth stayed on the list.',
  },


  underHood: {
    label: 'Under the hood',
    statement: 'Some questions a static prototype cannot answer',
    body: {
      text: 'The obvious next step was another Figma iteration. I argued against it. Timer pressure, live scores, and answer-switching cannot be faked in a static prototype, and that is where the unknowns lived.',
      bold: ['I argued against it', 'is exactly where the remaining unknowns lived'],
    },
    specs: [
      { v: '30', l: 'hi-fi screens' },
      { v: '12s', l: 'real per-question timer', hot: true },
      { v: '22', l: 'recorded sessions, round 1' },
      { v: 'First', l: 'usability test in company history' },
    ],
    linkLabel: 'Open the coded prototype',
    linkHref: 'https://fipet-quiz-battle.vercel.app/',
  },


  reflections: [
    { num: '01', title: 'Introducing testing changed more than any screen',
      body: 'Once everyone had a shared evidence base, the PM stopped defending preferences with intuition and engineers stopped pushing back with their own assumptions. The arguments got smaller and the work got faster.' },
    { num: '02', title: 'A design system is judged by adoption, not coverage',
      body: 'Four decisions, not forty, plus a short documentation set. Other designers used it for screens I never touched. A complete system nobody uses is worse than a smaller one that ships.' },
  ],

  footer: {
    copyright: '© 2026 Dean Yoo',
    links: [
      { label: 'Email', href: 'mailto:hyart2021@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/dean-yoo' },
      { label: 'Resume', href: '/resume' },
    ],
  },
}

// ═══════════════════════════════════════════════════════

export const lyftCaseV2: CaseV2 = {
  card: {
    slug: 'ride-availability',
    tags: ['Product design', 'Research'],
    title: 'Lyft Bike Redesign',
    description: 'Lyft has the prediction algorithms, real-time monitoring, and incentive programs already built. None of it reaches riders. I designed the UX layer that puts it in front of them.',
    year: '2026',
    category: 'Concept · Mobile',
    featured: true,
    order: 3,
    coverImage: '/images/lyft-cover.webp',
    thumbBg: '#1a1a2e',
  },
  meta: 'Mar – May 2026 · Self-directed concept',
  h1: ['Lyft can predict the dock.', 'Riders never see it.'],
  heroImage: '/images/lyft-hero-v2.webp',
  heroAlt: 'Lyft bike ride flow with dock availability prediction at station selection',
  heroOverlays: [],

  roleMeta: [
    { label: 'Role',  value: 'Solo designer, end to end' },
    { label: 'Scope', value: 'Research, journey mapping, interaction design, testing' },
    { label: 'Tools', value: 'Figma, Maze' },
  ],

  statCard: {
    text: 'I checked availability at home, rode 15 minutes, and found every dock taken. Then it happened again the next week.',
    bold: 'found every dock taken',
  },

  nav: [
    { id: 'overview', label: 'Overview' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'system-gap', label: 'The gap' },
    { id: 'evidence', label: 'What testing found' },
    { id: 'demand-cycle', label: 'Why docks empty' },
    { id: 'solution-1', label: 'Dynamic pricing' },
    { id: 'exploration', label: 'Three directions' },
    { id: 'under-hood', label: 'Already running' },
  ],

  overview: {
    label: 'Overview',
    body: {
      text: 'Lyft already monitors stations, pays riders to rebalance, and forecasts dock availability. None of it reaches the rider. I designed the layer that surfaces what already exists.',
      bold: ['None of it reaches the rider', 'mostly a frontend lift rather than new technology'],
    },
    linkLabel: 'Open the prototype',
    linkHref: 'https://www.figma.com/proto/iE519vGwIttO6MSAx6sTxd/Lyft-redesign-testing?node-id=0-662&starting-point-node-id=0%3A662&page-id=0%3A1',
  },

  outcome: {
    label: 'Outcome',
    body: {
      text: 'Round 1 validated the prediction direction and pushed back on the pricing hypothesis. The project is ongoing and the numbers are honest about their sample sizes.',
      bold: ['pushed back on the pricing hypothesis'],
    },
    results: [
      { value: 4.4, decimals: 1, suffix: '/5', label: 'dock confidence', hot: true,
        desc: 'How confident participants felt they would find an available dock at the destination. n = 10.' },
      { value: 100, suffix: '%', label: 'dock planning success',
        desc: 'Every recorded session completed the dock planning flow. 10 sessions.' },
      { value: 4, suffix: ' / 4', label: 'features already running at Lyft',
        desc: 'Station state, rider incentives, forecasts, and mid-ride alerts all run today. The contribution is the display layer.' },
    ],
  },



  evidence: {
    label: 'Evidence',
    statement: 'The display meant two different things to two halves of the room.',
    body: {
      text: 'Half read the predicted-versus-actual count correctly. The other half took it as walking-speed variance, or as riders currently unlocking. A split is worse than a low score.',
      bold: ['A comprehension split is worse than a low score'],
    },
  },

  research: {
    label: 'Research',
    statement: 'Existing internal tools are a tell.',
    body: {
      text: 'These tools exist because the rider-facing product could not steer the network. When a company builds tooling around its primary product, the product usually has a gap. That is the question I now ask first.',
      bold: ['the primary product usually has a gap'],
    },
  },

  solution1: {
    label: 'Solution 01',
    statement: 'The incentive lives inside a number riders already compare',
    body: {
      text: 'Overstocked stations price lower to clear bikes, understocked price higher to protect what is left. No badge, no banner, no new UI.',
      bold: ['No badge, no banner, no new UI to learn'],
    },
    bento: {
      a: {
        tag: 'At the station',
        level: 'Overstocked',
        pct: '$0.39/min',
        sentence: 'Riders already compare price and time. Putting the nudge inside that comparison means no new behavior has to be adopted.',
        whyTag: 'Three tiers',
        rows: [
          ['Overstock', '75% or more bikes · $0.39/min'],
          ['Normal', '25 to 74% · $0.44/min'],
          ['Understock', 'under 25% · $0.49/min'],
        ],
      },
      b: {
        tag: 'Before the ride',
        title: 'Dock prediction on every route option',
        pills: [
          { label: 'Fastest', active: false },
          { label: 'Cheapest', active: true },
          { label: 'Closest', active: false },
        ],
        sliderPct: 80,
        note: 'Very likely, likely, or limited availability at the arrival station. All three options comparable in one glance.',
      },
      c: {
        tag: 'When it fails',
        ticketTitle: 'Dock filled before arrival',
        ticketMeta: 'Live Activity · reroute issued',
        lockLabel: '$1.00 credit, automatic',
        rightTitle: 'No app to open',
        rightSub: 'glance-only by design',
        caption: 'The system owns the mistake, or the rider stops believing the prediction.',
      },
    },
  },


  /* 케이스의 핵심 주장을 그림으로. 좌열은 overview 와 underHood 에
     이미 적힌 것, 우열은 라이더가 실제로 보는 것. 새 사실 없음. */


  /* 실제 Lyft 앱 vs 재설계. 두 장은 폰이 같은 좌표에 있어야 한다.
     원본 화면은 전부 현재 시각의 숫자만 보여준다. 그것이 이 케이스의 논점이다. */
  beforeAfter: {
    r1Image: '/images/lyft-ba-before.webp',
    r2Image: '/images/lyft-ba-after.webp',
    r1Alt: 'The shipped Lyft app: four counts, all of them current',
    r2Alt: 'The redesign: availability on arrival, with the price that follows from it',
    r1Chip: 'Shipped today · counts, right now',
    r2Chip: 'Redesign · what will be there',
    hint: 'The station sheet, as it ships and as I redesigned it. Toggle to see what the rider gains.',

    r1Hotspots: [
      { x: '50%', y: '78%',
        title: 'Four numbers, one tense',
        body: 'Ebikes, classic, scooters, open docks. Every count describes this moment. Nothing here survives the ride over, which is exactly when it matters.' },
    ],

    r2Hotspots: [
      { x: '46%', y: '58%',
        title: 'Availability when you arrive',
        body: 'The same prediction Lyft already runs internally, stated in the rider’s tense rather than the operator’s.' },
      { x: '72%', y: '48%',
        title: 'Lower rate',
        body: 'The price moves because the network needs bikes cleared from here. The pill is the only new element on the screen.' },
    ],
  },


  /* 아침·저녁 토글. 같은 두 지역의 역할이 뒤집히는 것이 이 케이스의 전제다. */
  demandCycle: {
    label: 'Why the docks empty',
    statement: 'The imbalance is a commute, not a bug',
    body: {
      text: 'Bikes move with people. Every morning the city empties one side of the network and fills the other, then reverses at night.',
      bold: ['then reverses at night'],
    },
    left: 'Residential',
    right: 'Downtown',
    am: {
      label: 'Morning 7 – 9 AM',
      from: { label: 'Stations empty', detail: 'Riders leave. No bike to start with.', empty: true },
      to:   { label: 'Stations full',  detail: 'Riders arrive. No dock to end at.' },
    },
    pm: {
      label: 'Evening 5 – 7 PM',
      from: { label: 'Stations empty', detail: 'Riders leave. No bike to start with.', empty: true },
      to:   { label: 'Stations full',  detail: 'Riders arrive. No dock to end at.' },
    },
    failures: [
      { title: '0 bikes', body: 'The trip does not start. The rider walks, or opens a different app.' },
      { title: '0 docks', body: 'The trip does not end. The bike gets left somewhere it should not be.' },
    ],
  },

  figures: [
    {
      label: 'The flow',
      statement: 'One ride, end to end',
      body: {
        text: 'The three states underneath are what happens when the prediction turns out to be wrong.',
        bold: [],
      },
      image: '/images/lyft-flow.webp',
      imageAlt: 'The nine screen ride flow and three edge case states',
      caption: 'A design that predicts has to say what it does when it is wrong.',
      layout: 'full',
      ratio: '1920 / 842',
    },
    {
      label: 'Who rides',
      statement: 'Three riders, one failure',
      body: {
        text: 'None of them asked for a better map.',
        bold: [],
      },
      image: '/images/lyft-personas.webp',
      imageAlt: 'Three rider personas with their quotes and the point where the system fails each of them',
      caption: 'None of them asked for a better map.',
      layout: 'inset',
      ratio: '1536 / 670',
    },
    {
      label: 'Exploration',
      statement: 'Three ways to move a bike',
      body: {
        text: 'The chosen direction adds the least, and that was the deciding argument.',
        bold: [],
      },
      image: '/images/lyft-alternatives.webp',
      imageAlt: 'Three dock rebalancing alternatives: incentive badges, credit banner, dynamic pricing',
      caption: 'The chosen direction adds the least. That was the deciding argument, not the strongest incentive.',
      layout: 'full',
      ratio: '1536 / 769',
    },
  ],

  systemGap: {
    label: 'The gap',
    statement: 'Everything needed already runs. None of it reaches the rider.',
    body: {
      text: 'The forecasts, the incentives, and the live station state all exist inside Lyft. They stop at the operations layer.',
      bold: ['They stop at the operations layer'],
    },
    leftLabel: 'What Lyft already runs',
    rightLabel: 'What the rider sees',
    left: [
      { name: 'AirControl', detail: 'Real-time station monitoring across the network.' },
      { name: 'Bike Angels', detail: 'Pays riders to rebalance docks. Top users earn $3K a month.' },
      { name: 'Demand prediction', detail: 'Forecasts dock availability internally.' },
      { name: 'Live Activities API', detail: 'Ships passive mid-ride updates on iOS.' },
    ],
    right: [
      { name: 'Bike count, right now', detail: 'A number that is already stale by the time you arrive.' },
      { name: 'Dock availability on arrival', detail: 'Not shown anywhere in the ride flow.', missing: true },
      { name: 'Why this station is cheaper', detail: 'Not shown. The rate moves without explanation.', missing: true },
      { name: 'What happens if the dock fills', detail: 'Not shown until you are standing at it.', missing: true },
    ],
    note: 'Three of four gaps are display problems, not modelling problems.',
  },

  /* underHood.specs 에 있는 수치의 출처를 펼친다. */
  researchNotes: {
    label: 'What the numbers rest on',
    statement: 'Dynamic pricing is not a proposal, it is a measured result',
    body: {
      text: 'Pricing as a rebalancing lever has been studied on real systems. I used the published figures to size the argument rather than to promise an outcome.',
      bold: ['to size the argument rather than to promise an outcome'],
    },
    rows: [
      { kind: 'Verified', claim: '+300% revenue versus fixed pricing',
        source: 'PMC, 2025',
        use: 'Establishes that price-led rebalancing is worth the engineering, not just tolerable.' },
      { kind: 'Verified', claim: '−76% rebalancing cost',
        source: 'PMC, 2025, same study',
        use: 'The operational case. Trucks are the expensive half of the current approach.' },
      { kind: 'Verified', claim: 'Zero trucks needed under price-led rebalancing',
        source: 'arXiv, 2025',
        use: 'Cited as an upper bound, not a target. Real networks keep some manual capacity.' },
      { kind: 'Directional', claim: 'Bike Angels top users earn $3K a month',
        source: 'Public reporting on the existing programme',
        use: 'Evidence that riders already respond to incentives, which is the behaviour this design assumes.' },
    ],
    note: 'None of these came from my own testing. They are the reason the direction was worth testing at all.',
  },


  underHood: {
    label: 'Under the hood',
    statement: 'Every feature maps to something Lyft already runs',
    body: {
      text: 'Station state, rider incentives, mid-ride alerts, demand forecasts. All four already run. The contribution is the display layer, not the technology.',
      bold: ['The contribution is the UX layer, not the technology'],
    },
    specs: [
      { v: 'Zero', l: 'new technology required', hot: true },
      { v: '+300%', l: 'revenue vs fixed pricing, PMC 2025' },
      { v: '−76%', l: 'rebalancing cost, same study' },
      { v: '$1.00', l: 'credit when prediction fails' },
    ],
    linkLabel: 'Open the prototype',
    linkHref: 'https://www.figma.com/proto/iE519vGwIttO6MSAx6sTxd/Lyft-redesign-testing?node-id=0-662&starting-point-node-id=0%3A662&page-id=0%3A1',
  },


  reflections: [
    { num: '01', title: 'Reframing the brief was the design decision',
      body: 'Moving from add dock info to surface existing infrastructure changed what I was solving for, how success would be measured, and which directions were worth exploring at all. Two obvious approaches died the moment the brief shifted.' },
    { num: '02', title: 'Frustration becomes research only when you treat it as data',
      body: 'Getting burned by a full dock is an anecdote. It turned into a brief when I started logging it, mapping the journey, and looking for the systemic cause instead of riding around the problem.' },
  ],

  footer: {
    copyright: '© 2026 Dean Yoo',
    links: [
      { label: 'Email', href: 'mailto:hyart2021@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/dean-yoo' },
      { label: 'Resume', href: '/resume' },
    ],
  },
}

// ═══════════════════════════════════════════════════════

export const biaslyCaseV2: CaseV2 = {
  card: {
    slug: 'biasly',
    tags: ['Product design', 'Mobile'],
    title: 'Biasly Mobile App',
    description: 'Biasly helps users understand political bias before engaging with content. The feed made that context easy to miss.',
    year: '2025',
    category: 'Internship · Mobile',
    featured: true,
    order: 4,
    coverImage: '/images/biasly-cover.webp',
    thumbBg: '#1c2340',
  },
  meta: 'Oct – Dec 2025 · Internship',
  h1: ['They read the headline first.', 'The bias came too late.'],
  heroImage: '/images/biasly-hero-v2.webp',
  heroAlt: 'Biasly feed card with bias spectrum anchored above the headline',
  heroOverlays: [],

  roleMeta: [
    { label: 'Role',  value: 'Product design intern' },
    { label: 'Team',  value: 'PM, 2 engineers' },
    { label: 'Tools', value: 'Figma, Maze, Notion' },
  ],

  statCard: {
    text: '69% of participants could not identify the bias of articles they had just spent time reading. Almost all of them said the same thing: they never noticed it.',
    bold: '69% of participants',
  },

  nav: [
    { id: 'overview', label: 'Overview' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'bars', label: 'Before and after' },
    { id: 'evidence', label: 'What testing found' },
    { id: 'solution-1', label: 'The move' },
    { id: 'redacted', label: 'What is not here' },
  ],

  overview: {
    label: 'Overview',
    body: {
      text: 'The indicator was already there, at the bottom of every card, arriving after the reader had formed an opinion. I moved it above the headline and made it a spectrum.',
      bold: ['arriving after the reader had already formed an opinion'],
    },
    linkLabel: 'Open the prototype',
    linkHref: 'https://www.figma.com/proto/I6gxdz4SDvgvLcWWb4l1xL/Biasly-App-Designed--Based-on-Event-Page-?node-id=659-2473&starting-point-node-id=659%3A2421',
  },

  outcome: {
    label: 'Outcome',
    body: {
      text: 'Post-redesign sessions used the same participants, the same task, and the same duration. One variable changed: the layout.',
      bold: ['One variable changed: the layout.'],
    },
    results: [
      { value: 78, suffix: '%', label: 'bias recognition', hot: true,
        desc: 'Up from 31% on an identical task with an identical group. n = 12.' },
      { value: 3, suffix: '×', label: 'faster recognition',
        desc: 'Median time to identify bias fell from 9 seconds to 3.' },
      { value: 60, suffix: '%', label: 'drop in missed indicators',
        desc: 'Observer-coded instances of bias data being overlooked entirely.' },
    ],
  },

  persona: {
    label: 'Who it is for',
    name: 'A politically aware reader',
    meta: '12 moderated sessions · ages 22 to 45',
    quote: '“I usually just read the headline. I didn’t even see the bias tag.”',
    needs: [
      'A fast read on the day, not an evaluation exercise',
      'Context that arrives before the first impression forms',
      'A signal that survives fast scrolling',
    ],
    implication: 'The anti-persona matters here. A reader who has already decided which sources to trust has no interest in being challenged, and the redesign is deliberately not for them.',
  },


  evidence: {
    label: 'Evidence',
    statement: 'An overlay was dismissed as an ad within one second, every time.',
    body: {
      text: 'Every session dismissed the floating badge inside a second. A decade of the web has trained readers to ignore anything that floats on content. Structural position cannot be trained away.',
      bold: ['Every session dismissed it inside a second', 'Structural position cannot be trained away'],
    },
  },

  research: {
    label: 'Research',
    statement: 'The most useful finding came from users I was not designing for.',
    body: {
      text: 'Two politically engaged participants wanted to judge the headline before knowing the leaning. That forced a decision about who the product is for. The header stayed, and the finding rewrote the onboarding copy.',
      bold: ['who the product is for'],
    },
  },

  solution1: {
    label: 'Solution 01',
    statement: 'Bias arrives before the headline, encoded rather than written',
    body: {
      text: 'The pill moved to the card header, first in every scan sequence. The label became a spectrum, so direction and intensity register without reading.',
      bold: ['first in every scan sequence'],
    },
    bento: {
      a: {
        tag: 'In the header',
        level: 'Before the headline',
        pct: '100%',
        sentence: 'Every participant began scanning at the top of the card, which makes the header the only position that cannot be skipped.',
        whyTag: 'What the spectrum encodes',
        rows: [
          ['Left', 'blue'],
          ['Center', 'purple'],
          ['Right', 'red'],
        ],
      },
      b: {
        tag: 'In the hierarchy',
        title: 'Images cut from banners to thumbnails',
        pills: [
          { label: 'Full-width banner', active: false },
          { label: 'Constrained thumbnail', active: true },
        ],
        sliderPct: 40,
        note: 'The only way to give bias enough weight to compete with a large image.',
      },
      c: {
        tag: 'Across surfaces',
        ticketTitle: 'Same encoding in the article view',
        ticketMeta: 'feed · article · detail',
        lockLabel: 'One system to learn',
        rightTitle: 'No re-interpretation',
        rightSub: 'learned once, read everywhere',
        caption: 'A code that changes between screens is not a code.',
      },
    },
  },


  /* 세션 지표. outcome.results 에 있는 숫자를 눈에 보이게 옮긴다. */


  /* Sift 와 같은 크로스페이드 토글을 재사용한다. 두 장은 앱 화면이
     같은 좌표에 있어야 하며, 그렇지 않으면 전환 때 화면이 미끄러진다.
     Julia 피드백: 정적 좌우 배치보다 토글이 낫다. */
  beforeAfter: {
    r1Image: '/images/biasly-ba-before.webp',
    r2Image: '/images/biasly-ba-after.webp',
    r1Alt: 'Before: the bias chip sits under the headline',
    r2Alt: 'After: the bias chip sits on the image, above the headline',
    r1Chip: 'Before · chip under the headline',
    r2Chip: 'After · chip above it',
    hint: 'Same card, same data. Toggle to see where the lean moves.',

    r1Hotspots: [
      { x: '52%', y: '62%',
        title: 'Last thing on the card',
        body: 'Source, headline, then the lean. By the time the chip is read, the headline has already been read, and the reader has a position on the story.' },
    ],

    r2Hotspots: [
      { x: '30%', y: '46%',
        title: 'On the image',
        body: 'The chip sits over the photograph, above the headline. It cannot be skipped on the way to the text.' },
      { x: '62%', y: '58%',
        title: 'Source stays below',
        body: 'Outlet and timestamp move under the headline. The lean is the only thing promoted, so the hierarchy still reads.' },
    ],
  },

  figures: [
    {
      label: 'Beyond the feed',
      statement: 'The same rule, a second surface',
      body: {
        text: 'Following runs on the same card. Once the spectrum earned its place above the headline in the main feed, there was no argument for keeping it below on this one.',
        bold: ['no argument for keeping it below on this one'],
      },
      image: '/images/biasly-following-ba.webp',
      imageAlt: 'The Following page before and after, with the bias chip moved above the headline',
      caption: 'Not a new decision. The same one, applied where it had not reached yet.',
      layout: 'inset',
      ratio: '1536 / 750',
    },
    {
      label: 'The encoding',
      statement: 'A label you read, a colour you see',
      body: {
        text: 'Words have to be read. A position on a spectrum is seen.',
        bold: ['Words have to be read'],
      },
      image: '/images/biasly-spectrum.webp',
      imageAlt: 'The bias spectrum colours and the three things that changed between versions',
      caption: 'Blue as left and red as right is an American convention. A limit of this design.',
      layout: 'inset',
      ratio: '1536 / 707',
    },
  ],

  bars: {
    label: 'Before and after',
    statement: 'Same participants, same task, one variable changed.',
    body: {
      text: 'Same twelve people, same articles, same time on task. The layout was the single change.',
      bold: ['nothing else moved'],
    },
    rows: [
      { label: 'bias recognition, before', value: 31, display: '31%',
        note: 'Readers who could name the bias of an article they had just read.' },
      { label: 'bias recognition, after', value: 78, display: '78%', hot: true,
        note: 'Identical task, identical group. The indicator moved above the headline.' },
      { label: 'median time to recognise', value: 100, display: '9s → 3s',
        note: 'Three times faster. The spectrum reads at scroll speed; the text label did not.' },
      { label: 'missed indicators', value: 60, display: '−60%',
        note: 'Observer-coded instances of bias data being overlooked entirely.' },
    ],
    axisNote: 'n = 12, moderated, same cohort across both rounds, on the prototype.',
  },

  /* 못 보여주는 것을 빈 자리로 남기지 않는다.
     인턴 작업물의 공개 범위는 내 결정이 아니었고, 그 사실을 적는 편이
     없는 척하거나 있는 척하는 것보다 낫다. */
  redacted: {
    label: 'What is not here',
    statement: 'Some of this work is not mine to publish',
    body: {
      text: 'Internship work on a live product. Two things are missing, and the reason is the same for both.',
      bold: ['the ones I can show'],
    },
    items: [
      { tag: 'not published',
        what: 'The production feed',
        why: 'I left before the release cycle closed and cannot confirm what shipped. Claiming a launch I did not witness would be the easiest thing here to disprove.' },
      { tag: 'internal',
        what: 'Session recordings and the raw scoring sheet',
        why: 'Participant footage and internal scoring stayed with the company. The figures are from my own notes.' },
    ],
    note: 'A case study that shows everything either had nothing confidential in it or should not be public.',
  },



  reflections: [
    { num: '01', title: 'The disconfirming finding was the valuable one',
      body: 'Feedback from politically engaged users who found the upfront label distracting was more useful than the data that agreed with me. It clarified who the product is for and changed decisions beyond the feed.' },
    { num: '02', title: 'Sequence is a design material',
      body: 'The indicator was always visible. It was never early. When something appears is a larger intervention than how it looks.' },
  ],

  footer: {
    copyright: '© 2026 Dean Yoo',
    links: [
      { label: 'Email', href: 'mailto:hyart2021@gmail.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/dean-yoo' },
      { label: 'Resume', href: '/resume' },
    ],
  },
}

// ═══════════════════════════════════════════════════════
//  slug -> 케이스 레지스트리.
//  app/work/[slug]/page.tsx 가 이걸로 어느 케이스를 그릴지 고른다.
//  slug 는 기존 projects[] 의 slug 와 정확히 같아야 한다.
// ═══════════════════════════════════════════════════════

export const casesV2: Record<string, CaseV2> = {
  'triage': siftCaseV2,
  'fipet': fipetCaseV2,
  'ride-availability': lyftCaseV2,
  'biasly': biaslyCaseV2,
}

export function getCaseV2(slug: string): CaseV2 | null {
  return casesV2[slug] ?? null
}

export const caseV2Slugs = Object.keys(casesV2)


// ═══════════════════════════════════════════════════════
//  홈 목록용 헬퍼.
//  카드 정보는 각 케이스의 card 블록 하나에서만 나온다.
//  예전 projects[] 와 60개짜리 Project 타입은 삭제했다.
// ═══════════════════════════════════════════════════════

export type Project = CaseCard

export const projects: CaseCard[] = Object.values(casesV2).map((c) => c.card)

export function getProject(slug: string): CaseCard | null {
  return projects.find((p) => p.slug === slug) ?? null
}

export function getFeatured(): CaseCard[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)
}

export function getAllSorted(): CaseCard[] {
  return [...projects].sort((a, b) => a.order - b.order)
}
