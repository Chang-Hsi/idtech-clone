import { Link } from 'react-router-dom'
import useInViewOnce from '../../../hooks/useInViewOnce'

const ProductDetailHeroSection = ({ hero }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section
      ref={ref}
      className="relative flex min-h-[28rem] items-center overflow-hidden bg-black text-white sm:min-h-[22rem] lg:min-h-[26rem]"
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
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} text-lg font-semibold tracking-[0.14em] text-[#7DC242]`}
          style={{ '--anim-distance': '28px', '--anim-delay': '40ms' }}
        >
          PRODUCT
        </p>
        <h1
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-3 max-w-4xl text-3xl font-semibold sm:text-4xl lg:text-5xl`}
          style={{ '--anim-distance': '36px', '--anim-delay': '120ms' }}
        >
          {hero.title}
        </h1>
        {hero.subtitle ? (
          <p
            className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-3 max-w-3xl text-lg font-semibold text-white/90`}
            style={{ '--anim-distance': '30px', '--anim-delay': '220ms' }}
          >
            {hero.subtitle}
          </p>
        ) : null}
        {hero.description ? (
          <p
            className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-4 max-w-3xl text-base font-semibold text-white/80 sm:text-lg`}
            style={{ '--anim-distance': '28px', '--anim-delay': '300ms' }}
          >
            {hero.description}
          </p>
        ) : null}

        {hero.primaryCta ? (
          <div
            className={`${isInView ? 'fade-up-in' : 'opacity-0'} mt-8`}
            style={{ '--anim-delay': '380ms' }}
          >
            <Link
              to={hero.primaryCta.to}
              className="inline-flex rounded-sm border border-white/35 px-5 py-3 text-sm font-medium hover:border-[#7DC242] hover:text-[#7DC242]"
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProductDetailHeroSection
