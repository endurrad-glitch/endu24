export function TrustSection({ products, shops }: { products: number; shops: number }) {
  return (
    <section className="trust-grid">
      <article><strong>{products}+</strong><span>prodotti indicizzati</span></article>
      <article><strong>{shops}+</strong><span>negozi comparati</span></article>
      <article><strong>24/7</strong><span>aggiornamento offerte</span></article>
    </section>
  )
}
