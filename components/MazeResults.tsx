/* FiPet Round 1 evidence: Maze result exports.
   Evidence-family pattern shared with SessionScript and TestedFrames:
   topic label above, hairline frame, interpretive caption below.
   Every figure maps to a number cited in the case copy. */

   type Fig = {
    src: string
    alt: string
    label: string
    caption: string
    span?: boolean
  }
  
  const FIGS: Fig[] = [
    {
      src: '/images/fipet-maze-task1.webp',
      span: true,
      label: 'START A QUIZ BATTLE \u00b7 THE MISCLICK FINDING',
      alt: 'Maze block: Start a Quiz Battle. 22 responses, 100% success rate, 0% drop-off, 65.9% misclick rate, 228.1s average duration.',
      caption:
        'All 22 sessions succeeded, but 65.9% misclicked on the way in: the below-the-fold start button made everyone work for the entrance. This became Finding 01.',
    },
    {
      src: '/images/fipet-maze-task2.webp',
      span: true,
      label: 'COMPLETE ALL 5 QUESTIONS \u00b7 THE LOOP HOLDS',
      alt: 'Maze block: Complete All 5 Questions. 10 responses, 100% success rate, 0% drop-off, 23.1% misclick rate, 77.1s average duration.',
      caption:
        'Ten sessions, 100% success, 23.1% misclick, 77.1s average. Once inside the battle, the loop carried players through without friction.',
    },
    {
      src: '/images/fipet-maze-ease.webp',
      label: 'EASE \u00b7 4.8 OF 5',
      alt: 'Maze opinion scale: how easy was it to go through all the quiz questions. 10 responses, 4.8 average.',
      caption:
        'Completing the quiz rated 4.8 of 5 (n=10). The flow itself was not the obstacle; finding the entrance was.',
    },
    {
      src: '/images/fipet-maze-fun.webp',
      label: 'FUN \u00b7 4.2 OF 5',
      alt: 'Maze opinion scale: how fun was the Quiz Battle. 10 responses, 4.2 average.',
      caption: 'The first measurable engagement signal in the product\u2019s history (n=10).',
    },
    {
      src: '/images/fipet-maze-replay.webp',
      span: true,
      label: 'REPLAY INTENT \u00b7 90% YES',
      alt: 'Maze yes/no question: would you want to play the Quiz Battle again. 9 of 10 answered yes.',
      caption:
        '9 of 10 said they would play again. This is the number behind the Play Again CTA call.',
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
  
  export default function MazeResults() {
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