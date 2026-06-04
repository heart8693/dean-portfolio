import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About — Dean Yoo' }

const ABOUT = {
  name: 'Dean Yoo',
  role: 'Product Designer',
  location: 'Chicago, IL',
  available: true,
  email: 'hyart2021@gmail.com',
  image: "/images/about.png",
  bio: [
    "I'm a product designer who doesn't trust assumptions. I test before I design and measure after I ship. The work here started the same way every time: a product that launched before anyone checked whether it worked.",
    "At one of these companies I ran the first usability test it had ever done. I'm the kind of designer who will defend a decision if the research backs it, and drop it the moment it doesn't. I study at SAIC, live in Chicago, and share a desk with three cats.",
  ],
  experience: [
    {
      company: 'FiPet',
      role: 'Product Design Intern',
      period: 'Jan 2026 – May 2026',
      description: 'Lead designer on a 13-person cross-functional team. Led the end to end design of the 1v1 Quiz Battle feature, from concept through hi-fi prototype, owning every screen and state. Introduced the company first usability testing and ran it in Maze to validate the design before the next build.',
    },
    {
      company: 'Biasly',
      role: 'Product Design Intern',
      period: 'Oct 2025 – Dec 2025',
      description: 'Sole mobile designer on the team. Owned every mobile screen end-to-end. Redesigned the core news feed to surface political bias before users read a single headline.',
    },
    {
      company: 'Urban Creator',
      role: 'Graphic Designer',
      period: 'May 2025 – Jan 2026',
      description: 'Designed responsive digital interfaces using Webflow and HTML/CSS. Refined component-based design patterns and updated design system documentation.',
    },
  ],
  skills: [
    { category: 'Design', items: ['Product Design', 'Interaction Design', 'Information Architecture', 'Design Systems', 'Usability Testing'] },
    { category: 'Tools', items: ['Figma', 'Adobe Creative Suite', 'Maze', 'Framer', 'Webflow', 'Protopie'] },
    { category: 'Code', items: ['HTML/CSS', 'React'] },
    { category: 'AI', items: ['Claude Code','Google Stich','UX Pilot', 'AI-assisted design workflows'] },
  ],
  education: {
    school: 'School of the Art Institute of Chicago',
    degree: 'BFA, Visual Communication',
    year: 'Dec 2026',
  },
}

const microLbl: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-3)',
}

export default function AboutPage() {
  const sidebarNav = [
    { id: 'intro', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ]

  return (
    <main className="tj-marketing" style={{ paddingTop: '64px' }}>
      <div style={{ display: 'flex', maxWidth: '1380px', margin: '0 auto' }}>

        {/* ── LEFT SIDEBAR — same as case study ── */}
        <aside style={{
          width: '224px',
          flexShrink: 0,
          position: 'sticky',
          top: '64px',
          height: 'calc(100vh - 64px)',
          borderRight: '1px solid var(--text-1)',
          padding: '40px 0',
          transition: 'border-color 0.25s ease',
        }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text-2)',
            textDecoration: 'none', marginBottom: '40px',
            padding: '0 20px', transition: 'color 0.15s ease',
          }} className="tj-link">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>

          <nav>
            {sidebarNav.map(item => (
              <a key={item.id} href={'#' + item.id} className="tj-link" style={{
                display: 'block', padding: '8px 20px',
                fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'var(--text-1)',
                textDecoration: 'none', transition: 'color 0.15s ease',
              }}>
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ margin: '24px 20px 0', paddingTop: '20px', borderTop: '1.5px solid var(--text-1)' }}>
            <a href={`mailto:${ABOUT.email}`} className="tj-cta-underline" style={{ fontSize: '13px' }}>
              <span>Get in touch</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>

        {/* ── MAIN CONTENT — 900px same as case study ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <article style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 60px 120px' }}>

            {/* ── INTRO ─────────────────────────── */}
            <section id="intro" style={{ marginBottom: '80px', paddingBottom: '72px', borderBottom: '1px solid var(--text-1)' }}>
              <p style={{ ...microLbl, marginBottom: '20px' }}>About</p>

              {/* 2-col: text left, photo right */}
              <div className="tj-about-intro" style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '56px', alignItems: 'start' }}>

                {/* Left — text */}
                <div>
                  <h1 className="tj-billboard" style={{
                    color: 'var(--text-1)',
                    marginBottom: '32px',
                  }}>{ABOUT.name}</h1>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    {[ABOUT.role, ABOUT.location, ABOUT.available ? 'Available for work' : ''].filter(Boolean).map(t => (
                      <span key={t} className="tj-flag">{t}</span>
                    ))}
                  </div>

                  {ABOUT.bio.map((para, i) => (
                    <p key={i} className="tj-body" style={{
                      color: i === 0 ? 'var(--text-1)' : 'var(--text-2)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                      fontWeight: i === 0 ? 500 : 400,
                    }}>{para}</p>
                  ))}

                  <a href={`mailto:${ABOUT.email}`} className="tj-cta-block" style={{ marginTop: '20px' }}>
                    {ABOUT.email}
                  </a>
                </div>

                {/* Right — photo (sharp corners, flat field) */}
                <div className="tj-about-photo" style={{ position: 'sticky', top: '88px' }}>
                  <div style={{
                    width: '240px',
                    aspectRatio: '6/9',
                    background: 'var(--surface-soft)',
                    borderRadius: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Photo */}
                    <img
                      src="/images/about.png"
                      alt="Dean Yoo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* ── EXPERIENCE ────────────────────── */}
            <section id="experience" style={{ marginBottom: '80px', paddingBottom: '72px', borderBottom: '1px solid var(--text-1)' }}>
              <p style={{ ...microLbl, marginBottom: '12px' }}>Experience</p>
              <hr style={{ border: 'none', borderTop: '1.5px solid var(--text-1)', margin: '0 0 40px 0' }} />

              {ABOUT.experience.map((exp, i) => (
                <div key={exp.company} className="tj-about-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '32px',
                  paddingBottom: i < ABOUT.experience.length - 1 ? '32px' : 0,
                  marginBottom: i < ABOUT.experience.length - 1 ? '32px' : 0,
                  borderBottom: i < ABOUT.experience.length - 1 ? '1px solid var(--text-1)' : 'none',
                }}>
                  <div>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--text-2)',
                      marginBottom: '4px',
                    }}>{exp.period}</p>
                  </div>
                  <div>
                    <p className="tj-display-2" style={{
                      color: 'var(--text-1)',
                      marginBottom: '6px',
                      textTransform: 'uppercase',
                    }}>{exp.company}</p>
                    <p style={{ ...microLbl, marginBottom: '14px', color: 'var(--accent)' }}>{exp.role}</p>
                    <p className="tj-body" style={{ color: 'var(--text-2)' }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* ── SKILLS ────────────────────────── */}
            <section id="skills" style={{ marginBottom: '80px', paddingBottom: '72px', borderBottom: '1px solid var(--text-1)' }}>
              <p style={{ ...microLbl, marginBottom: '12px' }}>Skills</p>
              <hr style={{ border: 'none', borderTop: '1.5px solid var(--text-1)', margin: '0 0 40px 0' }} />

              {ABOUT.skills.map(({ category, items }) => (
                <div key={category} className="tj-about-row" style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '32px',
                  marginBottom: '24px',
                  alignItems: 'start',
                }}>
                  <p style={{ ...microLbl, paddingTop: '8px' }}>{category}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {items.map(skill => (
                      <span key={skill} className="tj-flag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* ── EDUCATION ─────────────────────── */}
            <section id="education" style={{ marginBottom: '40px' }}>
              <p style={{ ...microLbl, marginBottom: '12px' }}>Education</p>
              <hr style={{ border: 'none', borderTop: '1.5px solid var(--text-1)', margin: '0 0 40px 0' }} />

              <div className="tj-about-row" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--text-2)',
                }}>{ABOUT.education.year}</p>
                <div>
                  <p className="tj-display-2" style={{
                    color: 'var(--text-1)',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}>
                    {ABOUT.education.school}
                  </p>
                  <p className="tj-body" style={{ color: 'var(--text-2)' }}>{ABOUT.education.degree}</p>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>

      <style>{`
        .tj-link:hover { color: var(--text-1) !important; }
        @media (max-width: 1024px) { aside { display: none !important; } }
        @media (max-width: 720px) {
          article { padding: 40px 24px 80px !important; }
          
          /* Intro: stack, photo first (mobile profile pattern) */
          .tj-about-intro {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .tj-about-photo {
            position: static !important;
            order: -1 !important;
          }
          .tj-about-photo > div {
            margin: 0 auto !important;
          }
          
          /* Experience / Skills / Education: stack label above content */
          .tj-about-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </main>
  )
}