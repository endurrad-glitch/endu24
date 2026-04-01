import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

export function CategoryGrid({ categories }: { categories: CategoryNode[] }) {
  return (
    <section>
      <h2>Categorie popolari</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} href={`/categoria/${category.slug}`} className="category-card">
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
