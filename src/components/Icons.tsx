import type { ReactNode, SVGProps } from 'react'
type IconProps = SVGProps<SVGSVGElement>
const createIcon = (paths: ReactNode) => (props: IconProps) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths}</svg>)
export const SearchIcon = createIcon(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>)
export const UserIcon = createIcon(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>)
export const HeartIcon = createIcon(<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z" />)
export const BagIcon = createIcon(<><path d="M6 7h12l1 13H5L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></>)
export const ChevronLeftIcon = createIcon(<path d="m15 6-6 6 6 6" />)
export const ChevronRightIcon = createIcon(<path d="m9 6 6 6-6 6" />)
export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />)
export const ChevronUpIcon = createIcon(<path d="m6 15 6-6 6 6" />)
export const ThumbUpIcon = createIcon(<><path d="M7 11v9H4v-9h3z" /><path d="m7 11 4-7c1.500 0 2.500 1 2 3l-.5 3H19a2 2 0 0 1 2 2.300l-1 6A2 2 0 0 1 18 20H7" /></>)
export const StarIcon = createIcon(<path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9z" />)
export const FacebookIcon = createIcon(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />)
export const InstagramIcon = createIcon(<><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.500" /><circle cx="17" cy="7" r=".5" /></>)
export const TwitterIcon = createIcon(<path d="M21 6.500c-.7.300-1.400.5-2.200.6.800-.5 1.400-1.200 1.700-2.100-.8.500-1.600.8-2.500 1a3.900 3.900 0 0 0-6.600 3.500C8.100 9.300 5.200 7.800 3.300 5.400c-1 1.800-.5 4 1.200 5.200-.6 0-1.200-.2-1.700-.5 0 1.900 1.300 3.500 3.100 3.900-.6.200-1.100.2-1.700.1.500 1.500 1.900 2.700 3.600 2.700A7.900 7.900 0 0 1 3 18.400a11 11 0 0 0 6 1.800c7.300 0 11.400-6.100 11.100-11.700.8-.6 1.400-1.300 1.900-2z" />)
export const MailIcon = createIcon(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)
export const CloseIcon = createIcon(<path d="M6 6l12 12M18 6 6 18" />)
