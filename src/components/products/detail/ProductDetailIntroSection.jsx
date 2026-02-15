import useInViewOnce from '../../../hooks/useInViewOnce'

const ProductDetailIntroSection = ({ intro }) => {
  const { ref, isInView } = useInViewOnce()

  if (!intro.paragraph && !intro.bullets?.length && !intro.imageUrl) {
    return null
  }

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto my-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div
          className={`${isInView ? 'fade-right-in' : 'opacity-0'} pt-12`}
          style={{ '--anim-distance': '24px' }}
        >
          {intro.paragraph ? (
            <p className="text-xl leading-7 text-black/80 sm:text-3xl">{intro.paragraph}</p>
          ) : null}
          {intro.bullets?.length ? (
            <ul className="mt-12 list-disc space-y-2 pl-5 text-base text-black/55 sm:text-lg">
              {intro.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} relative min-h-[24rem]`}
          style={{ '--anim-distance': '24px', '--anim-delay': '120ms' }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-[-4%] top-[16%] h-16 w-[100vw] bg-[#0f0f10] sm:h-20"
              style={{ clipPath: 'polygon(3.5% 0, 100% 0, 90% 100%, 0 100%)' }}
            />
            <div
              className="absolute left-[-6%] top-[42%] h-16 w-[100vw] bg-[#00B388] sm:h-20"
              style={{ clipPath: 'polygon(3.5% 0, 100% 0, 90% 100%, 0 100%)' }}
            />
            <div
              className="absolute left-[-8%] top-[68%] h-16 w-[100vw] bg-[#0f0f10] sm:h-20"
              style={{ clipPath: 'polygon(3.5% 0, 100% 0, 90% 100%, 0 100%)' }}
            />
          </div>

          <div className="relative z-10 mx-auto w-[60%] sm:w-[54%]">
            {intro.imageUrl ? (
              <img
                src={intro.imageUrl}
                alt={intro.imageAlt}
                className="aspect-[4/5] h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-sm bg-[#d9dee3] text-sm text-black/55">
                Intro Image
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailIntroSection
