import type { Persona } from '@/lib/cms'

const monoLabel: React.CSSProperties = {
  fontSize: '10px',
  color: 'var(--ink-3)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  margin: 0,
  fontWeight: 600,
  lineHeight: 1.4,
}

export default function PersonaCard({ persona: p }: { persona: Persona }) {
  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: '14px',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Portrait image — aspect ratio scales with card width.
          4:3 keeps Lyft cards close to original height (~210px) and
          gives FiPet's wider cards more vertical room (~330px) so
          portraits don't get awkwardly cropped. */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          background: 'var(--surface)',
          overflow: 'hidden',
        }}
      >
        <img
          src={p.image}
          alt={p.archetype}
          loading="lazy" decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            display: 'block',
          }}
        />
      </div>

      {/* Content — has its own padding and gap */}
      <div
        style={{
          padding: '14px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          flex: 1,
        }}
      >
        {/* AI disclosure */}
        <p
          style={{
            fontSize: '9px',
            color: 'var(--ink-3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
            fontWeight: 600,
          }}
        >
          AI PORTRAIT
        </p>

        {/* Header: archetype + name + meta */}
        <header>
          <p style={{ ...monoLabel, marginBottom: '10px' }}>
            {p.number} / {p.archetype}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: 0,
              color: 'var(--ink)',
              margin: '0 0 4px',
              lineHeight: 1.33,
            }}
          >
            {p.name}
          </h3>
          <p
            style={{
              fontSize: '11px',
              color: 'var(--ink-3)',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            {p.meta}
          </p>
        </header>

        {/* Quote */}
        <blockquote
          style={{
            margin: 0,
            padding: '16px',
            background: 'var(--bg)',
            borderRadius: '12px',
            borderLeft: '3px solid var(--ink)',
            transition: 'background 0.25s ease',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: 'var(--ink)',
              margin: 0,
              letterSpacing: '-0.005em',
            }}
          >
            {'"' + p.quote + '"'}
          </p>
          {p.quoteAttribution && (
            <p
              style={{
                fontSize: '10px',
                color: 'var(--ink-3)',
                margin: '6px 0 0',
                letterSpacing: '0.01em',
              }}
            >
              {p.quoteAttribution}
            </p>
          )}
        </blockquote>

        {/* Key needs (3 bullets) */}
        <div>
          <p style={{ ...monoLabel, marginBottom: '10px' }}>KEY NEEDS</p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
            }}
          >
            {p.keyNeeds.map((n, i) => (
              <li
                key={i}
                style={{
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  color: 'var(--ink-2)',
                  paddingLeft: '14px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: 'var(--ink-3)',
                    fontWeight: 600,
                  }}
                >
                  →
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Design implication — pushed to bottom for cross-card alignment */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid var(--hairline)',
            transition: 'border-color 0.25s ease',
          }}
        >
          <p style={{ ...monoLabel, color: 'var(--ink)', marginBottom: '8px' }}>
            DESIGN IMPLICATION
          </p>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.55,
              color: 'var(--ink)',
              margin: 0,
              fontWeight: 500,
            }}
          >
            {p.designImplication}
          </p>
        </div>
      </div>
    </article>
  )
}