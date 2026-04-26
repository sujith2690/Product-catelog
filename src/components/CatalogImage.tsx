import * as React from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

export function CatalogImage({ src, alt, className, loading = 'lazy' }: Props) {
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setHasError(false)
  }, [src])

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        Image unavailable
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

