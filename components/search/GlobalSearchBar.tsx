'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchDropdown } from '@/components/search/SearchDropdown'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

type SearchItem = { slug: string; title: string; brand: string; category: string; image: string; price: number; rating: number; reviews: number; shops: number }

function highlightText(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const pattern = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return text.split(pattern).map((part, index) => (part.toLowerCase() === q.toLowerCase() ? <mark key={index}>{part}</mark> : part))
}

export function GlobalSearchBar({ products, isOpen, menuIsOpen, onOpenChange }: { products: SearchItem[]; isOpen: boolean; menuIsOpen: boolean; onOpenChange: (isOpen: boolean) => void }) {
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
      .map((entry) => ({ ...entry.product, highlighted: highlightText(entry.product.title, query) }))
  }, [debounced, products, query])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/ricerca?q=${encodeURIComponent(query.trim())}`)
    onOpenChange(false)
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="hidden md:block">
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setCursor(-1)
          }}
          onFocus={() => onOpenChange(true)}
          placeholder="Cerca prodotti, marchi e categorie..."
          className="h-11 rounded-full border-slate-300 bg-white px-4"
        />
      </form>

      {isOpen && query.trim() && <SearchDropdown query={query} items={results} cursor={cursor} onHover={setCursor} onClose={() => onOpenChange(false)} />}

      <div className="md:hidden">
        <Dialog open={isOpen}>
          <section className="fixed inset-0 z-[91] overflow-y-auto bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <form onSubmit={onSubmit} className="flex-1">
                <Input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setCursor(-1)
                  }}
                  placeholder="Cerca prodotti..."
                  className="h-12 rounded-full px-4"
                />
              </form>
              <Button type="button" variant="outline" className="h-11 rounded-full" onClick={() => onOpenChange(false)}>Chiudi</Button>
            </div>
            {query.trim() ? (
              <SearchDropdown query={query} items={results} cursor={cursor} onHover={setCursor} onClose={() => onOpenChange(false)} mode="mobile" />
            ) : (
              <p className="text-sm text-slate-500">Inizia a digitare per trovare prodotti e offerte.</p>
            )}
          </section>
        </Dialog>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-start rounded-full border-slate-300 px-4 text-slate-500 md:hidden"
        onClick={() => onOpenChange(true)}
      >
        Cerca prodotti, marchi e categorie...
      </Button>
    </div>
  )
}
