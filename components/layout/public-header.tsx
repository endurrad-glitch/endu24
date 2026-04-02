import Link from 'next/link'
import Image from 'next/image'
import { getPublicCms } from '@/lib/cms'

export async function PublicHeader() {
  const { settings, menuItems } = await getPublicCms()

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings.logo_url ? (
            <Image src={settings.logo_url} alt={settings.site_name} width={42} height={42} className="rounded" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-900 text-sm font-bold text-white">E</div>
          )}
          <span className="text-lg font-semibold">{settings.site_name}</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.url} className="text-sm text-slate-600 hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
