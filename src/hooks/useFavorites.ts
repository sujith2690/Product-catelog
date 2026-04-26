import * as React from 'react'

const STORAGE_KEY = 'catalog:favorites:v1'

function readInitial(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x) => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

function write(next: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
  } catch {
    // ignore
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = React.useState<Set<string>>(() => readInitial())

  const toggleFavorite = React.useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      write(next)
      return next
    })
  }, [])

  const isFavorite = React.useCallback((id: string) => favoriteIds.has(id), [favoriteIds])

  return { favoriteIds, toggleFavorite, isFavorite }
}

