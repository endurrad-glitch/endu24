export default function TrustSection({ products, shops }: { products: number; shops: number }) {
  return (
    <section className="section-block trust-strip">
      <div className="container trust-grid">
        <article><strong>{products}+</strong><span>prodotti indicizzati</span></article>
        <article><strong>{shops}+</strong><span>shop monitorati</span></article>
        <article><strong>4.8/5</strong><span>soddisfazione utenti</span></article>
      </div>
    </section>
  )
}
