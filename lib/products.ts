import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import csv from 'csv-parser'

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

async function parseCsvProductsFallback(): Promise<Product[]> {
  const dataDir = path.join(process.cwd(), 'data')
  const filenames = (await fs.readdir(dataDir))
    .filter((name) => name.toLowerCase().startsWith('products_export') && name.toLowerCase().endsWith('.csv'))

  const rows = await Promise.all(
    filenames.map((filename) => new Promise<Record<string, string>[]>((resolve, reject) => {
      const items: Record<string, string>[] = []
      createReadStream(path.join(dataDir, filename))
        .pipe(csv())
        .on('data', (row) => items.push(row))
        .on('end', () => resolve(items))
        .on('error', reject)
    })),
  )

  const products = rows.flatMap((rowSet) => rowSet.map((row) => {
    const slug = String(row.Handle || row.slug || '').trim()
    const title = String(row.Title || row.name || '').trim()
    const price = Number.parseFloat(String(row['Variant Price'] || row.price || '').replace(',', '.'))
    if (!slug || !title || !Number.isFinite(price) || price <= 0) return null

    const image = String(row['Image Src'] || row.image || '/file.svg')
    const externalUrl = String(row['Variant URL'] || row.URL || '').trim() || `https://endurrad.com/products/${slug}`
    return ensureProduct({
      slug,
      title,
      brand: String(row.Vendor || 'ENDU24'),
      category: String(row.Type || row['Product Category'] || 'Accessori Moto'),
      description: String(row['Body (HTML)'] || ''),
      shortDescription: String(row['SEO Description'] || title),
      price,
      compareAtPrice: null,
      rating: 4.3,
      reviews: 0,
      availability: row.Status === 'active' ? 'Disponibile' : 'Non disponibile',
      image,
      images: [image],
      tags: [],
      specs: {},
      offers: [{
        shop: 'Endurrad',
        price,
        shipping: price > 200 ? 'Gratuita' : '€6,99',
        availability: row.Status === 'active' ? 'In stock' : 'Out of stock',
        url: externalUrl,
      }],
      externalUrl,
      related: [],
    })
  }))

  const bySlug = new Map<string, Product>()
  for (const product of products) {
    if (!product) continue
    if (!bySlug.has(product.slug)) bySlug.set(product.slug, product)
  }
  return [...bySlug.values()]
}

async function parseProductsInternal(): Promise<Product[]> {
  const catalog = await loadCatalog().catch(() => ({ products: [] }))
  const parsed = (catalog.products || [])
    .filter((product) => product.slug && product.title && product.price > 0)
    .map(ensureProduct)

  if (parsed.length > 0) return parsed
  const fallbackProducts = await parseCsvProductsFallback()
  return fallbackProducts
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
