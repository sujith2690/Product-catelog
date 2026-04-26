import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

import type { CatalogItem } from '../types/catalog'
import { CatalogImage } from './CatalogImage'
import { HighlightedText } from './HighlightedText'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { cn } from '../lib/utils'

type Props = {
  item: CatalogItem
  isFavorite: boolean
  onToggleFavorite: () => void
  query?: string
  aosDelayMs?: number
}

export function ItemCard({ item, isFavorite, onToggleFavorite, query = '', aosDelayMs }: Props) {
  return (
    <Card
      className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl"
      data-aos="zoom-in"
      {...(typeof aosDelayMs === 'number' ? { 'data-aos-delay': String(aosDelayMs) } : null)}
    >
      <CardContent className="p-0">
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="group relative"
        >
          <Link to={`/item/${item.itemSlug}`} className="block">
            <div className="relative aspect-[16/10] w-full bg-white/5">
              <CatalogImage
                src={item.image}
                alt={item.itemname}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            </div>
            <div className="space-y-1 p-4">
              <div className="line-clamp-1 text-sm font-semibold">
                <HighlightedText text={item.itemname} query={query} />
              </div>
              {item.itemprops.length > 0 ? (
                <div className="line-clamp-1 text-xs text-muted-foreground">
                  {item.itemprops
                    .slice(0, 2)
                    .map((p) => `${p.label}: ${p.value}`)
                    .join(' • ')}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">No details</div>
              )}
            </div>
          </Link>

          <Button
            type="button"
            size="icon"
            variant={isFavorite ? 'default' : 'outline'}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite()
            }}
            className={cn(
              'absolute right-3 top-3 shadow-sm',
              !isFavorite && 'bg-white/10 border-white/15 backdrop-blur',
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Favorited' : 'Favorite'}
          >
            <Heart className={cn(isFavorite && 'fill-current')} />
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

