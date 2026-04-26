export type RawItemProp = {
  label?: string
  key?: string
  value: string
}

export type RawCatalogItem = {
  itemname: string
  category: string
  image: string
  itemprops: RawItemProp[]
}

export type ItemProp = {
  label: string
  value: string
}

export type CatalogItem = {
  id: string
  itemname: string
  itemSlug: string
  category: string
  categorySlug: string
  image: string
  itemprops: ItemProp[]
}

export type Category = {
  name: string
  slug: string
  count: number
}

