import Link from 'next/link'
import type { CatalogCategory } from '@/types/catalog'

export function CategoryPills({ categories }: { categories: CatalogCategory[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Categorie principali</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="rounded-full border border-[#2b2b2b]/10 bg-white px-4 py-2 text-sm hover:border-[#2b2b2b]/30"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
