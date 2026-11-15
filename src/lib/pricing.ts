import type { Product, Selection, Variant } from '../types'
export const MAX_QUANTITY = 10
export const inStock = (product: Product, variant?: Variant) =>
  !product.track_stock || (variant ? variant.quantity > 0 : product.quantity > 0)
const variantMatches = (variant: Variant, selection: Selection) =>
  Object.entries(selection).every(([variationName, optionName]) =>
    variant.variation_props.some(variantProp => variantProp.variation === variationName && variantProp.variation_prop === optionName))
export const findVariant = (product: Product, selection: Selection) =>
  product.variations.length && Object.keys(selection).length === product.variations.length
    ? product.variants.find(variant => variantMatches(variant, selection))
    : undefined
/** Variant sale price > product sale price > variant price (the API leaves variant sale_price at 0). */
export const unitPrice = (product: Product, variant?: Variant) =>
  variant?.sale_price || product.sale_price || variant?.price || product.price
export const listPrice = (product: Product, variant?: Variant) => variant?.price || product.price
/** An option is disabled if no in-stock variant exists with it plus the other current picks. */
export const isOptionDisabled = (product: Product, selection: Selection, variationName: string, optionName: string) =>
  !product.variants.some(variant => variantMatches(variant, { ...selection, [variationName]: optionName }) && inStock(product, variant))
