import Link from 'next/link'

export function CategoryGrid({ categories }: { categories: string[] }) {
  return (
    <section>
      <h2>Categorie popolari</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category} href={`/ricerca?categoria=${encodeURIComponent(category)}`} className="category-card">
            {category}
          </Link>
        ))}
      </div>
    </section>
  )
}
