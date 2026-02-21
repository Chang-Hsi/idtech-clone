import { useEffect, useRef } from 'react'
import useInViewOnce from '../../../hooks/useInViewOnce'
import backgroundImage from '../../../assets/company/backgroundImage.jpg'

const AboutUsInnovationTimelineSection = ({ timeline }) => {
  const { ref, isInView } = useInViewOnce()
  const scrollRef = useRef(null)
  const items = timeline?.items ?? []
  const title = timeline?.title ?? ''

  useEffect(() => {
    if (!items.length) return

    const scroller = scrollRef.current
    if (!scroller) return

    const handleDesktopWheel = (event) => {
      if (window.innerWidth < 1024) return

      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth
      if (maxScrollLeft <= 0) return

      const primaryDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (!primaryDelta) return

      const atStart = scroller.scrollLeft <= 0
      const atEnd = scroller.scrollLeft >= maxScrollLeft - 1
      const movingToStart = primaryDelta < 0
      const movingToEnd = primaryDelta > 0
      const shouldBlockAndConsume = !(atStart && movingToStart) && !(atEnd && movingToEnd)

      if (!shouldBlockAndConsume) return

      event.preventDefault()
      event.stopPropagation()
      scroller.scrollLeft += primaryDelta * 1.2
    }

    scroller.addEventListener('wheel', handleDesktopWheel, { passive: false })

    return () => {
      scroller.removeEventListener('wheel', handleDesktopWheel)
    }
  }, [items.length])

  if (!items.length) return null

  return (
    <section ref={ref} className="overflow-hidden bg-[#fff] py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2
          className={`${isInView ? 'fade-up-in' : 'opacity-0'} text-center text-3xl font-semibold tracking-[0.18em] text-black`}
          style={{ '--anim-distance': '18px' }}
        >
          {title}
        </h2>
      </div>

      <div
        className="relative mt-10 hidden lg:block py-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,24,39,0.08)_1px,transparent_1px)] bg-[size:10px_10px] opacity-50" />
        <div ref={scrollRef} className="overflow-x-auto px-6 pb-4">
          <div className="relative mx-auto w-max min-w-[156rem] px-8 py-10">
            <div className="absolute left-0 right-0 top-1/2 h-[10px] -translate-y-1/2 bg-[#d0d0d0]" />

            <div className="relative flex items-center gap-2">
              {items.map((item, index) => {
                const isTop = index % 2 === 0

                return (
                  <article
                    key={`${item.year}-${item.title}`}
                    className={`${isInView ? 'fade-up-in' : 'opacity-0'} relative h-[28rem] w-[15rem] shrink-0`}
                    style={{ '--anim-distance': '14px', '--anim-delay': `${index * 90 + 120}ms` }}
                  >
                    <div className="absolute left-1/2 top-1/2 z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#f4f6f8] bg-[#24b07a]" />

                    {isTop ? (
                      <>
                        <div className="absolute left-1/2 top-[8%] z-20 h-[33%] w-[4px] -translate-x-1/2 bg-[#24b07a]" />
                        <div className="absolute left-1/2 top-[6%] z-20 h-5 w-5 -translate-x-1/2 rounded-full bg-[#24b07a]" />
                        <div
                          className="absolute left-1/2 top-[2%] w-[14.5rem] text-left text-[#24b07a]"
                          style={{ transform: 'translateX(30px)' }}
                        >
                          <p className="text-6xl font-bold leading-none">{item.year}</p>
                          <h3 className="mt-2 text-[1.5rem] font-semibold leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute left-1/2 top-1/2 z-20 h-[33%] w-[4px] -translate-x-1/2 bg-[#24b07a]" />
                        <div className="absolute left-1/2 top-[84%] z-20 h-5 w-5 -translate-x-1/2 rounded-full bg-[#24b07a]" />
                        <div
                          className="absolute left-1/2 top-[58%] w-[14.5rem] text-left text-[#24b07a]"
                          style={{ transform: 'translateX(30px)' }}
                        >
                          <p className="text-6xl font-bold leading-none">{item.year}</p>
                          <h3 className="mt-2 text-[1.5rem] font-semibold leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 px-4 sm:px-6 lg:hidden">
        {items.map((item, index) => (
          <article
            key={`${item.year}-${item.title}`}
            className={`${isInView ? 'fade-up-in' : 'opacity-0'} rounded-sm border border-black/10 bg-white p-4`}
            style={{ '--anim-distance': '12px', '--anim-delay': `${index * 120 + 120}ms` }}
          >
            <p className="text-xs font-semibold tracking-[0.08em] text-[#00B388]">{item.year}</p>
            <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-black/70">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutUsInnovationTimelineSection
