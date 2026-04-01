import SearchBar from '@/components/SearchBar'

export default function HeroSection() {
  return (
    <section className="hero-compare">
      <div className="container hero-inner">
        <h1>Trova il miglior prezzo per il tuo prossimo acquisto</h1>
        <p className="hero-subtitle">Confronta offerte da shop affidabili, filtra i risultati in pochi secondi e risparmia sul tuo prossimo acquisto.</p>
        <SearchBar placeholder="Cerca casco, giacca, accessorio..." />
      </div>
    </section>
  )
}
