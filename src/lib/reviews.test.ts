import { describe, it, expect } from 'vitest'
import { filterReviews, getPageNumbers, summarize } from './reviews'
import { mockReviews } from '../data/reviews'
describe('reviews', () => {
  it('filters by rating and topic', () => {
    const filtered = filterReviews([...mockReviews], [5], ['Product Quality'], 'all')
    expect(filtered.length).toBeGreaterThan(0)
    expect(filtered.every(review => review.rating === 5 && review.topics.includes('Product Quality'))).toBe(true)
  })
  it('filters by tab', () => {
    expect(filterReviews([...mockReviews], [], [], 'media').every(review => review.hasMedia)).toBe(true)
    expect(filterReviews([...mockReviews], [], [], 'description').every(review => review.comment !== '')).toBe(true)
  })
  it('summarizes', () => {
    const summary = summarize(mockReviews)
    expect(summary.count).toBe(40)
    expect(summary.distribution.reduce((total, bucket) => total + bucket.count, 0)).toBe(40)
  })
  it('builds page numbers', () => {
    expect(getPageNumbers(1, 10)).toEqual([1, 2, '…', 10])
    expect(getPageNumbers(5, 10)).toEqual([1, 2, '…', 4, 5, 6, '…', 10])
    expect(getPageNumbers(1, 2)).toEqual([1, 2])
  })
})
