import { useMemo, useState } from 'react'
import { mockReviews, REVIEW_TOPICS } from '../data/reviews'
import { filterReviews, getPageNumbers, summarize, type ReviewTab } from '../lib/reviews'
import Stars from './Stars'
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, StarIcon, ThumbUpIcon } from './Icons'
const REVIEWS_PER_PAGE = 4
const TABS: { value: ReviewTab; label: string }[] = [{ value: 'all', label: 'All Reviews' }, { value: 'media', label: 'With Photo & Video' }, { value: 'description', label: 'With Description' }]
const AVATAR_COLORS = ['bg-indigo-200', 'bg-teal-200', 'bg-sky-200', 'bg-rose-200', 'bg-amber-200']
const toggleValue = <T,>(values: T[], value: T) => (values.includes(value) ? values.filter(existing => existing !== value) : [...values, value])
const formatReviewDate = (isoDate: string) => {
  const date = new Date(isoDate)
  return `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
}
const getInitials = (fullName: string) => fullName.split(' ').map(part => part[0]).join('')
const actionButton = 'flex h-9 items-center justify-center gap-1.5 rounded-lg border text-xs hover:bg-neutral-50'
const pageBox = 'grid h-9 w-9 place-items-center rounded-lg border text-xs'

export default function Reviews() {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<ReviewTab>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isRatingOpen, setIsRatingOpen] = useState(true)
  const [isTopicsOpen, setIsTopicsOpen] = useState(true)
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [dislikedIds, setDislikedIds] = useState<string[]>([])
  const summary = useMemo(() => summarize(mockReviews), [])
  const filteredReviews = useMemo(() => filterReviews([...mockReviews], selectedRatings, selectedTopics, activeTab), [selectedRatings, selectedTopics, activeTab])
  const pageCount = Math.max(1, Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE))
  const visibleReviews = filteredReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)
  const clearFilters = () => { setSelectedRatings([]); setSelectedTopics([]); setActiveTab('all'); setCurrentPage(1) }
  const like = (reviewId: string) => { setLikedIds(current => toggleValue(current, reviewId)); setDislikedIds(current => current.filter(id => id !== reviewId)) }
  const dislike = (reviewId: string) => { setDislikedIds(current => toggleValue(current, reviewId)); setLikedIds(current => current.filter(id => id !== reviewId)) }

  return (
    <section id="reviews" className="py-12">
      <h2 className="mb-6 text-2xl font-semibold">Product Reviews</h2>
      <div className="flex flex-wrap items-center gap-6 rounded-lg border border-dashed p-4 sm:p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-orange-400 text-lg font-semibold">{summary.average.toFixed(1)}</div>
          <div><Stars value={summary.average} /><p className="text-xs text-neutral-500">from {summary.count} reviews</p></div>
        </div>
        <div className="min-w-56 flex-1 space-y-1.5 md:ml-12">
          {summary.distribution.map(bucket => (
            <div key={bucket.stars} className="flex items-center gap-3 text-xs">
              <span className="flex w-9 items-center gap-1 font-medium">{bucket.stars}.0 <StarIcon width={12} height={12} fill="currentColor" className="text-amber-500" /></span>
              <div className="h-1.5 flex-1 rounded-full bg-neutral-200"><div className="h-1.5 rounded-full bg-neutral-800" style={{ width: `${(bucket.count / summary.count) * 100}%` }} /></div>
              <span className="w-6 text-right text-neutral-500">{bucket.count}</span>
            </div>))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside aria-label="Reviews filter" className="self-start rounded-lg border border-dashed p-4 text-sm">
          <div className="flex items-center justify-between border-b border-dashed pb-3"><h3 className="font-semibold">Reviews Filter</h3>
            {(selectedRatings.length > 0 || selectedTopics.length > 0) && <button className="text-xs text-neutral-500 underline" onClick={clearFilters}>Clear</button>}</div>
          <fieldset className="border-b border-dashed py-3">
            <button type="button" aria-expanded={isRatingOpen} onClick={() => setIsRatingOpen(open => !open)} className="flex w-full items-center justify-between font-medium"><span>Rating</span>{isRatingOpen ? <ChevronUpIcon width={16} height={16} /> : <ChevronDownIcon width={16} height={16} />}</button>
            {isRatingOpen && <div className="mt-3 space-y-2.5">{[5, 4, 3, 2, 1].map(stars => (
              <label key={stars} className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-black" checked={selectedRatings.includes(stars)} onChange={() => { setSelectedRatings(current => toggleValue(current, stars)); setCurrentPage(1) }} />
                <StarIcon width={14} height={14} fill="currentColor" className="text-amber-500" /><span className="font-medium">{stars}</span></label>))}</div>}
          </fieldset>
          <fieldset className="pt-3">
            <button type="button" aria-expanded={isTopicsOpen} onClick={() => setIsTopicsOpen(open => !open)} className="flex w-full items-center justify-between font-medium"><span>Review Topics</span>{isTopicsOpen ? <ChevronUpIcon width={16} height={16} /> : <ChevronDownIcon width={16} height={16} />}</button>
            {isTopicsOpen && <div className="mt-3 space-y-2.5">{REVIEW_TOPICS.map(topic => (
              <label key={topic} className="flex items-center gap-2 text-xs font-medium text-neutral-500"><input type="checkbox" className="h-4 w-4 accent-black" checked={selectedTopics.includes(topic)} onChange={() => { setSelectedTopics(current => toggleValue(current, topic)); setCurrentPage(1) }} />{topic}</label>))}</div>}
          </fieldset>
        </aside>

        <div className="min-w-0">
          <h3 className="font-semibold">Review Lists</h3>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist">
            {TABS.map(tab => <button key={tab.value} role="tab" aria-selected={activeTab === tab.value} onClick={() => { setActiveTab(tab.value); setCurrentPage(1) }}
              className={`rounded-lg border px-3 py-1.5 text-xs ${activeTab === tab.value ? 'border-black bg-neutral-200 font-medium' : 'hover:bg-neutral-50'}`}>{tab.label}</button>)}
          </div>
          {visibleReviews.length === 0 && <p className="py-10 text-center text-sm text-neutral-500">No reviews match these filters. <button className="underline" onClick={clearFilters}>Clear filters</button></p>}
          <ul>{visibleReviews.map(review => {
            const isLiked = likedIds.includes(review.id)
            const isDisliked = dislikedIds.includes(review.id)
            return (
              <li key={review.id} className="border-b border-dashed py-5 last:border-0">
                <Stars value={review.rating} size="text-sm" />
                <h4 className="mt-2 text-sm font-semibold">{review.title}</h4>
                {review.comment && <p className="mt-1 text-sm text-neutral-600">{review.comment}</p>}
                <time className="mt-1 block text-xs text-neutral-400">{formatReviewDate(review.date)}</time>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className={`grid h-7 w-7 place-items-center rounded-full text-[10px] ${AVATAR_COLORS[review.name.length % AVATAR_COLORS.length]}`}>{getInitials(review.name)}</span>{review.name}
                  </div>
                  <div className="flex gap-2">
                    <button className={`${actionButton} min-w-[72px] px-3`} aria-pressed={isLiked} aria-label={`Like review, ${review.likes + (isLiked ? 1 : 0)} likes`} onClick={() => like(review.id)}>
                      <ThumbUpIcon width={14} height={14} fill={isLiked ? 'currentColor' : 'none'} />{review.likes + (isLiked ? 1 : 0)}</button>
                    <button className={`${actionButton} w-9`} aria-pressed={isDisliked} aria-label="Dislike review" onClick={() => dislike(review.id)}>
                      <ThumbUpIcon width={14} height={14} style={{ transform: 'scaleY(-1)' }} fill={isDisliked ? 'currentColor' : 'none'} /></button>
                  </div>
                </div>
              </li>)
          })}</ul>
          {pageCount > 1 && <nav className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Review pages">
            {getPageNumbers(currentPage, pageCount).map((page, index) => page === '…'
              ? <span key={`gap-${index}`} className={`${pageBox} text-neutral-400`}>…</span>
              : <button key={page} aria-current={currentPage === page ? 'page' : undefined} onClick={() => setCurrentPage(page)} className={`${pageBox} ${currentPage === page ? 'border-black' : 'text-neutral-500'}`}>{page}</button>)}
            <button aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setCurrentPage(page => page + 1)} className="grid h-9 w-8 place-items-center disabled:opacity-30"><ChevronRightIcon width={16} height={16} /></button>
          </nav>}
        </div>
      </div>
    </section>)
}
