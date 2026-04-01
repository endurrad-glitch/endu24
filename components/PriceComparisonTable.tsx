import type { ShopOffer } from '@/lib/products'

export default function PriceComparisonTable({ offers }: { offers: ShopOffer[] }) {
  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Prezzo</th>
            <th>Spedizione</th>
            <th>Disponibilità</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.shop}>
              <td>{offer.shop}</td>
              <td className="accent">€{offer.price.toFixed(2)}</td>
              <td>{offer.shipping === 0 ? 'Gratis' : `€${offer.shipping.toFixed(2)}`}</td>
              <td>{offer.inStock ? 'Disponibile' : 'Su ordinazione'}</td>
              <td><a href={offer.url} className="mini-cta">Vai</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
