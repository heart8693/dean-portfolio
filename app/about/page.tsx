import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Reveal from './Reveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dean Yoo, product designer in Chicago. SAIC BFA, Dec 2026. Test before design, measure after ship.',
  alternates: { canonical: '/about' },
}

const ABOUT = {
  name: 'Dean Yoo',
  role: 'Product Designer',
  location: 'Chicago, IL',
  availability: 'Available for work',
  email: 'hyart2021@gmail.com',
  image: '/stickers/dean-thumbsup.png',
  statement: 'I don\u2019t trust assumptions.',
  lede: 'I test before I design and measure after I ship.',
  bio: [
    'The work here started the same way every time: a product that launched before anyone checked whether it worked. At one of these companies I ran the first usability test it had ever done.',
    'I\u2019m the kind of designer who will defend a decision if the research backs it, and drop it the moment it doesn\u2019t. I study at SAIC, live in Chicago, and share a desk with three cats.',
  ],
  experience: [
    {
      company: 'FiPet',
      role: 'Product Design Intern, Lead on Quiz Battle',
      period: 'Jan 2026 \u2013 May 2026',
      description:
        'Led the end-to-end design of the 1v1 Quiz Battle feature on a 13-person cross-functional team, from concept through hi-fi prototype, owning every screen and state. Introduced the company\u2019s first usability testing and ran it in Maze to validate the design before the next build.',
    },
    {
      company: 'Biasly',
      role: 'Product Design Intern',
      period: 'Oct 2025 \u2013 Dec 2025',
      description:
        'Sole mobile designer on the team. Owned every mobile screen end-to-end. Redesigned the core news feed to surface political bias before users read a single headline.',
    },
    {
      company: 'Urban Creator',
      role: 'Graphic Designer',
      period: 'May 2025 \u2013 Jan 2026',
      description:
        'Designed responsive digital interfaces using Webflow and HTML/CSS. Refined component-based design patterns and updated design system documentation.',
    },
  ],
  skills: [
    {
      category: 'Design',
      items: [
        'Product Design',
        'Interaction Design',
        'Information Architecture',
        'Design Systems',
        'Usability Testing',
      ],
    },
    {
      category: 'Tools',
      items: ['Figma', 'Adobe Creative Suite', 'Maze', 'Framer', 'Webflow', 'Protopie'],
    },
    { category: 'Code', items: ['HTML/CSS', 'React'] },
    {
      category: 'AI',
      items: ['Claude Code', 'Google Stitch', 'UX Pilot', 'AI-assisted design workflows'],
    },
  ],
  education: {
    school: 'School of the Art Institute of Chicago',
    degree: 'BFA, Visual Communication',
    year: 'Dec 2026',
  },
}

/* ── Photo wall ──────────────────────────────────
   TODO(dean): 실제 사진 파일이 생기면 채운다 — 고양이 / 요리 / 서울 패션.
   src는 업로드한 실제 파일명만 (경로 추측 금지, 표준 규칙).
   캡션용 IBM Plex Mono는 사진 들어올 때 layout.tsx에서 next/font로 로드하고
   --font-mono 변수로 연결 — 그 전까지는 ui-monospace 폴백으로 동작.
   배열이 비어 있으면 섹션 자체가 렌더되지 않는다. */
const PHOTOS: { src: string; alt: string; caption: string }[] = []

/* Section eyebrow: the only uppercase voice on the page */
const eyebrow: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
}

const titleType: CSSProperties = {
  fontSize: 'var(--text-title)',
  letterSpacing: '-0.012em',
  lineHeight: 1.25,
}

const monoCaption: CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, "SF Mono", monospace)',
  fontSize: '12px',
  letterSpacing: '0',
  color: 'var(--ink-3)',
}

const rowGrid = 'grid gap-2 md:grid-cols-[168px_minmax(0,1fr)] md:gap-12'

export default function AboutPage() {
  return (
    <main className="px-6 pb-28 md:pb-36">
      {/* ── Intro ─────────────────────────────────────── */}
      <section id="intro" className="mx-auto max-w-[1100px] pt-36 md:pt-44">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_300px] md:gap-20">
          {/* Text — 홈 히어로와 같은 3박자 로드 시그니처 (딜레이 클래스는 위치 독립) */}
          <div>
            <p style={eyebrow}>About</p>

            <h1
              className="reveal-line reveal-d1 mt-5 font-semibold text-[color:var(--ink)]"
              style={{
                fontSize: 'var(--text-display)',
                letterSpacing: 'var(--track-display)',
                lineHeight: 1.04,
              }}
            >
              {ABOUT.statement}
            </h1>

            <p
              className="reveal-line reveal-d2 mt-6 font-medium text-[color:var(--ink)]"
              style={{
                fontSize: 'var(--text-lede)',
                letterSpacing: 'var(--track-lede)',
                lineHeight: 1.35,
              }}
            >
              {ABOUT.lede}
            </p>

            <p className="reveal-line reveal-d3 mt-8 text-[14px] text-[color:var(--ink-3)]">
              <span className="font-medium text-[color:var(--ink)]">{ABOUT.name}</span>
              {' \u00b7 '}
              {ABOUT.role}
              {' \u00b7 '}
              {ABOUT.location}
              {' \u00b7 '}
              <span className="font-medium text-[color:var(--ink)]">{ABOUT.availability}</span>
            </p>

            <div className="mt-8 max-w-[58ch] space-y-5">
              {ABOUT.bio.map((para) => (
                <p
                  key={para}
                  className="text-[16px] leading-[1.7] text-[color:var(--ink-2)] md:text-[17px]"
                >
                  {para}
                </p>
              ))}
            </div>

            <p className="mt-9 text-[15px]">
              <a
                href={`mailto:${ABOUT.email}`}
                className="link-quiet pb-[2px] font-medium text-[color:var(--ink)]"
              >
                {ABOUT.email}
              </a>
            </p>
          </div>

          {/* Sticker portrait: no fill, no frame, natural ratio.
              drop-shadow follows the alpha contour, so it reads as a
              sticker resting on the page, not a flat inserted image.
              The pin below is this page's one canvas moment (comment tool). */}
          <div className="mx-auto w-full max-w-[280px] md:mx-0 md:sticky md:top-24 md:mt-14">
            <Image
              src={ABOUT.image}
              alt="Illustration of Dean giving a thumbs up"
              width={756}
              height={419}
              sizes="280px"
              className="h-auto w-full"
              style={{
                transform: 'rotate(-5deg)',
                filter: 'drop-shadow(0 10px 22px rgba(10, 10, 12, 0.16))',
              }}
              priority
            />

            <div aria-hidden className="mt-6 flex items-start gap-2 pl-4">
              <span
                className="grid shrink-0 place-items-center text-[12px] font-bold text-white"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'var(--accent)',
                  border: '2px solid var(--bg)',
                  borderRadius: '50% 50% 50% 0',
                  boxShadow: '0 4px 12px rgba(10, 10, 12, 0.16)',
                }}
              >
                D
              </span>
              <span
                className="text-[13px] leading-[1.45] text-[color:var(--ink)]"
                style={{
                  padding: '7px 11px',
                  background: 'var(--bg)',
                  border: '1px solid var(--hairline)',
                  borderRadius: '4px 12px 12px 12px',
                  boxShadow: '0 6px 18px rgba(10, 10, 12, 0.07)',
                }}
              >
                Approved by all three supervisors.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────── */}
      <section id="experience" className="mx-auto max-w-[1100px] pt-24 md:pt-32">
        <Reveal>
          <h2 style={eyebrow}>Experience</h2>
          <hr className="mt-4 border-0 border-t" style={{ borderColor: 'var(--hairline)' }} />

          {ABOUT.experience.map((exp, i) => (
            <div
              key={exp.company}
              className={`${rowGrid} border-b py-10`}
              style={{
                borderColor:
                  i < ABOUT.experience.length - 1 ? 'var(--hairline)' : 'transparent',
              }}
            >
              <p className="text-[13px] font-medium text-[color:var(--ink-3)] md:pt-[7px]">
                {exp.period}
              </p>
              <div>
                <h3 className="font-semibold text-[color:var(--ink)]" style={titleType}>
                  {exp.company}
                </h3>
                <p className="mt-1.5 text-[14px] font-medium text-[color:var(--ink)]">
                  {exp.role}
                </p>
                <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.65] text-[color:var(--ink-2)]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Skills ────────────────────────────────────── */}
      <section id="skills" className="mx-auto max-w-[1100px] pt-20 md:pt-24">
        <Reveal>
          <h2 style={eyebrow}>Skills</h2>
          <hr className="mt-4 border-0 border-t" style={{ borderColor: 'var(--hairline)' }} />

          <div className="space-y-7 pt-10">
            {ABOUT.skills.map(({ category, items }) => (
              <div key={category} className={rowGrid}>
                <p className="text-[13px] font-medium text-[color:var(--ink-3)] md:pt-[4px]">
                  {category}
                </p>
                <p className="max-w-[62ch] text-[15.5px] leading-[1.8] text-[color:var(--ink)]">
                  {items.join(' \u00b7 ')}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Education ─────────────────────────────────── */}
      <section id="education" className="mx-auto max-w-[1100px] pt-20 md:pt-24">
        <Reveal>
          <h2 style={eyebrow}>Education</h2>
          <hr className="mt-4 border-0 border-t" style={{ borderColor: 'var(--hairline)' }} />

          <div className={`${rowGrid} pt-10`}>
            <p className="text-[13px] font-medium text-[color:var(--ink-3)] md:pt-[7px]">
              {ABOUT.education.year}
            </p>
            <div>
              <h3 className="font-semibold text-[color:var(--ink)]" style={titleType}>
                {ABOUT.education.school}
              </h3>
              <p className="mt-1.5 text-[15.5px] text-[color:var(--ink-2)]">
                {ABOUT.education.degree}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Off the clock — 포토월 (PHOTOS 비어 있으면 렌더 안 됨) ── */}
      {PHOTOS.length > 0 && (
        <section id="life" className="mx-auto max-w-[1100px] pt-20 md:pt-24">
          <Reveal>
            <h2 style={eyebrow}>Off the clock</h2>
            <hr className="mt-4 border-0 border-t" style={{ borderColor: 'var(--hairline)' }} />

            <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 md:gap-6">
              {PHOTOS.map((photo) => (
                <figure key={photo.src}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5" style={monoCaption}>
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Contact ───────────────────────────────────── */}
      <section id="contact" className="mx-auto max-w-[1100px] pt-20 md:pt-24">
        <Reveal>
          <h2 style={eyebrow}>Contact</h2>
          <hr className="mt-4 border-0 border-t" style={{ borderColor: 'var(--hairline)' }} />

          <div className="pt-12">
            <p
              className="font-semibold text-[color:var(--ink)]"
              style={{
                fontSize: 'var(--text-lede)',
                letterSpacing: 'var(--track-lede)',
                lineHeight: 1.3,
              }}
            >
              Get in touch.
            </p>
            <p className="mt-5">
              <a
                href={`mailto:${ABOUT.email}`}
                className="link-quiet pb-[3px] font-medium text-[color:var(--ink)]"
                style={{ fontSize: 'var(--text-title)', letterSpacing: '-0.012em' }}
              >
                {ABOUT.email}
              </a>
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}