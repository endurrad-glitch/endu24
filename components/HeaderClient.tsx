'use client'

import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/BrandLogo'
import { Button } from '@/components/ui/button'
import type { CategoryNode } from '@/lib/catalog'
import { MobileMenu } from '@/components/MobileMenu'
import { HeaderSearch } from '@/components/HeaderSearch'

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
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <BrandLogo />

        <HeaderSearch
          searchIndex={searchIndex}
          isOpen={isSearchOpen}
          menuIsOpen={isMenuOpen}
          onOpenChange={(nextOpen) => {
            setIsSearchOpen(nextOpen)
            if (nextOpen) setIsMenuOpen(false)
          }}
        />

        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-full"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Apri menu"
        >
          ☰
        </Button>
      </div>

      <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
        <HeaderSearch
          mobile
          searchIndex={searchIndex}
          isOpen={isSearchOpen}
          menuIsOpen={isMenuOpen}
          onOpenChange={(nextOpen) => {
            setIsSearchOpen(nextOpen)
            if (nextOpen) setIsMenuOpen(false)
          }}
        />
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} categories={categoryTree} />
    </header>
  )
}
