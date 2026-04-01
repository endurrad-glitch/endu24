import Link from 'next/link'

export function FilterSidebar({ brands, categories }: { brands: string[]; categories: string[] }) {
  return (
    <aside className="filter-sidebar">
      <h3>Filtri</h3>
      <details open>
        <summary>Brand</summary>
        {brands.map((brand) => <Link key={brand} href={`/ricerca?brand=${encodeURIComponent(brand)}`}>{brand}</Link>)}
      </details>
      <details open>
        <summary>Categoria</summary>
        {categories.map((category) => <Link key={category} href={`/ricerca?categoria=${encodeURIComponent(category)}`}>{category}</Link>)}
      </details>
    </aside>
  )
}
