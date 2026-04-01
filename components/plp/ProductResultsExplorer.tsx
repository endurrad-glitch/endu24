'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { FilterSidebar, type FilterOptionGroups, type FilterState } from '@/components/plp/FilterSidebar'
import { ProductListItem } from '@/components/plp/ProductListItem'
import { SortSelect, type SortMode } from '@/components/plp/SortSelect'
import { ViewToggle } from '@/components/plp/ViewToggle'
import { Button } from '@/components/ui/button'
import { Sheet } from '@/components/ui/sheet'
import type { Product } from '@/lib/products'

const initialFilters: FilterState = { brand: [], category: [], priceRange: [], rating: [], availability: [], features: [] }

export function ProductResultsExplorer({ products }: { products: Product[] }) {
  const [view, setView] = useState<'list' | 'grid'>('grid')
  const [sortMode, setSortMode] = useState<SortMode>('priceAsc')
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filterOptions: FilterOptionGroups = useMemo(() => ({
    brands: Array.from(new Set(products.map((product) => product.brand))).slice(0, 12),
    categories: Array.from(new Set(products.map((product) => product.category))).slice(0, 12),
    availability: Array.from(new Set(products.map((product) => product.availability))).slice(0, 4),
    features: [],
  }), [products])

  const filteredProducts = useMemo(() => {
    const narrowed = products.filter((product) => {
      const matchBrand = !filters.brand.length || filters.brand.includes(product.brand)
      const matchCategory = !filters.category.length || filters.category.includes(product.category)
      return matchBrand && matchCategory
    })
    return narrowed.sort((a, b) => {
      const priceA = a.offers[0]?.price ?? a.price
      const priceB = b.offers[0]?.price ?? b.price
      if (sortMode === 'priceAsc') return priceA - priceB
      if (sortMode === 'priceDesc') return priceB - priceA
      if (sortMode === 'popularity') return b.reviews - a.reviews || b.rating - a.rating
      return b.slug.localeCompare(a.slug)
    })
  }, [products, filters, sortMode])

  return (
    <section className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <FilterSidebar options={filterOptions} value={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
      </div>
      <div className="grid gap-3 min-w-0">
        <div className="grid gap-2 md:flex md:items-center md:justify-between">
          <p className="text-sm text-slate-600"><strong>{filteredProducts.length}</strong> risultati aggiornati in tempo reale</p>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" className="lg:hidden" onClick={() => setIsFiltersOpen(true)}>Filtri</Button>
            <SortSelect value={sortMode} onChange={setSortMode} />
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>

        <div className={view === 'grid' ? 'grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4' : 'grid gap-3'}>
          {filteredProducts.map((product) => view === 'grid' ? <ProductCard key={product.slug} product={product} /> : <ProductListItem key={product.slug} product={product} />)}
        </div>
      </div>

      <Sheet open={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} title="Filtri">
        <FilterSidebar options={filterOptions} value={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} mode="mobile" onApply={() => setIsFiltersOpen(false)} />
      </Sheet>
    </section>
  )
}
