export default function MaintenancePage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-10">
      <section className="grid w-full max-w-xl gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm" aria-labelledby="maintenance-title">
        <p className="mx-auto rounded-full bg-[#ff5a00] px-4 py-1 text-sm font-semibold text-white" aria-label="ENDU24">ENDU24</p>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Coming soon</p>
        <h1 id="maintenance-title" className="text-3xl font-bold tracking-tight">Stiamo tornando con una nuova esperienza</h1>
        <p className="text-slate-600">Il nuovo comparatore prezzi premium è quasi pronto.</p>
        <span className="mx-auto rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">Torna presto</span>
      </section>
    </main>
  )
}
