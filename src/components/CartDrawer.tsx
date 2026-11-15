import { useEffect } from 'react'
import { selectCount, selectTotal, useCart } from '../store'
import { track } from '../lib/analytics'
export default function CartDrawer() {
  const cart = useCart()
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') useCart.getState().setOpen(false) }
    addEventListener('keydown', handleKeyDown)
    return () => removeEventListener('keydown', handleKeyDown)
  }, [])
  if (!cart.isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => cart.setOpen(false)}>
      <aside role="dialog" aria-label="Cart" onClick={event => event.stopPropagation()} className="flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <header className="flex items-center justify-between border-b p-4"><h2 className="font-semibold">Your cart ({selectCount(cart)})</h2><button onClick={() => cart.setOpen(false)} aria-label="Close">✕</button></header>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {cart.items.length === 0 && <p className="mt-16 text-center text-neutral-500">Your cart is empty. Pick a size and color to add a pair.</p>}
          {cart.items.map(item => (
            <div key={item.key} className="flex gap-3">
              <img src={item.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-neutral-500">{Object.values(item.options).join(' / ')}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="rounded border px-2" onClick={() => cart.setQuantity(item.key, item.quantity - 1)} aria-label="Decrease">−</button>
                  <span>{item.quantity}</span>
                  <button className="rounded border px-2" onClick={() => cart.setQuantity(item.key, item.quantity + 1)} aria-label="Increase">+</button>
                  <button className="ml-auto text-red-600" onClick={() => { cart.removeItem(item.key); track('remove_from_cart', { variant: item.variantId }) }}>Remove</button>
                </div>
              </div>
              <p className="font-medium">{(item.unitPrice * item.quantity).toLocaleString()}</p>
            </div>))}
        </div>
        {cart.items.length > 0 && <footer className="border-t p-4"><div className="mb-3 flex justify-between font-semibold"><span>Total</span><span>{selectTotal(cart).toLocaleString()} EGP</span></div><button className="w-full rounded-lg bg-black py-3 text-white">Go to checkout</button></footer>}
      </aside>
    </div>)
}
