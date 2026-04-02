import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">{children}</main>
      <PublicFooter />
    </div>
  )
}
