import Link from 'next/link'

export default function Home() {
  return (
    <main className="page-section">

      {/* HERO */}
      <section className="hero">
        <div className="container">

          <div className="hero-content">
            <h1 className="hero-title">
              Trova il miglior prezzo.
            </h1>

            <p className="hero-sub">
              Confronta prezzi di accessori e abbigliamento moto in pochi secondi.
            </p>

            <Link href="/categoria/caschi" className="primary-button">
              Inizia ora
            </Link>
          </div>

        </div>
      </section>

      {/* CATEGORIE */}
      <section className="categories">
        <div className="container">

          <h2 className="section-title">Esplora categorie</h2>

          <div className="categories-grid">

            <Link href="/categoria/caschi" className="category-card">
              <h3>Caschi</h3>
              <p>Integrali, modulari, jet</p>
            </Link>

            <Link href="/categoria/abbigliamento" className="category-card">
              <h3>Abbigliamento</h3>
              <p>Giacche, pantaloni, guanti</p>
            </Link>

            <Link href="/categoria/accessori" className="category-card">
              <h3>Accessori</h3>
              <p>Valigie, elettronica, protezioni</p>
            </Link>

          </div>

        </div>
      </section>

      {/* OFFERTE */}
      <section className="offers">
        <div className="container">

          <h2 className="section-title">Migliori offerte</h2>

          <div className="offers-grid">

            <div className="product-card">
              <h4>Shoei NXR2</h4>
              <div className="price">€465</div>
              <Link href="/prodotto/casco-shoei-nxr2" className="secondary-button">
                Vedi
              </Link>
            </div>

            <div className="product-card">
              <h4>AGV K6</h4>
              <div className="price">€399</div>
              <Link href="#" className="secondary-button">
                Vedi
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  )
}