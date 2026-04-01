import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="hero">
      <p className="eyebrow">Comparatore prezzi premium</p>
      <h1>Trova il miglior prezzo per il tuo prossimo acquisto</h1>
      <p>Confronta offerte da negozi affidabili su accessori e abbigliamento moto premium in pochi secondi.</p>
      <Link href="/ricerca" className="primary-btn">Confronta prezzi</Link>
    </section>
  )
}
