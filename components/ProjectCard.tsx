'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/lib/cms'

// ── Per-project hover CTA copy ─────────────────────────
//    Question-style hooks that pair with HOVER_METRIC below.
//    Default fallback: 'View case study →'
const HOVER_CTA: Record<string, string> = {
  'biasly':           'How bias became visible →',
  'fipet':            'When testing changed everything →',
  'ride-availability': 'How pricing became the interface →',
}

// ── Per-project hover metric ───────────────────────────
//    Contrast pattern (before → after) for quantitative lifts,
//    or categorical milestone for narrative-driven projects.
//    Each project shows a DIFFERENT type of impact on purpose:
//      Biasly → quantitative lift
//      FiPet  → categorical milestone (first-ever practice)
//      Ride   → categorical restraint (reframing — surface, don't build)
const HOVER_METRIC: Record<string, { value: string; label: string }> = {
  // TODO(dean): verify 31-to-78 against session data
  'biasly':           { value: '31 → 78%',   label: 'bias recognition' },
  'fipet':            { value: '90%',      label: 'would play again (n=10)' },
  'ride-availability': { value: '4.5/5',     label: 'dock confidence (n=8)' },
}

// Method caption shown under the metric, currently Biasly only
const METRIC_CAPTION: Record<string, string> = {
  'biasly': '12 moderated sessions, Oct - Dec 2025, observer-coded',
}

// ── Per-project underlined-link color (AA-safe on white).
//    Mirrors each case-study route theme's --accent-text so the
//    homepage card link reads in the same hue as the case study.
const LINK_COLOR: Record<string, string> = {
  'biasly':            '#1D4ED8',   // matches .tj-case--biasly --accent-text
  'fipet':             '#C2410C',   // matches .tj-case--fipet --accent-text
  'ride-availability': '#A21CAF',   // matches .tj-case--ride-availability --accent-text
}

export default function ProjectCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const hoverCta   = HOVER_CTA[p.slug]    ?? 'View case study →'
  const defaultCta = 'View case study →'
  const metric     = HOVER_METRIC[p.slug]
  const linkColor  = LINK_COLOR[p.slug]   ?? 'var(--text-1)'

  return (
    <Link
      href={`/work/${p.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: 'transparent',
        borderRadius: 0,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* ── IMAGE — full-bleed, no radius, no border, no shadow ── */}
      <div style={{
        aspectRatio: '4/3',
        background: p.thumbBg || 'var(--surface-soft)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {p.coverImage && (
          <img
            src={p.coverImage}
            alt={p.title}
            loading="lazy" decoding="async"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}
      </div>

      {/* ── TEXT — sits directly under image, no container padding ── */}
      <div style={{ paddingTop: '20px' }}>
        {/* Tags — flat eyebrow row, no pill, no background */}
        <p
          className="tj-eyebrow"
          style={{ color: 'var(--text-2)', marginBottom: '10px' }}
        >
          {p.category} · {p.year}
        </p>

        {/* Title — Nike display tier, uppercase, ink */}
        <h3
          className="tj-display-2"
          style={{
            color: 'var(--text-1)',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          {p.title}
        </h3>

        {/* ── METRIC AREA — always visible at rest (no hover needed).
            Mobile has no hover and recruiters scan fast, so the impact
            number leads. Value stays ink. */}
        {metric && (
          <div style={{ marginBottom: '16px' }}>
            <p
              className="tj-tnum"
              style={{
                fontFamily: 'inherit',
                fontSize: 'clamp(28px, 3.4vw, 40px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--text-1)',
                lineHeight: 1,
                marginBottom: '6px',
              }}
            >
              {metric.value}
            </p>
            <p className="tj-eyebrow" style={{ color: 'var(--text-2)' }}>
              {metric.label}
            </p>
            {METRIC_CAPTION[p.slug] && (
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-3)',
                lineHeight: 1.5,
                marginTop: '6px',
              }}>
                {METRIC_CAPTION[p.slug]}
              </p>
            )}
          </div>
        )}

        {/* CTA — type-driven, underlined. Color = the project's own
            theme color (LINK_COLOR map) at all times so the link reads
            in the same hue as its case study. Subtle hover = full
            saturation; rest of card unchanged. */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: '100%',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          color: linkColor,
          borderBottom: `2px solid ${linkColor}`,
          paddingBottom: '2px',
          opacity: hovered ? 1 : 0.92,
          transition: 'opacity 0.18s ease',
        }}>
          <span>{(hovered ? hoverCta : defaultCta).replace(/\s*→\s*$/, '')}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  )
}
