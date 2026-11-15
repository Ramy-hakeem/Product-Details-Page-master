# Product page task
React 18 + TypeScript + Tailwind + Zustand (immer, persist) + React Query. Vite is used instead of CRA (CRA is deprecated).

## Setup
    npm install
    npm run dev      # http://localhost:5173
    npm test         # vitest (store, review filtering, pagination)
    npm run build

## Structure (follows the Figma)
Banner + header (logo, search, categories, sign in, wishlist, cart) → breadcrumb → gallery + product info → Related Product → Product Reviews → Popular this week → Footer.

## Navigation (no routes, no URL changes)
- One page. Clicking a Related/Popular card, a wishlist item, the logo or the breadcrumb changes the product shown through store state (`currentSlug`).
- `Sneakers12` comes from the EasyOrders API; every other product is fake data from `src/data/catalog.ts`.
- The wishlist is a slide-out section (`WishlistDrawer`) opened from the header heart or the footer link. Hearts on the gallery and on cards add/remove items.
- No product sharing.

## Architecture
- `src/data/catalog.ts` – card catalog + `buildMockProduct` (same shape as the API product, so one page renders both).
- `src/data/reviews.ts` – 40 mock reviews and topics (no reviews endpoint).
- `src/lib/api.ts` – `useProduct(slug)` via React Query (API for `Sneakers12`, catalog otherwise).
- `src/lib/pricing.ts` – variant matching, effective price (variant sale > product sale > variant price), option disabling.
- `src/lib/reviews.ts` – rating/topic/tab filtering, summary, page numbers.
- `src/store.ts` – cart, wishlist (stores card snapshots), compare, and in-page navigation state in one Zustand store (immer; cart/wishlist/compare persisted as `cart-v2`).
- `src/components/` – Header, Footer, ProductDetails, Gallery, ProductInfo, ProductRow, Reviews, CartDrawer, WishlistDrawer, Icons.

## Responsive behaviour
- Below `md` the gallery and product info stack; related/popular rows scroll sideways and become a 5-column grid at `md`+.
- Header drops Categories/Sign In on phones; footer columns reflow; review filters stack above the list on phones.

## Notes / known gaps
- "View Size Chart" is a placeholder link (no size-chart data).
- Related/Popular/Reviews use fake data; product images reuse the shoe CDN assets.
- API data: `track_stock` is false and quantities are 0, so all variants are treated as in stock.
- Not done: PWA, component and E2E tests, deployment config.
