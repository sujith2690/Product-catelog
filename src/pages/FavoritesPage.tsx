import * as React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import type { CatalogContextValue } from '../app/catalogContext'
import { CategorySection } from '../components/CategorySection'
import { EmptyState } from '../components/EmptyState'
import { groupByCategory } from '../utils/catalogSelectors'

export default function FavoritesPage() {
  const { items, favoriteIds, toggleFavorite, isFavorite } =
    useOutletContext<CatalogContextValue>()
  const navigate = useNavigate()

  const favoriteItems = React.useMemo(
    () => items.filter((i) => favoriteIds.has(i.id)),
    [favoriteIds, items],
  )

  const grouped = React.useMemo(() => groupByCategory(favoriteItems), [favoriteItems])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Favorites</h1>
        <p className="text-sm text-muted-foreground">
          Items you bookmarked on this device.
        </p>
      </div>

      {favoriteItems.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Tap the heart icon on any item to save it here."
          actionLabel="Browse catalog"
          onAction={() => navigate('/')}
        />
      ) : (
        <div className="space-y-6">
          {grouped.map((cat) => (
            <CategorySection
              key={cat.slug}
              title={cat.name}
              items={cat.items}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

