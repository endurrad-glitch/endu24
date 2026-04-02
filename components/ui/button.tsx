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
        variant === 'primary' && 'bg-[#ff580d] text-white hover:bg-[#e14e0c]',
        variant === 'ghost' && 'bg-white text-[#2b2b2b] ring-1 ring-[#2b2b2b]/10 hover:bg-white',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-500',
        className
      )}
      {...props}
    />
  )
}
