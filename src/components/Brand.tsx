import { cn } from '../lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn('size-9', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g1" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22D3EE" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#A78BFA" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F472B6" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="g2" x1="16" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" stopOpacity="0.25" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="44" height="44" rx="14" fill="url(#g2)" />
      <rect x="10" y="10" width="44" height="44" rx="14" stroke="url(#g1)" strokeWidth="2" />
      <path
        d="M22 34.5c0-7.5 5.5-13.5 13-13.5 5.8 0 10.7 3.7 12.3 8.9"
        stroke="url(#g1)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M42 29.5l5.2.5-3.2 4.1"
        stroke="url(#g1)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.7 39.4C25 44.1 29.9 47 35.2 47c6.4 0 11.9-4.2 13.6-10.1"
        stroke="url(#g1)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BrandName() {
  return (
    <div className="leading-tight">
      <div className="text-base font-semibold tracking-tight text-foreground">
        OmniCatalog
      </div>
      <div className="text-sm text-muted-foreground">Dynamic product showcase</div>
    </div>
  )
}

