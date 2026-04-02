import MenuManager from '@/components/admin/MenuManager'
import { getAdminMenuItems } from '@/lib/cms'

export default async function AdminMenuPage() {
  const items = await getAdminMenuItems()

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Gestione Menu</h1>
      <p className="text-sm text-slate-400">CRUD completo con ordinamento manuale (campo order) e toggle attivo/non attivo.</p>
      <MenuManager items={items} />
    </section>
  )
}
