import { useEffect } from 'react'
import { useCart } from '../store'
import { CloseIcon, StarIcon } from './Icons'

/** Slide-out wishlist section: opens from the header heart or the footer link. */
export default function WishlistDrawer() {
  const isOpen = useCart(state => state.isWishlistOpen)
  const wishlist = useCart(state => state.wishlist)
  const { setWishlistOpen, selectProduct, removeFromWishlist } = useCart.getState()
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') useCart.getState().setWishlistOpen(false) }
    addEventListener('keydown', handleKeyDown)
    return () => removeEventListener('keydown', handleKeyDown)
  }, [])
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setWishlistOpen(false)}>
      <aside role="dialog" aria-label="Wishlist" onClick={event => event.stopPropagation()} className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b p-4"><h2 className="font-semibold">Wishlist ({wishlist.length})</h2><button onClick={() => setWishlistOpen(false)} aria-label="Close wishlist"><CloseIcon /></button></header>
        <ul className="flex-1 space-y-4 overflow-y-auto p-4">
          {wishlist.length === 0 && <li className="mt-16 text-center text-neutral-500">Your wishlist is empty. Tap the heart on a product to save it here.</li>}
          {wishlist.map(product => (
            <li key={product.id} className="flex gap-3">
              <button onClick={() => selectProduct(product.slug)} aria-label={`View ${product.name}`} className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100"><img src={product.image} alt="" className="h-full w-full object-contain" /></button>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold leading-snug">{product.name}</p>
                <p className="text-xs text-neutral-500">{product.brand}</p>
                <p className="mt-1 font-medium">{product.price} EGP</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500"><StarIcon width={14} height={14} fill="currentColor" className="text-amber-500" />{product.rating.toFixed(1)}<span aria-hidden="true">•</span>{product.sold.toLocaleString()} Sold</p>
                <div className="mt-2 flex gap-4 text-xs"><button className="font-semibold underline" onClick={() => selectProduct(product.slug)}>View product</button><button className="text-neutral-500 underline" onClick={() => removeFromWishlist(product.id)}>Remove</button></div>
              </div>
            </li>))}
        </ul>
      </aside>
    </div>)
}
