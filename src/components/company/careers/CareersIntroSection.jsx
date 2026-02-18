import useInViewOnce from '../../../hooks/useInViewOnce'

const CareersIntroSection = ({ intro }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} max-w-4xl`}
          style={{ '--anim-distance': '24px' }}
        >
          <h2 className="text-3xl font-semibold sm:text-4xl">{intro?.title}</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-black/65 sm:text-lg">
            {(intro?.paragraphs ?? []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {intro?.submitResumeEmail ? (
            <a
              href={`mailto:${intro.submitResumeEmail}`}
              className="mt-7 inline-flex rounded-sm bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#00B388]"
            >
              Submit Resume
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default CareersIntroSection
