import useInViewOnce from '../../../hooks/useInViewOnce'

const AboutUsHeroSection = ({ hero }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] items-center overflow-hidden bg-black text-white sm:min-h-[32rem] lg:min-h-[36rem]"
    >
      {hero.imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.imageUrl})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} w-fit bg-emerald-600 px-4 py-1 text-sm tracking-[0.6em] text-white`}
          style={{ '--anim-distance': '28px', '--anim-delay': '60ms' }}
        >
          {hero.eyebrow}
        </p>
        <h1
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-3 max-w-4xl text-3xl font-semibold sm:text-4xl lg:text-5xl`}
          style={{ '--anim-distance': '32px', '--anim-delay': '180ms' }}
        >
          {hero.title}
        </h1>
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 max-w-3xl text-2xl text-white/90`}
          style={{ '--anim-distance': '28px', '--anim-delay': '280ms' }}
        >
          {hero.subtitle}
        </p>
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 max-w-3xl text-base text-white/80 sm:text-lg`}
          style={{ '--anim-distance': '24px', '--anim-delay': '360ms' }}
        >
          {hero.description}
        </p>
      </div>
    </section>
  )
}

export default AboutUsHeroSection
