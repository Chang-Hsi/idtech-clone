import useInViewOnce from '../../../hooks/useInViewOnce'

const AboutUsHighlightsSection = ({ highlights = [] }) => {
  const { ref, isInView } = useInViewOnce()

  if (!highlights.length) return null

  return (
    <section ref={ref} className="bg-white pb-12 text-black md:pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 lg:grid-cols-2">
        {highlights.map((item, index) => (
          <article
            key={item.id}
            className={`${isInView ? 'fade-up-in' : 'opacity-0'} rounded-sm  bg-[#f8fafc] p-6`}
            style={{ '--anim-distance': '16px', '--anim-delay': `${index * 120}ms` }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-sm bg-white p-2">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.eyebrow}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full bg-[#b8c0c7]" />
                )}
              </div>
              <div className="flex flex-col items-center text-center">
                <p className="text-xs font-semibold tracking-[0.1em] text-[#00B388]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 px-10 text-2xl font-semibold leading-snug text-black/90">
                  {item.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutUsHighlightsSection
