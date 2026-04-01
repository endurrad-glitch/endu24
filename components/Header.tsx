import { getProducts } from '@/lib/products'
import { buildCategoryTree, getFlatCategories } from '@/lib/catalog'
import { HeaderClient } from '@/components/HeaderClient'

export default async function Header() {
  const [products, flatCategories] = await Promise.all([getProducts(), getFlatCategories()])

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

  const categoryTree = buildCategoryTree(flatCategories)

  return <HeaderClient searchIndex={searchIndex} categoryTree={categoryTree} />
}
