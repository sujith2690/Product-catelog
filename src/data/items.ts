import type { CatalogItem, ItemProp, RawCatalogItem, RawItemProp } from '../types/catalog'
import { slugify } from '../utils/slug'
import { rawData } from './rawData'

function normalizeProp(prop: RawItemProp): ItemProp | null {
  const label = (prop.label ?? prop.key ?? '').trim()
  const value = (prop.value ?? '').trim()
  if (!label || !value) return null
  return { label, value }
}

function normalizeItem(raw: RawCatalogItem, index: number): CatalogItem {
  const itemSlug = slugify(raw.itemname)
  const categorySlug = slugify(raw.category)

  // Stable enough for local catalogs; includes index to avoid collisions.
  const id = `${categorySlug}:${itemSlug}:${index}`

  return {
    id,
    itemname: raw.itemname,
    itemSlug,
    category: raw.category,
    categorySlug,
    image: raw.image,
    itemprops: raw.itemprops.map(normalizeProp).filter((p): p is ItemProp => Boolean(p)),
  }
}

export const items: CatalogItem[] = rawData.map(normalizeItem)

