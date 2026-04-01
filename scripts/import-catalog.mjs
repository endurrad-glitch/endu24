import fs from 'node:fs/promises'
import path from 'node:path'
import { createReadStream } from 'node:fs'
import csv from 'csv-parser'

const ROOT = process.cwd()
const DATA_DIR = path.join(ROOT, 'data')
const OUTPUT_PATH = path.join(DATA_DIR, 'catalog/products.json')
const MASTER_PATH = path.join(DATA_DIR, 'catalog/category-master.json')
const MAPPING_PATH = path.join(DATA_DIR, 'catalog/category-mapping.json')
const PRODUCT_BASE_URL = process.env.PRODUCT_BASE_URL || 'https://endurrad.com/products/'

function parseArgs() {
  const args = process.argv.slice(2)
  const parsed = { inputs: [], source: 'auto', brand: 'default' }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--source') parsed.source = args[++i]
    else if (arg === '--input') parsed.inputs.push(args[++i])
    else if (arg === '--brand') parsed.brand = args[++i].toLowerCase()
    else if (arg === '--output') parsed.output = args[++i]
  }
  return parsed
}

function cleanHtml(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function toPrice(value) {
  const n = Number.parseFloat(String(value ?? '').replace(',', '.'))
  return Number.isFinite(n) ? n : 0
}

function maybeUrl(value) {
  if (!value) return null
  const s = String(value).trim()
  if (!s) return null
  if (/^https?:\/\//i.test(s)) return s
  return null
}

function buildExternalUrl(row, slug) {
  const candidates = [
    row['Variant URL'],
    row['Product URL'],
    row['URL'],
    row.url,
    row.link,
    row['Link'],
    row.offer_url,
  ]
  for (const c of candidates) {
    const valid = maybeUrl(c)
    if (valid) return valid
  }
  return slug ? new URL(slug, PRODUCT_BASE_URL).toString() : null
}

function keywordMatch(text, keywords = []) {
  return keywords.some((k) => text.includes(k))
}

function mapCategory(row, brand, masterCategories, mapping) {
  const raw = String(row.Type || row['Product Category'] || '').trim().toLowerCase()
  const vendorMap = mapping[brand] || mapping.default || {}

  if (raw && vendorMap[raw]) {
    return masterCategories.find((c) => c.slug === vendorMap[raw]) || null
  }

  const probe = `${row.Title || ''} ${raw}`.toLowerCase()
  return masterCategories.find((cat) => keywordMatch(probe, cat.keywords || [])) || null
}

async function parseCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const rows = []
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject)
  })
}


function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\s\S]*?)<\/${tag}>`, 'i'))
  return match ? match[1].trim() : ''
}

async function parseXmlFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  const blocks = raw.match(/<(product|item)\b[\s\S]*?<\/(product|item)>/gi) || []
  return blocks.map((block) => ({
    Handle: extractTag(block, 'handle') || extractTag(block, 'id') || extractTag(block, 'sku'),
    Title: extractTag(block, 'title') || extractTag(block, 'name'),
    Vendor: extractTag(block, 'brand') || extractTag(block, 'vendor'),
    Type: extractTag(block, 'product_type') || extractTag(block, 'type'),
    'Product Category': extractTag(block, 'category'),
    'Body (HTML)': extractTag(block, 'description'),
    'SEO Description': extractTag(block, 'short_description'),
    'Variant Price': extractTag(block, 'price'),
    'Variant Compare At Price': extractTag(block, 'compare_at_price'),
    'Image Src': extractTag(block, 'image_link') || extractTag(block, 'image'),
    Status: extractTag(block, 'availability').toLowerCase() === 'in stock' ? 'active' : 'draft',
    URL: extractTag(block, 'link'),
    Tags: extractTag(block, 'tags'),
  }))
}

async function parseInput(filePath, source) {
  const ext = path.extname(filePath).toLowerCase()
  const effective = source === 'auto' ? (ext === '.xml' ? 'xml' : 'csv') : source
  if (effective === 'xml') return parseXmlFile(filePath)
  return parseCsvFile(filePath)
}

function toProduct(row, context) {
  const slug = String(row.Handle || '').trim()
  const title = String(row.Title || '').trim()
  if (!slug || !title) return null

  const category = mapCategory(row, context.brand, context.masterCategories, context.mapping)
  const externalUrl = buildExternalUrl(row, slug)
  const price = toPrice(row['Variant Price'])
  const compareAtPrice = toPrice(row['Variant Compare At Price'])
  const description = String(row['Body (HTML)'] || '')

  const product = {
    slug,
    title,
    brand: String(row.Vendor || context.brand || 'ENDU24').trim(),
    category: (category?.name || 'Accessori Moto'),
    categorySlug: (category?.slug || 'accessori-moto'),
    sourceCategory: String(row.Type || row['Product Category'] || '').trim(),
    description,
    shortDescription: String(row['SEO Description'] || cleanHtml(description).slice(0, 180)),
    price,
    compareAtPrice: compareAtPrice || null,
    rating: 4.4,
    reviews: Number.parseInt(row['Numero di valutazioni del prodotto (product.metafields.reviews.rating_count)'] || '0', 10) || 0,
    availability: row.Status === 'active' ? 'Disponibile' : 'Non disponibile',
    image: row['Image Src'] || '/file.svg',
    images: row['Image Src'] ? [row['Image Src']] : ['/file.svg'],
    tags: String(row.Tags || '').split(',').map((v) => v.trim()).filter(Boolean),
    specs: {},
    offers: [
      {
        shop: 'Endurrad',
        price,
        shipping: price > 200 ? 'Gratuita' : '€6,99',
        availability: row.Status === 'active' ? 'In stock' : 'Out of stock',
        url: externalUrl,
      },
    ],
    externalUrl,
    related: [],
    source: context.brand,
    importedAt: new Date().toISOString(),
  }

  return product
}

async function main() {
  const args = parseArgs()
  const masterCategories = JSON.parse(await fs.readFile(MASTER_PATH, 'utf8'))
  const mapping = JSON.parse(await fs.readFile(MAPPING_PATH, 'utf8'))

  const inputs = args.inputs.length ? args.inputs : (await fs.readdir(DATA_DIR))
    .filter((name) => name.startsWith('products_export') && /\.csv$/i.test(name))
    .map((name) => path.join(DATA_DIR, name))

  const productsBySlug = new Map()

  for (const input of inputs) {
    const rows = await parseInput(input, args.source)
    for (const row of rows) {
      const product = toProduct(row, { brand: args.brand, masterCategories, mapping })
      if (!product) continue
      if (!productsBySlug.has(product.slug)) {
        productsBySlug.set(product.slug, product)
        continue
      }
      const existing = productsBySlug.get(product.slug)
      if (product.image && !existing.images.includes(product.image)) existing.images.push(product.image)
      if (!existing.externalUrl && product.externalUrl) {
        existing.externalUrl = product.externalUrl
        existing.offers = existing.offers.map((offer) => ({ ...offer, url: product.externalUrl }))
      }
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceCount: inputs.length,
    categories: masterCategories,
    products: [...productsBySlug.values()].filter((p) => p.price > 0),
  }

  const out = args.output ? path.resolve(ROOT, args.output) : OUTPUT_PATH
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify(payload, null, 2))
  console.log(`Imported ${payload.products.length} products from ${inputs.length} source(s) -> ${out}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
