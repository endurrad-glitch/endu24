'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchDropdown } from '@/components/search/SearchDropdown'

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

function highlightText(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const pattern = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return text.split(pattern).map((part, index) =>
    part.toLowerCase() === q.toLowerCase() ? <mark key={index}>{part}</mark> : part,
  )
}

export function GlobalSearchBar({
  products,
  isOpen,
  menuIsOpen,
  onOpenChange,
}: {
  products: SearchItem[]
  isOpen: boolean
  menuIsOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(-1)
  const [debounced, setDebounced] = useState('')
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 200)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (menuIsOpen && isOpen) onOpenChange(false)
  }, [isOpen, menuIsOpen, onOpenChange])

  const results = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    if (!q) return []

    return products
      .map((product) => {
        const text = `${product.title} ${product.brand} ${product.category}`.toLowerCase()
        const score = text.includes(q) ? (text.startsWith(q) ? 4 : 2) : q.split('').every((c) => text.includes(c)) ? 1 : 0
        return { product, score }
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
      .slice(0, 12)
      .map((entry) => ({
        ...entry.product,
        highlighted: highlightText(entry.product.title, query),
      }))
  }, [debounced, products, query])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/ricerca?q=${encodeURIComponent(query.trim())}`)
    onOpenChange(false)
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!results.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((prev) => (prev + 1) % results.length)
      onOpenChange(true)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
    }
    if (event.key === 'Enter' && cursor >= 0) {
      event.preventDefault()
      router.push(`/prodotto/${results[cursor].slug}`)
      onOpenChange(false)
    }
    if (event.key === 'Escape') onOpenChange(false)
  }

  return (
    <div className="global-search">
      <button type="button" className="search-mobile-trigger" onClick={() => onOpenChange(true)} aria-label="Apri ricerca">
        Cerca casco, giacca, accessorio...
      </button>

      <form onSubmit={onSubmit} role="search" className="search-desktop-form">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            onOpenChange(Boolean(event.target.value.trim()))
            setCursor(-1)
          }}
          onFocus={() => query.trim() && onOpenChange(true)}
          onKeyDown={onKeyDown}
          placeholder="Cerca casco, giacca, accessorio..."
          aria-label="Cerca prodotti"
          aria-controls="global-search-dropdown"
        />
      </form>

      {isOpen && (
        <div className="search-mobile-overlay" role="dialog" aria-modal="true">
          <div className="search-mobile-header">
            <form onSubmit={onSubmit} role="search" className="search-mobile-form">
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setCursor(-1)
                }}
                onKeyDown={onKeyDown}
                placeholder="Cerca prodotti..."
                aria-label="Cerca prodotti"
              />
            </form>
            <button type="button" className="header-icon-btn" onClick={() => onOpenChange(false)} aria-label="Chiudi ricerca">✕</button>
          </div>

          {query.trim() ? (
            <SearchDropdown
              query={query}
              items={results}
              cursor={cursor}
              onHover={setCursor}
              onClose={() => onOpenChange(false)}
              mode="mobile"
            />
          ) : (
            <p className="search-mobile-empty">Inizia a digitare per trovare prodotti e offerte.</p>
          )}
        </div>
      )}

      {isOpen && query.trim() && (
        <SearchDropdown
          query={query}
          items={results}
          cursor={cursor}
          onHover={setCursor}
          onClose={() => onOpenChange(false)}
        />
      )}
    </div>
  )
}
