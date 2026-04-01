'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type HeroSlide = {
  title: string
  subtitle: string
  image: string
  ctaLabel: string
  ctaLink: string
}

const slides: HeroSlide[] = [
  {
    title: 'Confronta i prezzi moto in pochi secondi',
    subtitle: 'ENDU24 trova le migliori offerte tra store affidabili per caschi, abbigliamento e accessori.',
    image: '/window.svg',
    ctaLabel: 'Inizia a confrontare',
    ctaLink: '/ricerca',
  },
  {
    title: 'Offerte aggiornate ogni giorno',
    subtitle: 'Scopri i prodotti più richiesti e risparmia con il confronto intelligente multi-shop.',
    image: '/globe.svg',
    ctaLabel: 'Scopri le offerte',
    ctaLink: '#offerte',
  },
  {
    title: 'Trova subito la categoria giusta',
    subtitle: 'Naviga un catalogo ordinato e filtra rapidamente i prodotti migliori per la tua prossima uscita.',
    image: '/next.svg',
    ctaLabel: 'Esplora categorie',
    ctaLink: '#categorie',
  },
]

const AUTO_PLAY_MS = 6000

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, AUTO_PLAY_MS)

    return () => clearInterval(timer)
  }, [])

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex])

  const onTouchEnd = (x: number) => {
    if (touchStartX == null) return
    const diff = touchStartX - x
    if (Math.abs(diff) < 40) return

    if (diff > 0) {
      setActiveIndex((prev) => (prev + 1) % slides.length)
      return
    }

    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      aria-label="Hero slider"
    >
      <div className="grid max-h-[600px] min-h-[420px] grid-cols-1 md:grid-cols-2">
        <div className="order-2 flex items-center px-6 py-8 md:order-1 md:px-10">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">{activeSlide.title}</h1>
            <p className="max-w-xl text-sm text-slate-600 md:text-base">{activeSlide.subtitle}</p>
            <Link href={activeSlide.ctaLink}><Button className="h-11 rounded-full px-6">{activeSlide.ctaLabel}</Button></Link>
          </div>
        </div>

        <div className="relative order-1 min-h-[220px] md:order-2 md:min-h-full">
          <Image src={activeSlide.image} alt={activeSlide.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-3 py-1 backdrop-blur">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-slate-900' : 'w-2.5 bg-slate-400'}`}
            aria-label={`Vai alla slide ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  )
}
