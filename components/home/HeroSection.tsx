import Image from 'next/image'
import Link from 'next/link'

export function HeroSection({ imageUrl }: { imageUrl?: string }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Comparatore prezzi premium</p>
        <h1>Trova il miglior prezzo, senza perdere tempo</h1>
        <p>Confronta centinaia di prodotti dai migliori store</p>
        <Link href="/ricerca" className="primary-btn">Confronta ora</Link>
      </div>
      <div className="hero-visual" aria-hidden>
        <div className="hero-visual-overlay" />
        <Image src={imageUrl || '/file.svg'} alt="" fill sizes="(max-width: 980px) 100vw, 40vw" priority />
      </div>
    </section>
  )
}
