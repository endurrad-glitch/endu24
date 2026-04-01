import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

export type Offer = {
  shop: string
  price: number
  shipping: string
  availability: string
  url: string | null
}

export type Product = {
  slug: string
  title: string
  brand: string
  category: string
  categorySlug?: string
  categoryId?: number
  sourceCategory?: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  rating: number
  reviews: number
  availability: string
  image: string
  images: string[]
  tags: string[]
  specs: Record<string, string>
  offers: Offer[]
  externalUrl?: string | null
  related: string[]
}

type CatalogPayload = {
  generatedAt?: string
  categories?: Array<{ slug: string, name: string }>
  products: Product[]
}

const CATALOG_PATH = process.env.CATALOG_DATA_FILE
  ? path.resolve(process.cwd(), process.env.CATALOG_DATA_FILE)
  : path.join(process.cwd(), 'data/catalog/products.json')

function ensureProduct(product: Product): Product {
  const fallbackOffer = {
    shop: 'Endurrad',
    price: product.price,
    shipping: '€6,99',
    availability: product.availability || 'Disponibile',
    url: product.externalUrl || null,
  }

  const offers = (product.offers || []).map((offer) => ({
    ...offer,
    url: offer.url || product.externalUrl || null,
  }))

  return {
    ...product,
    image: product.image || '/file.svg',
    images: product.images?.length ? product.images : [product.image || '/file.svg'],
    offers: offers.length ? offers : [fallbackOffer],
    rating: product.rating || 4.3,
    reviews: product.reviews || 0,
  }
}

async function loadCatalog(): Promise<CatalogPayload> {
  const raw = await fs.readFile(CATALOG_PATH, 'utf8')
  return JSON.parse(raw) as CatalogPayload
}

async function parseProductsInternal(): Promise<Product[]> {
  const catalog = await loadCatalog()
  return (catalog.products || [])
    .filter((product) => product.slug && product.title && product.price > 0)
    .map(ensureProduct)
}

export const getProducts = cache(parseProductsInternal)

export async function getProductBySlug(slug: string) {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
}

export async function getSearchSuggestions(query: string, limit = 8) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const products = await getProducts()

  return products
    .map((product) => {
      const haystack = `${product.title} ${product.brand} ${product.category}`.toLowerCase()
      const score = haystack.includes(q)
        ? haystack.startsWith(q)
          ? 100
          : 80
        : q.split('').every((char) => haystack.includes(char))
          ? 50
          : 0
      return { product, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, limit)
    .map(({ product }) => product)
}
