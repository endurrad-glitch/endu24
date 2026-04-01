import { getCategories, getProducts } from '@/lib/products'

type Props = {
  currentQuery?: string
  currentBrand?: string
  currentCategory?: string
}

export default async function FilterSidebar({ currentQuery, currentBrand, currentCategory }: Props) {
  const categories = await getCategories()
  const products = await getProducts()
  const brands = Array.from(new Set(products.map((product) => product.brand))).slice(0, 15)

  return (
    <aside className="filter-sidebar">
      <form action="/search" className="filter-form">
        <input type="hidden" name="q" defaultValue={currentQuery ?? ''} />

        <details open>
          <summary>Prezzo</summary>
          <label>Min<input name="min" type="number" placeholder="0" /></label>
          <label>Max<input name="max" type="number" placeholder="1000" /></label>
          <input type="range" min="0" max="2000" defaultValue="700" aria-label="Range prezzo" />
        </details>

        <details open>
          <summary>Brand</summary>
          <select name="brand" defaultValue={currentBrand ?? ''}>
            <option value="">Tutti i brand</option>
            {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </details>

        <details open>
          <summary>Categoria</summary>
          <select name="category" defaultValue={currentCategory ?? ''}>
            <option value="">Tutte</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </details>

        <details>
          <summary>Valutazione</summary>
          <select name="rating" defaultValue="">
            <option value="">Qualsiasi</option>
            <option value="4">4+ stelle</option>
            <option value="4.5">4.5+ stelle</option>
          </select>
        </details>

        <details>
          <summary>Disponibilità</summary>
          <select name="stock" defaultValue="">
            <option value="">Tutte</option>
            <option value="in-stock">Disponibile subito</option>
          </select>
        </details>

        <button type="submit">Applica filtri</button>
      </form>
    </aside>
  )
}
