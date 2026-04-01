'use client'

import { useEffect, useRef, useState } from 'react'
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'
import { CategoryMenu } from '@/components/CategoryMenu'
import { BrandLogo } from '@/components/BrandLogo'
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
        <div className="header-top-row">
          <BrandLogo />

          <div className="header-mobile-actions">
            <button
              type="button"
              className="header-icon-btn"
              aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={isMenuOpen}
              onClick={() => {
                setIsMenuOpen((prev) => !prev)
                setIsSearchOpen(false)
              }}
            >
              ☰
            </button>
          </div>
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

        <div className="header-utility">Comparatore Premium</div>
      </div>

      <div className="header-categories-wrap desktop-only">
        <div className="container">
          <CategoryMenu categories={categoryTree} isSearchOpen={isSearchOpen} onMenuOpenChange={setIsMenuOpen} mode="desktop" />
        </div>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-sheet">
          <div className="mobile-menu-header">
            <strong>Categorie</strong>
            <button type="button" className="header-icon-btn" onClick={() => setIsMenuOpen(false)} aria-label="Chiudi menu">✕</button>
          </div>
          <CategoryMenu categories={categoryTree} isSearchOpen={isSearchOpen} onMenuOpenChange={setIsMenuOpen} mode="mobile" />
        </div>
      </div>
    </header>
  )
}
