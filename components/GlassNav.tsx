"use client"

// ─────────────────────────────────────────────────────
// GlassNav — the ONLY liquid glass surface on the site.
// Content scrolls beneath it; when a hover-colored
// thumbnail passes under, the glass catches the color.
// Drop into components/site/GlassNav.tsx
// ─────────────────────────────────────────────────────

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/Dean-Yoo-Resume.pdf", label: "Resume" },
]

export default function GlassNav() {
  const pathname = usePathname()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="glass-nav">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-6"
        >
          {/* Wordmark — ink, weight does the work */}
          <Link
            href="/"
            aria-label="Dean Yoo, home"
            className="text-[15px] font-semibold tracking-[-0.02em] text-[color:var(--ink)]"
          >
            dy
          </Link>

          <div className="flex items-center gap-7">
            {links.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/")
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "text-[14px] tracking-[-0.01em] transition-colors duration-150 hover:text-[color:var(--accent)] " +
                    (active
                      ? "font-medium text-[color:var(--ink)]"
                      : "text-[color:var(--ink-2)]")
                  }
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>
    </>
  )
}
