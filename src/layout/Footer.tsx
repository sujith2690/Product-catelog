import { GitBranch, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandMark } from '../components/Brand'
import { Separator } from '../components/ui/separator'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-10 border-t border-white/10 bg-background/20 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <BrandMark className="size-9 shrink-0" />
            <div>
              <div className="text-base font-semibold tracking-tight text-foreground">OmniCatalog</div>
              <div className="mt-1 text-sm text-muted-foreground">
              A modern, responsive web application designed to deliver a seamless browsing experience with intuitive navigation and smooth interactions.
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-base font-semibold text-foreground">Experience</div>
            <ul className="space-y-1 text-base text-muted-foreground">
              <li className="inline-flex items-center gap-2">
                <Zap className="size-4 text-cyan-300" /> Instant search + filters
              </li>
              {/* <li className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-fuchsia-300" /> Error boundaries + skeletons
              </li> */}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-base font-semibold text-foreground">Links</div>
            <div className="flex flex-wrap gap-3 text-base">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                React
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Tailwind
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <GitBranch className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} OmniCatalog. All rights reserved.</div>
          <div className="opacity-80">Built using modern technologies</div>
        </div>
      </div>
    </footer>
  )
}

