import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type Crumb = {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      {items.map((c, idx) => {
        const isLast = idx === items.length - 1
        return (
          <span key={`${c.label}-${idx}`} className="flex items-center gap-1">
            {idx > 0 ? <ChevronRight className="size-4" aria-hidden="true" /> : null}
            {c.to && !isLast ? (
              <Link to={c.to} className="hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-foreground' : undefined}>{c.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

