import { notFound } from 'next/navigation'
import { getProject, getAllSorted } from '@/lib/cms'
import type { Metric, Principle, Change, ShowcasePanel, DesignAlternative, UsabilityFinding, WhyCodedItem, PrototypeVideo } from '@/lib/cms'
import Link from 'next/link'
import type { Metadata } from 'next'
import ScrollHighlight from '@/components/ScrollHighlight'
import CaseStudyNav from '@/components/CaseStudyNav'
import PersonaCard from '@/components/PersonaCard'
import ArtifactPlaceholder from '@/components/ArtifactPlaceholder'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSorted().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${p.title} · Dean Yoo`,
      description: p.description,
      url: `/work/${slug}`,
      type: 'article',
    },
  }
}

// H = inline highlight. Wrap any phrase directly in JSX: <H>exact phrase</H>
// Activates on scroll via IntersectionObserver. No CMS parsing needed.
function H({ children }: { children: React.ReactNode }) {
  return <ScrollHighlight>{children}</ScrollHighlight>
}

// Uniform method caption under every Biasly metric (page + homepage card)
const BIASLY_METHOD_CAPTION = '12 moderated sessions, Oct - Dec 2025, observer-coded'
const methodCaptionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  color: 'var(--text-3)',
  lineHeight: 1.5,
  marginTop: '6px',
}


export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const all = getAllSorted()
  const idx = all.findIndex(x => x.slug === slug)
  const next = all[idx + 1] ?? null
  const prev = all[idx - 1] ?? null

  const sections = [
    { id: 'overview', label: 'Overview', sub: [{ id: 'overview-problem', label: 'Problem' }, { id: 'overview-solution', label: 'Solution' }] },
    ...(p.beyondFlows && p.beyondFlows.length > 0 ? [{ id: 'beyond', label: 'Beyond the Home Screen', sub: [] }] : []),
    { id: 'research', label: 'Research', sub: [{ id: 'research-why', label: 'Why This Project' }, { id: 'research-domain', label: 'Competitive Landscape' }, { id: 'research-user', label: 'User Research' }, { id: 'research-goals', label: 'Design Goals' }] },
    { id: 'design', label: 'Design', sub: [{ id: 'design-framing', label: 'Framing' }, { id: 'design-alternatives', label: 'Alternatives' }, { id: 'design-feedback', label: 'Feedback' }, { id: 'design-decisions', label: 'Decisions' }] },
    ...(p.usabilityTesting ? [{ id: 'usability-testing', label: 'Usability Testing', sub: [] }] : []),
    ...(p.prototypeSpotlight ? [{ id: 'prototype-spotlight', label: 'Prototype Spotlight', sub: [] }] : []),
    { id: 'outcome', label: 'Outcome', sub: [] },
    { id: 'future', label: 'Future Steps', sub: [] },
    { id: 'reflection', label: 'What I Learned', sub: [] },
  ]
  
  return (
    <main className={`tj-case tj-case--${slug}`} style={{ paddingTop: '60px', background: 'var(--bg)', transition: 'background 0.25s ease' }}>
      <div style={{ display: 'flex', maxWidth: '1380px', margin: '0 auto' }}>

        {/* ── LEFT SIDEBAR — scroll-spy, collapsible (client component) ── */}
        <CaseStudyNav sections={sections} />

        {/* ── MAIN CONTENT — 900px single column ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── HERO IMAGE — unified for all case studies ── */}
          {(p.heroImage || p.coverImage) && (
           <div className="tj-hero-wrap" style={{ padding: '40px 0 80px' }}>
            <picture>
              {p.heroImageMobile && (
                <source media="(max-width: 720px)" srcSet={p.heroImageMobile} />
              )}
              <img
                src={p.heroImage ?? p.coverImage}
                alt={p.title}
                fetchPriority="high"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </picture>
         </div>
          )}

          <article style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 60px 120px' }}>

            {/* Visually hidden page heading — the visual title lives in the hero image */}
            <h1 style={{
              position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px',
              overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
            }}>{p.title}</h1>

            {/* HEADER — metrics first, then tags, lede, meta strip */}
            <header style={{ marginBottom: '64px', paddingBottom: '48px' }}>

              {/* Key metrics highlights — outcome surfaced immediately */}
              <div className="tj-metrics-grid" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(p.metrics.length, 3)}, 1fr)`,
                gap: '1px',
                background: 'var(--border)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '40px',
                transition: 'border-color 0.25s ease',
              }}>
                {p.metrics.slice(0, 3).map((m: Metric) => (
                  <div key={m.label} style={{ padding: '28px 24px', background: 'var(--card)', transition: 'background 0.25s ease' }}>
                    <p style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-1)', lineHeight: 1, marginBottom: '10px' }}>{m.value}</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '3px', letterSpacing: '-0.01em' }}>{m.label}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-3)', lineHeight: 1.5 }}>{m.context}</p>
                    {p.slug === 'biasly' && <p style={methodCaptionStyle}>{BIASLY_METHOD_CAPTION}</p>}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <span style={tagStyle}>{p.category}</span>
                <span style={tagStyle}>{p.year}</span>
              </div>

              {/* Description — large lede, visual anchor */}
              <p style={{
                fontSize: 'clamp(1.375rem, 2.2vw, 1.625rem)',
                color: 'var(--text-1)',
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: '-0.015em',
                maxWidth: '720px',
                marginBottom: '40px',
              }}>
                {p.description}
              </p>

              {/* Meta horizontal strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '32px',
                padding: '20px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                transition: 'border-color 0.25s ease',
              }} className="tj-meta-strip">
                {[
                  { label: 'Role', value: p.role },
                  { label: 'Team', value: p.team },
                  { label: 'Timeline', value: p.timeline },
                  { label: 'Tools', value: p.tools },
                ].map(({ label, value }) => (
                  <div key={label} style={{ minWidth: '120px' }}>
                    <p style={{ ...microLbl, marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.4 }}>{value}</p>
                  </div>
                ))}
              </div>
            </header>

            {/* ── OVERVIEW ────────────────────────── */}
            <section id="overview" style={{ marginBottom: '96px' }}>
              <SectionLabel>Overview</SectionLabel>
              <SectionHR />

              {/* Problem — text left, full mobile screenshot right */}
              <H2 id="overview-problem">Problem</H2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '48px', alignItems: 'start', marginBottom: '40px' }} className="tj-split">
                {/* Text left */}
                <div>
                  {p.slug === 'biasly' ? (
                    <p style={bodyLg}>
                      Casual news readers who use Biasly to stay politically informed often find themselves <H>reacting to headlines before ever registering bias</H> context beneath them. The bias indicator existed, but <H>it just appeared too late</H>. By the time users reached it, they had already formed an opinion.
                    </p>
                  ) : p.slug === 'fipet' ? (
                    <p style={bodyLg}>
                      FiPet <H>shipped to the App Store with no usability testing</H>. Few downloads. Poor reviews. Users weren't coming back. The original design was too complex for the 8–15 audience it was built for, heavy gradients, ambiguous icons, a flow no one could follow on the first try. No one described the app as fun. The team had built a financial literacy product for kids and <H>shipped it the way you'd ship enterprise software</H>.
                    </p>
                  ) : p.slug === 'ride-availability' ? (
                    <p style={bodyLg}>
                      I'm a Lyft bike user. I'd check availability at home, ride 15 minutes, and find all docks taken. Repeatedly. <H>Personal frustration became the design brief</H>. When I dug into the system, the same pattern kept showing up across three breakdowns that look separate but trace back to one cause: <H>Lyft's prediction infrastructure was never exposed to riders</H>.
                    </p>
                  ) : (
                    <p style={bodyLg}>{p.problemBody}</p>
                  )}

                  {/* Pain points */}
                  <div style={{ marginTop: '24px' }}>
                    {p.problemPoints.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid var(--border)', transition: 'border-color 0.25s ease' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-3)', flexShrink: 0, minWidth: '16px' }}>{i + 1}.</span>
                        <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.75 }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image right — full height, narrow width like a phone (kept as-is, Before only) */}
                {p.beforeImage && (
                  <figure style={{ margin: 0, position: 'sticky', top: '88px' }}>
                    <img
                      src={p.beforeImage}
                      alt="Before"
                      loading="lazy" decoding="async"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                    <figcaption style={captionStyle}>Before</figcaption>
                  </figure>
                )}
              </div>

              {/* Solution */}
              <H2 top id="overview-solution">{p.solutionTitle}</H2>
              <p style={bodyLg}>{p.solutionBody}</p>

              {/* 3 showcase panels — 1st/3rd: image left text right | 2nd: text left image right */}
              <div style={{ marginTop: '48px' }}>
                {p.showcasePanels.map((panel: ShowcasePanel, panelIdx: number) => {
                  const flipped = panelIdx === 1
                  const imageEl = (
                    <div style={{ background: panel.video ? 'transparent' : 'var(--surface)', borderRadius: '14px', overflow: 'hidden', width: 'fit-content', justifySelf: flipped ? 'end' : 'start', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', transition: 'background 0.25s ease' }}>
                      {panel.video
                        ? <video src={panel.video} autoPlay loop muted playsInline style={{ maxWidth: '100%', maxHeight: '600px', width: 'auto', height: 'auto', display: 'block', borderRadius: '14px' }} />
                        : panel.image
                          ? <img src={panel.image} alt={panel.title} loading="lazy" decoding="async" style={{ maxWidth: '420px', maxHeight: '600px', width: 'auto', height: 'auto', display: 'block', borderRadius: '14px' }} />
                          : <p style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Add mockup</p>
                      }
                    </div>
                  )
                  const textEl = (
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-3)', marginBottom: '10px', letterSpacing: '0.04em' }}>{panel.number}.</p>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--accent-text)', marginBottom: '6px' }}>{panel.title}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-3)', fontStyle: 'italic', marginBottom: '14px', lineHeight: 1.5 }}>{panel.subtitle}</p>
                      <p style={body}>{panel.body}</p>
                    </div>
                  )
                  return (
                    <div key={panel.number} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '56px' }} className={`tj-split tj-panel ${flipped ? 'tj-panel-flipped' : ''}`}>
                      {imageEl}
                      {textEl}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ── BEYOND THE HOME SCREEN — shows if project has beyondFlows in cms.ts ── */}
            {p.beyondFlows && p.beyondFlows.length > 0 && (
              <section id="beyond" style={{ marginBottom: '96px' }}>
                <SectionLabel>Beyond the Home Screen</SectionLabel>
                <SectionHR />

                {p.beyondIntro && (
                  <p style={{ ...bodyLg, marginBottom: '72px' }}>{p.beyondIntro}</p>
                )}

                {p.beyondFlows.map((flow, i) => {
                  const isLast = i === p.beyondFlows!.length - 1
                  return (
                    <div key={flow.number} style={{
                      marginBottom: isLast ? 0 : '80px',
                      paddingBottom: isLast ? 0 : '72px',
                      borderBottom: isLast ? 'none' : '1px solid var(--border)',
                      transition: 'border-color 0.25s ease',
                    }}>
                      {/* Header — number + category + title */}
                      <div style={{ marginBottom: '28px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                          {flow.number}. {flow.category}
                        </p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--text-1)' }}>
                          {flow.title}
                        </h3>
                      </div>

                      {/* Image — full width, prominent */}
                      <div style={{
                        background: 'var(--surface)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        aspectRatio: '16/10',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        transition: 'background 0.25s ease',
                      }}>
                        {flow.image
                          ? <img src={flow.image} alt={flow.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                          : <p style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Add UI image</p>
                        }
                      </div>

                      {/* Problem / Decision / Outcome — clean label + content */}
                      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '16px 28px', rowGap: '14px' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', paddingTop: '3px' }}>PROBLEM</p>
                        <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>{flow.problem}</p>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', paddingTop: '3px' }}>DECISION</p>
                        <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>{flow.decision}</p>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-text)', letterSpacing: '0.06em', paddingTop: '3px' }}>OUTCOME</p>
                        <p style={{ fontSize: '15px', color: 'var(--text-1)', lineHeight: 1.7, fontWeight: 500 }}>{flow.outcome}</p>
                      </div>
                    </div>
                  )
                })}
              </section>
            )}

            {/* ── RESEARCH ────────────────────────── */}
            <section id="research" style={{ marginBottom: '96px' }}>
              <SectionLabel>Research</SectionLabel>
              <SectionHR />

              {/* Why */}
              <H2 id="research-why">{p.researchWhyTitle}</H2>
              {p.researchWhyBody.map((para, i) => (
                <p key={i} style={{ ...bodyLg, marginBottom: '16px' }}>{para}</p>
              ))}

              {/* Domain */}
              <H2 top id="research-domain">{p.researchDomainTitle}</H2>
              <p style={bodyLg}>{p.researchDomainBody}</p>
              <blockquote style={{ margin: '24px 0', padding: '16px 20px', background: 'var(--surface)', borderLeft: '3px solid var(--border)', borderRadius: '0 6px 6px 0', transition: 'background 0.25s ease' }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.6 }}>{p.researchDomainInsight}</p>
              </blockquote>

              {/* User research */}
              <H2 top id="research-user">{p.researchUserTitle}</H2>
              {p.researchQuote && (
                <div style={{ margin: '0 0 32px', padding: '0 0 0 24px', borderLeft: '3px solid var(--accent-text)' }}>
                  <p style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-1)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '10px' }}>
                    {'"' + p.researchQuote + '"'}
                  </p>
                  {p.researchQuoteAuthor && <p style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>{'— ' + p.researchQuoteAuthor}</p>}
                </div>
              )}
              {p.slug === 'biasly' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I ran 12 moderated usability sessions with participants aged 22–45 who identified as regular news readers. The task was simple: browse the feed naturally for 3 minutes, then answer questions about the bias of articles they had seen.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The results were consistent: 69% of participants could not correctly identify the bias of articles they had spent time reading. When probed, almost all of them said the same thing — <H>they hadn't noticed it</H>. Not because they didn't care. The indicator <H>never showed up at the right moment</H>.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I asked participants to walk me through a session using think-aloud protocol. The pattern was immediate. Every participant followed the same path: <H>headline → image → scroll</H>. The bias tag at the bottom was processed, when it was processed at all, as an afterthought.
                </p>
              </>) : p.slug === 'fipet' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  Across the 10 interviews, the most consistent feedback wasn't about the financial content. It was about the experience wrapping it. Parents described the app as 'too much', visually overwhelming for their kids. One participant compared it to a textbook. Another said it felt like homework, which was exactly the frame the product was trying to avoid.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I ran the interviews in my first week at the company. <H>Public intercepts in coffee shops, parks, and on the street</H>, ten participants, parents alongside their kids, so I could observe how kids actually approached the app and how parents read what they were seeing. A formal focus group would have been better. Setting one up wasn't realistic in the time available. The pattern was unambiguous: <H>kids opened the app once, weren't sure what to do, and didn't come back</H>. The <H>drop-off was at the moment of confusion</H>, not at the moment of disengagement with financial content. Most kids never got far enough to be bored by the curriculum.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The design system was a significant part of the problem. Heavy gradients, mixed custom icons, and inconsistent type made the interface hard to parse before users could even engage with the content. A 10-year-old <H>shouldn't have to decode the UI before they can learn about a budget</H>.
                </p>
              </>) : p.slug === 'ride-availability' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I mapped the user journey from intent-to-ride to post-ride and identified where prediction information was needed but absent. The biggest gap was at station selection: riders choose a starting station with no information about whether the destination dock will be available when they arrive. <H>The decision to ride is made with incomplete data</H>, and there's no way to recover mid-ride if conditions change.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I documented three personas around different rider contexts: a reliability-driven commuter, a multi-modal navigator combining bikes with transit, and an occasional explorer. <H>All three needed dock availability prediction before unlocking the bike, and none had it</H>.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The same pattern surfaced on the operations side. Dock imbalance (too many bikes at one station, too few at another) is a daily problem that Lyft solves with trucks. NYC Comptroller data shows rebalancing moves dropped 80% from 2014–2022, but the underlying imbalance is still being addressed primarily through manual logistics rather than rider behavior.
                </p>
              </>) : p.researchUserBody.map((para, i) => (
                <p key={i} style={{ ...bodyLg, marginBottom: '16px' }}>{para}</p>
              ))}
              <p style={{ ...microLbl, marginTop: '24px', marginBottom: '12px' }}>{p.researchMethod}</p>

              {/* Findings */}
              <H3>{p.researchUserFindingsTitle}</H3>
              <div style={{ marginTop: '12px' }}>
                {p.researchUserFindings.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', padding: '12px 0', borderBottom: '1px solid var(--border)', transition: 'border-color 0.25s ease' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', flexShrink: 0, marginTop: '2px' }}>{i + 1}.</span>
                    <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{f}</p>
                  </div>
                ))}
              </div>

              {/* Personas */}
              <H2 top>Personas</H2>
              <p style={bodyLg}>{p.researchPersonasBody}</p>

              {/* Persona cards — render when cms.ts provides them. Grid auto-sizes to persona count. */}
              {p.personas && p.personas.length > 0 && (
                <div
                  style={{
                    marginTop: '32px',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${p.personas.length}, 1fr)`,
                    gap: '20px',
                    alignItems: 'stretch',
                  }}
                  className="tj-split"
                >
                  {p.personas.map(persona => (
                    <PersonaCard key={persona.number} persona={persona} />
                  ))}
                </div>
              )}

              {/* Design goals */}
              <H2 top id="research-goals">{p.researchGoalsTitle}</H2>
              <p style={bodyLg}>{p.researchGoalsBody}</p>
            </section>

            {/* ── DESIGN ──────────────────────────── */}
            <section id="design" style={{ marginBottom: '96px' }}>
              <SectionLabel>Design</SectionLabel>
              <SectionHR />

              {p.slug === 'biasly' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  The further I got into the research, the more <H>it stopped feeling like a visibility problem</H>. It wasn't that users couldn't see the indicator. It was that they saw it in the wrong order. <H>That's when it clicked</H> — the fix wasn't making the indicator bigger or bolder. <H>It was when it showed up</H> that mattered.
                </p>
              ) : p.slug === 'fipet' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  The design phase had one constraint that shaped everything: 1v1 Quiz Battle had already been chosen as the feature. <H>My job wasn't to invent it, it was to figure out the experience around it</H>. That meant the design alternatives weren't about whether to ship a quiz battle. They were about how the home screen and battle loop framed it, and what made users want to come back. I explored two directions before the chosen one, and both got rejected for the same underlying reason.
                </p>
              ) : p.slug === 'ride-availability' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  The research established that <H>this is a UX surfacing problem, not a technology problem</H>. The fix doesn't require new prediction algorithms. Lyft already has them. It requires the existing infrastructure to be honest about what it knows and to expose that knowledge in the rider flow at the moment of decision.
                </p>
              ) : (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>{p.designIntro}</p>
              )}

              {/* Where */}
              <H2 id="design-framing">{p.designWhereTitle}</H2>
              {p.slug === 'fipet' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  My first instinct was to redesign the lessons themselves, shorter modules, more visuals, gamification inside each one. The interviews kept pointing somewhere else. Kids weren't dropping off in the middle of a lesson. <H>They were dropping off before the lesson started</H>. The intervention point wasn't inside the curriculum. It was the home screen, and whether it answered the question of why anyone should open the app on day two.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  So the design work focused on the loop, not the content. What does the user see first? What happens in the first 60 seconds? What makes them come back tomorrow? Every screen had to earn its place inside that question.
                </p>
              </>) : p.slug === 'ride-availability' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The initial framing I started with was 'add dock availability info to the ride flow.' That treats the problem as a missing screen or a missing notification, a feature gap.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  After the research, I reframed it as 'surface Lyft's existing infrastructure as user-facing UX.' That's a different design problem with a different solution space. If the brief is 'add info,' the design response is to wedge a status indicator somewhere. If the brief is 'surface infrastructure,' the design response is to look at every existing internal tool and ask where it should live in the rider flow.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  <H>The reframe was the most important contribution of the research phase</H>. Every design decision downstream, including rejecting two initially obvious directions, followed from it.
                </p>
              </>) : p.designWhereBody.map((para, i) => (
                <p key={i} style={{ ...bodyLg, marginBottom: '16px' }}>{para}</p>
              ))}

              {/* Alternatives */}
              <H2 top id="design-alternatives">{p.designAlternativesTitle}</H2>
              <p style={{ ...bodyLg, marginBottom: '32px' }}>{p.designAlternativesIntro}</p>

              {p.designAlternativesFeasibility && (
                <div style={{ padding: '16px 20px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '32px', transition: 'background 0.25s ease' }}>
                  <p style={{ ...microLbl, marginBottom: '6px' }}>Technical feasibility</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{p.designAlternativesFeasibility}</p>
                </div>
              )}

              {p.designAlternatives.map((alt: DesignAlternative) => {
                const isChosen   = alt.decision === 'chosen'
                return (
                <div key={alt.number} style={{
                  marginBottom: '48px',
                  position: 'relative',
                  paddingLeft: isChosen ? '20px' : '0',
                  borderLeft: isChosen ? '3px solid var(--accent-text)' : 'none',
                  transition: 'border-color 0.25s ease',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }} className="tj-split">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-3)' }}>
                          {isChosen ? `Direction ${alt.number}` : `Alternative ${alt.number}`}
                        </p>
                        {isChosen && (
                          <span style={{
                            fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                            color: 'var(--accent-text)', background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                            padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase',
                          }}>CHOSEN</span>
                        )}
                      </div>
                      <H3 noTop>{alt.title}</H3>
                      <p style={{ ...body, marginBottom: '20px' }}>{alt.description}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                        {/* PROS */}
                        <div>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: '#4CAF50', letterSpacing: '0.08em', marginBottom: '8px' }}>PROS</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {alt.pros.map((pro, i) => (
                              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#4CAF50', fontWeight: 700, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>+</span>
                                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.65 }}>{pro}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* CONS */}
                        <div>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: '#E05C5C', letterSpacing: '0.08em', marginBottom: '8px' }}>CONS</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {alt.cons.map((con, i) => (
                              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#E05C5C', fontWeight: 700, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>−</span>
                                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.65 }}>{con}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      position: 'relative',
                      borderRadius: p.slug === 'fipet' ? '0' : '15px',
                      border: p.slug === 'fipet' ? 'none' : (isChosen ? '1px solid var(--accent-text)' : '1px solid var(--border)'),
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.25s ease',
                    }}>
                      {alt.video
                        ? <video src={alt.video} autoPlay loop muted playsInline style={p.slug === 'fipet'
                            ? { maxWidth: '100%', maxHeight: '560px', width: 'auto', height: 'auto', display: 'block', borderRadius: '14px' }
                            : { width: '100%', height: 'auto', display: 'block' }
                          } />
                        : alt.image
                          ? <img src={alt.image} alt={alt.title} loading="lazy" decoding="async" style={p.slug === 'fipet'
                              ? { maxWidth: '100%', maxHeight: '560px', width: 'auto', height: 'auto', display: 'block', borderRadius: '14px' }
                              : { width: '100%', height: 'auto', display: 'block' }
                            } />
                          : <div style={{ aspectRatio: '4/3', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontSize: '11px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Alt {alt.number}</p></div>
                      }
                    </div>
                  </div>
                </div>
              )})}

              <div style={{ padding: '20px 24px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '56px', transition: 'background 0.25s ease' }}>
                <p style={{ ...microLbl, marginBottom: '6px' }}>Why I moved forward with this direction</p>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.75 }}>{p.designAlternativesConclusion}</p>
              </div>

              {/* User feedback */}
              <H2 id="design-feedback">{p.designFeedbackTitle}</H2>
              {p.slug === 'fipet' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The hardest disagreement on this project happened after the chosen direction was locked. The Result screen, what users see right after winning a battle, became a real argument about who the product was for and what moment we were designing for.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  The PM's position was 'Buy with earned coins' as the primary CTA. The logic was reasonable: users had just earned coins, conversion would never be higher, and a clear path to the shop reinforces the in-app economy. From a product perspective, this is exactly what you would build for a transactional adult user.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  My pushback was about who the user actually was. <H>8–15 year olds aren't transactional. They're momentum-driven</H>. The moment after winning a battle is an emotional high, competitive satisfaction, social proof, the visceral 'I want to do that again' feeling. Sending a kid to a shop in that exact moment interrupts the feedback loop the game was built to create. The shop should be reachable, not pushed.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I backed the position with three specific things: Flow Theory (Csikszentmihalyi, 1990) on the cost of interrupting peak engagement; a 2020 study (PMC) showing children are more sensitive to flow interruption than adults; and the 2023 Commonwealth Bank / Kit study showing 78% of parents say gamification improves their kids' financial capability, which means the metric that matters is habit formation, not transactions per session. The PM agreed. 'Play Again' became the primary CTA, with the shop accessible but not the primary path.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  Round 1 usability testing later validated this. <H>Ninety percent of participants said they'd play again</H>. That number is what I'd point to if anyone ever revisited the call.
                </p>
              </>) : p.slug === 'ride-availability' ? (<>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  Once dynamic pricing was the direction, the next question was where to apply it. The intuitive answer is destination-side: charge more to dock at understocked stations and less at overstocked ones, so riders go where Lyft needs the bikes.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  I rejected that. Destination-side pricing makes the financial decision happen at the wrong moment. Riders have already committed to a route and the bike is already moving. Asking them to reroute mid-ride to save $0.30 is <H>exactly the kind of active phone use the safety constraint forbids</H>.
                </p>
                <p style={{ ...bodyLg, marginBottom: '16px' }}>
                  Departure-side pricing solves both problems at once. Overstocked stations have bikes sitting idle (Lyft wants them gone) and full docks at the receiving end (Lyft wants the space cleared). Cheaper departures from overstocked stations clear space for incoming riders and reduce truck redistribution. <H>One price change, two problems solved, zero new infrastructure</H>.
                </p>
              </>) : p.designFeedbackBody.map((para, i) => (
                <p key={i} style={{ ...bodyLg, marginBottom: '16px' }}>{para}</p>
              ))}

              {/* Key decisions */}
              <H2 top id="design-decisions">{p.designDecisionsTitle}</H2>
              {p.slug === 'biasly' ? (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>
                  <H>I changed the order of what users see first</H>. Everything else followed from that. Three decisions shaped how that played out in practice.
                </p>
              ) : p.slug === 'ride-availability' ? (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>
                  Four decisions shaped the final design. Each was a direct response to the rider-side constraint that <H>all dock-related decisions happen before the ride begins</H>.
                </p>
              ) : (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>{p.designDecisionsBody}</p>
              )}

              <div style={{ marginBottom: '32px' }}>
                {p.strategyPrinciples.map((pr: Principle, i: number) => (
                  <div key={pr.label} className="tj-principles-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px', padding: '22px 0', borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', display: 'block', marginBottom: '6px', letterSpacing: '0.04em' }}>{String(i + 1).padStart(2, '0')}</span>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{pr.label}</p>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.8 }}>{pr.description}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }} />
              </div>

              {p.strategyRejected && (
                <div style={{ padding: '18px 22px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '14px', marginBottom: '48px', transition: 'background 0.25s ease' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-3)', flexShrink: 0, fontSize: '13px' }}>✕</span>
                  <div>
                    <p style={{ ...microLbl, marginBottom: '5px' }}>Direction rejected</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.75 }}>{p.strategyRejected}</p>
                  </div>
                </div>
              )}

              {/* Redesign — text above, before/after images below */}
              <H2>{p.redesignTitle}</H2>
              {p.slug === 'biasly' ? (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>
                  The redesigned feed makes one structural change: <H>bias shows up before users even start reading the headline</H>. Every other decision supports that.
                </p>
              ) : p.slug === 'fipet' ? (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>
                  The final hi-fi prototype was 30 screens at 402×874, built on an 8pt grid, with Boolean variables driving state changes (the Done button is gray when disabled, orange when an answer is selected). The system <H>extended past the Quiz Battle</H>: other designers adopted it for the rest of the app redesign.
                </p>
              ) : p.slug === 'ride-availability' ? (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>
                  The final design adds one mechanism the rider-facing product was missing: <H>a price signal that reflects network health</H>. Every other change in the design flows from this: the Live Activity, the rerouting, the $1.00 credit. The price signal itself reuses infrastructure Lyft already operates internally.
                </p>
              ) : (
                <p style={{ ...bodyLg, marginBottom: '32px' }}>{p.redesignBody}</p>
              )}

              {/* What changed — full width list */}
              <div style={{ marginBottom: '48px' }}>
                {p.redesignChanges.map((c: Change, i: number) => (
                  <div key={c.label} className="tj-changes-grid" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '20px', padding: '16px 0', borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', display: 'block', marginBottom: '3px' }}>{String(i + 1).padStart(2, '0')}</span>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.3 }}>{c.label}</p>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.7 }}>{c.description}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }} />
              </div>

              {/* Before / After — side by side, pulled toward the center to shrink the gap.
                  Before flush-right, After flush-left. Each image hugs its content (fit-content). */}
              {(p.beforeImage || p.afterImage) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'start' }} className="tj-split">
                  {[{ img: p.beforeImage, lbl: 'Before' }, { img: p.afterImage, lbl: 'After' }].map(({ img, lbl }, i) => (
                    <figure key={lbl} className="tj-ba-fig" style={{ margin: 0, width: 'fit-content', maxWidth: '100%', justifySelf: i === 0 ? 'end' : 'start' }}>
                      {img
                        ? <img src={img} alt={lbl} loading="lazy" decoding="async" style={{ maxWidth: '100%', maxHeight: '600px', width: 'auto', height: 'auto', display: 'block'}} />
                        : <div style={{ width: '320px', maxWidth: '100%', aspectRatio: '4/3', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={microLbl}>Add image</p></div>
                      }
                      <figcaption style={captionStyle}>{lbl}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>

            {/* ── USABILITY TESTING — shows if project has usabilityTesting in cms.ts ── */}
            {p.usabilityTesting && (
              <section id="usability-testing" style={{ marginBottom: '96px' }}>
                <SectionLabel>Usability Testing</SectionLabel>
                <SectionHR />

                {/* Round label */}
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: '14px' }}>
                  {p.usabilityTesting.round}
                </p>

                <H2>The Test</H2>
                {p.slug === 'fipet' ? (
                  <p style={bodyLg}>
                    FiPet had shipped without a single usability test, which was the original problem. After designing the 1v1 Quiz Battle feature, the question wasn't whether to test. It was how fast we could get evidence before shipping the next iteration. I built the test plan in Maze, ran it against the hi-fi Figma prototype, and made it the <H>first usability test in the company's history</H>.
                  </p>
                ) : p.slug === 'ride-availability' ? (
                  <p style={bodyLg}>
                    First Maze test on this project: a structured <H>validation of the dynamic pricing direction</H> and the dock prediction display. Round 2 is in progress.
                  </p>
                ) : (
                  <p style={bodyLg}>{p.usabilityTesting.context}</p>
                )}

                {/* Method + Participants info card */}
                <div style={{
                  background: 'var(--surface)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  padding: '20px 24px',
                  marginBottom: '40px',
                  display: 'grid',
                  gridTemplateColumns: '130px 1fr',
                  gap: '16px 28px',
                  transition: 'background 0.25s ease',
                }} className="tj-info-card">
                  <p style={{ ...microLbl, paddingTop: '3px' }}>PARTICIPANTS</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{p.usabilityTesting.participants}</p>
                  <p style={{ ...microLbl, paddingTop: '3px' }}>METHOD</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{p.usabilityTesting.method}</p>
                </div>

                {/* Metrics grid — n columns based on metrics count */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(' + Math.min(p.usabilityTesting.metrics.length, 4) + ', 1fr)',
                  gap: '1px',
                  background: 'var(--border)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '64px',
                  transition: 'border-color 0.25s ease',
                }} className="tj-metrics-grid">
                  {p.usabilityTesting.metrics.map((m: Metric) => (
                    <div key={m.label} style={{ padding: '28px 22px', background: 'var(--card)', transition: 'background 0.25s ease' }}>
                      <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-1)', lineHeight: 1, marginBottom: '10px' }}>{m.value}</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px', letterSpacing: '-0.01em' }}>{m.label}</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-3)', lineHeight: 1.5 }}>{m.context}</p>
                    </div>
                  ))}
                </div>

                {/* Findings */}
                <H2>What We Found, and What We Changed</H2>
                <p style={{ ...bodyLg, marginBottom: '36px' }}>
                  Each finding produced a specific refinement. The two-column structure below pairs the evidence with the design response.
                </p>

                <div style={{ marginBottom: '48px' }}>
                  {p.usabilityTesting.findings.map((f: UsabilityFinding, i: number) => {
                    const isLast = i === p.usabilityTesting!.findings.length - 1
                    return (
                      <div key={f.number} style={{
                        marginBottom: isLast ? 0 : '40px',
                        paddingBottom: isLast ? 0 : '36px',
                        borderBottom: isLast ? 'none' : '1px solid var(--border)',
                        transition: 'border-color 0.25s ease',
                      }}>
                        {/* Number + finding title */}
                        <div style={{ marginBottom: '16px' }}>
                          <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                            FINDING {f.number}
                          </p>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.35, color: 'var(--text-1)' }}>
                            {f.finding}
                          </h3>
                        </div>

                        {/* Evidence — quote style */}
                        <div style={{
                          padding: '14px 20px',
                          background: 'var(--surface)',
                          borderLeft: '3px solid var(--border)',
                          borderRadius: '0 6px 6px 0',
                          marginBottom: '22px',
                          transition: 'background 0.25s ease',
                        }}>
                          <p style={{ ...microLbl, marginBottom: '6px' }}>EVIDENCE</p>
                          <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>{f.evidence}</p>
                        </div>

                        {/* Refinement + reason — two-column grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '160px 1fr',
                          gap: '14px 28px',
                          rowGap: '16px',
                        }} className="tj-refinement-grid">
                          <p style={{ ...microLbl, paddingTop: '2px', color: 'var(--accent-text)' }}>WHAT WE CHANGED</p>
                          <p style={{ fontSize: '14px', color: 'var(--text-1)', lineHeight: 1.7, fontWeight: 500 }}>{f.refinement}</p>
                          <p style={{ ...microLbl, paddingTop: '2px' }}>WHY THIS FIX</p>
                          <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.7 }}>{f.refinementReason}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Conclusion */}
                <H2>Where This Led</H2>
                <p style={bodyLg}>{p.usabilityTesting.conclusion}</p>

                {/* Culture note callout */}
                {p.usabilityTesting.cultureNote && (
                  <div style={{
                    marginTop: '32px',
                    padding: '20px 24px',
                    background: 'var(--surface)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--accent-text)',
                    transition: 'background 0.25s ease',
                  }}>
                    <p style={{ ...microLbl, marginBottom: '8px', color: 'var(--accent-text)' }}>WHAT THIS CHANGED</p>
                    <p style={{ fontSize: '15px', color: 'var(--text-1)', lineHeight: 1.7, fontWeight: 500 }}>{p.usabilityTesting.cultureNote}</p>
                  </div>
                )}
              </section>
            )}

            {/* ── PROTOTYPE SPOTLIGHT — shows if project has prototypeSpotlight in cms.ts ── */}
            {p.prototypeSpotlight && (
              <section id="prototype-spotlight" style={{ marginBottom: '96px' }}>
                <SectionLabel>Prototype Spotlight</SectionLabel>
                <SectionHR />

                <H2>{p.prototypeSpotlight.title}</H2>
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-3)',
                  fontStyle: 'italic',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}>{p.prototypeSpotlight.subtitle}</p>
                {p.slug === 'fipet' ? (
                  <p style={bodyLg}>
                    After Round 1, the obvious next step was another Figma iteration. I argued against it. The remaining unknowns, real timer behavior, live score updates, rival turn-taking, answer-switching mid-question, couldn't be tested faithfully in a static prototype. So I built the next iteration in React, deployed it to Vercel, and ran Round 2 testing against the live build. The trade-off was time. The payoff was that <H>the validation could now reflect the real behavior</H>, not a Figma approximation of it. An unmoderated Round 2 launched on the live build; the first task block completed cleanly (n=7) but drop-off after it cut the round short, a lesson in pairing unmoderated tests with external prototypes.
                  </p>
                ) : (
                  <p style={bodyLg}>{p.prototypeSpotlight.body}</p>
                )}

                {/* Live link CTA */}
                {p.prototypeSpotlight.liveLink && (
                  
                  <a href={p.prototypeSpotlight.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tj-cta"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 22px',
                      background: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      marginTop: '8px',
                      marginBottom: '40px',
                      letterSpacing: '-0.01em',
                      transition: 'opacity 0.15s ease, transform 0.15s ease',
                    }}
                  >
                    {p.prototypeSpotlight.liveLinkLabel ?? 'Try the prototype'}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2h6v6M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </a>
                )}

                {/* Why coded — structured list */}
                <H2 top>Why a Coded Prototype</H2>
                <p style={{ ...bodyLg, marginBottom: '24px' }}>
                  Four behaviors Figma couldn't simulate. Each one was the specific reason this section of the loop needed a real build to test honestly.
                </p>

                <div style={{ marginBottom: '48px' }}>
                  {p.prototypeSpotlight.whyCoded.map((item: WhyCodedItem, i: number) => (
                    <div key={item.label} style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr',
                      gap: '24px',
                      padding: '20px 0',
                      borderTop: '1px solid var(--border)',
                      transition: 'border-color 0.25s ease',
                    }} className="tj-whycoded-grid">
                      <div>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'var(--text-3)',
                          display: 'block',
                          marginBottom: '5px',
                          letterSpacing: '0.04em',
                        }}>{String(i + 1).padStart(2, '0')}</span>
                        <p style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--text-1)',
                          lineHeight: 1.35,
                          letterSpacing: '-0.01em',
                        }}>{item.label}</p>
                      </div>
                      <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.75 }}>{item.description}</p>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', transition: 'border-color 0.25s ease' }} />
                </div>

                {/* Videos — autoplay loop muted, side-by-side if 2 */}
                {p.prototypeSpotlight.videos && p.prototypeSpotlight.videos.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: p.prototypeSpotlight.videos.length > 1 ? '1fr 1fr' : '1fr',
                  gap: '20px',
                  marginBottom: '24px',
                }} className="tj-split">
                  {p.prototypeSpotlight.videos.map((v: PrototypeVideo, i: number) => (
                    <figure key={i} style={{ margin: 0 }}>
                      <div style={p.slug === 'fipet' 
                        ? {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }
                        : {
                            background: 'var(--surface)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: '1px solid var(--border)',
                            transition: 'background 0.25s ease, border-color 0.25s ease',
                          }
                      }>
                        <video
                          src={v.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={p.slug === 'fipet'
                            ? { maxWidth: '100%', maxHeight: '560px', width: 'auto', height: 'auto', display: 'block', borderRadius: '14px' }
                            : { width: '100%', height: 'auto', display: 'block' }
                          }
                        />
                      </div>
                      <figcaption style={captionStyle}>{v.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}

                {/* Fallback image — only shown if no videos are present */}
                {(!p.prototypeSpotlight.videos || p.prototypeSpotlight.videos.length === 0) && p.prototypeSpotlight.fallbackImage && (
                  <figure style={{ margin: 0 }}>
                    <div style={{
                      background: 'var(--surface)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}>
                      <img
                        src={p.prototypeSpotlight.fallbackImage}
                        alt={p.prototypeSpotlight.title}
                        loading="lazy" decoding="async"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    </div>
                  </figure>
                )}
              </section>
            )}

            {/* ── OUTCOME ─────────────────────────── */}
            <section id="outcome" style={{ marginBottom: '96px' }}>
              <SectionLabel>Outcome</SectionLabel>
              <SectionHR />

              <H2>{p.impactTitle}</H2>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '20px', fontStyle: 'italic' }}>{p.impactMethod}</p>
              {p.slug === 'biasly' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  Post-redesign sessions used the same participants, same task, same duration. One variable: the layout. Users were now seeing bias <H>before they reacted to the headline</H> — and it showed in the numbers. The shift was not marginal. After handoff and QA, <H>a version based on this design is rolling out with team refinements</H>.
                </p>
              ) : p.slug === 'fipet' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  Round 1 was the company's first usability test. It validated the macro design (90% would play again, 4.2/5 fun, 100% task success on the core flow) and produced four specific refinements that moved into a coded React prototype for Round 2. The design system I built for the Quiz Battle feature was adopted across the team for the broader app redesign. The shift the team is still feeling, the one that won't show up in a portfolio metric, is that <H>decisions now start from data, not intuition</H>.
                </p>
              ) : p.slug === 'ride-availability' ? (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>
                  <H>Two reframes mattered more than any individual screen</H>. Existing tools are research artifacts — AirControl and Bike Angels exist because the primary product has a UX gap. Internal workarounds are diagnostic for primary product failure. And <H>the brief itself is a design decision</H> — changing the scope from 'add dock info' to 'surface existing infrastructure as UX' was the most important contribution of the project, more than any pixel.
                </p>
              ) : (
                <p style={{ ...bodyLg, marginBottom: '40px' }}>{p.impactBody}</p>
              )}

              <div className="tj-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(' + Math.min(p.metrics.length, 3) + ', 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '48px', transition: 'border-color 0.25s ease' }}>
                {p.metrics.map((m: Metric) => (
                  <div key={m.label} style={{ padding: '36px 28px', background: 'var(--card)', transition: 'background 0.25s ease' }}>
                    <p style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--text-1)', lineHeight: 1, marginBottom: '10px' }}>{(p.slug === 'biasly' || p.slug === 'fipet' || p.slug === 'ride-availability') ? <H>{m.value}</H> : m.value}</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px', letterSpacing: '-0.01em' }}>{m.label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6 }}>{m.context}</p>
                    {p.slug === 'biasly' && <p style={methodCaptionStyle}>{BIASLY_METHOD_CAPTION}</p>}
                  </div>
                ))}
              </div>

              {/* ── How these numbers were measured — Biasly evidence subsection ── */}
              {p.slug === 'biasly' && (
                <div style={{ marginBottom: '48px' }}>
                  <H2 top>How these numbers were measured</H2>
                  <p style={bodyLg}>
                    12 moderated sessions, run twice with the same participants: a baseline round on the original feed, then a follow-up round on the redesigned card structure. Bias recognition was observer-coded against predefined criteria. Time-to-identify was measured from card load to verbal identification. The session script and tested frames are shown below.
                  </p>
                  <div style={{ maxWidth: '560px' }}>
                    <ArtifactPlaceholder
                      label="SESSION SCRIPT"
                      aspectRatio="4/3"
                      caption="Drop in: 3-4 representative questions from the moderated session script, styled as a document snippet"
                    />
                  </div>
                  <ArtifactPlaceholder
                    label="TESTED FRAMES"
                    aspectRatio="16/9"
                    caption="Drop in: the baseline card and the redesigned card exactly as shown in sessions, side by side, labeled Version as tested"
                  />
                  <ArtifactPlaceholder
                    label="WORKING FILE"
                    aspectRatio="16/9"
                    caption="Drop in: Figma canvas view of the test file showing frame layout, cropped to exclude internal comments"
                  />
                </div>
              )}

             {((p as any).outcomeImage || p.afterImage) && (
              <figure className="tj-outcome-fig" style={{ margin: '0 -60px' }}>
                <img
                  src={(p as any).outcomeImage ?? p.afterImage}
                  alt="Final design"
                  loading="lazy" decoding="async"
                  style={{ width: '100%', display: 'block', borderRadius: '8px' }}
                />
              </figure>
            )}
            </section>

            {/* ── FUTURE STEPS ────────────────────── */}
            <section id="future" style={{ marginBottom: '96px' }}>
              <SectionLabel>{p.futureStepsTitle}</SectionLabel>
              <SectionHR />

              {p.futureSteps.map((step, i) => (
                <div key={i} style={{ marginBottom: '48px' }}>
                  <H2 top={i > 0}>{step.title}</H2>
                  {step.body.map((para, j) => (
                    <p key={j} style={{ ...bodyLg, marginBottom: '16px' }}>{para}</p>
                  ))}
                </div>
              ))}
            </section>

            {/* ── WHAT I LEARNED ──────────────────── */}
            <section id="reflection" style={{ marginBottom: '64px' }}>
              <SectionLabel>{p.reflectionTitle}</SectionLabel>
              <SectionHR />

              {p.reflections.map((r, i) => (
                <div key={i} style={{ marginBottom: '48px' }}>
                  <H2 top={i > 0}>{r.title}</H2>
                  <p style={bodyLg}>{r.body}</p>
                </div>
              ))}
            </section>

          </article>

          {/* PREV / NEXT */}
          <div style={{ borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', transition: 'border-color 0.25s ease' }}>
            <div style={{ borderRight: '1px solid var(--border)' }}>
              {prev && (
                <Link href={'/work/' + prev.slug} className="tj-nav-card" style={{ display: 'block', padding: '40px 60px', textDecoration: 'none', transition: 'background 0.15s ease' }}>
                  <p style={{ ...microLbl, marginBottom: '8px' }}>← Previous</p>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-1)', lineHeight: 1.2 }}>{prev.title}</p>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={'/work/' + next.slug} className="tj-nav-card" style={{ display: 'block', padding: '40px 60px', textDecoration: 'none', textAlign: 'right', transition: 'background 0.15s ease' }}>
                  <p style={{ ...microLbl, marginBottom: '8px' }}>Next →</p>
                  <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-1)', lineHeight: 1.2 }}>{next.title}</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tj-link:hover { color: var(--text-1) !important; }
        section[id], h2[id] { scroll-margin-top: 84px; }
        .tj-nav-card:hover { background: var(--surface) !important; }
        .tj-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        @media (max-width: 1024px) { aside { display: none !important; } }
        /* Desktop: flipped panels visually swap (image goes right) */
        @media (min-width: 721px) {
          .tj-panel-flipped > *:first-child { order: 2; justify-self: end;}
          .tj-panel-flipped > *:last-child { order: 1; }
        }
        @media (max-width: 720px) {
          article { padding: 40px 24px 80px !important; }
          .tj-split { grid-template-columns: 1fr !important; gap: 24px !important; }
          .tj-info-card { grid-template-columns: 1fr !important; gap: 4px 0 !important; }
          .tj-refinement-grid { grid-template-columns: 1fr !important; gap: 4px 0 !important; }
          .tj-whycoded-grid { grid-template-columns: 1fr !important; gap: 8px 0 !important; }
          .tj-metrics-grid { grid-template-columns: 1fr !important; }
          .tj-meta-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .tj-changes-grid { grid-template-columns: 1fr !important; gap: 4px 0 !important; padding: 16px 0 !important; }
          .tj-principles-grid { grid-template-columns: 1fr !important; gap: 6px 0 !important; padding: 16px 0 !important; }
          .tj-panel > * { justify-self: center !important; }
          .tj-ba-fig { justify-self: center !important; }
          .tj-hero-wrap { padding: 20px 0 40px !important; }
          .tj-outcome-fig { margin: 0 !important; }
        }
      `}</style>
    </main>
  )
}

// ── Shared styles ──────────────────────────────────

const bodyLg: React.CSSProperties = { fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '20px' }
const body: React.CSSProperties = { fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '16px' }
const microLbl: React.CSSProperties = { fontSize: '10px', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--text-3)' }
const tagStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 10px', background: 'var(--surface)' }
const captionStyle: React.CSSProperties = { marginTop: '8px', fontSize: '12px', color: 'var(--text-3)', textAlign: 'center' as const }

// ── Sub-components ─────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '12px' }}>{children}</p>
}

function SectionHR() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 40px 0', transition: 'border-color 0.25s ease' }} />
}

function H2({ children, top, id }: { children: React.ReactNode; top?: boolean; id?: string }) {
  return <h2 id={id} style={{ fontSize: 'clamp(1.375rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-1)', marginBottom: '18px', marginTop: top ? '48px' : '0' }}>{children}</h2>
}

function H3({ children, noTop }: { children: React.ReactNode; noTop?: boolean }) {
  return <h3 style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--text-1)', marginBottom: '12px', marginTop: noTop ? '0' : '32px' }}>{children}</h3>
}