import type { ReactNode } from 'react'

export function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-[#2b2b2b]/10 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#2b2b2b]">{title}</h2>
        {description ? <p className="text-sm text-[#2b2b2b]/70">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
