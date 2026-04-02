import Link from 'next/link'
import Image from 'next/image'
import { getPublicCms } from '@/lib/cms'
import { SearchBar } from '@/components/layout/search-bar'
import { MegaMenu } from '@/components/layout/mega-menu'

export async function PublicHeader() {
  const { settings, menuItems } = await getPublicCms()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {settings.logo_url ? (
            <Image src={settings.logo_url} alt={settings.site_name} width={44} height={44} className="rounded" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded bg-slate-900 text-sm font-bold text-white">E</div>
          )}
          <span className="text-lg font-semibold">{settings.site_name}</span>
        </Link>

        <SearchBar />

        <div className="ml-auto hidden items-center gap-3 text-xl md:flex" aria-label="Azioni utente">
          <span title="Preferiti">♡</span>
          <span title="Confronta">⇄</span>
          <span title="Account">👤</span>
        </div>
      </div>

      <MegaMenu items={menuItems} />
    </header>
  )
}
