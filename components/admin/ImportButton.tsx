'use client'

import type { ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

type ImportButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function ImportButton(props: ImportButtonProps) {
  return (
    <Button type="button" {...props}>
      Importa
    </Button>
  )
}
