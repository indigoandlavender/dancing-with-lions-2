import type { Metadata } from 'next'
import Script from 'next/script'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dancingwithlions.com'),
  title: {
    default: 'Dancing with Lions — A Better Way to Travel',
    template: '%s | Dancing with Lions',
  },
  description: 'There is a way to travel that doesn\'t leave wreckage behind. Where the people who welcome you can still afford to live there. We find it. We document it.',
  keywords: [
    'sustainable tourism',
    'ethical travel',
    'hospitality',
    'conservation',
    'cultural tourism',
    'responsible travel',
    'travel writing',
  ],
  authors: [{ name: 'Jacqueline Ng' }],
  creator: 'Dancing with Lions',
  publisher: 'Dancing with Lions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dancingwithlions.com',
    siteName: 'Dancing with Lions',
    title: 'Dancing with Lions — A Better Way to Travel',
    description: 'There is a way to travel that doesn\'t leave wreckage behind. We find it. We document it.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dancing with Lions — A Better Way to Travel',
    description: 'There is a way to travel that doesn\'t leave wreckage behind.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P1CGE62ZD4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P1CGE62ZD4');
          `}
        </Script>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
