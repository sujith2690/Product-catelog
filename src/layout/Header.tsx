import { Link } from 'react-router-dom'
import { Heart, Moon, Sun } from 'lucide-react'

import { BrandMark, BrandName } from '../components/Brand'
import { useTheme } from '../hooks/useTheme'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'

export function Header() {
  const { mode, toggle } = useTheme()
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-background/35 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-white/5 ring-1 ring-white/10 backdrop-blur">
            <BrandMark className="size-10" />
          </div>
          <div className="min-w-0">
            <BrandName />
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="icon"
            asChild
            aria-label="Go to favorites"
            title="Favorites"
            className="bg-white/5 border-white/10"
          >
            <Link to="/favorites">
              <Heart className={cn('')} />
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
            title={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}
            className="bg-white/5 border-white/10"
          >
            {mode === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  )
}

