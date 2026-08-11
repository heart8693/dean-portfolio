import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeButton from "@/components/ThemeButton"
import Footer from "@/components/Footer"
import "./globals.css"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// app/layout.tsx 의 기존 metadata export 를 이걸로 교체.
// og.png 는 /public 에 넣는다.
export const metadata: Metadata = {
  metadataBase: new URL('https://dean-yoo.com'),
  title: 'Dean Yoo · Product Designer',
  description:
    'Product designer in Chicago. I cut misclicks from 83.5% to zero on an AI triage tool and trained the classifier behind it, live in the browser.',
  openGraph: {
    title: 'Dean Yoo · Product Designer',
    description:
      'Sift, an AI triage tool: misclicks 83.5% to zero, a classifier I trained, live in the browser. Three more cases with numbers behind them.',
    url: 'https://dean-yoo.com',
    siteName: 'Dean Yoo',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Dean Yoo, product designer in Chicago' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dean Yoo · Product Designer',
    description: 'Misclicks 83.5% to zero, classifier trained by me, live in the browser.',
    images: ['/og.png'],
  },
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