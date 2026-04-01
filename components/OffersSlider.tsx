import DealsSlider from '@/components/DealsSlider'
import type { Product } from '@/lib/products'

export default function OffersSlider({ products }: { products: Product[] }) {
  return (
    <section className="section-block deals-section">
      <div className="container">
        <div className="section-head">
          <h2>Offerte del giorno</h2>
          <p>Prezzi aggiornati in tempo reale dai negozi partner.</p>
        </div>
        <DealsSlider products={products} />
      </div>
    </section>
  )
}
