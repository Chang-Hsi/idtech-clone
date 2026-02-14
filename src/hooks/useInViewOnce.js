import { useEffect, useRef, useState } from 'react'

const DEFAULT_ROOT_MARGIN = '0px 0px -10% 0px'

const useInViewOnce = ({ threshold = 0.2, root = null, rootMargin = DEFAULT_ROOT_MARGIN } = {}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (isInView || !ref.current) {
      return
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
