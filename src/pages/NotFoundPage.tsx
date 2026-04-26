import { Link } from 'react-router-dom'

import { EmptyState } from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="space-y-4">
      <EmptyState
        title="Page not found"
        description="The page you requested doesn’t exist."
        actionLabel="Go home"
        onAction={() => (window.location.href = '/')}
      />
      <div className="text-sm text-muted-foreground">
        Or{' '}
        <Link to="/" className="underline hover:text-foreground">
          return to the catalog
        </Link>
        .
      </div>
    </div>
  )
}

