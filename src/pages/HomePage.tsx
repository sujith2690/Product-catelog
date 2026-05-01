import * as React from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'

import type { CatalogContextValue } from '../app/catalogContext'
import { CatalogSearchBar } from '../components/CatalogSearchBar'
import { CategorySection } from '../components/CategorySection'
import { EmptyState } from '../components/EmptyState'
import { HeroBanner } from '../components/HeroBanner'
import { Pagination } from '../components/Pagination'
import { Button } from '../components/ui/button'
import { filterItems, groupByCategory } from '../utils/catalogSelectors'
import { useCatalogQueryParams } from '../hooks/useCatalogQueryParams'

const PAGE_SIZE = 12

export default function HomePage() {
  const { items, categories, favoriteIds, toggleFavorite, isFavorite } =
    useOutletContext<CatalogContextValue>()
  const { state, reset } = useCatalogQueryParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const filtered = React.useMemo(() => {
    return filterItems(
      items,
      { query: state.query, categorySlug: state.category as 'all' | string, favoritesOnly: state.favorites },
      favoriteIds,
    )
  }, [favoriteIds, items, state.category, state.favorites, state.query])

  const hasActiveFilters = Boolean(state.query || state.category !== 'all' || state.favorites)

  const page = Math.max(1, Number(searchParams.get('page') ?? '1') || 1)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageParam = searchParams.get('page')

  React.useEffect(() => {
    if (!hasActiveFilters && pageParam) {
      const next = new URLSearchParams(searchParams)
      next.delete('page')
      setSearchParams(next, { replace: true })
      return
    }

    if (safePage !== page) {
      const next = new URLSearchParams(searchParams)
      if (safePage <= 1) next.delete('page')
      else next.set('page', String(safePage))
      setSearchParams(next, { replace: true })
    }
  }, [hasActiveFilters, page, pageParam, safePage, searchParams, setSearchParams])

  const pagedItems = hasActiveFilters
    ? filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
    : filtered

  const grouped = React.useMemo(() => groupByCategory(items), [items])
  const groupedPagedItems = React.useMemo(() => groupByCategory(pagedItems), [pagedItems])

  return (
    <div className="space-y-6">
      <HeroBanner
        itemCount={items.length}
        categoryCount={grouped.length}
        onExplore={() => {
          const el = document.getElementById('category-sections')
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      />

      <CatalogSearchBar categories={categories} />

      <div id="category-sections" className="space-y-6">
        {hasActiveFilters ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Results</h2>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filtered.length}</span> item(s)
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={reset}
                className="w-fit bg-white/5 border-white/10"
              >
                Reset filters
              </Button>
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                title="No matches"
                description="Try a different search term or clear filters."
                actionLabel="Clear filters"
                onAction={reset}
              />
            ) : (
              <>
                <div className="space-y-6">
                  {groupedPagedItems.map((cat) => (
                    <CategorySection
                      key={`${cat.slug}-${cat.items.map((i) => i.id).join('|')}`}
                      title={cat.name}
                      items={cat.items}
                      query={state.query}
                      isFavorite={isFavorite}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
                <Pagination
                  page={safePage}
                  pageCount={pageCount}
                  onPageChange={(nextPage) => {
                    const next = new URLSearchParams(searchParams)
                    if (nextPage <= 1) next.delete('page')
                    else next.set('page', String(nextPage))
                    setSearchParams(next, { replace: true })
                  }}
                />
              </>
            )}
          </div>
        ) : (
          grouped.map((cat) => (
            <CategorySection
              key={`${cat.slug}-${cat.items.map((i) => i.id).join('|')}`}
              title={cat.name}
              items={cat.items}
              query={state.query}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  )
}

