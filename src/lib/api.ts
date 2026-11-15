import { useQuery } from '@tanstack/react-query'
import type { Product } from '../types'
import { API_PRODUCT_SLUG, buildMockProduct, catalog } from '../data/catalog'
const apiUrl = (slug: string) => `https://api.easy-orders.net/api/v1/products/slug/clear-theme/${slug}?join=reviews`
export const fetchProduct = async (slug: string): Promise<Product> => {
  if (slug !== API_PRODUCT_SLUG) {
    const card = catalog.find(candidate => candidate.slug === slug)
    if (!card) throw new Error('Product not found')
    return buildMockProduct(card)
  }
  const response = await fetch(apiUrl(slug))
  if (!response.ok) throw new Error(`Product request failed (${response.status})`)
  return response.json()
}
export const useProduct = (slug: string) => useQuery({ queryKey: ['product', slug], queryFn: () => fetchProduct(slug) })
