import type { CatalogItem } from '../types/catalog'
import { ItemCard } from './ItemCard'
import { Button } from './ui/button'

type Props = {
  title: string
  items: CatalogItem[]
  query?: string
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
  viewAll?: boolean
  onToggleViewAll?: () => void
}

export function CategorySection({
  title,
  items,
  query = '',
  isFavorite,
  onToggleFavorite,
  viewAll,
  onToggleViewAll,
}: Props) {
  return (
    <section className="space-y-3" data-aos="fade-up">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
          <div className="text-sm text-muted-foreground">{items.length} items</div>
        </div>
        {typeof viewAll === 'boolean' && onToggleViewAll ? (
          <Button type="button" variant="outline" onClick={onToggleViewAll} className="bg-white/5 border-white/10">
            {viewAll ? 'Collapse' : 'View all'}
          </Button>
        ) : null}
      </div>

      <div className="relative">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, idx) => (
            <div key={item.id} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
              <ItemCard
                item={item}
                query={query}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                aosDelayMs={Math.min(idx, 6) * 80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

