'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { FilterSidebar, type FilterOptionGroups, type FilterState } from '@/components/plp/FilterSidebar'
import { ProductListItem } from '@/components/plp/ProductListItem'
import { ViewToggle } from '@/components/plp/ViewToggle'
import type { Product } from '@/lib/products'

const initialFilters: FilterState = {
  brand: [],
  category: [],
  priceRange: [],
  rating: [],
  availability: [],
  features: [],
}

export function ProductResultsExplorer({ products }: { products: Product[] }) {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const filterOptions: FilterOptionGroups = useMemo(() => {
    const featureSet = new Set<string>()
    for (const product of products) {
      Object.keys(product.specs || {}).slice(0, 2).forEach((key) => featureSet.add(key))
    }

    return {
      brands: Array.from(new Set(products.map((product) => product.brand))).slice(0, 12),
      categories: Array.from(new Set(products.map((product) => product.category))).slice(0, 12),
      availability: Array.from(new Set(products.map((product) => product.availability))).slice(0, 4),
      features: Array.from(featureSet).slice(0, 12),
    }
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchBrand = !filters.brand.length || filters.brand.includes(product.brand)
      const matchCategory = !filters.category.length || filters.category.includes(product.category)
      const matchAvailability = !filters.availability.length || filters.availability.includes(product.availability)

      const matchRating = !filters.rating.length || filters.rating.some((entry) => {
        const min = Number.parseFloat(entry)
        return product.rating >= min
      })

      const currentPrice = product.offers[0]?.price ?? product.price
      const matchPrice = !filters.priceRange.length || filters.priceRange.some((range) => {
        if (range === '500+') return currentPrice >= 500
        const [min, max] = range.split('-').map(Number)
        return currentPrice >= min && currentPrice < max
      })

      const productFeatures = Object.keys(product.specs || {})
      const matchFeatures = !filters.features.length || filters.features.every((feature) => productFeatures.includes(feature))

      return matchBrand && matchCategory && matchAvailability && matchRating && matchPrice && matchFeatures
    })
  }, [products, filters])

  const activeChips = useMemo(
    () => Object.values(filters).flat(),
    [filters],
  )

  return (
    <section className="plp-layout">
      <FilterSidebar options={filterOptions} value={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
      <div className="plp-results">
        <div className="plp-results-topbar">
          <p><strong>{filteredProducts.length}</strong> risultati aggiornati in tempo reale</p>
          <ViewToggle view={view} onChange={setView} />
        </div>

        {activeChips.length > 0 && (
          <div className="active-filters">
            {activeChips.map((chip) => <span key={chip} className="filter-chip">{chip}</span>)}
          </div>
        )}

        <div className={view === 'grid' ? 'products-grid products-grid-plp' : 'products-list'}>
          {filteredProducts.map((product) => view === 'grid'
            ? <ProductCard key={product.slug} product={product} />
            : <ProductListItem key={product.slug} product={product} />)}
        </div>
      </div>
    </section>
  )
}
