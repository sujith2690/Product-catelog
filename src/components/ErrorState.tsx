import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type Props = {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}: Props) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="space-y-1">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {onRetry ? (
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={onRetry} className="bg-white/5 border-white/10">
              Retry
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

