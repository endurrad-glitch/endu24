'use client'

import type { ReactNode } from 'react'

type FilterState = {
  brand: string[]
  category: string[]
  priceRange: string[]
  rating: string[]
  availability: string[]
  features: string[]
}

type FilterOptionGroups = {
  brands: string[]
  categories: string[]
  availability: string[]
  features: string[]
}

const priceRanges = ['0-100', '100-250', '250-500', '500+']
const ratingOptions = ['4+', '4.5+']

export function FilterSidebar({
  options,
  value,
  onChange,
  onReset,
}: {
  options: FilterOptionGroups
  value: FilterState
  onChange: (value: FilterState) => void
  onReset: () => void
}) {
  const toggle = (group: keyof FilterState, entry: string) => {
    const exists = value[group].includes(entry)
    const next = exists ? value[group].filter((item) => item !== entry) : [...value[group], entry]
    onChange({ ...value, [group]: next })
  }

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-header">
        <h3>Filtri</h3>
        <button type="button" onClick={onReset}>Reset filtri</button>
      </div>

      <FilterGroup title="Brand">
        {options.brands.map((brand) => (
          <FilterCheck key={brand} label={brand} checked={value.brand.includes(brand)} onChange={() => toggle('brand', brand)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Categoria">
        {options.categories.map((category) => (
          <FilterCheck key={category} label={category} checked={value.category.includes(category)} onChange={() => toggle('category', category)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Fascia prezzo">
        {priceRanges.map((range) => (
          <FilterCheck key={range} label={range === '500+' ? 'Oltre €500' : `€${range.replace('-', ' - €')}`} checked={value.priceRange.includes(range)} onChange={() => toggle('priceRange', range)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Valutazione">
        {ratingOptions.map((rating) => (
          <FilterCheck key={rating} label={`${rating} stelle`} checked={value.rating.includes(rating)} onChange={() => toggle('rating', rating)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Disponibilità">
        {options.availability.map((item) => (
          <FilterCheck key={item} label={item} checked={value.availability.includes(item)} onChange={() => toggle('availability', item)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Caratteristiche tecniche">
        {options.features.map((feature) => (
          <FilterCheck key={feature} label={feature} checked={value.features.includes(feature)} onChange={() => toggle('features', feature)} />
        ))}
      </FilterGroup>
    </aside>
  )
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open>
      <summary>{title}</summary>
      <div className="filter-group-content">{children}</div>
    </details>
  )
}

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="filter-check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

export type { FilterState, FilterOptionGroups }
