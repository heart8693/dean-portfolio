// ⚠️ 이 파일은 너 프로젝트의 `app/page.tsx`로 저장돼야 함 (homepage)
// 케이스 스터디 페이지 `app/work/[slug]/page.tsx`는 outputs의 `page.tsx`임 (다른 파일).

import { getFeatured } from '@/lib/cms'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  const featured = getFeatured()

  return (
    <main style={{ paddingTop: '60px' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{
        height: 'calc(100svh - 60px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 40px',
        position: 'relative',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-3)', marginBottom: '24px',
        }}>
          Product Designer — Chicago, IL
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: 'var(--text-1)',
          maxWidth: '680px',
          marginBottom: '24px',
        }}>
          Test before design. Measure after ship.
        </h1>

        <p style={{
          fontSize: '15px',
          color: 'var(--text-2)',
          maxWidth: '380px',
          lineHeight: 1.75,
        }}>
        I'm Dean, a product designer, SAIC student, three cats, zero untested assumptions.        </p>

        {/* Scroll indicator */}
        <a href="#work" style={{
          position: 'absolute', bottom: '40px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'var(--text-3)', fontSize: '11px', letterSpacing: '0.08em',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ animation: 'bob 2s ease-in-out infinite' }}>
            <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Scroll
        </a>
      </section>

      {/* ── PROJECTS ─────────────────────────────── */}
      <section id="work" style={{
        padding: '80px 0 120px',
        borderTop: '1px solid var(--border)',
        transition: 'border-color 0.25s ease',
      }}>
        <div style={{ maxWidth: '934px', margin: '0 auto', padding: '0 15px' }}>
          <p style={{
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-3)', marginBottom: '48px',
          }}>
            Selected Work
          </p>

          {/* Tony Jin 2-col grid — 450px cards, 34px gap */}
          {/* alignItems: 'start' prevents sibling cards from stretching to match a hovered card's expanded height */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '34px',
            alignItems: 'start',
          }}>
            {featured.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{
        padding: '80px 48px 120px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        transition: 'border-color 0.25s ease',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-3)', marginBottom: '20px',
        }}>Available for full time role</p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em', lineHeight: 1.05,
          color: 'var(--text-1)', marginBottom: '32px',
        }}>
          Let's test something together.
        </h2>
        <a href="mailto:hyart2021@gmail.com" style={{
          fontSize: '13px', color: 'var(--text-2)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '2px',
        }}>
          hyart2021@gmail.com →
        </a>
      </section>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(4px); }
        }
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          div[style*="repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}