/** Flattens product description HTML into one readable line of text for the collapsed view. */
export const htmlToPlainText = (html: string) => {
  const withBreaks = html.replace(/<\/(li|p)>/gi, '. ')
  const text = new DOMParser().parseFromString(withBreaks, 'text/html').body.textContent ?? ''
  return text.replace(/\s+/g, ' ').replace(/(\.\s*)+/g, '. ').trim()
}
