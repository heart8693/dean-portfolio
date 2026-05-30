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
  'biasly':           { value: '31 → 78%',   label: 'bias recognition' },
  'fipet':            { value: '90%',      label: 'would play again' },
  'ride-availability': { value: '4.5/5',     label: 'dock confidence' },
}

export default function ProjectCard({ project: p }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  const hoverCta   = HOVER_CTA[p.slug]    ?? 'View case study →'
  const defaultCta = 'View case study →'
  const metric     = HOVER_METRIC[p.slug]

  return (
    <Link
      href={`/work/${p.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: 'var(--card)',
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        border: '1px solid var(--border)',
        // Tony Jin: subtle scale + shadow on hover
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* ── IMAGE — Tony Jin: 4:3 ratio, zoom on hover ── */}
      <div style={{
        aspectRatio: '4/3',
        background: p.thumbBg,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {p.coverImage && (
          <img
            src={p.coverImage}
            alt={p.title}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        )}
      </div>

      {/* ── TEXT AREA — title, tags, metric (hover), CTA ── */}
      <div style={{ padding: '20px 22px 22px' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: 'var(--text-1)',
          marginBottom: '6px',
        }}>
          {p.title}
        </h3>

        {/* Tags */}
        <p style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--text-3)',
          marginBottom: '24px',
        }}>
          {p.category} · {p.year}
        </p>

        {/* ── METRIC AREA — collapse by default, expand on hover ──
            Card stays compact at rest (description meets CTA cleanly).
            On hover: max-height + padding + margin + border all expand
            simultaneously with eased timing for a natural reveal. */}
        {metric && (
          <div style={{
            maxHeight: hovered ? '120px' : '0',
            opacity: hovered ? 1 : 0,
            marginBottom: hovered ? '16px' : '0',
            paddingTop: hovered ? '16px' : '0',
            borderTop: hovered ? '1px solid var(--border)' : '1px solid transparent',
            overflow: 'hidden',
            transition: hovered
              ? 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), padding-top 0.35s cubic-bezier(0.16,1,0.3,1), margin-bottom 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, opacity 0.25s ease 0.1s'
              : 'max-height 0.25s ease, padding-top 0.25s ease, margin-bottom 0.25s ease, border-color 0.2s ease, opacity 0.15s ease',
          }}>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--accent)',
              lineHeight: 1,
              marginBottom: '6px',
            }}>
              {metric.value}
            </p>
            <p style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
            }}>
              {metric.label}
            </p>
          </div>
        )}

        {/* CTA — text + arrow with subtle nudge on hover ── */}
        {/*   Text: color shifts gray → accent on hover. */}
        {/*   Arrow: translateX +4px on hover. Tony Jin micro-detail. */}
        <p style={{
          fontSize: '13px',
          fontWeight: 500,
          color: hovered ? 'var(--accent)' : 'var(--text-3)',
          transition: 'color 0.2s ease',
          letterSpacing: '0.01em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span>{(hovered ? hoverCta : defaultCta).replace(/\s*→\s*$/, '')}</span>
          <span style={{
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            display: 'inline-block',
          }}>→</span>
        </p>
      </div>
    </Link>
  )
}