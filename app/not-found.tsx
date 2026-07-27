// app/not-found.tsx — 404 in the same voice as the hero.
// Uses the existing Keycap from WelcomeKit and the reveal-line classes
// already in globals.css. No new CSS needed.

import Link from 'next/link'
import { Keycap } from '@/components/WelcomeKit'

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[100svh] max-w-[1100px] flex-col items-center justify-center px-6 pb-16 pt-28 text-center"
    >
      <p
        className="reveal-line mb-5 text-[12px] font-semibold uppercase text-[color:var(--ink-3)]"
        style={{ letterSpacing: '0.14em' }}
      >
        <span style={{ color: 'var(--accent)' }}>&#10022;</span>&nbsp;&nbsp;404&nbsp;&nbsp;<span style={{ color: 'var(--accent)' }}>&#10022;</span>
      </p>

      <h1
        className="reveal-line max-w-[18ch] font-semibold text-[color:var(--ink)]"
        style={{
          fontSize: 'var(--text-display)',
          letterSpacing: 'var(--track-display)',
          lineHeight: 1.06,
        }}
      >
        This frame doesn&apos;t exist.
      </h1>

      <p
        className="reveal-line mt-8 max-w-[46ch] font-medium text-[color:var(--ink-2)]"
        style={{
          fontSize: 'var(--text-lede)',
          letterSpacing: 'var(--track-lede)',
          lineHeight: 1.4,
        }}
      >
        The layer you&apos;re looking for was deleted, or was never drawn.
      </p>

      <p className="reveal-line mt-10 text-[15px] text-[color:var(--ink-2)]">
        Press <Keycap>&#8984;</Keycap>
        <Keycap>Z</Keycap>
        <span className="mx-2">or</span>
        <Link href="/" className="link-quiet font-medium text-[color:var(--ink)]">
          go back to the canvas
        </Link>
        .
      </p>
    </main>
  )
}
