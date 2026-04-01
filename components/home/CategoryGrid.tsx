import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

export function CategoryGrid({ categories }: { categories: CategoryNode[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">Categorie popolari</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categoria/${category.slug}`} className="rounded-xl border border-slate-200 bg-white px-3 py-4 text-center text-sm font-medium text-slate-700">
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
