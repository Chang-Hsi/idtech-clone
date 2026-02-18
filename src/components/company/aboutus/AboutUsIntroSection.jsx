import useInViewOnce from '../../../hooks/useInViewOnce'

const AboutUsIntroSection = ({ intro }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      {/* Who We Are 區塊 */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div
          className={`${isInView ? 'fade-right-in' : 'opacity-0'} overflow-hidden rounded-sm`}
          style={{ '--anim-distance': '26px', '--anim-delay': '80ms' }}
        >
          {intro.imageUrl ? (
            <img
              src={intro.imageUrl}
              alt={intro.title}
              className="aspect-[16/10] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#b8c0c7] text-sm text-black/55">
              Intro Image
            </div>
          )}
        </div>

        <div
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} self-center`}
          style={{ '--anim-distance': '26px', '--anim-delay': '150ms' }}
        >
          <h2 className="text-3xl font-semibold sm:text-4xl">{intro.title}</h2>
          {intro.paragraphs.map((paragraph, index) => (
            <p
              key={`${intro.title}-${index}`}
              className="mt-4 text-base leading-relaxed text-black/75 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUsIntroSection
