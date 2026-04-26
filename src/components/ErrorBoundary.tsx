import * as React from 'react'

import { ErrorState } from './ErrorState'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
          <ErrorState
            title="App crashed"
            description="A rendering error occurred. Reload the page to recover."
            onRetry={() => window.location.reload()}
          />
        </div>
      )
    }

    return this.props.children
  }
}

