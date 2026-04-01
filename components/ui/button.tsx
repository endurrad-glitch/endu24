import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'icon'
}

export function Button({ className, variant = 'primary', size = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
        variant === 'primary' && 'bg-[#ff5a00] text-white shadow-[0_8px_20px_rgba(255,90,0,0.3)] hover:bg-[#ea5200]',
        variant === 'outline' && 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
        variant === 'ghost' && 'bg-transparent text-slate-700 hover:bg-slate-100',
        size === 'default' && 'h-11 px-4 text-sm',
        size === 'sm' && 'h-9 px-3 text-xs',
        size === 'icon' && 'h-10 w-10',
        className,
      )}
      {...props}
    />
  )
}
