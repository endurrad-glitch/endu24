'use client'

import type { ReactNode } from 'react'
import { Dialog } from '@/components/ui/dialog'

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <Dialog open={open}>
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <section className="absolute inset-x-0 bottom-0 z-[91] max-h-[82vh] overflow-y-auto rounded-t-3xl bg-white p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button type="button" className="rounded-lg border border-slate-200 px-2 py-1 text-sm" onClick={onClose}>Chiudi</button>
        </div>
        {children}
      </section>
    </Dialog>
  )
}
