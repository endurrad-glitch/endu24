export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const safe = images.length ? images : ['/window.svg']

  return (
    <section className="product-gallery">
      <img src={safe[0]} alt={name} className="hero-image" loading="eager" />
      <div className="thumb-grid">
        {safe.slice(0, 4).map((image) => (
          <img key={image} src={image} alt={`${name} vista`} loading="lazy" />
        ))}
      </div>
    </section>
  )
}
