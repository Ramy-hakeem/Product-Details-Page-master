import { useEffect, useMemo, useState } from 'react'
import { useProduct } from '../lib/api'
import { track } from '../lib/analytics'
import { API_PRODUCT_SLUG, catalog } from '../data/catalog'
import { mockReviews } from '../data/reviews'
import { summarize } from '../lib/reviews'
import { useCart } from '../store'
import Breadcrumb from './Breadcrumb'
import Gallery from './Gallery'
import ProductInfo from './ProductInfo'
import ProductRow from './ProductRow'
import Reviews from './Reviews'

const Divider = ({ className = '' }: { className?: string }) => <div className={`border-t border-dashed ${className}`} />

export default function ProductDetails() {
  const slug = useCart(state => state.currentSlug)
  const selectProduct = useCart(state => state.selectProduct)
  const goHome = () => selectProduct(API_PRODUCT_SLUG)
  const { data: product, isLoading, error, refetch } = useProduct(slug)
  const card = catalog.find(candidate => candidate.slug === slug)
  const [colorImageUrl, setColorImageUrl] = useState<string>()
  const isWishlisted = useCart(state => state.wishlist.some(item => item.id === card?.id))
  const toggleWishlist = useCart(state => state.toggleWishlist)
  const galleryImages = useMemo(
    () => (product ? [...new Set([colorImageUrl, product.thumb, ...product.images].filter(Boolean) as string[])] : []),
    [product, colorImageUrl])
  const averageRating = useMemo(() => summarize(mockReviews).average, [])
  const otherProducts = catalog.filter(candidate => candidate.slug !== slug)
  const relatedProducts = otherProducts.slice(0, 5)
  const popularProducts = [...otherProducts].reverse().slice(0, 5)
  useEffect(() => { setColorImageUrl(undefined); window.scrollTo(0, 0) }, [slug])
  useEffect(() => { if (product) track('view_product', { id: product.id }) }, [product?.id])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <Breadcrumb trail={[{ label: 'Homepage', onClick: goHome }, { label: 'Shoes', onClick: goHome }, { label: 'Sneakers', onClick: goHome }, { label: product?.name ?? 'Loading…' }]} />
      {isLoading && <div className="grid animate-pulse gap-8 md:grid-cols-2"><div className="aspect-[3/4] rounded-xl bg-neutral-200" /><div className="h-64 rounded-xl bg-neutral-200" /></div>}
      {error && <div role="alert" className="py-20 text-center"><p>Couldn’t load the product. Check your connection and try again.</p><button className="mt-3 rounded-lg border px-4 py-2" onClick={() => refetch()}>Retry</button></div>}
      {product && card && (
        <main className="grid gap-8 md:grid-cols-2 md:gap-10">
          <Gallery key={`${slug}-${colorImageUrl}`} images={galleryImages} alt={product.name} isWishlisted={isWishlisted}
            onToggleWishlist={() => { toggleWishlist(card); track('wishlist', { id: card.id }) }} />
          <ProductInfo key={slug} product={product} card={card} rating={averageRating} onColorChange={setColorImageUrl} />
        </main>)}
      <Divider className="mt-12" />
      <ProductRow title="Related Product" products={relatedProducts} />
      <Divider />
      <Reviews />
      <Divider />
      <ProductRow title="Popular this week" products={popularProducts} />
    </div>)
}
