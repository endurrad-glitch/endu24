import fs from 'node:fs'
import path from 'node:path'
import csv from 'csv-parser'
import { cache } from 'react'

export type Offer = {
  shop: string
  price: number
  shipping: string
  availability: string
  url: string
}

export type Product = {
  slug: string
  title: string
  brand: string
  category: string
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
  related: string[]
}

type CsvRow = Record<string, string>

const DATASET_PATH = path.join(process.cwd(), 'data/products_export.csv')

const RESERVED_FIELDS = new Set([
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Type',
  'Tags',
  'Variant Price',
  'Variant Compare At Price',
  'Image Src',
  'Image Alt Text',
  'SEO Description',
  'Status',
  'Numero di valutazioni del prodotto (product.metafields.reviews.rating_count)',
  'Prodotti correlati (product.metafields.shopify--discovery--product_recommendation.related_products)',
  'Product Category',
])

function toFloat(value?: string) {
  if (!value) return 0
  const parsed = Number.parseFloat(value.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}

function pickShipping(price: number) {
  if (price > 200) return 'Gratuita'
  if (price > 80) return '€4,99'
  return '€7,99'
}

function pseudoRandom(seed: string) {
  return seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

function createOffers(basePrice: number, slug: string): Offer[] {
  const shops = ['MotoPlanet', 'SpeedGear', 'RiderHouse', 'XRoad Store', 'Urban Biker']
  const seed = pseudoRandom(slug)
  const count = 3 + (seed % 3)

  return shops.slice(0, count).map((shop, index) => {
    const variant = 1 + ((index * 2 + seed) % 6) / 100
    const price = Number((basePrice * variant).toFixed(2))
    return {
      shop,
      price,
      shipping: pickShipping(price),
      availability: index === 0 ? 'In stock' : 'Disponibile in 24/48h',
      url: '#',
    }
  }).sort((a, b) => a.price - b.price)
}

async function loadRows(): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    const rows: CsvRow[] = []
    fs.createReadStream(DATASET_PATH)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => resolve(rows))
      .on('error', reject)
  })
}

async function parseProductsInternal(): Promise<Product[]> {
  const rows = await loadRows()
  const bySlug = new Map<string, Product>()

  for (const row of rows) {
    const slug = row.Handle?.trim()
    if (!slug) continue

    const title = row.Title?.trim()
    const image = row['Image Src']?.trim()

    if (!bySlug.has(slug) && title) {
      const price = toFloat(row['Variant Price'])
      const compareAtPrice = toFloat(row['Variant Compare At Price'])
      const reviews = Number(row['Numero di valutazioni del prodotto (product.metafields.reviews.rating_count)'] || '0') || 0
      const rating = Number((3.9 + (pseudoRandom(slug) % 11) / 10).toFixed(1))

      const specs: Record<string, string> = {}
      for (const [key, rawValue] of Object.entries(row)) {
        const value = rawValue?.trim()
        if (!value || RESERVED_FIELDS.has(key)) continue
        if (key.startsWith('Google Shopping')) continue
        specs[key.replace(/\s*\(.+\)$/, '')] = value
      }

      const product: Product = {
        slug,
        title,
        brand: row.Vendor?.trim() || 'ENDU24',
        category: row.Type?.trim() || row['Product Category']?.trim() || 'Accessori moto',
        description: row['Body (HTML)'] || '',
        shortDescription: row['SEO Description'] || '',
        price,
        compareAtPrice: compareAtPrice || undefined,
        rating,
        reviews,
        availability: row.Status === 'active' ? 'Disponibile' : 'Non disponibile',
        image: image || '/file.svg',
        images: image ? [image] : ['/file.svg'],
        tags: (row.Tags || '').split(',').map((item) => item.trim()).filter(Boolean),
        specs,
        offers: createOffers(price || 39, slug),
        related: (row['Prodotti correlati (product.metafields.shopify--discovery--product_recommendation.related_products)'] || '')
          .split(';')
          .map((item) => item.trim())
          .filter(Boolean),
      }
      bySlug.set(slug, product)
      continue
    }

    if (image && bySlug.has(slug)) {
      bySlug.get(slug)!.images.push(image)
    }
  }

  return Array.from(bySlug.values()).filter((product) => product.title && product.price > 0)
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
