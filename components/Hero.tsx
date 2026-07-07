// ─────────────────────────────────────────────────────
// Hero — the locked 3-line structure.
// Line 1: who. Lines 2–3: the POV nobody else can write.
// The three case phrases are quiet links into the work.
// Signature motion: lines light up in sequence (F1 cadence).
// Drop into components/site/Hero.tsx
// ─────────────────────────────────────────────────────

import Link from "next/link"

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="mx-auto max-w-[1100px] px-6 pb-24 pt-28 md:pb-32 md:pt-36"
    >
      <h1
        className="reveal-line font-semibold text-[color:var(--ink)]"
        style={{
          fontSize: "var(--text-display)",
          letterSpacing: "var(--track-display)",
          lineHeight: 1.04,
        }}
      >
        Dean Yoo. Product designer in&nbsp;Chicago.
      </h1>

      <p
        className="reveal-line mt-8 max-w-[52ch] text-[color:var(--ink-2)]"
        style={{
          fontSize: "var(--text-lede)",
          letterSpacing: "var(--track-lede)",
          lineHeight: 1.35,
        }}
      >
        I make hidden information visible at the moment of decision:
      </p>

      <p
        className="reveal-line mt-2 max-w-[56ch] text-[color:var(--ink-2)]"
        style={{
          fontSize: "var(--text-lede)",
          letterSpacing: "var(--track-lede)",
          lineHeight: 1.45,
        }}
      >
        <Link href="/work/biasly" className="link-quiet">
          bias before you read
        </Link>
        ,{" "}
        <Link href="/work/ride-availability" className="link-quiet">
          dock status before you ride
        </Link>
        ,{" "}
        <Link href="/work/triage" className="link-quiet">
          AI confidence before you accept
        </Link>
        .
      </p>
    </section>
  )
}
