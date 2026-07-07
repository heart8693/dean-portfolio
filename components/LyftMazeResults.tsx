/* Lyft Round 1 evidence: Maze result exports.
   Evidence-family pattern shared with SessionScript and TestedFrames:
   topic label above, hairline frame, interpretive caption below.
   Includes the two blocks that pushed back on the pricing hypothesis,
   because evidence that argues with the design is the point. */

   type Fig = {
    src: string
    alt: string
    label: string
    caption: string
    span?: boolean
  }
  
  const FIGS: Fig[] = [
    {
      src: '/images/lyft-maze-planride.webp',
      span: true,
      label: 'PLAN YOUR RIDE \u00b7 SUCCESS WITH FRICTION',
      alt: 'Maze block: Plan your ride. 10 responses, 100% success rate, 0% drop-off, 52.9% misclick rate, 68.8s average duration.',
      caption:
        'All 10 sessions completed the dock planning flow, but a 52.9% misclick rate means the path was findable, not obvious. Affordance fixes moved to Round 2.',
    },
    {
      src: '/images/lyft-maze-task.webp',
      span: true,
      label: 'COMPARE STATIONS \u00b7 THE FRICTION TASK',
      alt: 'Maze block: Compare stations. 8 responses, 87.5% success rate, 12.5% drop-off, 76.3% misclick rate.',
      caption:
        '7 of 8 sessions completed the comparison (87.5%), with a 12.5% drop-off. The densest screen produced the most hesitation.',
    },
    {
      src: '/images/lyft-maze-confidence.webp',
      label: 'DOCK CONFIDENCE \u00b7 4.4 OF 5',
      alt: 'Maze opinion scale: how confident did you feel that you would find an available dock at your destination. 10 responses, 4.4 average.',
      caption:
        'How confident were riders of finding a dock at the destination: 4.4 of 5 (n=10). The core hypothesis held.',
    },
    {
      src: '/images/lyft-maze-trust.webp',
      label: 'FUTURE TRUST \u00b7 4.2 OF 5',
      alt: 'Maze opinion scale: would you trust this system to help you find a dock on future rides. 5 responses, 4.2 average.',
      caption: 'Would they trust the system on future rides: 4.2 of 5 (n=5).',
    },
    {
      src: '/images/lyft-maze-pricenotice.webp',
      label: 'PRICE SIGNAL \u00b7 HALF MISSED IT',
      alt: 'Maze yes/no question: did you notice any price difference between the two stations. 4 yes, 4 no.',
      caption:
        '4 of 8 never noticed the price difference between stations. The first crack in the pricing hypothesis.',
    },
    {
      src: '/images/lyft-maze-choice.webp',
      label: 'WHY THIS DOCK \u00b7 SPEED WINS',
      alt: 'Maze multiple choice: which dock option did you choose and why. Fastest 56%, Closest 22%, Cheapest 11%, unsure 11%. 9 responses.',
      caption:
        'Asked why they chose a dock, 56% said fastest and 22% closest; 11% chose on price (n=9). Price alone is a weak steering signal; availability and time dominate.',
    },
  ]
  
  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: 'var(--ink)',
    margin: '0 0 8px',
  }
  
  const frame: React.CSSProperties = {
    border: '1px solid var(--hairline)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'border-color 0.25s ease',
  }
  
  const cap: React.CSSProperties = {
    marginTop: '8px',
    fontSize: '12px',
    color: 'var(--ink-3)',
    lineHeight: 1.6,
  }
  
  export default function LyftMazeResults() {
    return (
      <div
        className="tj-split"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px 20px',
          marginTop: '28px',
        }}
      >
        {FIGS.map(f => (
          <figure key={f.src} style={{ margin: 0, gridColumn: f.span ? '1 / -1' : 'auto' }}>
            <p style={labelStyle}>{f.label}</p>
            <div style={frame}>
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <figcaption style={cap}>{f.caption}</figcaption>
          </figure>
        ))}
      </div>
    )
  }