import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'endu24 SaaS Platform',
  description: 'Production-ready SaaS architecture for endu24.com'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
