import { supabase } from '@/lib/supabase'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  const { data, error } = await supabase
    .from('products')
    .select(`
      name,
      short_description,
      full_description,
      image,
      specs,
      features,
      brands (name),
      categories (name, slug),
      offers (store, price, url)
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return (
      <main className="container page-section">
        <p>Prodotto non trovato.</p>
      </main>
    )
  }

  // 🔥 ORDINA OFFERTE
  const offers = [...(data.offers || [])].sort(
    (a: any, b: any) => Number(a.price) - Number(b.price)
  )

  const bestOffer = offers[0]

  // 🔥 BRAND + CATEGORY
  const brandName = Array.isArray(data.brands)
    ? data.brands[0]?.name
    : (data.brands as any)?.name

  const categoryName = Array.isArray(data.categories)
    ? data.categories[0]?.name
    : (data.categories as any)?.name

  return (
    <main className="container page-section">

      {/* HERO */}
      <section className="product-hero">

        {/* IMAGE */}
        <div className="product-media">
          <img
            src={data.image || 'https://placehold.co/800x800'}
            alt={data.name}
          />
        </div>

        {/* INFO */}
        <div className="product-info">

          {/* EYEBROW */}
          <div className="eyebrow">
            {brandName
              ? `${brandName}${categoryName ? ' · ' + categoryName : ''}`
              : categoryName}
          </div>

          {/* TITLE */}
          <h1 className="product-title">{data.name}</h1>

          {/* ✅ SHORT DESCRIPTION (DB) */}
          {data.short_description && (
            <p className="product-description">
              {data.short_description}
            </p>
          )}

          {/* ✅ FEATURES (bullet points) */}
          {Array.isArray(data.features) && data.features.length > 0 && (
            <ul style={{ marginTop: 20, paddingLeft: 20 }}>
              {data.features.map((f: string, i: number) => (
                <li key={i} style={{ marginBottom: 6 }}>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* PRICE */}
          {bestOffer && (
            <div className="price-card">
              <p className="price-value">€{bestOffer.price}</p>
              <p className="price-meta">
                Miglior prezzo su {bestOffer.store}
              </p>

              <a
                href={bestOffer.url}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                Acquista
              </a>
            </div>
          )}

        </div>
      </section>

      {/* ✅ DESCRIZIONE COMPLETA */}
      {data.full_description && (
        <section style={{ marginTop: 60 }}>
          <h2 className="section-title">Descrizione completa</h2>

          <div
            style={{
              maxWidth: '800px',
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#3a3a3c'
            }}
            dangerouslySetInnerHTML={{ __html: data.full_description }}
          />
        </section>
      )}

      {/* ✅ SPECIFICHE */}
      {data.specs && (
        <section className="page-section" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <h2 className="section-title">Specifiche</h2>

          <div className="specs-card">
            <div className="specs-grid">
              {Object.entries(data.specs).map(([key, value]) => (
                <div className="spec-row" key={key}>
                  <span className="spec-key">{key}</span>
                  <span className="spec-value">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OFFERTE */}
      {offers.length > 0 && (
        <section className="page-section" style={{ paddingTop: 56 }}>
          <h2 className="section-title">Confronta prezzi</h2>

          <div className="offers-card">
            <div className="offers-list">

              {offers.map((offer: any, index: number) => (
                <div className="offer-row" key={`${offer.store}-${index}`}>

                  <div className="offer-store">
                    {offer.store}
                  </div>

                  <div className="offer-price">
                    €{offer.price}
                  </div>

                  <a
                    href={offer.url}
                    target="_blank"
                    rel="noreferrer"
                    className="offer-link"
                  >
                    Vai al negozio
                  </a>

                </div>
              ))}

            </div>
          </div>
        </section>
      )}

    </main>
  )
}