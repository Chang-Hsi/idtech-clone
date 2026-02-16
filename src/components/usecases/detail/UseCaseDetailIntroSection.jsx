import useInViewOnce from '../../../hooks/useInViewOnce'

const UseCaseDetailIntroSection = ({ rows = [] }) => {
  const { ref, isInView } = useInViewOnce()

  if (!rows.length) return null

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl space-y-12 px-4 sm:px-6">
        {rows.map((row, index) => {
          const isImageLeft = index % 2 === 0
          const rowAnimation = index % 2 === 0 ? 'fade-left-in' : 'fade-right-in'

          return (
            <div
              key={row.id}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`${isInView ? rowAnimation : 'opacity-0'} ${
                  isImageLeft ? 'lg:order-1' : 'lg:order-2'
                } overflow-hidden rounded-sm`}
                style={{ '--anim-distance': '222px', '--anim-delay': `${index * 900}ms` }}
              >
                {row.imageUrl ? (
                  <img
                    src={row.imageUrl}
                    alt={row.title}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#d9dee3] text-sm text-black/55">
                    Intro Image
                  </div>
                )}
              </div>

              <div
                className={`${isInView ? rowAnimation : 'opacity-0'} ${
                  isImageLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
                style={{ '--anim-distance': '222px', '--anim-delay': `${index * 900 + 30}ms` }}
              >
                <h2 className="text-2xl font-semibold sm:text-3xl">{row.title}</h2>
                <p className="mt-4 text-base leading-7 text-black/75 sm:text-lg">
                  {row.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default UseCaseDetailIntroSection
