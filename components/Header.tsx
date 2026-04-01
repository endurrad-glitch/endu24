import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { CategoryMenu } from '@/components/CategoryMenu'
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'
import { buildCategoryTree } from '@/lib/catalog'

export default async function Header() {
  const products = await getProducts()
  const searchIndex = products.slice(0, 150).map((p) => ({
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    category: p.category,
    image: p.image,
    price: p.offers[0]?.price ?? p.price,
    rating: p.rating,
    reviews: p.reviews,
    shops: p.offers.length,
  }))

  const categoryTree = buildCategoryTree(products)

  return (
    <header className="site-header">
      <div className="container header-grid">
        <Link href="/" className="brand" aria-label="Endu24 home">
          <span className="brand-logo">E24</span>
          <span className="brand-text">endu24</span>
        </Link>
        <GlobalSearchBar products={searchIndex} />
        <div className="header-utility">Comparatore Premium</div>
      </div>
      <div className="header-categories-wrap">
        <div className="container">
          <CategoryMenu categories={categoryTree} />
        </div>
      </div>
    </header>
  )
}
