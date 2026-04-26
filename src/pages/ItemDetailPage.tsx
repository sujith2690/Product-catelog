import * as React from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'

import type { CatalogContextValue } from '../app/catalogContext'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { CatalogImage } from '../components/CatalogImage'
import { EmptyState } from '../components/EmptyState'
import { CategorySection } from '../components/CategorySection'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { findItemByItemSlug, findItemBySlugs } from '../utils/catalogSelectors'
import { cn } from '../lib/utils'
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'

export default function ItemDetailPage() {
  const { items, toggleFavorite, isFavorite } = useOutletContext<CatalogContextValue>()
  const params = useParams()

  const itemSlug = params.itemSlug ?? ''
  const categorySlug = params.category ?? ''

  const item = React.useMemo(
    () => (categorySlug ? findItemBySlugs(items, categorySlug, itemSlug) : findItemByItemSlug(items, itemSlug)),
    [categorySlug, itemSlug, items],
  )

  const { push: pushRecent } = useRecentlyViewed()

  React.useEffect(() => {
    if (!item) return
    pushRecent(item.id)
  }, [item, pushRecent])

  if (!item) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Not found' }]} />
        <EmptyState
          title="Item not found"
          description="The item you’re looking for doesn’t exist (or the URL is invalid)."
          actionLabel="Back to home"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    )
  }

  const fav = isFavorite(item.id)
  const similar = React.useMemo(() => {
    return items.filter((x) => x.categorySlug === item.categorySlug && x.id !== item.id).slice(0, 8)
  }, [item.categorySlug, item.id, items])

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: item.category, to: `/?category=${encodeURIComponent(item.categorySlug)}` },
          { label: item.itemname },
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{item.itemname}</h1>
            <Badge variant="secondary">{item.category}</Badge>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to catalog
          </Link>
        </div>

        <Button
          type="button"
          variant={fav ? 'default' : 'outline'}
          onClick={() => toggleFavorite(item.id)}
          className="w-fit"
        >
          <Heart className={cn('mr-2', fav && 'fill-current')} />
          {fav ? 'Favorited' : 'Add to favorites'}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2" data-aos="fade-up">
        <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl" data-aos="fade-right">
          <CardContent className="p-0">
            <div className="aspect-[16/10] w-full bg-muted">
              <CatalogImage
                src={item.image}
                alt={item.itemname}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl" data-aos="fade-left">
          <CardContent className="p-5">
            <div className="mb-3 text-sm font-semibold">Details</div>
            {item.itemprops.length === 0 ? (
              <div className="text-sm text-muted-foreground">No properties available.</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {item.itemprops.map((p, idx) => (
                  <div
                    key={`${p.label}-${idx}`}
                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                    data-aos="flip-up"
                    data-aos-delay={String(Math.min(idx, 8) * 80)}
                  >
                    <div className="text-xs text-muted-foreground">{p.label}</div>
                    <div className="mt-1 text-sm font-semibold text-foreground">{p.value}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {similar.length > 0 ? (
        <CategorySection
          title="Similar items"
          items={similar}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      ) : null}
    </div>
  )
}

