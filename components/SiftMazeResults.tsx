// SiftMazeResults — evidence images for the Sift usability testing section.
// Same family as MazeResults (FiPet) and LyftMazeResults: topic label above,
// hairline frame, interpretive caption below. Two-round before/after set.

const ITEMS = [
  {
    label: 'ROUND 1 · MISSION 3',
    src: '/images/sift-maze-r1-mission3.webp',
    alt: 'Round 1 mission 3 results: 80% success, 20% drop-off, 83.5% misclick rate',
    caption:
      'The automation control existed and could not be found: 83.5% misclick rate, 80% success, and one participant quit after five minutes of searching.',
  },
  {
    label: 'ROUND 1 · SENSE OF CONTROL',
    src: '/images/sift-maze-r1-control.webp',
    alt: 'Round 1 control rating distribution, average 3.0 with a split between high and low clusters',
    caption:
      'Average 3.0 hides the real story: a cluster at 4 and a cluster at 1 to 2. Averages hide fights; distributions show them.',
  },
  {
    label: 'ROUND 2 · MISSION 3',
    src: '/images/sift-maze-r2-mission3.webp',
    alt: 'Round 2 mission 3 results for the CX segment: 100% success, zero misclicks, single path',
    caption:
      'Same task, same population, after the redesign: 100% success, zero misclicks, and all five participants on one path at 45 seconds average.',
  },
  {
    label: 'ROUND 2 · MISSION 3 HEATMAP',
    src: '/images/sift-maze-r2-heatmap.webp',
    alt: 'Round 2 dashboard heatmap showing clicks concentrated on the AI assist toggle',
    caption:
      'The busiest door is the AI assist toggle, the same element that dead-ended the most desperate search in Round 1.',
  },
  {
    label: 'ROUND 2 · SENSE OF CONTROL',
    src: '/images/sift-maze-r2-control.webp',
    alt: 'Round 2 control rating for the CX segment, average 4.4 with all answers at 4 or 5',
    caption:
      'Average 4.4 with every CX participant at 4 or 5. The split verdict from Round 1 is gone.',
  },
  {
    label: 'ROUND 2 · CONFIDENCE PERCEPTION',
    src: '/images/sift-maze-r2-stim95.webp',
    alt: 'Confidence perception check at 95%: only 2 of 5 would accept without reading',
    caption:
      'Shown a panel at 95% stated confidence, only 2 of 5 professionals would accept without reading the ticket. Trust but verify is the expert default, which argues for the whole human-in-the-loop shape of the product.',
  },
]

export default function SiftMazeResults() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '32px' }}>
      {ITEMS.map(item => (
        <figure key={item.src} style={{ margin: 0 }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            marginBottom: '10px',
          }}>
            {item.label}
          </p>
          <div style={{
            border: '1px solid var(--hairline)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#ffffff',
            transition: 'border-color 0.25s ease',
          }}>
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <figcaption style={{
            marginTop: '10px',
            fontSize: '12px',
            color: 'var(--ink-3)',
            lineHeight: 1.6,
          }}>
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
