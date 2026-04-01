import 'dotenv/config'
import fs from 'fs'
import csv from 'csv-parser'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const rows = []

fs.createReadStream('./data/products_export.csv')
  .pipe(csv())
  .on('data', (row) => rows.push(row))
  .on('end', async () => {
    for (const row of rows) {

      const payload = {
        slug: row.slug || row.Slug || null,
        name: row.name || row.Title || null,
        image: row.image || row['Image Src'] || null,
        description_html: row.description || row['Body (HTML)'] || null,
        price: row.price || row['Variant Price'] || null,
        store: 'Endurrad',
        offer_url: row.url || null
      }

      const { error } = await supabase
        .from('product_imports')
        .insert(payload)

      if (error) {
        console.error('Errore:', payload.slug, error.message)
      } else {
        console.log('Importato:', payload.slug)
      }
    }

    console.log('✅ IMPORT COMPLETATO')
  })