import { useEffect, useState } from 'react'
import Logo from './Logo'
import { BagIcon, ChevronDownIcon, HeartIcon, SearchIcon, UserIcon } from './Icons'
import { selectCount, useCart } from '../store'
const CATEGORIES = ['Sneakers', 'Mules', 'Moc Toe Boots', 'Women heels']
const COUNTDOWN_START_SECONDS = 20 * 60 + 40

function useCountdown(startSeconds: number) {
  const [remainingSeconds, setRemainingSeconds] = useState(startSeconds)
  useEffect(() => {
    const timerId = setInterval(() => setRemainingSeconds(current => (current > 0 ? current - 1 : startSeconds)), 1000)
    return () => clearInterval(timerId)
  }, [startSeconds])
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0')
  const seconds = String(remainingSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}
const Badge = ({ count }: { count: number }) => count > 0
  ? <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] leading-none text-white">{count}</span> : null

export default function Header() {
  const countdown = useCountdown(COUNTDOWN_START_SECONDS)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const wishlistCount = useCart(state => state.wishlist.length)
  const cartCount = useCart(selectCount)
  const setCartOpen = useCart(state => state.setOpen)
  const setWishlistOpen = useCart(state => state.setWishlistOpen)
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-black px-4 py-2 text-center text-xs text-white">
        <span>New season coming! Discount 10% for all product! Checkout Now!</span>
        <span className="rounded-full bg-neutral-700 px-2 py-0.5 tabular-nums">{countdown}</span>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 border-b border-dashed py-4">
          <Logo />
          <div className="flex items-center gap-4 text-sm md:gap-6">
            {isSearchOpen && <input autoFocus type="search" placeholder="Search shoes" aria-label="Search" className="w-28 rounded-full border px-3 py-1 text-sm sm:w-44 md:w-56" />}
            <button aria-label="Search" aria-expanded={isSearchOpen} onClick={() => setIsSearchOpen(open => !open)}><SearchIcon /></button>
            <div className="relative hidden sm:block">
              <button aria-expanded={isCategoriesOpen} onClick={() => setIsCategoriesOpen(open => !open)} className="flex items-center gap-1">Categories <ChevronDownIcon width={14} height={14} /></button>
              {isCategoriesOpen && <ul className="absolute right-0 top-8 z-30 w-44 rounded-lg border bg-white py-2 shadow-lg">{CATEGORIES.map(category => <li key={category}><a href="#" className="block px-4 py-1.5 hover:bg-neutral-100">{category}</a></li>)}</ul>}
            </div>
            <a href="#" className="hidden items-center gap-1.5 sm:flex"><UserIcon /> Sign In</a>
            <button aria-label={`Open wishlist, ${wishlistCount} items`} onClick={() => setWishlistOpen(true)} className="relative"><HeartIcon /><Badge count={wishlistCount} /></button>
            <button aria-label={`Open cart, ${cartCount} items`} onClick={() => setCartOpen(true)} className="relative"><BagIcon /><Badge count={cartCount} /></button>
          </div>
        </div>
      </div>
    </header>)
}
