export type CatalogCategory = {
  slug: string
  name: string
  keywords: string[]
}

export type ProductOffer = {
  shop: string
  price: number
  shipping: string
  availability: string
  url: string | null
}

export type CatalogProduct = {
  slug: string
  title: string
  brand: string
  category: string
  categorySlug: string
  sourceCategory: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice: number | null
  rating: number
  reviews: number
  availability: string
  image: string
  images: string[]
  tags: string[]
  specs: Record<string, string | number | boolean>
  offers: ProductOffer[]
  externalUrl: string | null
  related: string[]
}

export type CatalogData = {
  generatedAt: string
  sourceCount: number
  categories: CatalogCategory[]
  products: CatalogProduct[]
}
