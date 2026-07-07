// Document-snippet rendering of the moderated session script excerpt
// for the Biasly measurement evidence section.

const QUESTIONS = [
  'Looking at the home screen, what do you notice first on this article card?',
  'Can you tell whether this source is reliable or not? What on the card tells you?',
  "Can you tell anything about this article's political lean just from the card? What gave it away?",
  "I'm going to show you this screen for five seconds. Afterward, tell me everything you remember seeing.",
]

export default function SessionScript() {
  return (
    <div style={{ margin: '28px 0' }}>
      {/* Header */}
      <p
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          marginBottom: '6px',
        }}
      >
        SESSION SCRIPT · EXCERPT
      </p>

      {/* Numbered prompts */}
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {QUESTIONS.map((q, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '18px',
              alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: '1px solid var(--hairline)',
              transition: 'border-color 0.25s ease',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--ink-3)',
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>{q}</p>
          </li>
        ))}
      </ol>

      {/* Caption */}
      <p style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.6, marginTop: '10px' }}>
        Four representative prompts from the moderated session script.
      </p>
    </div>
  )
}