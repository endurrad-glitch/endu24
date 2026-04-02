export function NewsletterBlock() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold">Ricevi offerte esclusive</h2>
      <p className="mt-2 text-slate-600">Iscriviti alla newsletter per comparazioni, test e promozioni settimanali.</p>
      <form className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input className="h-11 flex-1 rounded-full border border-slate-300 px-4" type="email" placeholder="La tua email" required />
        <button className="h-11 rounded-full bg-slate-900 px-5 text-sm font-medium text-white">Iscriviti</button>
      </form>
    </section>
  )
}
