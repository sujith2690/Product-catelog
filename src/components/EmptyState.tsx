import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type Props = {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="space-y-1">
          <div className="text-base font-semibold">{title}</div>
          {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
        </div>
        {actionLabel && onAction ? (
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={onAction} className="bg-white/5 border-white/10">
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

