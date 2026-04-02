import { cache } from 'react'
import catalog from '@/data/catalog/products.json'
import type { CatalogCategory, CatalogData, CatalogProduct } from '@/types/catalog'

const PAGE_SIZE = 24

function normalize(value: string) {
  return value.toLowerCase().trim()
}

const getCatalogData = cache((): CatalogData => {
  return catalog as CatalogData
})

export const getAllCategories = cache((): CatalogCategory[] => {
  return getCatalogData().categories
})

export const getAllProducts = cache((): CatalogProduct[] => {
  return getCatalogData().products
})

export const getFeaturedProducts = cache((limit = 10): CatalogProduct[] => {
  return getAllProducts().slice(0, limit)
})

export const getSpecialOffers = cache((limit = 10): CatalogProduct[] => {
  return [...getAllProducts()]
    .filter((product) => product.compareAtPrice && product.compareAtPrice > product.price)
    .slice(0, limit)
})

export const getBestSellers = cache((limit = 10): CatalogProduct[] => {
  return [...getAllProducts()].sort((a, b) => b.reviews - a.reviews).slice(0, limit)
})

export const getProductBySlug = cache((slug: string): CatalogProduct | null => {
  return getAllProducts().find((product) => product.slug === slug) ?? null
})

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return getAllProducts().filter((product) => product.categorySlug === categorySlug)
}

export function getRelatedProducts(categorySlug: string, currentSlug: string, limit = 8): CatalogProduct[] {
  return getProductsByCategory(categorySlug).filter((product) => product.slug !== currentSlug).slice(0, limit)
}

export function searchCatalog(query: string) {
  const q = normalize(query)
  if (!q) {
    return { products: [], categories: [] }
  }

  const products = getAllProducts()
    .filter((product) => {
      const haystack = [product.title, product.brand, product.category, product.sourceCategory, ...product.tags]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
    .slice(0, 8)

  const categories = getAllCategories()
    .filter((category) => {
      const haystack = [category.name, category.slug, ...category.keywords].join(' ').toLowerCase()
      return haystack.includes(q)
    })
    .slice(0, 6)

  return { products, categories }
}

export function queryProducts(options: {
  query?: string
  categorySlug?: string
  sort?: 'price_asc' | 'price_desc' | 'popularity'
  page?: number
  pageSize?: number
}) {
  const {
    query = '',
    categorySlug,
    sort = 'popularity',
    page = 1,
    pageSize = PAGE_SIZE,
  } = options

  let products = getAllProducts()

  if (categorySlug) {
    products = products.filter((product) => product.categorySlug === categorySlug)
  }

  if (query.trim()) {
    const q = normalize(query)
    products = products.filter((product) => {
      const haystack = [product.title, product.shortDescription, product.brand, product.category].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }

  const sorted = [...products]
  if (sort === 'price_asc') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    sorted.sort((a, b) => b.price - a.price)
  } else {
    sorted.sort((a, b) => b.reviews - a.reviews)
  }

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * pageSize

  return {
    products: sorted.slice(start, start + pageSize),
    total,
    totalPages,
    currentPage,
    pageSize,
  }
}
