'use client'

import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'

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

type HeaderSearchProps = {
  searchIndex: SearchItem[]
  isOpen: boolean
  menuIsOpen: boolean
  onOpenChange: (open: boolean) => void
  mobile?: boolean
}

export function HeaderSearch({ searchIndex, isOpen, menuIsOpen, onOpenChange, mobile = false }: HeaderSearchProps) {
  return (
    <div className={mobile ? 'w-full md:hidden' : 'hidden md:block'}>
      <GlobalSearchBar
        products={searchIndex}
        isOpen={isOpen}
        menuIsOpen={menuIsOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}
