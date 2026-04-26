import { ArrowRight, Sparkles } from 'lucide-react'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type Props = {
  itemCount: number
  categoryCount: number
  onExplore: () => void
}

export function HeroBanner({ itemCount, categoryCount, onExplore }: Props) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl" data-aos="fade-up">
      <CardContent className="relative p-7 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 size-[260px] rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -right-28 -top-16 size-[320px] rounded-full bg-indigo-500/15 blur-3xl" />
        </div>

        <div className="relative grid gap-6 lg:grid-cols-5 lg:items-center">
          <div className="space-y-3 lg:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-4 text-fuchsia-300" />
              Futuristic multi‑category catalog
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Browse products like a premium showcase.
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Explore our curated collection of high-performance vehicles, cutting-edge electronics, and premium mobile devices, styled with sleek dark glassmorphism.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                type="button"
                onClick={onExplore}
                className="w-fit bg-white/10 text-foreground hover:bg-white/15"
              >
                Explore catalog <ArrowRight className="ml-2 size-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                {itemCount} items • {categoryCount} categories
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-muted-foreground">Search</div>
              <div className="mt-1 text-sm font-semibold text-foreground">Name + category</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-muted-foreground">Favorites</div>
              <div className="mt-1 text-sm font-semibold text-foreground">Local saved items</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-muted-foreground">Detail</div>
              <div className="mt-1 text-sm font-semibold text-foreground">Dynamic props grid</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

