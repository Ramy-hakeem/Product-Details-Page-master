import type { Review } from '../types'
export type ReviewTab = 'all' | 'media' | 'description'
export const filterReviews = (reviews: Review[], selectedRatings: number[], selectedTopics: string[], tab: ReviewTab) =>
  reviews
    .filter(review =>
      (!selectedRatings.length || selectedRatings.includes(review.rating)) &&
      selectedTopics.every(topic => review.topics.includes(topic)) &&
      (tab === 'all' || (tab === 'media' ? review.hasMedia : review.comment.length > 0)))
    .sort((first, second) => second.date.localeCompare(first.date))
export const summarize = (reviews: Review[]) => ({
  count: reviews.length,
  average: reviews.length ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0,
  distribution: [5, 4, 3, 2, 1].map(stars => ({ stars, count: reviews.filter(review => review.rating === stars).length })),
})
/** Page buttons like "1 2 … 10": first two pages, the current neighbourhood, and the last page. */
export const getPageNumbers = (currentPage: number, pageCount: number): (number | '…')[] => {
  const pages = [...new Set([1, 2, currentPage - 1, currentPage, currentPage + 1, pageCount])]
    .filter(page => page >= 1 && page <= pageCount).sort((first, second) => first - second)
  return pages.flatMap((page, index) => (index > 0 && page - pages[index - 1] > 1 ? ['…' as const, page] : [page]))
}
