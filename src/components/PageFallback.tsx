import { Skeleton } from './ui/skeleton'

export function PageFallback() {
  return (
    <div className="space-y-6">
      {/* Hero skeleton */}
      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-7 backdrop-blur-xl sm:p-10">
        <div className="space-y-4">
          <Skeleton className="h-6 w-56 bg-slate-200/70 dark:bg-white/10" />
          <Skeleton className="h-10 w-[min(560px,90%)] bg-slate-200/70 dark:bg-white/10" />
          <Skeleton className="h-6 w-[min(640px,95%)] bg-slate-200/70 dark:bg-white/10" />
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Skeleton className="h-11 w-44 bg-slate-200/70 dark:bg-white/10" />
            <Skeleton className="h-5 w-40 bg-slate-200/70 dark:bg-white/10" />
          </div>
        </div>
      </div>

      {/* Search bar skeleton */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap sm:items-center">
          <Skeleton className="h-11 w-full bg-slate-200/70 dark:bg-white/10 sm:flex-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-11 w-[170px] bg-slate-200/70 dark:bg-white/10" />
            <Skeleton className="h-11 w-11 bg-slate-200/70 dark:bg-white/10" />
            <Skeleton className="h-11 w-24 bg-slate-200/70 dark:bg-white/10" />
          </div>
        </div>
      </div>

      {/* Category row skeletons */}
      {Array.from({ length: 2 }).map((_, rowIdx) => (
        <div key={rowIdx} className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 bg-slate-200/70 dark:bg-white/10" />
              <Skeleton className="h-4 w-28 bg-slate-200/70 dark:bg-white/10" />
            </div>
            <Skeleton className="h-11 w-28 bg-slate-200/70 dark:bg-white/10" />
          </div>
          <div className="flex gap-4 overflow-hidden pb-1">
            {Array.from({ length: 4 }).map((__, idx) => (
              <div
                key={idx}
                className="w-[260px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none bg-slate-200/70 dark:bg-white/10" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-5 w-3/4 bg-slate-200/70 dark:bg-white/10" />
                  <Skeleton className="h-4 w-5/6 bg-slate-200/70 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

