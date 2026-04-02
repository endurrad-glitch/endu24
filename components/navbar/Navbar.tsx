import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import MobileMenu from '@/components/navbar/MobileMenu'

type Category = {
  name: string
  slug: string
}

async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase.from('categories').select('name, slug').eq('active', true)

  if (error) {
    console.error('Unable to load categories for navbar:', error.message)
    return []
  }

  return data ?? []
}

export default async function Navbar() {
  const categories = await getCategories()

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          endu24.com
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="text-sm font-medium text-slate-700 hover:text-slate-900">
              {cat.name}
            </Link>
          ))}
        </div>

        <MobileMenu categories={categories} />
      </div>
    </nav>
  )
}
