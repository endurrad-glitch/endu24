import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-slate-900 text-white hover:bg-slate-700',
        variant === 'ghost' && 'bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-500',
        className
      )}
      {...props}
    />
  )
}
