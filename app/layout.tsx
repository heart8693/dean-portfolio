import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeButton from "@/components/ThemeButton"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Dean Yoo · Product Designer",
  description:
    "I make hidden information visible at the moment of decision: bias before you read, dock status before you ride, AI confidence before you accept.",
}

const themeInit =
  "(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[color:var(--bg)] focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        {/* 중앙 플로팅 리퀴드 글라스 필 — 텍스트 내비, 테마 버튼만 아이콘 */}
        <nav aria-label="Primary" className="liquid-pill">
          <a href="/" className="pill-link pill-wordmark" aria-label="Dean Yoo, home">
            dy
          </a>
          <a href="/#work" className="pill-link">
            Work
          </a>
          <a href="/about" className="pill-link">
            About
          </a>
          <a
            href="/Dean-Yoo-Resume.pdf"
            download
            className="pill-link"
            aria-label="Download resume (PDF)"
          >
            Resume
          </a>
          <span className="pill-divider" aria-hidden="true" />
          <ThemeButton />
        </nav>

        {children}

        <footer className="mt-32 border-t" style={{ borderColor: "var(--hairline)" }}>
          <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-6 py-10 text-[13px] text-[color:var(--ink-3)] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Dean Yoo · Designed and built by me</p>
            <p className="flex items-center gap-2">
              Supervised by Nero, Hiro &amp; Pingpong
              <img
                src="/stickers/paw.png"
                alt=""
                aria-hidden
                width={26}
                height={26}
                className="inline-block"
                style={{
                  transform: "rotate(10deg)",
                  filter: "drop-shadow(0 2px 6px rgba(10, 10, 12, 0.14))",
                }}
              />
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}