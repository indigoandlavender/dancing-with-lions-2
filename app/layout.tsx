import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dancing with Lions',
  description: 'The stories underneath the map.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
