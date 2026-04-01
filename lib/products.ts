import fs from 'node:fs/promises'
import path from 'node:path'

type CsvRow = Record<string, string>

export type ShopOffer = {
  shop: string
  price: number
  shipping: number
  inStock: boolean
  url: string
}

export type Product = {
  handle: string
  slug: string
  name: string
  description: string
  brand: string
  category: string
  type: string
  tags: string[]
  image: string
  images: string[]
  basePrice: number
  compareAtPrice?: number
  rating: number
  ratingCount: number
  specs: Record<string, string>
  offers: ShopOffer[]
}

let cache: Product[] | null = null

function parseCsv(csv: string): CsvRow[] {
  const rows: string[][] = []
  let currentField = ''
  let currentRow: string[] = []
  let inQuotes = false

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i]
    const next = csv[i + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        currentField += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentField)
      currentField = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      currentRow.push(currentField)
      if (currentRow.some((value) => value.trim() !== '')) rows.push(currentRow)
      currentRow = []
      currentField = ''
      continue
    }

    currentField += char
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  if (rows.length === 0) return []
  const [headers, ...values] = rows

  return values.map((row) => {
    const obj: CsvRow = {}
    headers.forEach((header, index) => {
      obj[header] = (row[index] ?? '').trim()
    })
    return obj
  })
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function toPrice(value: string) {
  const price = Number.parseFloat(value.replace(',', '.'))
  return Number.isFinite(price) ? price : 0
}

function pseudoRating(seed: string) {
  const base = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const rating = 3.8 + (base % 12) / 10
  return Math.min(4.9, Number(rating.toFixed(1)))
}

function pseudoCount(seed: string) {
  return 18 + (seed.length * 7) % 340
}

function buildOffers(handle: string, basePrice: number): ShopOffer[] {
  const shops = ['Amazon', 'FC-Moto', 'Motocard', 'WheelUp', 'MotoStorm']
  return shops.slice(0, 3 + (handle.length % 3)).map((shop, index) => {
    const variation = 1 - index * 0.02 + ((handle.charCodeAt(index % handle.length) % 5) - 2) * 0.005
    const price = Math.max(1, Number((basePrice * variation).toFixed(2)))
    return {
      shop,
      price,
      shipping: index === 0 ? 0 : 5.9 + index,
      inStock: index % 4 !== 3,
      url: '#',
    }
  }).sort((a, b) => a.price - b.price)
}

function extractSpecs(row: CsvRow) {
  const keys = [
    'Materiale (product.metafields.custom.materiale)',
    'Peso (product.metafields.custom.peso)',
    'Waterproof (product.metafields.custom.impermeabilit_)',
    'Potenza (product.metafields.custom.potenza)',
    'Modalità funzionamento (product.metafields.custom.modalit_funzionamento)',
  ]

  const specs: Record<string, string> = {}
  for (const key of keys) {
    if (row[key]) specs[key.split('(')[0].trim()] = row[key]
  }
  return specs
}

export async function getProducts() {
  if (cache) return cache

  const csvPath = path.join(process.cwd(), 'data', 'products_export.csv')
  const content = await fs.readFile(csvPath, 'utf8')
  const rows = parseCsv(content)

  const byHandle = new Map<string, Product>()

  for (const row of rows) {
    const handle = row['Handle']
    if (!handle) continue

    const existing = byHandle.get(handle)
    const image = row['Image Src']

    if (existing) {
      if (image && !existing.images.includes(image)) existing.images.push(image)
      continue
    }

    const basePrice = toPrice(row['Variant Price'])
    const offers = buildOffers(handle, basePrice || 1)

    byHandle.set(handle, {
      handle,
      slug: handle,
      name: row['Title'] || handle,
      description: stripHtml(row['Body (HTML)'] || ''),
      brand: row['Vendor'] || 'Endu24',
      category: row['Product Category'] || 'Accessori',
      type: row['Type'] || 'Prodotto',
      tags: (row['Tags'] || '').split(',').map((tag) => tag.trim()).filter(Boolean),
      image: image || '/globe.svg',
      images: image ? [image] : ['/globe.svg'],
      basePrice,
      compareAtPrice: toPrice(row['Variant Compare At Price']),
      rating: pseudoRating(handle),
      ratingCount: pseudoCount(handle),
      specs: extractSpecs(row),
      offers,
    })
  }

  cache = Array.from(byHandle.values())
  return cache
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
}

export async function getCategories() {
  const products = await getProducts()
  return Array.from(new Set(products.map((product) => product.type))).slice(0, 8)
}
