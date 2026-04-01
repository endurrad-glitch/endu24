import { type Offer } from '@/lib/products'
import { formatPrice } from '@/lib/format'

export function PriceComparisonTable({ offers }: { offers: Offer[] }) {
  return (
    <section>
      <h2>Confronto prezzi</h2>
      <table className="price-table">
        <thead><tr><th>Shop</th><th>Prezzo</th><th>Spedizione</th><th>Disponibilità</th><th /></tr></thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={`${offer.shop}-${offer.price}`}>
              <td>{offer.shop}</td><td>{formatPrice(offer.price)}</td><td>{offer.shipping}</td><td>{offer.availability}</td>
              <td><a href={offer.url}>Vai</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
