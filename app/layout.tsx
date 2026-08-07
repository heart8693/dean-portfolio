import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeButton from "@/components/ThemeButton"
import Footer from "@/components/Footer"
import "./globals.css"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  /* metadataBase 가 없으면 og 이미지가 localhost 로 해석된다.
     링크드인이나 슬랙에 붙일 때 미리보기가 깨진다. */
  metadataBase: new URL("https://dean-yoo.com"),
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

        {/* 중앙 플로팅 리퀴드 글라스 필. 텍스트 내비, 테마 버튼만 아이콘 */}
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

        <Footer />
      </body>
    </html>
  )
}