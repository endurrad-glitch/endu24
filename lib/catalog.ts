import type { Product } from '@/lib/products'

export type CategoryLeaf = {
  label: string
  href: string
}

export type CategoryChild = {
  label: string
  href: string
  children: CategoryLeaf[]
}

export type CategoryNode = {
  label: string
  href: string
  children: CategoryChild[]
}

function buildSearchHref(params: Record<string, string>) {
  const query = new URLSearchParams(params)
  return `/ricerca?${query.toString()}`
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function buildCategoryTree(products: Product[]): CategoryNode[] {
  const grouped = new Map<string, Product[]>()

  for (const product of products) {
    const key = product.category.trim() || 'Altre categorie'
    const items = grouped.get(key) || []
    items.push(product)
    grouped.set(key, items)
  }

  return [...grouped.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'it'))
    .map(([category, categoryProducts]) => {
      const subgroups = new Map<string, Product[]>()
      for (const product of categoryProducts) {
        const rawSub = product.sourceCategory?.trim() || 'Altri prodotti'
        const sub = titleCase(rawSub)
        const items = subgroups.get(sub) || []
        items.push(product)
        subgroups.set(sub, items)
      }

      const children: CategoryChild[] = [...subgroups.entries()]
        .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'it'))
        .map(([subCategory, subProducts]) => {
          const leafValues = new Set<string>()
          for (const product of subProducts) {
            if (product.tags.length > 0) {
              leafValues.add(product.tags[0])
              continue
            }
            leafValues.add(product.brand)
          }

          const leaves = [...leafValues].slice(0, 8).map((entry) => ({
            label: entry,
            href: buildSearchHref({ categoria: category, sottocategoria: subCategory, q: entry }),
          }))

          return {
            label: subCategory,
            href: buildSearchHref({ categoria: category, sottocategoria: subCategory }),
            children: leaves,
          }
        })

      return {
        label: category,
        href: buildSearchHref({ categoria: category }),
        children,
      }
    })
}
