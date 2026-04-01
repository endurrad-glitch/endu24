'use client'

import { useState } from 'react'
import Image from 'next/image'

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(images[0])
  return (
    <div className="grid gap-3">
      <Image src={active} alt={title} width={700} height={700} className="aspect-square w-full rounded-2xl border border-slate-200 object-cover bg-white" />
      <div className="flex flex-wrap gap-2">
        {images.map((image) => (
          <button key={image} onClick={() => setActive(image)} className={`rounded-lg border p-1 ${active === image ? 'border-orange-300' : 'border-slate-200'}`}>
            <Image src={image} alt="" width={56} height={56} loading="lazy" className="rounded-md" />
          </button>
        ))}
      </div>
    </div>
  )
}
