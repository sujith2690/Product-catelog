import * as React from 'react'
import { Heart, Search } from 'lucide-react'

import type { Category } from '../types/catalog'
import { useCatalogQueryParams } from '../hooks/useCatalogQueryParams'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { cn } from '../lib/utils'

type Props = {
  categories: Category[]
}

export function CatalogSearchBar({ categories }: Props) {
  const { state, setState, reset } = useCatalogQueryParams()
  const [draftQuery, setDraftQuery] = React.useState(state.query)
  const debouncedQuery = useDebouncedValue(draftQuery, 250)

  React.useEffect(() => {
    if (debouncedQuery === state.query) return
    setState({ query: debouncedQuery })
  }, [debouncedQuery, setState, state.query])

  const handleClear = React.useCallback(() => {
    reset()
    setDraftQuery('')
  }, [reset])

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl" data-aos="fade-up">
      <CardContent className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:flex-nowrap">
          <div className="relative w-full md:min-w-[320px] md:flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={draftQuery}
              onChange={(e) => setDraftQuery(e.target.value)}
              placeholder="Search cars, phones, bikes…"
              className="pl-11 bg-white/5 border-white/15 focus-visible:ring-fuchsia-400/40"
              aria-label="Search items"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-center w-full md:w-auto md:flex-nowrap">
            <div className="w-full sm:w-auto md:w-[220px] sm:flex-1 md:flex-none shrink-0">
              <Select value={state.category} onValueChange={(v) => setState({ category: v })}>
                <SelectTrigger aria-label="Filter by category" className="w-full">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.name} ({c.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <Button
                type="button"
                variant={state.favorites ? 'default' : 'outline'}
                size="icon"
                onClick={() => setState({ favorites: !state.favorites })}
                aria-label="Toggle favorites filter"
                title="Favorites"
                className={!state.favorites ? 'bg-white/5 border-white/10 shrink-0' : 'shrink-0'}
              >
                <Heart className={cn(state.favorites && 'fill-current')} />
              </Button>

              <Button type="button" variant="outline" onClick={handleClear} className="bg-white/5 border-white/10 shrink-0">
                Clear
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

