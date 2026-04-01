import Link from 'next/link'
import SearchBar from '@/components/SearchBar'
import ProductCard, { type ProductHighlight } from '@/components/ProductCard'
import CategoryGrid from '@/components/CategoryGrid'
import DealsSlider from '@/components/DealsSlider'

const quickCategories = [
  { name: 'Caschi', icon: '⛑️', href: '/categoria/caschi' },
  { name: 'Abbigliamento', icon: '🧥', href: '/categoria/abbigliamento' },
  { name: 'Accessori', icon: '🧰', href: '/categoria/accessori' },
  { name: 'Moto', icon: '🏍️', href: '/categoria/caschi' },
  { name: 'Off-road', icon: '🏁', href: '/caschi/offroad' },
]

const trendingProducts = [
  {
    name: 'Casco integrale Shoei NXR2',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9891b82d5?w=640&q=80&auto=format&fit=crop',
    minPrice: '€459,99',
    oldPrice: '€549,99',
    discountLabel: '-16%',
    stores: 12,
    rating: 4.8,
    reviews: 342,
    href: '/prodotto/casco-shoei-nxr2',
    highlight: 'discount' as ProductHighlight,
  },
  {
    name: 'Casco AGV K6 S ECE 22.06',
    image: 'https://images.unsplash.com/photo-1615193986895-37d6702eb3b8?w=640&q=80&auto=format&fit=crop',
    minPrice: '€389,90',
    discountLabel: 'Miglior prezzo',
    stores: 9,
    rating: 4.7,
    reviews: 221,
    href: '/prodotto/agv-k6',
    highlight: 'best-price' as ProductHighlight,
  },
  {
    name: 'Giacca Alpinestars Andes V3 Drystar',
    image: 'https://images.unsplash.com/photo-1519752594763-263bbd8e2ff7?w=640&q=80&auto=format&fit=crop',
    minPrice: '€229,00',
    oldPrice: '€299,00',
    discountLabel: '-23%',
    stores: 15,
    rating: 4.6,
    reviews: 118,
    href: '/categoria/abbigliamento',
    highlight: 'discount' as ProductHighlight,
  },
  {
    name: 'Interfono Cardo Packtalk Edge Duo',
    image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=640&q=80&auto=format&fit=crop',
    minPrice: '€559,00',
    discountLabel: 'Miglior prezzo',
    stores: 7,
    rating: 4.9,
    reviews: 74,
    href: '/categoria/accessori',
    highlight: 'best-price' as ProductHighlight,
  },
]

const dailyDeals = [
  {
    name: 'Guanti racing in pelle',
    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=640&q=80&auto=format&fit=crop',
    price: '€89,90',
    was: '€129,90',
    discount: '31%',
    href: '/categoria/abbigliamento',
  },
  {
    name: 'Stivali touring impermeabili',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=640&q=80&auto=format&fit=crop',
    price: '€144,00',
    was: '€199,00',
    discount: '27%',
    href: '/categoria/abbigliamento',
  },
  {
    name: 'Bauletto posteriore 45L',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=640&q=80&auto=format&fit=crop',
    price: '€119,99',
    was: '€169,99',
    discount: '29%',
    href: '/categoria/accessori',
  },
  {
    name: 'Visiera antiappannante pinlock',
    image: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=640&q=80&auto=format&fit=crop',
    price: '€26,90',
    was: '€39,90',
    discount: '33%',
    href: '/categoria/caschi',
  },
]

const categories = [
  {
    name: 'Caschi Moto',
    icon: '⛑️',
    href: '/categoria/caschi',
    image: 'https://images.unsplash.com/photo-1597149954550-715381d6be77?w=640&q=80&auto=format&fit=crop',
  },
  {
    name: 'Abbigliamento Tecnico',
    icon: '🧥',
    href: '/categoria/abbigliamento',
    image: 'https://images.unsplash.com/photo-1558980394-34764db79f1d?w=640&q=80&auto=format&fit=crop',
  },
  {
    name: 'Accessori Moto',
    icon: '🧰',
    href: '/categoria/accessori',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=640&q=80&auto=format&fit=crop',
  },
]

export default function Home() {
  return (
    <main className="compare-home">
      <section className="hero-compare">
        <div className="container hero-inner">
          <p className="hero-eyebrow">Comparatore prezzi moto</p>
          <h1>Trova il prezzo migliore in pochi secondi.</h1>
          <p className="hero-subtitle">Confronta offerte reali da negozi verificati e scegli quella più conveniente.</p>

          <SearchBar />

          <div className="quick-categories" aria-label="Categorie rapide">
            {quickCategories.map((category) => (
              <Link key={category.name} href={category.href} className="quick-category-pill">
                <span aria-hidden>{category.icon}</span>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <h2>Prodotti trend</h2>
            <p>I prodotti più cercati con il prezzo più basso evidenziato.</p>
          </div>
          <div className="products-grid">
            {trendingProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block deals-section">
        <div className="container">
          <div className="section-head">
            <h2>Offerte del giorno</h2>
            <p>Sconti reali aggiornati oggi da rivenditori selezionati.</p>
          </div>
          <DealsSlider deals={dailyDeals} />
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head">
            <h2>Categorie popolari</h2>
            <p>Esplora facilmente per trovare il prodotto giusto più in fretta.</p>
          </div>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="section-block how-it-works">
        <div className="container">
          <h2>Come funziona</h2>
          <div className="steps-grid">
            <article>
              <span>1</span>
              <h3>Cerca prodotto</h3>
              <p>Inserisci marca, modello o categoria nella barra di ricerca.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Confronta prezzi</h3>
              <p>Vedi in un colpo d'occhio i prezzi da più negozi affidabili.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Risparmia</h3>
              <p>Scegli l'offerta migliore e vai direttamente allo store partner.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block trust-strip">
        <div className="container trust-grid">
          <article>
            <strong>120K+</strong>
            <span>prodotti comparati</span>
          </article>
          <article>
            <strong>320+</strong>
            <span>negozi monitorati</span>
          </article>
          <article>
            <strong>4.8/5</strong>
            <span>valutazione utenti</span>
          </article>
        </div>
      </section>
    </main>
  )
}
