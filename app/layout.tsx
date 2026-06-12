import type { Metadata } from 'next'
import { Inter, Anton, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://dean-yoo.com'),
  title: {
    default: 'Dean Yoo · Product Designer',
    template: '%s · Dean Yoo',
  },
  description: 'Product designer in Chicago. Test before design, measure after ship. Case studies: Biasly, FiPet, Lyft bike redesign.',
  openGraph: {
    siteName: 'Dean Yoo · Product Designer',
    type: 'website',
    locale: 'en_US',
    url: 'https://dean-yoo.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${anton.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
