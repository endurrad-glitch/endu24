import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { CategoryMenu } from '@/components/CategoryMenu'
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar'

const categoryTree = [
  {
    label: 'Caschi',
    href: '/ricerca?q=caschi',
    children: [
      { label: 'Integrali', href: '/ricerca?q=casco+integrale', children: [{ label: 'Racing', href: '/ricerca?q=casco+racing' }, { label: 'Touring', href: '/ricerca?q=casco+touring' }] },
      { label: 'Modulari', href: '/ricerca?q=casco+modulare', children: [{ label: 'Apribili', href: '/ricerca?q=casco+apribile' }, { label: 'Dual Sport', href: '/ricerca?q=casco+dual+sport' }] },
    ],
  },
  {
    label: 'Abbigliamento',
    href: '/ricerca?q=abbigliamento+moto',
    children: [
      { label: 'Giacche', href: '/ricerca?q=giacche', children: [{ label: '4 Stagioni', href: '/ricerca?q=giacche+4+stagioni' }, { label: 'Estive', href: '/ricerca?q=giacche+estive' }] },
      { label: 'Guanti', href: '/ricerca?q=guanti', children: [{ label: 'Invernali', href: '/ricerca?q=guanti+invernali' }, { label: 'Estivi', href: '/ricerca?q=guanti+estivi' }] },
    ],
  },
  {
    label: 'Elettronica',
    href: '/ricerca?q=elettronica',
    children: [
      { label: 'Interfono', href: '/ricerca?q=interfono', children: [{ label: 'Singolo', href: '/ricerca?q=interfono+singolo' }, { label: 'Doppio', href: '/ricerca?q=interfono+doppio' }] },
      { label: 'Navigazione', href: '/ricerca?q=navigatore+moto', children: [{ label: 'GPS', href: '/ricerca?q=gps+moto' }, { label: 'Supporti', href: '/ricerca?q=supporto+telefono+moto' }] },
    ],
  },
  {
    label: 'Valigie e Borse',
    href: '/ricerca?q=valigie+borse',
    children: [
      { label: 'Laterali', href: '/ricerca?q=valigie+laterali', children: [{ label: 'Rigide', href: '/ricerca?q=valigie+rigide' }, { label: 'Morbide', href: '/ricerca?q=valigie+morbide' }] },
      { label: 'Top Case', href: '/ricerca?q=top+case', children: [{ label: 'Monokey', href: '/ricerca?q=top+case+monokey' }, { label: 'Urban', href: '/ricerca?q=top+case+urban' }] },
    ],
  },
]

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
