import { useMemo, useState } from 'react'
import type { CardProduct, Product, Selection } from '../types'
import { findVariant, inStock, isOptionDisabled, listPrice, MAX_QUANTITY, unitPrice } from '../lib/pricing'
import { htmlToPlainText } from '../lib/text'
import { useCart } from '../store'
import { track } from '../lib/analytics'
import { StarIcon } from './Icons'
const COLLAPSED_DESCRIPTION_LENGTH = 200
const formatPrice = (amount: number) => `${amount.toLocaleString()} EGP`

interface ProductInfoProps {
  product: Product
  card: CardProduct
  rating: number
  onColorChange: (imageUrl?: string) => void
}

export default function ProductInfo({ product, card, rating, onColorChange }: ProductInfoProps) {
  const [selection, setSelection] = useState<Selection>({})
  const [quantity, setQuantity] = useState(1)
  const [errorMessage, setErrorMessage] = useState('')
  const [justAdded, setJustAdded] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false)
  const { addItem, setOpen, compare, toggleCompare } = useCart()
  const selectedVariant = useMemo(() => findVariant(product, selection), [product, selection])
  const plainDescription = useMemo(() => htmlToPlainText(product.description), [product.description])
  const isLongDescription = plainDescription.length > COLLAPSED_DESCRIPTION_LENGTH
  const currentPrice = unitPrice(product, selectedVariant)
  const originalPrice = listPrice(product, selectedVariant)
  const isAvailable = inStock(product, selectedVariant)
  const colorVariation = product.variations.find(variation => variation.type === 'image')

  const selectOption = (variationName: string, optionName: string, colorImageUrl?: string) => {
    setSelection(current => ({ ...current, [variationName]: optionName }))
    setErrorMessage('')
    if (colorImageUrl) onColorChange(colorImageUrl)
  }
  const addToCart = (shouldOpenCart: boolean) => {
    const missingNames = product.variations.filter(variation => !selection[variation.name]).map(variation => variation.name)
    if (missingNames.length || !selectedVariant) return setErrorMessage(`Select ${missingNames.join(' and ')} first`)
    if (!isAvailable) return setErrorMessage('This option is out of stock')
    const colorImageUrl = colorVariation?.props.find(option => option.name === selection[colorVariation.name])?.value
    addItem({ productId: product.id, name: product.name, image: colorImageUrl || product.thumb, variantId: selectedVariant.id, options: selection, unitPrice: currentPrice, quantity })
    track('add_to_cart', { id: product.id, variant: selectedVariant.id, quantity, price: currentPrice })
    if (shouldOpenCart) return setOpen(true)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{card.brand}</span>
        <span className={isAvailable ? 'text-green-700' : 'text-red-600'}>{isAvailable ? 'In stock' : 'Out of stock'}</span>
      </div>
      <h1 className="-mt-2 text-2xl font-semibold leading-tight sm:text-3xl">{product.name}</h1>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-red-600">{formatPrice(currentPrice)}</span>
          {originalPrice > currentPrice && <><s className="text-neutral-400">{formatPrice(originalPrice)}</s><span className="rounded bg-red-50 px-2 py-0.5 text-sm text-red-600">-{Math.round((1 - currentPrice / originalPrice) * 100)}%</span></>}
        </div>
        <p className="flex items-center gap-2 text-sm text-neutral-500">
          {card.sold.toLocaleString()} Sold <span aria-hidden="true">•</span>
          <StarIcon width={16} height={16} fill="currentColor" className="text-amber-500" /><b className="text-neutral-900">{rating.toFixed(1)}</b>
        </p>
      </div>
      <div className="border-t border-dashed" />

      <div>
        <h2 className="font-semibold">Description:</h2>
        {isDescriptionExpanded ? (
          <>
            <div className="mt-2 text-sm text-neutral-700 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: product.description }} />
            <button className="mt-1 text-sm font-semibold" onClick={() => setIsDescriptionExpanded(false)}>See Less</button>
          </>
        ) : (
          <p className="mt-2 text-sm text-neutral-700">
            {isLongDescription ? `${plainDescription.slice(0, COLLAPSED_DESCRIPTION_LENGTH).trimEnd()}… ` : plainDescription}
            {isLongDescription && <button className="font-semibold text-neutral-900" onClick={() => setIsDescriptionExpanded(true)}>See More...</button>}
          </p>)}
      </div>

      {product.variations.map(variation => {
        const isColorSwatch = variation.type === 'image'
        return (
          <fieldset key={variation.id}>
            <legend className="mb-2 flex w-full items-center justify-between text-sm">
              <span className="text-neutral-500"><span className="capitalize">{variation.name}</span>: <b className="capitalize text-neutral-900">{selection[variation.name]}</b></span>
              {variation.name === 'size' && <a href="#size-chart" className="text-xs text-neutral-500 underline">View Size Chart</a>}
            </legend>
            <div className="flex flex-wrap gap-2">
              {variation.props.map(option => {
                const isDisabled = isOptionDisabled(product, selection, variation.name, option.name)
                const isSelected = selection[variation.name] === option.name
                return (
                  <button key={option.id} disabled={isDisabled} aria-pressed={isSelected} title={option.name}
                    onClick={() => selectOption(variation.name, option.name, isColorSwatch ? option.value : undefined)}
                    className={`${isColorSwatch ? 'h-10 w-16 overflow-hidden p-0' : 'min-w-12 px-4 py-2 text-sm'} rounded-lg border-2 transition
                      ${isSelected ? 'border-black bg-neutral-100' : 'border-neutral-200 hover:border-neutral-400'} ${isDisabled ? 'cursor-not-allowed opacity-30 line-through' : ''}`}>
                    {isColorSwatch ? <img src={option.value} alt={option.name} className="h-full w-full object-cover" /> : option.name}
                  </button>)
              })}
            </div>
          </fieldset>)
      })}

      <div className="flex items-center gap-3 text-sm">
        <span className="text-neutral-500">Quantity:</span>
        <div className="flex items-center rounded-lg border">
          <button className="px-3 py-1.5" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(current => current - 1)}>−</button>
          <span className="w-8 text-center" aria-live="polite">{quantity}</span>
          <button className="px-3 py-1.5" aria-label="Increase quantity" disabled={quantity >= MAX_QUANTITY} onClick={() => setQuantity(current => current + 1)}>+</button>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => addToCart(false)} disabled={!isAvailable} className="flex-[3] rounded-lg bg-black py-3 font-medium text-white disabled:opacity-40">{justAdded ? 'Added ✓' : 'Add To Cart'}</button>
        <button onClick={() => addToCart(true)} disabled={!isAvailable} className="flex-[2] rounded-lg border py-3 font-medium hover:bg-neutral-50 disabled:opacity-40">Checkout Now</button>
      </div>
      {errorMessage && <p role="alert" className="-mt-2 text-sm text-red-600">{errorMessage}</p>}

      <div className="flex gap-5 text-xs text-neutral-500">
        <button className="underline" aria-expanded={isDeliveryOpen} onClick={() => setIsDeliveryOpen(open => !open)}>Delivery T&amp;C</button>
        <button className="underline" aria-pressed={compare.includes(product.id)} onClick={() => { toggleCompare(product.id); track('compare', { id: product.id }) }}>{compare.includes(product.id) ? 'In compare' : 'Add to compare'}</button>
      </div>
      {isDeliveryOpen && <ul className="-mt-2 list-disc space-y-1 pl-5 text-xs text-neutral-600"><li>Cairo &amp; Alex: 2–4 business days</li><li>Delta, Suez, Port Said, Ismailia: 3–5 business days</li><li>Upper Egypt and other regions: about 1 week</li><li>Exchanges and refunds within 14 days of receiving the order</li></ul>}
    </div>)
}
