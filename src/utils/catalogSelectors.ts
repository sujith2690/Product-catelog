import type { CatalogItem, Category } from '../types/catalog'

export type CatalogFilters = {
  query: string
  categorySlug: string | 'all'
  favoritesOnly: boolean
}

export function getCategories(items: CatalogItem[]): Category[] {
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const item of items) {
    const existing = map.get(item.categorySlug)
    if (existing) existing.count += 1
    else map.set(item.categorySlug, { name: item.category, slug: item.categorySlug, count: 1 })
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function groupByCategory(items: CatalogItem[]) {
  const map = new Map<string, { name: string; slug: string; items: CatalogItem[] }>()
  for (const item of items) {
    const existing = map.get(item.categorySlug)
    if (existing) existing.items.push(item)
    else map.set(item.categorySlug, { name: item.category, slug: item.categorySlug, items: [item] })
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function filterItems(items: CatalogItem[], filters: CatalogFilters, favoriteIds: Set<string>) {
  const q = filters.query.trim().toLowerCase()
  return items.filter((item) => {
    if (filters.categorySlug !== 'all' && item.categorySlug !== filters.categorySlug) return false
    if (filters.favoritesOnly && !favoriteIds.has(item.id)) return false
    if (!q) return true
    return (
      item.itemname.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })
}

export function findItemBySlugs(items: CatalogItem[], categorySlug: string, itemSlug: string) {
  return items.find((i) => i.categorySlug === categorySlug && i.itemSlug === itemSlug) ?? null
}

export function findItemByItemSlug(items: CatalogItem[], itemSlug: string) {
  return items.find((i) => i.itemSlug === itemSlug) ?? null
}

