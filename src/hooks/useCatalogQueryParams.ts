import * as React from 'react'
import { useSearchParams } from 'react-router-dom'

export type CatalogQueryState = {
  query: string
  category: string
  favorites: boolean
}

const DEFAULTS: CatalogQueryState = {
  query: '',
  category: 'all',
  favorites: false,
}

export function useCatalogQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = React.useMemo<CatalogQueryState>(() => {
    const query = searchParams.get('q') ?? DEFAULTS.query
    const category = searchParams.get('category') ?? DEFAULTS.category
    const favorites = (searchParams.get('favorites') ?? '') === '1'

    return { query, category, favorites }
  }, [searchParams])

  const setState = React.useCallback(
    (next: Partial<CatalogQueryState>) => {
      const merged: CatalogQueryState = { ...state, ...next }

      const params = new URLSearchParams(searchParams)
      if (merged.query) params.set('q', merged.query)
      else params.delete('q')

      if (merged.category && merged.category !== 'all') params.set('category', merged.category)
      else params.delete('category')

      if (merged.favorites) params.set('favorites', '1')
      else params.delete('favorites')

      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams, state],
  )

  const reset = React.useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams])

  return { state, setState, reset }
}

