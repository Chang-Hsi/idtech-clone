import useInViewOnce from '../../hooks/useInViewOnce'

const ProductsHeroSection = ({ hero }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-black py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} text-xl font-semibold tracking-[0.5em] text-[#00B388]`}
          style={{ '--anim-distance': '30px', '--anim-duration': '650ms', '--anim-delay': '80ms' }}
        >
          {hero?.eyebrow ?? 'PRODUCTS'}
        </p>
        <h1
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-8 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl`}
          style={{ '--anim-distance': '36px', '--anim-duration': '700ms', '--anim-delay': '220ms' }}
        >
          {hero?.title ?? 'NEXA empowers payments in every type of business'}
        </h1>
        <div className="mt-10 h-[2px] w-24 bg-[#00B388]" />
        <p
          className={`${isInView ? 'fade-left-in' : 'opacity-0'} mt-8 max-w-3xl text-base text-white/80 sm:text-2xl`}
          style={{ '--anim-distance': '30px', '--anim-duration': '700ms', '--anim-delay': '360ms' }}
        >
          {hero?.description ?? "Explore NEXA's range of payment solutions for any payment situation."}
        </p>
      </div>
    </section>
  )
}

export default ProductsHeroSection
