import { useEffect, useRef, useState } from 'react'

const DEFAULT_ROOT_MARGIN = '0px 0px -10% 0px'

const parseBottomRootMargin = (rootMargin, viewportHeight) => {
  const parts = String(rootMargin).trim().split(/\s+/)
  const bottomPart = parts[2] ?? parts[0] ?? '0px'

  if (bottomPart.endsWith('%')) {
    const percent = Number.parseFloat(bottomPart)
    return Number.isNaN(percent) ? 0 : (viewportHeight * percent) / 100
  }

  const pixels = Number.parseFloat(bottomPart)
  return Number.isNaN(pixels) ? 0 : pixels
}

const useInViewOnce = ({ threshold = 0.2, root = null, rootMargin = DEFAULT_ROOT_MARGIN } = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (isInView || !ref.current) {
      return
    }

    // Fallback: if element is already within viewport (plus bottom rootMargin)
    // on first paint, trigger immediately without waiting for scroll.
    if (typeof window !== 'undefined' && !root) {
      const rect = ref.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const bottomMargin = parseBottomRootMargin(rootMargin, viewportHeight)
      const isInitiallyVisible =
        rect.top <= viewportHeight + bottomMargin && rect.bottom >= 0

      if (isInitiallyVisible) {
        const rafId = window.requestAnimationFrame(() => {
          setIsInView(true)
        })
        return () => {
          window.cancelAnimationFrame(rafId)
        }
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [isInView, threshold, root, rootMargin])

  return { ref, isInView }
}

export default useInViewOnce
