import type { CardProduct } from '../types'
import { useCart } from '../store'
import { StarIcon } from './Icons'
export default function ProductRow({ title, products }: { title: string; products: CardProduct[] }) {
  const { wishlist, toggleWishlist, selectProduct } = useCart()
  return (
    <section className="py-12" aria-label={title}>
      <div className="mb-4 flex items-baseline justify-between"><h2 className="text-2xl font-semibold">{title}</h2><a href="#" className="text-sm underline">View All</a></div>
      <ul className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
        {products.map(product => {
          const isWishlisted = wishlist.some(item => item.id === product.id)
          return (
            <li key={product.id} className="w-44 shrink-0 snap-start md:w-auto">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
                <button onClick={() => selectProduct(product.slug)} aria-label={`View ${product.name}`} className="block h-full w-full"><img src={product.image} alt="" loading="lazy" className="h-full w-full object-contain" /></button>
                <button onClick={() => toggleWishlist(product)} aria-pressed={isWishlisted} aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.name}`} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90">{isWishlisted ? '♥' : '♡'}</button>
              </div>
              <button onClick={() => selectProduct(product.slug)} className="mt-2 block w-full text-left">
                <span className="line-clamp-2 block text-sm font-semibold leading-snug">{product.name}</span>
                <span className="mt-0.5 block text-xs text-neutral-500">{product.brand}</span>
                <span className="mt-1 block text-sm">{product.oldPrice && <s className="mr-2 text-neutral-400">{product.oldPrice}</s>}<span className={product.oldPrice ? 'text-red-600' : ''}>{product.price} EGP</span></span>
                <span className="mt-1 flex items-center gap-1 text-xs text-neutral-500"><StarIcon width={14} height={14} fill="currentColor" className="text-amber-500" />{product.rating.toFixed(1)}<span aria-hidden="true">•</span>{product.sold.toLocaleString()} Sold</span>
              </button>
            </li>)
        })}
      </ul>
    </section>)
}
