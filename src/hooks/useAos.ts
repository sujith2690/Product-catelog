import * as React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function useAos() {
  React.useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
      easing: 'ease-in-out',
      disable: () =>
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    })
  }, [])
}

