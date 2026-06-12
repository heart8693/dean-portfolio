import { ImageResponse } from 'next/og'

// Link-preview card. Typographic only, mirrors the homepage hero:
// ink canvas, billboard lockup, no photos.
export const alt = 'Dean Yoo, Product Designer. Test before design. Measure after ship.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0B0D',
          color: '#F7F4EE',
          padding: '64px 72px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          Product Designer — Chicago, IL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#FFFFFF',
            }}
          >
            Test before design.
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#FFFFFF',
            }}
          >
            Measure after ship.
          </div>
          <div style={{ fontSize: 32, marginTop: 36, opacity: 0.75 }}>
            Dean Yoo · dean-yoo.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
