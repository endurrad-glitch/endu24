import { type Offer } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'
import { Button } from '@/components/ui/button'

export function PriceComparisonTable({ offers, slug }: { offers: Offer[], slug: string }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-xl font-semibold tracking-tight">Confronto prezzi</h2>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-[680px] w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600"><tr><th className="p-3">Shop</th><th className="p-3">Prezzo</th><th className="p-3">Spedizione</th><th className="p-3">Disponibilità</th><th className="p-3" /></tr></thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={`${offer.shop}-${offer.price}`} className="border-t border-slate-100">
                <td className="p-3">{offer.shop}</td><td className="p-3 font-semibold text-[#ff5a00]">{formatPrice(offer.price)}</td><td className="p-3">{offer.shipping}</td><td className="p-3">{offer.availability}</td>
                <td className="p-3">{buildOutboundUrl(offer.url, slug, 'price-table') ? <a href={buildOutboundUrl(offer.url, slug, 'price-table')!} target="_blank" rel="noopener noreferrer sponsored"><Button size="sm">Vai</Button></a> : <span>Non disponibile</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
