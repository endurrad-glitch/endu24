import './globals.css'
import HeaderSticky from '@/components/HeaderSticky'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Endu24',
  description: 'Comparatore moto e accessori',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <HeaderSticky />
        {children}
        <Footer />
      </body>
    </html>
  )
}
