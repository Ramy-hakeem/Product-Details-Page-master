type Evt = 'view_product' | 'add_to_cart' | 'remove_from_cart' | 'wishlist' | 'compare' | 'share'
export const track = (event: Evt, data: Record<string, unknown> = {}) => {
  const payload = { event, ts: Date.now(), ...data }
  ;(window as any).dataLayer?.push(payload) // GTM-style; swap for GA/Segment
  if (import.meta.env.DEV) console.debug('[analytics]', payload)
}
