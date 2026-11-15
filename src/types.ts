export interface VariationProp { id: string; name: string; value?: string }
export interface Variation { id: string; name: string; type: 'image' | 'button' | string; props: VariationProp[] }
export interface Variant {
  id: string; price: number; sale_price: number; quantity: number
  variation_props: { variation: string; variation_prop: string }[]
}
export interface Product {
  id: string; name: string; price: number; sale_price: number; description: string
  thumb: string; images: string[]; quantity: number; track_stock: boolean
  variations: Variation[]; variants: Variant[]; categories: { id: string; name: string }[]
}
export type Selection = Record<string, string>
export interface CartItem {
  key: string; productId: string; name: string; image: string; variantId: string
  options: Selection; unitPrice: number; quantity: number
}
/** Lightweight product used by cards, the wishlist and the catalog. */
export interface CardProduct {
  id: string; slug: string; brand: string; name: string; description: string
  price: number; oldPrice?: number; rating: number; sold: number; image: string
}
export interface Review {
  id: string; name: string; rating: number; title: string; comment: string
  date: string; topics: string[]; hasMedia: boolean; likes: number
}
