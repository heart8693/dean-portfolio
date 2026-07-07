// ─────────────────────────────────────────────────────
// Footer — micro-detail 2 of 2 lives here.
// Drop into components/site/Footer.tsx
// ─────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="mt-32 border-t"
      style={{ borderColor: "var(--hairline)" }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-6 py-10 text-[13px] text-[color:var(--ink-3)] md:flex-row md:items-center md:justify-between">
        <p>© 2026 Dean Yoo · Designed and built by me</p>
        <p>Supervised by Nero, Hiro &amp; Pingpong 🐾</p>
      </div>
    </footer>
  )
}
