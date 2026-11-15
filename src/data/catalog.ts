// The API only serves "Sneakers12". Every other product is fake data that mirrors its shape,
// so each card can open a full product details page.
import type { CardProduct, Product } from '../types'
export const API_PRODUCT_SLUG = 'Sneakers12'
const CDN_BASE_URL = 'https://easyorders.fra1.digitaloceanspaces.com/'
export const SHOE_IMAGES = ['1735836892282056854.webp', '1734958738245433660.webp', '1735836944747077894.webp', '1735836957769748053.webp', '1735836966489475540.jpg']
  .map(fileName => CDN_BASE_URL + fileName)
const COLOR_OPTIONS = [{ name: 'brown', image: SHOE_IMAGES[2] }, { name: 'black', image: SHOE_IMAGES[3] }, { name: 'beige', image: SHOE_IMAGES[4] }]
const SIZES = ['38', '40', '42']

const makeCard = (slug: string, name: string, description: string, price: number, rating: number, sold: number, imageIndex: number, oldPrice?: number): CardProduct =>
  ({ id: slug, slug, brand: 'Achilles ANYDAY', name, description, price, oldPrice, rating, sold, image: SHOE_IMAGES[imageIndex % SHOE_IMAGES.length] })

export const catalog: CardProduct[] = [
  { id: 'd032e864-17cf-4417-9e34-a1a35620d42d', slug: API_PRODUCT_SLUG, brand: 'Achilles', name: 'Achilles Pro - Genuine Suede X Leather Sneakers',
    description: 'Cowhide leather sneakers with a padded insole', price: 160, oldPrice: 190, rating: 4.5, sold: 1238, image: SHOE_IMAGES[0] },
  makeCard('classic-suede-low', 'Classic Suede Low, Brown', 'Soft suede upper on a cushioned TR sole', 150, 4.6, 1112, 2),
  makeCard('court-leather', 'Court Leather Sneaker, Black', 'Smooth nappa leather with a brushed finish', 175, 4.8, 860, 3, 210),
  makeCard('street-low', 'Street Low Sneaker, Beige', 'Everyday low-top with leather lining', 140, 4.4, 540, 4),
  makeCard('runner-pro', 'Runner Pro, Brown', 'Lightweight trainer for long days on your feet', 185, 4.7, 2010, 1),
  makeCard('heritage-sneaker', 'Heritage Sneaker, Black', 'Classic profile in cowhide leather', 165, 4.5, 730, 0, 190),
  makeCard('everyday-white', 'Everyday Sneaker, Beige', 'Clean minimal sneaker that goes with everything', 130, 4.9, 3200, 4),
  makeCard('dune-sneaker', 'Dune Sneaker, Beige', 'Sand-toned suede with a padded collar', 155, 4.6, 1300, 4),
  makeCard('night-black', 'Night Black Sneaker', 'All-black leather with a matte sole', 170, 4.7, 1580, 3),
  makeCard('trail-low', 'Trail Low, Brown', 'Grippy sole for uneven city streets', 120, 4.3, 410, 2, 140),
]

export const buildMockProduct = (card: CardProduct): Product => {
  const basePrice = card.oldPrice ?? card.price
  const salePrice = card.oldPrice ? card.price : 0
  return {
    id: card.id, name: card.name, price: basePrice, sale_price: salePrice,
    description: `<p>${card.description}. Made with cowhide leather and a leather and fabric lining, with a special padded insole for greater comfort.</p><ul><li>Sole material: TR</li><li>Shoe lining: genuine leather</li></ul>`,
    thumb: card.image, images: SHOE_IMAGES.filter(imageUrl => imageUrl !== card.image), quantity: 0, track_stock: false,
    categories: [{ id: 'sneakers', name: 'Sneakers' }],
    variations: [
      { id: `${card.id}-color`, name: 'color', type: 'image', props: COLOR_OPTIONS.map(color => ({ id: `${card.id}-${color.name}`, name: color.name, value: color.image })) },
      { id: `${card.id}-size`, name: 'size', type: 'button', props: SIZES.map(size => ({ id: `${card.id}-size-${size}`, name: size })) },
    ],
    variants: COLOR_OPTIONS.flatMap(color => SIZES.map(size => ({
      id: `${card.id}-${color.name}-${size}`, price: basePrice, sale_price: salePrice, quantity: 0,
      variation_props: [{ variation: 'color', variation_prop: color.name }, { variation: 'size', variation_prop: size }] }))),
  }
}
