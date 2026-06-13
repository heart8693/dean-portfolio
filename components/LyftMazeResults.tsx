import Image from 'next/image'

// Maze Round 1 result panels for the Lyft measurement evidence
// section, split into two groups: what the data supports and what
// the test pushed back on. Mirrors the FiPet/Biasly evidence styling:
// monospace label above, dotted hairline frame, small gray caption.

type Panel = {
  src: string
  alt: string
  label: string
  caption: string
}

const SUPPORTS: Panel[] = [
  {
    src: '/images/lyft-maze-planride.png',
    alt: 'Maze result panel for the Plan Your Ride flow showing 100% success and 0% drop-off across 10 sessions',
    label: 'PLAN YOUR RIDE · 100%',
    caption: 'Dock planning flow: 100% success, 0% drop-off across 10 sessions. The task was exploratory; Maze counts taps outside hotspots as misclicks.',
  },
  {
    src: '/images/lyft-maze-confidence.png',
    alt: 'Maze opinion-scale panel showing a 4.4 out of 5 dock confidence rating',
    label: 'CONFIDENCE · 4.4/5',
    caption: 'How confident did you feel that you would find an available dock at your destination (n=10).',
  },
  {
    src: '/images/lyft-maze-ease.png',
    alt: 'Maze opinion-scale panel showing a 4.4 out of 5 ease rating for the redesigned experience',
    label: 'EASE · 4.4/5',
    caption: 'Overall ease of the redesigned experience (n=5).',
  },
  {
    src: '/images/lyft-maze-trust.png',
    alt: 'Maze opinion-scale panel showing a 4.2 out of 5 trust rating',
    label: 'TRUST · 4.2/5',
    caption: 'Would you trust this system to help you find a dock on future rides (n=5).',
  },
]

const PUSHBACK: Panel[] = [
  {
    src: '/images/lyft-maze-task.png',
    alt: 'Maze result panel for the station comparison task showing 7 of 8 sessions completing it',
    label: 'COMPARE STATIONS · 87.5%',
    caption: '7 of 8 sessions completed the comparison task; 1 dropped. The flow needed more guidance than the planning flow.',
  },
  {
    src: '/images/lyft-maze-pricenotice.png',
    alt: 'Maze panel showing half of participants did not notice the price difference between stations',
    label: 'PRICE NOTICED · 50/50',
    caption: 'Half of participants did not notice the price difference between stations (n=8).',
  },
  {
    src: '/images/lyft-maze-choice.png',
    alt: 'Maze panel showing dock choice reasons: 56% fastest, 22% closest, 11% price',
    label: 'WHY THIS DOCK · SPEED WINS',
    caption: 'Asked why they chose a dock, 56% said fastest and 22% closest; 11% chose on price (n=9). Price alone is a weak steering signal; availability and time dominate.',
  },
]

const groupHeader: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: 'var(--text-1)',
  margin: '0 0 16px',
}

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

export default function LyftMazeResults() {
  return (
    <div style={{ margin: '28px 0 0' }}>
      <p style={groupHeader}>WHAT THE DATA SUPPORTS</p>
      <div className="tj-maze-grid">
        {SUPPORTS.map(panel => (
          <MazePanel key={panel.src} panel={panel} />
        ))}
      </div>

      <p style={{ ...groupHeader, marginTop: '40px' }}>WHAT THE TEST PUSHED BACK ON</p>
      <div className="tj-maze-grid">
        {PUSHBACK.map((panel, i) => (
          <MazePanel key={panel.src} panel={panel} fullWidth={i === PUSHBACK.length - 1} />
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
