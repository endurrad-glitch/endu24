import Link from 'next/link'

export function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff5a00] text-sm font-bold text-white">E24</span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">endu24</span>
    </Link>
  )
}
