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

function normalizeCategoryKey(value: string | undefined | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function resolveProductCategoryIds(product: Product, flatCategories: FlatCategory[]): Set<number> {
  const directById = new Map(flatCategories.map((category) => [category.id, category]))
  const directBySlug = new Map(flatCategories.map((category) => [category.slug, category]))
  const normalizedBySlug = new Map(flatCategories.map((category) => [normalizeCategoryKey(category.slug), category]))

  const resolvedIds = new Set<number>()
  if (product.categoryId && directById.has(product.categoryId)) {
    resolvedIds.add(product.categoryId)
  }

  const productKeys = [
    normalizeCategoryKey(product.categorySlug),
    normalizeCategoryKey(product.category),
    normalizeCategoryKey(product.sourceCategory),
  ].filter(Boolean)

  for (const key of productKeys) {
    const exact = directBySlug.get(key) || normalizedBySlug.get(key)
    if (exact) {
      resolvedIds.add(exact.id)
      continue
    }

    for (const category of flatCategories) {
      const normalizedSlug = normalizeCategoryKey(category.slug)
      const normalizedName = normalizeCategoryKey(category.name)
      if (key === normalizedSlug || key === normalizedName || key.includes(normalizedSlug) || normalizedSlug.includes(key)) {
        resolvedIds.add(category.id)
      }
    }
  }

  return resolvedIds
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

  return products.filter((product) => {
    const productCategoryIds = resolveProductCategoryIds(product, flatCategories)
    return [...productCategoryIds].some((categoryId) => validCategoryIds.has(categoryId))
  })
}
