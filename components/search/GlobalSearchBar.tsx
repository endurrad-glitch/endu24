'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
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
  const shellRef = useRef<HTMLDivElement>(null)
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 240)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (menuIsOpen && isOpen) {
      onOpenChange(false)
    }
  }, [isOpen, menuIsOpen, onOpenChange])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) onOpenChange(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [onOpenChange])

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
      .slice(0, 8)
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
    if (event.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return (
    <div className="global-search" ref={shellRef}>
      <form onSubmit={onSubmit} role="search">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            onOpenChange(Boolean(event.target.value.trim()))
            setCursor(-1)
          }}
          onFocus={() => {
            if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current)
            if (query.trim()) onOpenChange(true)
          }}
          onBlur={() => {
            blurTimeoutRef.current = setTimeout(() => onOpenChange(false), 140)
          }}
          onKeyDown={onKeyDown}
          placeholder="Cerca casco, giacca, accessorio..."
          aria-label="Cerca prodotti"
          aria-controls="global-search-dropdown"
        />
      </form>
      {isOpen && query.trim() && (
        <SearchDropdown
          query={query}
          items={results}
          cursor={cursor}
          onHover={setCursor}
          onClose={() => onOpenChange(false)}
        />
      )}
      <Link href={`/ricerca?q=${encodeURIComponent(query || '')}`} className="search-all-link">
        Vedi tutti i risultati
      </Link>
    </div>
  )
}
