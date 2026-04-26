import * as React from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'catalog:theme:v1'

function getSystemPrefersDark() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const shouldDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark())
  root.classList.toggle('dark', shouldDark)
}

function readInitial(): ThemeMode {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return 'dark'
}

export function useTheme() {
  const [mode, setMode] = React.useState<ThemeMode>(() => readInitial())

  React.useEffect(() => {
    applyTheme(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore
    }
  }, [mode])

  React.useEffect(() => {
    if (mode !== 'system') return
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!media) return
    const onChange = () => applyTheme('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  const toggle = React.useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { mode, setMode, toggle }
}

