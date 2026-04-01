'use client'

import type { ReactNode } from 'react'

export function Dialog({ open, children }: { open: boolean; children: ReactNode }) {
  if (!open) return null
  return <div className="fixed inset-0 z-[90] bg-slate-900/45">{children}</div>
}
