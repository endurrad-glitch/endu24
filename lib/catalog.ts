import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import type { Product } from '@/lib/products'

export type FlatCategory = {
  id: number
  name: string
  slug: string
  parent_id: number | null
  level: 0 | 1 | 2
}

export type CategoryNode = FlatCategory & {
  children: CategoryNode[]
}

const CATEGORIES_PATH = process.env.CATEGORIES_DATA_FILE
  ? path.resolve(process.cwd(), process.env.CATEGORIES_DATA_FILE)
  : path.join(process.cwd(), 'data/catalog/categories.json')

async function loadCategoriesInternal(): Promise<FlatCategory[]> {
  const raw = await fs.readFile(CATEGORIES_PATH, 'utf8')
  const parsed = JSON.parse(raw) as FlatCategory[]

  return parsed
    .filter((category) => category.id && category.name && category.slug)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, 'it'))
}

export const getFlatCategories = cache(loadCategoriesInternal)

export function buildCategoryTree(flatCategories: FlatCategory[]): CategoryNode[] {
  const byId = new Map<number, CategoryNode>()
  const roots: CategoryNode[] = []

  for (const category of flatCategories) {
    byId.set(category.id, { ...category, children: [] })
  }

  for (const category of flatCategories) {
    const node = byId.get(category.id)
    if (!node) continue

    if (category.parent_id == null) {
      roots.push(node)
      continue
    }

    const parent = byId.get(category.parent_id)
    if (!parent) continue
    parent.children.push(node)
  }

  const sortNodes = (nodes: CategoryNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name, 'it'))
    for (const node of nodes) {
      sortNodes(node.children)
    }
  }

  sortNodes(roots)
  return roots
}

export function getCategoryDescendantIds(categoryId: number, tree: CategoryNode[]): Set<number> {
  const descendants = new Set<number>()

  const walk = (nodes: CategoryNode[]) => {
    for (const node of nodes) {
      if (node.id === categoryId) {
        collect(node)
        return true
      }
      if (walk(node.children)) return true
    }
    return false
  }

  const collect = (node: CategoryNode) => {
    descendants.add(node.id)
    for (const child of node.children) {
      collect(child)
    }
  }

  walk(tree)
  return descendants
}

export function getCategoryBySlug(slug: string, flatCategories: FlatCategory[]) {
  return flatCategories.find((category) => category.slug === slug)
}

export function filterProductsByCategorySlug(
  products: Product[],
  slug: string,
  flatCategories: FlatCategory[],
  categoryTree: CategoryNode[],
): Product[] {
  const category = getCategoryBySlug(slug, flatCategories)
  if (!category) return []

  const validCategoryIds = getCategoryDescendantIds(category.id, categoryTree)
  const validSlugs = new Set(
    flatCategories
      .filter((entry) => validCategoryIds.has(entry.id))
      .map((entry) => entry.slug),
  )

  return products.filter((product) => {
    if (product.categoryId && validCategoryIds.has(product.categoryId)) return true
    if (product.categorySlug && validSlugs.has(product.categorySlug)) return true

    const normalizedCategory = product.category.trim().toLowerCase()
    const normalizedSourceCategory = (product.sourceCategory || '').trim().toLowerCase()

    return [...validSlugs].some((categorySlug) => {
      const label = categorySlug.replace(/-/g, ' ').toLowerCase()
      return normalizedCategory.includes(label) || normalizedSourceCategory.includes(label)
    })
  })
}
