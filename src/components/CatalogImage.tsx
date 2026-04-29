import * as React from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}

export function CatalogImage({ src, alt, className, loading = 'lazy' }: Props) {
  const [errorSrc, setErrorSrc] = React.useState<string | null>(null)
  const hasError = errorSrc === src

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
      onError={() => setErrorSrc(src)}
    />
  )
}

