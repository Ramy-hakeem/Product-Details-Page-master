import { useState, type KeyboardEvent } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from './Icons'
interface GalleryProps { images: string[]; alt: string; isWishlisted: boolean; onToggleWishlist: () => void }
const sideButton = 'grid h-10 w-10 place-items-center rounded-lg border bg-white hover:bg-neutral-50'

export default function Gallery({ images, alt, isWishlisted, onToggleWishlist }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number } | null>(null)
  const goToImage = (targetIndex: number) => setActiveIndex((targetIndex + images.length) % images.length)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') goToImage(activeIndex + 1)
    if (event.key === 'ArrowLeft') goToImage(activeIndex - 1)
  }
  return (
    <div className="flex min-w-0 flex-col gap-3" tabIndex={0} onKeyDown={handleKeyDown} aria-label="Product gallery">
      <div className="flex gap-3">
        <div className="relative aspect-[3/4] min-w-0 flex-1 cursor-zoom-in overflow-hidden rounded-xl bg-neutral-100"
          onMouseLeave={() => setZoomOrigin(null)}
          onMouseMove={event => {
            const bounds = event.currentTarget.getBoundingClientRect()
            setZoomOrigin({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 })
          }}
          onClick={() => setZoomOrigin(current => (current ? null : { x: 50, y: 50 }))}>
          <img src={images[activeIndex]} alt={alt} className="h-full w-full object-contain transition-transform duration-200"
            style={zoomOrigin ? { transform: 'scale(2)', transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined} />
        </div>
        <div className="flex flex-col justify-between">
          <button className={sideButton} aria-pressed={isWishlisted} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={onToggleWishlist}>
            <HeartIcon fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
          </button>
          <div className="flex flex-col gap-2">
            <button className={sideButton} aria-label="Previous image" onClick={() => goToImage(activeIndex - 1)}><ChevronLeftIcon /></button>
            <button className={sideButton} aria-label="Next image" onClick={() => goToImage(activeIndex + 1)}><ChevronRightIcon /></button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((imageUrl, imageIndex) => (
          <button key={imageUrl} onClick={() => setActiveIndex(imageIndex)} aria-label={`Image ${imageIndex + 1}`}
            className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-neutral-100 ${imageIndex === activeIndex ? 'border-black' : 'border-transparent opacity-70'}`}>
            <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-contain" />
          </button>))}
      </div>
    </div>)
}
