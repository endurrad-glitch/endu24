import { type Offer } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'

export function PriceComparisonTable({ offers, slug }: { offers: Offer[], slug: string }) {
  return (
    <section>
      <h2>Confronto prezzi</h2>
      <table className="price-table">
        <thead><tr><th>Shop</th><th>Prezzo</th><th>Spedizione</th><th>Disponibilità</th><th /></tr></thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={`${offer.shop}-${offer.price}`}>
              <td>{offer.shop}</td><td>{formatPrice(offer.price)}</td><td>{offer.shipping}</td><td>{offer.availability}</td>
              <td>{buildOutboundUrl(offer.url, slug, 'price-table') ? <a href={buildOutboundUrl(offer.url, slug, 'price-table')!} target="_blank" rel="noopener noreferrer sponsored">Vai</a> : <span>Non disponibile</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
