'use client'

import { useEffect, useState } from 'react'
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'
import { CategoryMenu } from '@/components/CategoryMenu'
import { BrandLogo } from '@/components/BrandLogo'
import { Button } from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import type { CategoryNode } from '@/lib/catalog'

type SearchItem = {
  slug: string
  title: string
  brand: string
  category: string
  image: string
  price: number
  rating: number
  reviews: number
  shops: number
}

export function HeaderClient({ searchIndex, categoryTree }: { searchIndex: SearchItem[]; categoryTree: CategoryNode[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isSearchOpen || isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, isSearchOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:px-6">
        <div className="flex items-center justify-between gap-3">
          <BrandLogo />
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Apri menu">
            ☰
          </Button>
        </div>

        <GlobalSearchBar
          products={searchIndex}
          isOpen={isSearchOpen}
          menuIsOpen={isMenuOpen}
          onOpenChange={(nextOpen) => {
            setIsSearchOpen(nextOpen)
            if (nextOpen) setIsMenuOpen(false)
          }}
        />
      </div>

      <Sheet open={isMenuOpen} onClose={() => setIsMenuOpen(false)} title="Categorie">
        <CategoryMenu categories={categoryTree} onNavigate={() => setIsMenuOpen(false)} />
      </Sheet>
    </header>
  )
}
