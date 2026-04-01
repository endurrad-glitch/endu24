import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import fs from 'fs'
import csv from 'csv-parser'
import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// 🔥 UTILS

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractFeatures(html = '') {
  const matches = [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gi)]
  return matches
    .map(m => m[1].replace(/<[^>]+>/g, '').trim())
    .filter(Boolean)
    .slice(0, 6)
}

function truncate(text = '', max = 120) {
  if (text.length <= max) return text
  return text.slice(0, max).trim() + '...'
}

// 🔥 funzione mapping categoria
async function getCategoryId(row) {
  const title = row['Title']?.toLowerCase() || ''

  let slug = 'accessori'

  if (title.includes('casco')) slug = 'caschi'
  else if (title.includes('giacca')) slug = 'giacche'
  else if (title.includes('guanti')) slug = 'guanti'
  else if (title.includes('borsa') || title.includes('valigia')) slug = 'valigie-borse'
  else if (title.includes('gps') || title.includes('telecamera')) slug = 'elettronica'

  const { data } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .single()

  return data?.id || null
}

const results = []

fs.createReadStream('data/products_export.csv')
  .pipe(csv())
  .on('data', (row) => results.push(row))
  .on('end', async () => {

    for (const r of results) {

      const name = r['Title']
      const slug = r['Handle']
      const brandName = r['Vendor']
      const image = r['Image Src']
      const price = parseFloat(r['Variant Price'])
      const html = r['Body (HTML)'] || ''

      if (!name || !slug) continue

      // 🔥 GENERAZIONE DATI
      const clean = stripHtml(html)
      const short = truncate(clean, 120)
      const features = extractFeatures(html)

      // 🔥 CATEGORY
      const category_id = await getCategoryId(r)

      // 🔥 BRAND
      let { data: brand } = await supabase
        .from('brands')
        .select('*')
        .eq('name', brandName)
        .single()

      if (!brand) {
        const { data: newBrand } = await supabase
          .from('brands')
          .insert({
            name: brandName,
            slug: slugify(brandName, { lower: true })
          })
          .select()
          .single()

        brand = newBrand
      }

      // 🔥 UPSERT PRODUCT (NO DUPLICATI)
      const { data: product } = await supabase
        .from('products')
        .upsert({
          name,
          slug,
          image,
          brand_id: brand.id,
          category_id: category_id,

          // 🔥 DATA MODEL COMPLETO
          description: html,
          short_description: short,
          full_description: html,
          features: features
        }, {
          onConflict: 'slug'
        })
        .select()
        .single()

      // 🔥 OFFER (sempre aggiornata)
      await supabase
        .from('offers')
        .upsert({
          product_id: product.id,
          store: 'Endurrad',
          price,
          url: `https://endurrad.com/products/${slug}`,
          currency: 'EUR'
        }, {
          onConflict: 'product_id,store'
        })

      console.log('✔ Importato:', name)
    }

    console.log('🚀 IMPORT COMPLETATO')
  })