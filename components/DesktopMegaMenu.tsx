'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type MegaMenuItem = {
  label: string
  slug: string
}

type MegaMenuCategory = {
  label: string
  slug: string
  items: MegaMenuItem[]
}

function slugifyCategory(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function toCategoryItem(label: string): MegaMenuItem {
  return {
    label,
    slug: slugifyCategory(label),
  }
}

export const desktopMegaMenuCategories: MegaMenuCategory[] = [
  {
    label: 'Protezioni Moto',
    slug: 'protezioni-moto',
    items: [
      'Adesivi antiscivolo',
      'Protezione strumentazione',
      'Protezione leve',
      'Protezione Motore',
      'Tamponi e protezioni telaio',
      'Pinne Sicurezza Catena',
      'Protezioni catena',
      'Protezione fanale',
      'Pellicola protezione carena',
      'Protezione radiatore moto',
      'Protezioni scarico',
      'Sliders in carbonio',
      'Protezioni ammortizzatore',
      'Parafanghi moto',
    ].map(toCategoryItem),
  },
  {
    label: 'Freni',
    slug: 'freni',
    items: ['Tubi in treccia', 'Pinze freno', 'Pompe freno', 'Accessori freno'].map(toCategoryItem),
  },
  {
    label: 'Ciclistica',
    slug: 'ciclistica',
    items: [
      'Tappi serbatoio freno',
      'Leve freno e frizione',
      'Manopole moto',
      'Specchietti moto',
      'Paramani moto',
      'Portatarga moto',
      'Maniglie serbatoio passeggero',
      'Pedane arretrate',
      'Manubri moto',
      'Stabilizzatori moto',
      'Selle in neoprene',
      'Cuscinetti sterzo',
      'Cuscinetti ruota',
      'Sospensioni moto',
      'Cuscinetti leveraggi e leverismi',
      'Serbatoio carburante',
      'Basi cavalletti moto',
      'Coprifori telaio e specchietti',
      'Leve off-road',
      'Bracciali frizione',
      'Leve cambio moto',
    ].map(toCategoryItem),
  },
  {
    label: 'Elettrico',
    slug: 'elettrico',
    items: [
      'Indicatori di direzione e mini frecce',
      'Fanaleria moto',
      'Strumentazioni moto',
      'Elettronica telefonia',
      'Interruttori per moto',
      'Batterie moto',
      'Centraline moto',
      'Statori e Volani',
      'Motorini avviamento',
      'Varie elettrico',
    ].map(toCategoryItem),
  },
  {
    label: 'Manutenzione',
    slug: 'manutenzione',
    items: ['Cavalletti alzamoto', 'Cura della moto', 'Attrezzatura officina', 'Ricambi moto vari'].map(toCategoryItem),
  },
  {
    label: 'Viaggio',
    slug: 'viaggio',
    items: [
      'Cruise control moto',
      'Comfort di guida',
      'Borse e cinghie fermacarico',
      'Attrezzatura campeggio moto Daytona',
      'Porta Smartphone',
    ].map(toCategoryItem),
  },
  {
    label: 'Abbigliamento',
    slug: 'abbigliamento',
    items: ['Abbigliamento', 'Guanti moto', 'Tute antiacqua', 'Varie abbigliamento'].map(toCategoryItem),
  },
]

export function DesktopMegaMenu() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeCategory = useMemo(
    () => desktopMegaMenuCategories.find((category) => category.slug === openCategory) ?? null,
    [openCategory],
  )

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const handleOpen = (slug: string) => {
    clearCloseTimer()
    setOpenCategory(slug)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenCategory(null)
    }, 180)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  return (
    <nav className="relative hidden border-t border-slate-200 bg-white lg:block" aria-label="Categorie principali">
      <div className="mx-auto w-full max-w-6xl px-4">
        <ul className="flex items-center gap-1 py-1">
          {desktopMegaMenuCategories.map((category) => (
            <li key={category.slug} className="relative">
              <button
                type="button"
                className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-800 outline-none transition-colors hover:text-[#ff6a00] focus-visible:text-[#ff6a00] focus-visible:ring-2 focus-visible:ring-[#ff6a00]/30"
                onMouseEnter={() => handleOpen(category.slug)}
                onFocus={() => handleOpen(category.slug)}
                onClick={() => setOpenCategory((current) => (current === category.slug ? null : category.slug))}
                aria-expanded={activeCategory?.slug === category.slug}
                aria-controls={`mega-panel-${category.slug}`}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 top-full z-50" onMouseEnter={clearCloseTimer} onMouseLeave={scheduleClose}>
        <div
          className={`mx-auto w-full max-w-7xl px-4 transition-all duration-200 ${
            activeCategory ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          {activeCategory && (
            <section
              id={`mega-panel-${activeCategory.slug}`}
              className="rounded-b-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_48px_rgba(15,23,42,0.16)]"
              onMouseLeave={scheduleClose}
            >
              <header className="mb-5 border-b border-slate-100 pb-4">
                <Link
                  href={`/categoria/${activeCategory.slug}`}
                  className="text-lg font-bold text-slate-900 transition-colors hover:text-[#ff6a00] focus-visible:text-[#ff6a00] focus-visible:outline-none"
                >
                  {activeCategory.label}
                </Link>
              </header>

              <div className="grid grid-cols-3 gap-x-10 gap-y-3 xl:grid-cols-4">
                {activeCategory.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/categoria/${item.slug}`}
                    className="rounded-md py-1 text-sm leading-6 text-slate-700 transition-colors hover:text-[#ff6a00] focus-visible:text-[#ff6a00] focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div
        className="fixed inset-0 z-40 hidden bg-slate-900/10 lg:block"
        aria-hidden
        style={{ display: activeCategory ? 'block' : 'none' }}
        onMouseEnter={scheduleClose}
      />
    </nav>
  )
}
