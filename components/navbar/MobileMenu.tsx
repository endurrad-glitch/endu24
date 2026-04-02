'use client'

import { useState } from 'react'
import Link from 'next/link'

type MenuLink = {
  label: string
  url: string
}

export default function MobileMenu({ links }: { links: MenuLink[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="block md:hidden">
      <button
        type="button"
        aria-label={isOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white"
      >
        <span className={`absolute h-0.5 w-5 bg-slate-900 transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
        <span className={`absolute h-0.5 w-5 bg-slate-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className={`absolute h-0.5 w-5 bg-slate-900 transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
      </button>

      <div className={`fixed inset-0 z-40 bg-white transition-all duration-300 ease-out ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <nav
          className={`flex h-full flex-col gap-5 p-8 pt-24 transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label="Menu mobile"
        >
          {links.map((item) => (
            <Link
              key={item.url + item.label}
              href={item.url}
              className="border-b border-slate-200 pb-3 text-2xl font-semibold text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
