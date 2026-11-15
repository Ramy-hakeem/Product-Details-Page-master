import { API_PRODUCT_SLUG } from '../data/catalog'
import { useCart } from '../store'
export default function Logo() {
  const selectProduct = useCart(state => state.selectProduct)
  return (
    <button onClick={() => selectProduct(API_PRODUCT_SLUG)} aria-label="John Lewis & Partners, home" className="inline-flex flex-col items-center leading-none">
      <span className="text-sm tracking-[0.3em] sm:text-base">JOHN LEWIS</span>
      <span className="mt-1 text-[8px] tracking-[0.3em] sm:text-[9px]">&amp; PARTNERS</span>
    </button>)
}
