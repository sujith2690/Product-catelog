import * as React from 'react'

const STORAGE_KEY = 'catalog:recentlyViewed:v1'
const MAX = 10

function readInitial(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x) => typeof x === 'string')
  } catch {
    return []
  }
}

function write(next: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
}

export function useRecentlyViewed() {
  const [ids, setIds] = React.useState<string[]>(() => readInitial())

  const push = React.useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX)
      write(next)
      return next
    })
  }, [])

  return { ids, push }
}

