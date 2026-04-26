import { Button } from './ui/button'

type Props = {
  page: number
  pageCount: number
  onPageChange: (next: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: Props) {
  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{' '}
        <span className="font-medium text-foreground">{pageCount}</span>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
      >
        Next
      </Button>
    </div>
  )
}

