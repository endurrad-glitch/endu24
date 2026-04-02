import { getPublicCms } from '@/lib/cms'

export default async function PublicHomePage() {
  const { settings, menuItems } = await getPublicCms()

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-slate-500">endu24 Platform</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{settings.site_name}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This public homepage is powered by Supabase settings and menu content, rendered on the server with App Router.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Current Navigation</h2>
        {menuItems.length === 0 ? (
          <p className="mt-3 text-slate-500">No active links configured yet. Add links from Admin → Menu.</p>
        ) : (
          <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700">
            {menuItems.map((item) => (
              <li key={item.id}>{item.label} → {item.url}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
