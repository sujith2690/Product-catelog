import type { CatalogItem, Category } from '../types/catalog'

export type CatalogContextValue = {
  items: CatalogItem[]
  categories: Category[]
  favoriteIds: Set<string>
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

