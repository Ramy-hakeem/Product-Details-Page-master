import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { CardProduct, CartItem } from './types'
import { MAX_QUANTITY } from './lib/pricing'
import { API_PRODUCT_SLUG } from './data/catalog'

interface CartState {
  currentSlug: string; isWishlistOpen: boolean
  items: CartItem[]; isOpen: boolean; wishlist: CardProduct[]; compare: string[]
  selectProduct: (slug: string) => void
  setWishlistOpen: (isOpen: boolean) => void
  addItem: (item: Omit<CartItem, 'key'>) => void
  setQuantity: (itemKey: string, quantity: number) => void
  removeItem: (itemKey: string) => void
  clear: () => void
  setOpen: (isOpen: boolean) => void
  toggleWishlist: (product: CardProduct) => void
  removeFromWishlist: (productId: string) => void
  toggleCompare: (productId: string) => void
}
const toggleId = (ids: string[], id: string) => {
  const index = ids.indexOf(id)
  if (index >= 0) ids.splice(index, 1)
  else ids.push(id)
}

export const useCart = create<CartState>()(persist(immer(set => ({
  currentSlug: API_PRODUCT_SLUG, isWishlistOpen: false,
  items: [], isOpen: false, wishlist: [], compare: [],
  selectProduct: slug => set(state => { state.currentSlug = slug; state.isWishlistOpen = false }),
  setWishlistOpen: isOpen => set(state => { state.isWishlistOpen = isOpen; if (isOpen) state.isOpen = false }),
  addItem: newItem => set(state => {
    const key = newItem.variantId
    const existingItem = state.items.find(item => item.key === key)
    if (existingItem) existingItem.quantity = Math.min(MAX_QUANTITY, existingItem.quantity + newItem.quantity)
    else state.items.push({ ...newItem, key, quantity: Math.min(MAX_QUANTITY, newItem.quantity) })
  }),
  setQuantity: (itemKey, quantity) => set(state => {
    const item = state.items.find(candidate => candidate.key === itemKey)
    if (!item) return
    if (quantity < 1) state.items = state.items.filter(candidate => candidate.key !== itemKey)
    else item.quantity = Math.min(MAX_QUANTITY, quantity)
  }),
  removeItem: itemKey => set(state => { state.items = state.items.filter(item => item.key !== itemKey) }),
  clear: () => set(state => { state.items = [] }),
  setOpen: isOpen => set(state => { state.isOpen = isOpen; if (isOpen) state.isWishlistOpen = false }),
  toggleWishlist: product => set(state => {
    const index = state.wishlist.findIndex(item => item.id === product.id)
    if (index >= 0) state.wishlist.splice(index, 1)
    else state.wishlist.push(product)
  }),
  removeFromWishlist: productId => set(state => { state.wishlist = state.wishlist.filter(item => item.id !== productId) }),
  toggleCompare: productId => set(state => toggleId(state.compare, productId)),
})), { name: 'cart-v2', partialize: state => ({ items: state.items, wishlist: state.wishlist, compare: state.compare }) }))

export const selectCount = (state: Pick<CartState, 'items'>) => state.items.reduce((total, item) => total + item.quantity, 0)
export const selectTotal = (state: Pick<CartState, 'items'>) => state.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
