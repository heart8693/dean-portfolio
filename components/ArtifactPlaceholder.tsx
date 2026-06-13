// Reusable evidence-slot placeholder. Never holds a generated image:
// it marks exactly where a real artifact will be dropped in, and the
// caption says exactly what to capture.
type Props = {
  label: string          // short monospace label shown inside the box
  caption: string        // capture instruction, e.g. "Drop in: ..."
  aspectRatio?: string   // CSS aspect-ratio, default '16/9'
}

export default function ArtifactPlaceholder({ label, caption, aspectRatio = '16/9' }: Props) {
  return (
    <figure style={{ margin: '28px 0' }}>
      <div
        style={{
          aspectRatio,
          background: 'var(--surface)',
          border: '1px dotted var(--border)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            padding: '0 16px',
            textAlign: 'center',
          }}
        >
          {label}
        </p>
      </div>
      <figcaption
        style={{
          marginTop: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-3)',
          lineHeight: 1.6,
        }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}
