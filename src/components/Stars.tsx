export default function Stars({ value, size = 'text-base' }: { value: number; size?: string }) {
  return (
    <span className={`${size} tracking-tight`} role="img" aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map(starNumber => <span key={starNumber} className={starNumber <= Math.round(value) ? 'text-amber-500' : 'text-neutral-300'}>★</span>)}
    </span>)
}
