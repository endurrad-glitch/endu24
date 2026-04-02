import type { CatalogProduct } from '@/types/catalog'
import { ProductCard } from '@/components/layout/product-card'

export function ProductCarousel({ title, products }: { title: string; products: CatalogProduct[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
