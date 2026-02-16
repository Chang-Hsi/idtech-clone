import useInViewOnce from '../../../hooks/useInViewOnce'

const UseCaseDetailHeroSection = ({ useCase }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] items-center overflow-hidden bg-black text-white sm:min-h-[32rem] lg:min-h-[36rem]"
    >
      {useCase.heroImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${useCase.heroImageUrl})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} text-sm  tracking-[0.6em] text-[#fff] bg-emerald-600 w-fit px-4 py-1`}
          style={{ '--anim-distance': '28px', '--anim-delay': '60ms' }}
        >
          USE CASE
        </p>
        <h1
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-3 max-w-4xl text-3xl font-semibold sm:text-4xl lg:text-5xl`}
          style={{ '--anim-distance': '32px', '--anim-delay': '180ms' }}
        >
          {useCase.title}
        </h1>
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 max-w-3xl text-2xl text-white/90`}
          style={{ '--anim-distance': '28px', '--anim-delay': '280ms' }}
        >
          {useCase.subtitle}
        </p>
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 max-w-3xl text-base text-white/80 sm:text-lg`}
          style={{ '--anim-distance': '24px', '--anim-delay': '360ms' }}
        >
          {useCase.description}
        </p>
      </div>
    </section>
  )
}

export default UseCaseDetailHeroSection
