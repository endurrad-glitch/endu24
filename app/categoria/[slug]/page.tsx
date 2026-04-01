import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: any
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { brand } = searchParams

  // 1. categoria
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    return <div>Categoria non trovata</div>
  }

  // 2. parent
  let parent = null
  if (category.parent_id) {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('id', category.parent_id)
      .single()

    parent = data
  }

  // 3. sottocategorie
  const { data: children } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', category.id)

  // 4. brands
  const { data: brands } = await supabase
    .from('brands')
    .select('*')

  // 5. categorie (includi figli)
  const categoryIds = [
    category.id,
    ...(children?.map((c) => c.id) || [])
  ]

  // 6. prodotti
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      image,
      brand_id,
      offers (
        price,
        store,
        currency,
        url
      )
    `)
    .in('category_id', categoryIds)

  // filtro brand
  if (brand) {
    const { data: brandData } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', brand)
      .single()

    if (brandData) {
      query = query.eq('brand_id', brandData.id)
    }
  }

  const { data: products } = await query

  return (
    <main className="container page-section">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link href="/">Home</Link>

        {parent && (
          <>
            <span>/</span>
            <Link href={`/categoria/${parent.slug}`}>
              {parent.name}
            </Link>
          </>
        )}

        <span>/</span>
        <span className="current">{category.name}</span>
      </div>

      {/* TITOLO */}
      <h1 className="category-title">{category.name}</h1>

      {/* SOTTOCATEGORIE */}
      {children?.length > 0 && (
        <>
          <h2>Sottocategorie</h2>

          <div className="subcategory-grid">
            {children.map((c) => (
              <Link
                key={c.id}
                href={`/categoria/${c.slug}`}
                className="subcategory-card"
              >
                <h3>{c.name}</h3>
                <span>Esplora →</span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* LAYOUT */}
      <div className="layout-grid">

        {/* FILTRI */}
        <aside className="filters">
          <h3>Filtri</h3>

          <div className="filter-group">
            <h4>Brand</h4>

            {brands?.map((b) => (
              <Link
                key={b.id}
                href={`?brand=${b.slug}`}
                className="filter-link"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </aside>

        {/* PRODOTTI */}
        <div>

          <h2 className="section-title">
  Prodotti in {category.name}
</h2>

          {products?.length === 0 && (
            <p>Nessun prodotto trovato</p>
          )}

          {/* ✅ GRID CORRETTA */}
          <div className="products-grid">

            {products?.map((p) => {
              const bestOffer = p.offers?.sort((a, b) => a.price - b.price)[0]

              return (
                <Link
                  key={p.id}
                  href={`/prodotto/${p.slug}`}
                  className="product-card-fixed"
                >

                  {/* IMAGE */}
                  <div className="product-image-fixed">
                    <img
                      src={p.image || 'https://placehold.co/400'}
                      alt={p.name}
                    />
                  </div>

                  {/* TITLE */}
                  <div className="product-title-fixed">
                    {p.name}
                  </div>

                  {/* PRICE */}
                  {bestOffer && (
                    <div className="product-price-fixed">
                      <strong>€ {bestOffer.price}</strong>
                      <br />
                      <span>{bestOffer.store}</span>
                    </div>
                  )}

                </Link>
              )
            })}

          </div>
        </div>

      </div>
    </main>
  )
}