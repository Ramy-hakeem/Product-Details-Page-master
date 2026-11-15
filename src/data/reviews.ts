import type { Review } from '../types'
export const REVIEW_TOPICS = ['Product Quality', 'Seller Services', 'Product Price', 'Shipment', 'Match with Description']
const REVIEWER_NAMES = ['Darrell Steward', 'Darlene Robertson', 'Kathryn Murphy', 'Ronald Richards', 'Omar Khaled', 'Salma Ahmed', 'Youssef Mansour', 'Nour Hassan', 'Mariam Samir', 'Karim Tarek']
const REVIEW_TITLES = ['This is amazing product I have.', 'Really comfortable and well made.', 'Great quality leather for the price.', 'Runs a little small, size up.', 'Looks even better in person.', 'Fast delivery and neat packaging.']
const REVIEW_COMMENTS = ['The leather feels soft and the padded insole makes all-day wear easy.', '', 'Stitching is clean and the sole grips well on tiles.', '', 'I ordered my usual size and it was a touch snug.', 'Goes with jeans and chinos alike.']
const RATING_PATTERN = [5, 5, 5, 4, 5, 5, 3, 5, 4, 5, 5, 5, 2, 5, 4, 5, 5, 4, 5, 5]
export const mockReviews: Review[] = Array.from({ length: 40 }, (_, index) => ({
  id: `review-${index}`,
  name: REVIEWER_NAMES[index % REVIEWER_NAMES.length],
  rating: RATING_PATTERN[index % RATING_PATTERN.length],
  title: REVIEW_TITLES[(index * 5) % REVIEW_TITLES.length],
  comment: REVIEW_COMMENTS[(index * 7) % REVIEW_COMMENTS.length],
  date: new Date(2026, 9, 28 - index, 9 + ((index * 7) % 12), (index * 13) % 60).toISOString(),
  topics: [REVIEW_TOPICS[index % 5], REVIEW_TOPICS[(index * 2 + 1) % 5]].filter((topic, topicIndex, allTopics) => allTopics.indexOf(topic) === topicIndex),
  hasMedia: index % 4 === 0,
  likes: (index * 37) % 140,
}))
