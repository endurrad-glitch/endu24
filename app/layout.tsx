import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ENDU24 | Comparatore prezzi premium moto',
  description: 'Confronta prezzi di accessori e abbigliamento moto con ricerca live e offerte multi-shop.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
