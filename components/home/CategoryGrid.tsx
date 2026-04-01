import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

const iconByName: Record<string, string> = {
  caschi: '🪖',
  abbigliamento: '🧥',
  accessori: '🎒',
  manutenzione: '🔧',
  elettronica: '🎧',
  moto: '🏍️',
}

export function CategoryGrid({ categories }: { categories: CategoryNode[] }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold text-[#2b2b2b]">Categorie popolari</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const icon = iconByName[category.slug] || '🏷️'
          return (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="flex min-h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-[#2b2b2b]"
            >
              <span aria-hidden className="text-lg">{icon}</span>
              <span className="line-clamp-2">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
