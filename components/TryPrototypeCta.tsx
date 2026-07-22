// TryPrototypeCta — matches the FiPet prototype spotlight button exactly
// (tj-cta, var(--accent), radius 6, same arrow) so every prototype CTA
// on the site shares one shape.

import type { TryPrototype } from '@/lib/cms'

export default function TryPrototypeCta({ data }: { data: TryPrototype }) {
  return (
    <div>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tj-cta"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 22px',
          background: 'var(--accent)',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: '6px',
          letterSpacing: '-0.01em',
          textDecoration: 'none',
          transition: 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {data.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2h6v6M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
      {data.note && (
        <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6 }}>
          {data.note}
        </p>
      )}
    </div>
  )
}
