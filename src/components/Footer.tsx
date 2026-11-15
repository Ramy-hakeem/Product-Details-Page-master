import { useState } from 'react'
import Logo from './Logo'
import { ChevronDownIcon, ChevronRightIcon, FacebookIcon, InstagramIcon, MailIcon, TwitterIcon } from './Icons'
import { useCart } from '../store'
const SOCIAL_LINKS = [{ label: 'Facebook', Icon: FacebookIcon }, { label: 'Instagram', Icon: InstagramIcon }, { label: 'Twitter', Icon: TwitterIcon }, { label: 'Email', Icon: MailIcon }]
const InfoLink = ({ label }: { label: string }) => <li><a href="#" className="hover:underline">{label}</a></li>
const columnHeading = 'mb-4 text-sm font-semibold'
const columnList = 'space-y-2.5 text-sm text-neutral-600'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const setCartOpen = useCart(state => state.setOpen)
  const setWishlistOpen = useCart(state => state.setWishlistOpen)
  return (
    <footer className="bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <form className="mt-8 flex max-w-xs items-end" onSubmit={event => { event.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setIsSubscribed(true) }}>
              <input type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="Get latest offers to your inbox" aria-label="Email address" className="min-w-0 flex-1 border-b border-neutral-400 bg-transparent pb-2 text-sm outline-none placeholder:text-neutral-500" />
              <button aria-label="Subscribe" className="grid h-9 w-11 shrink-0 place-items-center rounded bg-black text-white"><ChevronRightIcon width={16} height={16} /></button>
            </form>
            {isSubscribed && <p role="status" className="mt-2 text-sm text-green-700">Thanks, you’re subscribed.</p>}
            <div className="mt-5 flex gap-3">{SOCIAL_LINKS.map(({ label, Icon }) => <a key={label} href="#" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full bg-white"><Icon width={16} height={16} /></a>)}</div>
          </div>
          <div><h3 className={columnHeading}>Shop</h3><ul className={columnList}>
            <InfoLink label="My account" /><InfoLink label="Login" />
            <li><button onClick={() => setWishlistOpen(true)} className="hover:underline">Wishlist</button></li>
            <li><button onClick={() => setCartOpen(true)} className="hover:underline">Cart</button></li></ul></div>
          <div><h3 className={columnHeading}>Information</h3><ul className={columnList}>{['Shipping Policy', 'Returns & Refunds', 'Cookies Policy', 'Frequently asked'].map(label => <InfoLink key={label} label={label} />)}</ul></div>
          <div><h3 className={columnHeading}>Company</h3><ul className={columnList}>{['About us', 'Privacy Policy', 'Terms & Conditions', 'Contact Us'].map(label => <InfoLink key={label} label={label} />)}</ul></div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-neutral-400 py-6 text-xs text-neutral-600">
          <p>© John Lewis plc 2001 - 2024</p>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-1.5"><span aria-hidden="true">🇺🇸</span><span className="sr-only">Language</span>
              <select className="cursor-pointer appearance-none bg-transparent outline-none" defaultValue="English"><option>English</option><option>العربية</option></select><ChevronDownIcon width={12} height={12} /></label>
            <label className="flex items-center gap-1.5"><span className="sr-only">Currency</span>
              <select className="cursor-pointer appearance-none bg-transparent outline-none" defaultValue="USD"><option>USD</option><option>EGP</option></select><ChevronDownIcon width={12} height={12} /></label>
          </div>
        </div>
      </div>
    </footer>)
}
