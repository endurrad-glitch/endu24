import { deleteMenuItemAction, toggleMenuItemAction, upsertMenuItemAction } from '@/app/admin/menu/actions'
import type { MenuItem } from '@/lib/cms'

export default function MenuManager({ items }: { items: MenuItem[] }) {
  return (
    <div className="space-y-6">
      <form action={upsertMenuItemAction} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-5">
        <input name="label" placeholder="Label" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <input name="url" placeholder="/" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <input name="order" type="number" placeholder="Ordine" className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input name="is_active" type="checkbox" defaultChecked /> Attivo
        </label>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium">Aggiungi</button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <form action={upsertMenuItemAction} className="grid gap-3 md:grid-cols-6">
              <input type="hidden" name="id" value={item.id} />
              <input name="label" defaultValue={item.label} className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
              <input name="url" defaultValue={item.url} className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
              <input name="order" type="number" defaultValue={item.order} className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input name="is_active" type="checkbox" defaultChecked={item.is_active} /> Attivo
              </label>
              <button className="rounded-md border border-slate-700 px-3 py-2 text-sm">Salva</button>
            </form>

            <div className="mt-3 flex gap-2">
              <form action={toggleMenuItemAction}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="is_active" value={String(item.is_active)} />
                <button className="rounded-md border border-slate-700 px-3 py-2 text-sm">{item.is_active ? 'Disattiva' : 'Attiva'}</button>
              </form>

              <form action={deleteMenuItemAction}>
                <input type="hidden" name="id" value={item.id} />
                <button className="rounded-md border border-rose-700 px-3 py-2 text-sm text-rose-300">Elimina</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
