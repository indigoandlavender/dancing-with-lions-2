import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dancingwithlions.com'),
  title: {
    default: 'Dancing with Lions — Cultural Intelligence',
    template: '%s | Dancing with Lions',
  },
  description: 'Cultural intelligence for conservation, protection, and preservation. Documenting traditional knowledge systems across Africa, the Middle East, and Asia.',
  keywords: [
    'cultural intelligence',
    'conservation',
    'traditional knowledge',
    'cultural heritage',
    'Africa',
    'Middle East',
    'Asia',
    'ethnography',
    'preservation',
  ],
  authors: [{ name: 'Jacqueline Ng' }],
  creator: 'Dancing with Lions',
  publisher: 'Dancing with Lions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dancingwithlions.com',
    siteName: 'Dancing with Lions',
    title: 'Dancing with Lions — Cultural Intelligence',
    description: 'Cultural intelligence for conservation, protection, and preservation. Documenting traditional knowledge systems across Africa, the Middle East, and Asia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dancing with Lions — Cultural Intelligence',
    description: 'Cultural intelligence for conservation, protection, and preservation.',
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
    <html lang="en">
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
      <body>{children}</body>
    </html>
  )
}
