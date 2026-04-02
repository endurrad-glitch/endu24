import { getAdminMenuItems, getSettings } from '@/lib/cms'

export default async function AdminDashboardPage() {
  const [settings, menuItems] = await Promise.all([getSettings(), getAdminMenuItems()])

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Brand</p>
          <p className="mt-2 text-xl">{settings?.site_name ?? 'endu24.com'}</p>
          <p className="mt-1 text-sm text-slate-500">Logo configurato: {settings?.logo_url ? 'Sì' : 'No'}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Menu</p>
          <p className="mt-2 text-xl">{menuItems.length} voci</p>
          <p className="mt-1 text-sm text-slate-500">Gestisci ordine e stato dalla sezione Menu.</p>
        </div>
      </div>
    </section>
  )
}
