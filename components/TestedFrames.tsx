import Image from 'next/image'

// Side-by-side baseline vs redesign frames exactly as shown in the
// Biasly moderated sessions. The two screenshots have slightly
// different ratios (full-bleed screen vs device bezel), so heights
// are matched and both images top-align inside contain-fit boxes.

const monoLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--ink)',
  margin: 0,
}

const subText: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--ink-3)',
  lineHeight: 1.5,
  margin: '4px 0 14px',
}

function Frame({
  src,
  alt,
  label,
  sub,
}: {
  src: string
  alt: string
  label: string
  sub: string
}) {
  return (
    <div>
      <p style={monoLabel}>{label}</p>
      <p style={subText}>{sub}</p>
      <div className="tj-tested-imgbox" style={{ position: 'relative' }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 720px) 100vw, 390px"
          style={{ objectFit: 'contain', objectPosition: 'top center' }}
        />
      </div>
    </div>
  )
}

export default function TestedFrames() {
  return (
    <div style={{ margin: '28px 0' }}>
      <div className="tj-tested-grid">
        <Frame
          src="/images/biasly-tested-1.png"
          alt="Baseline Biasly feed as shown in moderated sessions"
          label="VERSION A · AS TESTED"
          sub="Baseline feed, bias tags after the headline"
        />
        <div className="tj-tested-divider" aria-hidden="true" />
        <Frame
          src="/images/biasly-tested-2.png"
          alt="Redesigned Biasly feed as shown in moderated sessions"
          label="VERSION B · AS TESTED"
          sub="Redesign, bias context above the headline"
        />
      </div>

      {/* Bottom rule + centered method caption */}
      <div
        style={{
          borderTop: '1px solid var(--hairline)',
          marginTop: '24px',
          paddingTop: '10px',
          transition: 'border-color 0.25s ease',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.09em',
            color: 'var(--ink-3)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          12 MODERATED SESSIONS · OCT – DEC 2025
        </p>
      </div>

      <style>{`
        .tj-tested-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 28px;
          align-items: start;
        }
        .tj-tested-divider {
          border-left: 1px solid var(--hairline);
          align-self: stretch;
          transition: border-color 0.25s ease;
        }
        .tj-tested-imgbox { height: 560px; }
        @media (max-width: 720px) {
          .tj-tested-grid { grid-template-columns: 1fr; gap: 24px; }
          .tj-tested-divider {
            border-left: none;
            border-top: 1px solid var(--hairline);
            height: 1px;
            align-self: auto;
          }
          .tj-tested-imgbox { height: 70vh; max-height: 560px; }
        }
      `}</style>
    </div>
  )
}