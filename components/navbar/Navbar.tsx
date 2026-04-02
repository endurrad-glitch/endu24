import Image from 'next/image'
import Link from 'next/link'
import { getHeaderData } from '@/lib/cms'
import MobileMenu from '@/components/navbar/MobileMenu'

export default async function Navbar() {
  const { settings, menuItems } = await getHeaderData()

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
          {settings?.logo_url ? (
            <Image src={settings.logo_url} alt={settings.site_name ?? 'endu24'} width={28} height={28} className="h-7 w-7 rounded object-contain" />
          ) : null}
          <span>{settings?.site_name || 'endu24.com'}</span>
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.url} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </div>

        <MobileMenu links={menuItems.map((item) => ({ label: item.label, url: item.url }))} />
      </div>
    </nav>
  )
}
