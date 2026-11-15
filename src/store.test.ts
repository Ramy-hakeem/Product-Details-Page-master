import { describe, it, expect, beforeEach } from 'vitest'
import { useCart, selectCount, selectTotal } from './store'
import type { CardProduct } from './types'
const sampleItem = { productId: 'p', name: 'Shoe', image: '', variantId: 'v1', options: { size: '40' }, unitPrice: 160, quantity: 2 }
const sampleCard: CardProduct = { id: 'p', slug: 'p', brand: 'Brand', name: 'Shoe', description: '', price: 160, rating: 4.5, sold: 10, image: '' }
beforeEach(() => useCart.setState({ items: [], wishlist: [], compare: [] }))
describe('cart store', () => {
  it('merges identical variants and totals', () => {
    useCart.getState().addItem(sampleItem); useCart.getState().addItem(sampleItem)
    expect(selectCount(useCart.getState())).toBe(4)
    expect(selectTotal(useCart.getState())).toBe(640)
  })
  it('caps quantity at 10', () => {
    useCart.getState().addItem({ ...sampleItem, quantity: 9 }); useCart.getState().setQuantity('v1', 99)
    expect(useCart.getState().items[0].quantity).toBe(10)
  })
  it('removes when quantity < 1', () => {
    useCart.getState().addItem(sampleItem); useCart.getState().setQuantity('v1', 0)
    expect(useCart.getState().items).toHaveLength(0)
  })
  it('toggles and removes wishlist products', () => {
    useCart.getState().toggleWishlist(sampleCard); expect(useCart.getState().wishlist).toHaveLength(1)
    useCart.getState().toggleWishlist(sampleCard); expect(useCart.getState().wishlist).toHaveLength(0)
    useCart.getState().toggleWishlist(sampleCard); useCart.getState().removeFromWishlist('p')
    expect(useCart.getState().wishlist).toHaveLength(0)
  })
})
