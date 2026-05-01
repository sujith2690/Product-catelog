import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CatalogItem } from '../types/catalog'
import { ItemCard } from './ItemCard'
import { Button } from './ui/button'

const LOOP_COPIES = 3
const SCROLL_STEP_PX = 300
const EDGE_PAD_PX = 32

type Props = {
  title: string
  items: CatalogItem[]
  query?: string
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
}

export function CategorySection({ title, items, query = '', isFavorite, onToggleFavorite }: Props) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const isJumpingRef = React.useRef(false)

  const [useLoop, setUseLoop] = React.useState(false)

  const loopItems = React.useMemo(() => {
    if (items.length === 0) return []
    return Array.from({ length: LOOP_COPIES }, () => items).flat()
  }, [items])

  const centerScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el || items.length === 0) return
    const segment = el.scrollWidth / LOOP_COPIES
    if (segment <= 0) return
    el.scrollLeft = segment
  }, [items.length])

  React.useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el || items.length <= 1) return

    if (!useLoop) {
      const measure = () => {
        if (el.scrollWidth > el.clientWidth + 8) setUseLoop(true)
      }
      measure()
      requestAnimationFrame(measure)
      const ro = new ResizeObserver(measure)
      ro.observe(el)
      return () => ro.disconnect()
    }

    const run = () => {
      if (el.scrollWidth <= el.clientWidth + 8) return
      centerScroll()
    }

    run()
    requestAnimationFrame(run)

    const ro = new ResizeObserver(() => run())
    ro.observe(el)
    return () => ro.disconnect()
  }, [items, useLoop, centerScroll])

  const handleLoopScroll = React.useCallback(() => {
    if (isJumpingRef.current) return
    const el = scrollRef.current
    if (!el || !useLoop || items.length <= 1) return
    if (el.scrollWidth <= el.clientWidth + 8) return

    const segment = el.scrollWidth / LOOP_COPIES
    if (segment <= 0) return

    if (el.scrollLeft < EDGE_PAD_PX) {
      isJumpingRef.current = true
      el.scrollLeft += segment
      requestAnimationFrame(() => {
        isJumpingRef.current = false
      })
    } else if (el.scrollLeft > segment * 2 - EDGE_PAD_PX) {
      isJumpingRef.current = true
      el.scrollLeft -= segment
      requestAnimationFrame(() => {
        isJumpingRef.current = false
      })
    }
  }, [items.length, useLoop])

  const scrollStripLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_STEP_PX, behavior: 'smooth' })
  }

  const scrollStripRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_STEP_PX, behavior: 'smooth' })
  }

  const displayed = useLoop ? loopItems : items
  const showControls = items.length > 1

  return (
    <section className="space-y-3" data-aos="fade-up">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
          <div className="text-sm text-muted-foreground">{items.length} items</div>
        </div>
        {showControls ? (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={scrollStripLeft}
              className="h-9 w-9 bg-white/5 border-white/10 shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={scrollStripRight}
              className="h-9 w-9 bg-white/5 border-white/10 shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={useLoop ? handleLoopScroll : undefined}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayed.map((item, idx) => (
            <div
              key={useLoop ? `${item.id}-loop-${idx}` : item.id}
              className="w-[260px] shrink-0 snap-start sm:w-[280px]"
            >
              <ItemCard
                item={item}
                query={query}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                aosDelayMs={Math.min(items.length ? idx % items.length : idx, 6) * 80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
