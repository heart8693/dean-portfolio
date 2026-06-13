import Image from 'next/image'

// Maze Round 1 result panels for the FiPet measurement evidence
// section. Two-column grid on desktop with the last panel full width,
// stacked on mobile. Mirrors the Biasly evidence styling: monospace
// label above, small gray caption below.

type Panel = {
  src: string
  alt: string
  label: string
  caption: string
}

const PANELS: Panel[] = [
  {
    src: '/images/fipet-maze-task1.png',
    alt: 'Maze result panel for Task 1, starting a battle, showing 100% success across 22 recorded sessions',
    label: 'TASK 1 · START A BATTLE',
    caption: '100% success across 22 recorded sessions. The task was framed as open exploration; Maze counts any tap outside prototype hotspots as a misclick, which inflates misclick rate on exploratory tasks.',
  },
  {
    src: '/images/fipet-maze-task2.png',
    alt: 'Maze result panel for Task 2, completing the quiz, showing 100% success with 10 full completions',
    label: 'TASK 2 · COMPLETE THE QUIZ',
    caption: '100% success, 10 full completions.',
  },
  {
    src: '/images/fipet-maze-ease.png',
    alt: 'Maze opinion-scale panel showing a 4.8 out of 5 ease rating',
    label: 'EASE · 4.8/5',
    caption: 'How easy was it to go through all the quiz questions (n=10).',
  },
  {
    src: '/images/fipet-maze-fun.png',
    alt: 'Maze opinion-scale panel showing a 4.2 out of 5 fun rating',
    label: 'FUN · 4.2/5',
    caption: 'How fun was the Quiz Battle (n=10).',
  },
  {
    src: '/images/fipet-maze-replay.png',
    alt: 'Maze opinion panel showing 9 of 10 participants would play the Quiz Battle again',
    label: 'REPLAY INTENT · 90%',
    caption: '9 of 10 participants would play again.',
  },
]

const monoLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--text-1)',
  margin: '0 0 8px',
}

function MazePanel({ panel, fullWidth }: { panel: Panel; fullWidth?: boolean }) {
  return (
    <figure style={{ margin: 0, gridColumn: fullWidth ? '1 / -1' : 'auto' }}>
      <p style={monoLabel}>{panel.label}</p>
      <div
        style={{
          border: '1px dotted var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'border-color 0.25s ease',
        }}
      >
        <Image
          src={panel.src}
          alt={panel.alt}
          width={2240}
          height={1148}
          sizes={fullWidth ? '(max-width: 720px) 100vw, 780px' : '(max-width: 720px) 100vw, 380px'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      <figcaption
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'var(--text-3)',
          lineHeight: 1.6,
        }}
      >
        {panel.caption}
      </figcaption>
    </figure>
  )
}

export default function MazeResults() {
  return (
    <div style={{ margin: '28px 0 0' }}>
      <div className="tj-maze-grid">
        {PANELS.map((panel, i) => (
          <MazePanel key={panel.src} panel={panel} fullWidth={i === PANELS.length - 1} />
        ))}
      </div>
      <style>{`
        .tj-maze-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .tj-maze-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </div>
  )
}
