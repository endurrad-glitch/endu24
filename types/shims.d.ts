declare namespace React {
  type ReactNode = any
}

declare module 'react' {
  export type ReactNode = any
  export type FormEvent = any
  export type KeyboardEvent<T = any> = any
  export function useState<T = any>(initial: T): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export function useMemo<T>(factory: () => T, deps?: any[]): T
  export function useRef<T>(value: T): { current: T }
}

declare module 'react/jsx-runtime' {
  export const Fragment: any
  export const jsx: any
  export const jsxs: any
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
  interface IntrinsicAttributes {
    key?: any
  }
}

declare module 'next' {
  export type NextConfig = any
}

declare module 'next/link' {
  const Link: any
  export default Link
}

declare module 'next/navigation' {
  export function useRouter(): { push: (url: string) => void }
  export function notFound(): never
}

declare module '@supabase/supabase-js' {
  export const createClient: any
}

declare const process: any


declare module 'node:fs/promises' {
  const fs: any
  export default fs
}

declare module 'node:path' {
  const path: any
  export default path
}


declare module 'next/server' {
  export const NextResponse: { json: (data: any) => any }
}
