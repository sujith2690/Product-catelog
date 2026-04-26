import * as React from 'react'
import { Outlet } from 'react-router-dom'

import { items } from '../data/items'
import { getCategories } from '../utils/catalogSelectors'
import { useFavorites } from '../hooks/useFavorites'
import { useAos } from '../hooks/useAos'
import { Header } from './Header'
import { Footer } from './Footer'
import type { CatalogContextValue } from '../app/catalogContext'

export function AppLayout() {
  const categories = React.useMemo(() => getCategories(items), [])
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  useAos()

  const ctx = React.useMemo<CatalogContextValue>(
    () => ({ items, categories, favoriteIds, toggleFavorite, isFavorite }),
    [categories, favoriteIds, isFavorite, toggleFavorite],
  )

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
        <div className="absolute -left-24 top-24 size-[380px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <Header />
      <main className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
        <Outlet context={ctx satisfies CatalogContextValue} />
      </main>
      <Footer />
    </div>
  )
}

