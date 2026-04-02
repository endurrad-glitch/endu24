import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400',
        className
      )}
      {...props}
    />
  )
}
