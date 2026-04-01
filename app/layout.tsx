import './globals.css'
import Header from '@/components/Header'

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
        <Header />
        {children}
      </body>
    </html>
  )
}