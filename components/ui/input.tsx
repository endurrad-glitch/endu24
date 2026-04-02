import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-[#2b2b2b]/10 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-[#2b2b2b]/70 focus:border-[#2b2b2b]/30',
        className
      )}
      {...props}
    />
  )
}
