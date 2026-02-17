import useInViewOnce from '../../hooks/useInViewOnce'
import resourceBanner from '../../assets/resources/resourceBanner.jpg'

const ResourcesHeroSection = () => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24"
      style={{
        backgroundImage: `url(${resourceBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} text-xl font-semibold tracking-[0.5em] text-[#00B388]`}
          style={{ '--anim-distance': '30px', '--anim-duration': '650ms', '--anim-delay': '80ms' }}
        >
          RESOURCES
        </p>
        <h1
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-8 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl`}
          style={{ '--anim-distance': '36px', '--anim-duration': '700ms', '--anim-delay': '220ms' }}
        >
          Insights, Guides, and Technical Articles
        </h1>
        <div className="mt-10 h-[2px] w-24 bg-[#00B388]" />
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-8 max-w-3xl text-base text-white/80 sm:text-2xl`}
          style={{ '--anim-distance': '30px', '--anim-duration': '700ms', '--anim-delay': '360ms' }}
        >
          Explore implementation guidance and practical knowledge for payment product teams.
        </p>
      </div>
    </section>
  )
}

export default ResourcesHeroSection
