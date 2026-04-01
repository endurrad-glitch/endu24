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
        'inline-flex items-center justify-center rounded-[14px] font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none min-h-11',
        variant === 'primary' && 'bg-[#ff5a00] text-white shadow-[0_10px_20px_rgba(255,90,0,0.24)]',
        variant === 'outline' && 'border border-[#d9e0ea] bg-white text-[#1f2937]',
        variant === 'ghost' && 'bg-transparent text-[#1f2937]',
        size === 'default' && 'px-4 py-2.5 text-[0.92rem]',
        size === 'sm' && 'px-3 py-2 text-sm min-h-10',
        size === 'icon' && 'h-11 w-11',
        className,
      )}
      {...props}
    />
  )
}
