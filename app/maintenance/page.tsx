import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ENDU24 | Maintenance mode',
  description: 'Il nuovo comparatore prezzi premium è quasi pronto.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <section className="maintenance-card" aria-labelledby="maintenance-title">
        <p className="maintenance-logo" aria-label="ENDU24">
          ENDU24
        </p>
        <p className="maintenance-eyebrow">Coming soon</p>
        <h1 id="maintenance-title">Stiamo preparando qualcosa di grande</h1>
        <p className="maintenance-subtitle">Il nuovo comparatore prezzi premium è quasi pronto.</p>
        <p className="maintenance-copy">
          Stiamo ultimando gli ultimi dettagli per offrirti la migliore esperienza possibile.
        </p>
        <span className="maintenance-pill">Torna presto</span>
      </section>
    </main>
  )
}
