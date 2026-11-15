import { ChevronRightIcon } from './Icons'
export default function Breadcrumb({ trail }: { trail: { label: string; onClick?: () => void }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
        {trail.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {index > 0 && <ChevronRightIcon width={12} height={12} />}
            {crumb.onClick ? <button onClick={crumb.onClick} className="hover:underline">{crumb.label}</button> : <span className="font-medium text-neutral-900">{crumb.label}</span>}
          </li>))}
      </ol>
    </nav>)
}
