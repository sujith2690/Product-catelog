import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [displayItems, setDisplayItems] = React.useState<CatalogItem[]>(items)

  React.useEffect(() => {
    setDisplayItems(items)
  }, [items])

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current
      if (scrollLeft <= 5) {
        // Loop back to the end
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      }
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (!scrollRef.current || items.length === 0) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    
    // Only handle infinite scroll if there is content to scroll
    if (scrollWidth <= clientWidth) return

    // Append more items when getting close to the right edge
    if (scrollLeft + clientWidth >= scrollWidth - 600) {
      setDisplayItems((prev) => {
        if (prev.length > 500) return prev
        return [...prev, ...items]
      })
    }
  }

  return (
    <section className="space-y-3" data-aos="fade-up">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
          <div className="text-sm text-muted-foreground">{items.length} items</div>
        </div>
        <div className="flex items-center gap-2">
          {items.length > 4 && (
            <div className="flex items-center gap-1">
              <Button type="button" variant="outline" size="icon" onClick={scrollLeft} className="h-9 w-9 bg-white/5 border-white/10 shrink-0">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={scrollRight} className="h-9 w-9 bg-white/5 border-white/10 shrink-0">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          )}
          {typeof viewAll === 'boolean' && onToggleViewAll ? (
            <Button type="button" variant="outline" onClick={onToggleViewAll} className="bg-white/5 border-white/10">
              {viewAll ? 'Collapse' : 'View all'}
            </Button>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-[260px] shrink-0 snap-start sm:w-[280px]">
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

