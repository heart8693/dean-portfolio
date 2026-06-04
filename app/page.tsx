import { getFeatured } from '@/lib/cms'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  const featured = getFeatured()

  return (
    <main className="tj-marketing" style={{ paddingTop: '64px' }}>

      {/* ── HERO — full-bleed ink editorial canvas with placeholder
            image region. User will swap the inner <div data-image-slot>
            for a real <img> when assets land. ── */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100svh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        background: '#0A0A0A',
        color: '#F7F4EE',
        padding: '64px 32px',
        overflow: 'hidden',
      }}>
        {/* Image placeholder — flat field, no stock photo, no AI orb */}
        <div
          data-image-slot="hero"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0A0A0A',
            zIndex: 0,
          }}
        />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          minHeight: 'calc(100svh - 64px - 128px)',
        }}>
          {/* Top eyebrow */}
          <p
            className="tj-eyebrow"
            style={{ color: '#F7F4EE', opacity: 0.7 }}
          >
            Product Designer — Chicago, IL
          </p>

          {/* Billboard lockup — bottom-anchored, Nike pattern */}
          <div style={{ marginTop: 'auto' }}>
            <h1
              className="tj-billboard"
              style={{
                color: '#ffffff',
                marginBottom: '24px',
                maxWidth: '1100px',
              }}
            >
              Test before design. Measure after ship.
            </h1>

            <p
              className="tj-body"
              style={{
                color: '#F7F4EE',
                opacity: 0.75,
                maxWidth: '520px',
                marginBottom: '36px',
              }}
            >
              I'm Dean, a product designer, SAIC student, three cats, zero untested assumptions.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#work" className="tj-cta-block">View selected work</a>
              <a
                href="/about"
                className="tj-cta-underline"
                style={{ color: '#ffffff ', borderBottomColor: '#ffffff ' }}
              >
                About me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK — image-as-card grid, flat editorial ── */}
      <section id="work" style={{
        padding: '96px 32px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px', maxWidth: '880px' }}>
            <p className="tj-eyebrow" style={{ color: 'var(--text-2)', marginBottom: '24px' }}>
              Selected Work
            </p>
            <h2 className="tj-display-1" style={{ color: 'var(--text-1)' }}>
              Case studies where testing changed the outcome.
            </h2>
          </div>

          {/* Project grid — no padding, no radius, no shadow, no card */}
          <div className="tj-project-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px 32px',
            alignItems: 'start',
          }}>
            {featured.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING BAND — flat ink reverse, orange email CTA,
            ghost outline résumé. No pills, no gradients. ── */}
      <section style={{
        padding: '120px 32px',
        background: '#0A0A0A',
        color: '#F7F4EE',
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <p className="tj-eyebrow" style={{ color: '#F7F4EE', opacity: 0.7, marginBottom: '24px' }}>
            Available for full-time role
          </p>
          <h2
            className="tj-display-1"
            style={{ color: '#F7F4EE', marginBottom: '40px', maxWidth: '900px' }}
          >
            Let's test something together.
          </h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="mailto:hyart2021@gmail.com" className="tj-cta-block">
              hyart2021@gmail.com
            </a>
            <a
              href="/Dean_Yoo_Resume.pdf"
              download
              className="tj-cta-underline"
              style={{ color: '#F7F4EE', borderBottomColor: '#F7F4EE' }}
            >
              Download résumé
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .tj-project-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  )
}
