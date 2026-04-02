import Link from 'next/link'
import Image from 'next/image'
import { getPublicCms } from '@/lib/cms'
import { SearchBar } from '@/components/layout/search-bar'
import { MegaMenu } from '@/components/layout/mega-menu'

export async function PublicHeader() {
  const { settings, menuItems } = await getPublicCms()

  return (
    <header className="sticky top-0 z-50 border-b border-[#2b2b2b]/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {settings.logo_url ? (
            <Image src={settings.logo_url} alt={settings.site_name} width={180} height={45} className="h-[45px] w-auto rounded object-contain" priority />
          ) : (
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded bg-[#ff580d] text-sm font-bold text-white">E</div>
          )}
        </Link>

        <div className="mr-[107px] flex-1 max-w-none"><SearchBar /></div>

        <div className="ml-auto hidden items-center md:flex" aria-label="Azioni utente">
          <button className="bg-[#ff580d] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e14e0c] transition text-white">Accedi</button>
        </div>
      </div>

      <MegaMenu items={menuItems} />
    </header>
  )
}
