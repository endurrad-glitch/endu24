declare namespace React {
  type ReactNode = any
}

declare module 'react' {
  export type ReactNode = any
  export type FormEvent = any
  export function useState<T = any>(initial: T): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
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
}

declare module '@supabase/supabase-js' {
  export const createClient: any
}

declare const process: any
