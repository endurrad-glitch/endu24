'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

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
  const [openState, setOpenState] = useState<Record<string, boolean>>({
    brand: true,
    category: true,
    priceRange: false,
    rating: false,
    availability: false,
    features: false,
  })

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

      <FilterGroup title="Brand" open>
        {options.brands.map((brand) => (
          <FilterCheck key={brand} label={brand} checked={value.brand.includes(brand)} onChange={() => toggle('brand', brand)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Categoria" open>
        {options.categories.map((category) => (
          <FilterCheck key={category} label={category} checked={value.category.includes(category)} onChange={() => toggle('category', category)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Fascia prezzo" open={openState.priceRange} onToggle={() => setOpenState((prev) => ({ ...prev, priceRange: !prev.priceRange }))}>
        {priceRanges.map((range) => (
          <FilterCheck key={range} label={range === '500+' ? 'Oltre €500' : `€${range.replace('-', ' - €')}`} checked={value.priceRange.includes(range)} onChange={() => toggle('priceRange', range)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Valutazione" open={openState.rating} onToggle={() => setOpenState((prev) => ({ ...prev, rating: !prev.rating }))}>
        {ratingOptions.map((rating) => (
          <FilterCheck key={rating} label={`${rating} stelle`} checked={value.rating.includes(rating)} onChange={() => toggle('rating', rating)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Disponibilità" open={openState.availability} onToggle={() => setOpenState((prev) => ({ ...prev, availability: !prev.availability }))}>
        {options.availability.map((item) => (
          <FilterCheck key={item} label={item} checked={value.availability.includes(item)} onChange={() => toggle('availability', item)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Caratteristiche tecniche" open={openState.features} onToggle={() => setOpenState((prev) => ({ ...prev, features: !prev.features }))}>
        {options.features.map((feature) => (
          <FilterCheck key={feature} label={feature} checked={value.features.includes(feature)} onChange={() => toggle('features', feature)} />
        ))}
      </FilterGroup>
    </aside>
  )
}

function FilterGroup({ title, children, open, onToggle }: { title: string; children: ReactNode; open: boolean; onToggle?: () => void }) {
  const alwaysOpen = !onToggle
  return (
    <section className={`filter-group ${open ? 'open' : ''}`}>
      <button type="button" className="filter-group-trigger" onClick={onToggle} disabled={alwaysOpen}>
        <span>{title}</span>
        <span className={`filter-group-arrow ${open ? 'open' : ''}`} aria-hidden>⌃</span>
      </button>
      <div className="filter-group-content-wrap" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="filter-group-content">{children}</div>
      </div>
    </section>
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
