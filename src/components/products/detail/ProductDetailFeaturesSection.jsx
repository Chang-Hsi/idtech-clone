import useInViewOnce from '../../../hooks/useInViewOnce'

const ProductDetailFeaturesSection = ({ features = [] }) => {
  const { ref, isInView } = useInViewOnce()

  if (!features.length) return null

  return (
    <section ref={ref} className="bg-[#171A1F] pb-12 text-white md:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className={`${isInView ? 'fade-up-in' : 'opacity-0'}`} style={{ '--anim-distance': '18px' }}>
          <h2 className="text-2xl font-semibold sm:text-3xl">Key Features</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-white/85">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailFeaturesSection
