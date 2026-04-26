import * as React from 'react'

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function HighlightedText({
  text,
  query,
}: {
  text: string
  query: string
}) {
  const q = query.trim()
  if (!q) return <>{text}</>

  const re = new RegExp(`(${escapeRegExp(q)})`, 'ig')
  const parts = text.split(re)

  return (
    <>
      {parts.map((part, idx) => {
        const match = part.toLowerCase() === q.toLowerCase()
        return match ? (
          <mark
            key={idx}
            className="rounded bg-fuchsia-400/20 px-1 text-foreground ring-1 ring-fuchsia-400/30"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      })}
    </>
  )
}

