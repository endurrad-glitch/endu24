'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'
import { CategoryMenu } from '@/components/CategoryMenu'
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

export function HeaderClient({
  searchIndex,
  categoryTree,
}: {
  searchIndex: SearchItem[]
  categoryTree: CategoryNode[]
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onDocumentPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocumentPointerDown)
    document.addEventListener('touchstart', onDocumentPointerDown)
    return () => {
      document.removeEventListener('mousedown', onDocumentPointerDown)
      document.removeEventListener('touchstart', onDocumentPointerDown)
    }
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-grid">
        <Link href="/" className="brand" aria-label="Endu24 home">
          <span className="brand-logo">E24</span>
          <span className="brand-text">endu24</span>
        </Link>

        <GlobalSearchBar
          products={searchIndex}
          isOpen={isSearchOpen}
          menuIsOpen={isMenuOpen}
          onOpenChange={(nextOpen) => {
            setIsSearchOpen(nextOpen)
            if (nextOpen) setIsMenuOpen(false)
          }}
        />

        <div className="header-utility">Comparatore Premium</div>
      </div>

      <div className="header-categories-wrap">
        <div className="container">
          <CategoryMenu
            categories={categoryTree}
            isSearchOpen={isSearchOpen}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={(nextOpen) => {
              setIsMenuOpen(nextOpen)
              if (nextOpen) setIsSearchOpen(false)
            }}
          />
        </div>
      </div>
    </header>
  )
}
