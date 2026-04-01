'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(images[0])
  return (
    <div className="gallery">
      <Image src={active} alt={title} width={700} height={700} />
      <div className="thumbs">
        {images.map((image) => (
          <button key={image} onClick={() => setActive(image)}>
            <Image src={image} alt="" width={64} height={64} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
