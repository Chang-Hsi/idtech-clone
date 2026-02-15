import useInViewOnce from '../../../hooks/useInViewOnce'
import ProductSpecGroup from './ProductSpecGroup'

const ProductDetailSpecsSection = ({ title, imageUrl, imageAlt, specs = [], features = [] }) => {
  const { ref, isInView } = useInViewOnce()

  if (!specs.length && !features.length) return null

  return (
    <section ref={ref} className="bg-[#fff] py-12 text-black md:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div
          className={`${isInView ? 'fade-right-in' : 'opacity-0'} overflow-hidden rounded-sm`}
          style={{ '--anim-distance': '24px' }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#fff] text-sm text-black/60">
              Spec Image
            </div>
          )}
        </div>

        <div
          className={`${isInView ? 'fade-left-in' : 'opacity-0'}`}
          style={{ '--anim-distance': '24px', '--anim-delay': '120ms' }}
        >
          <h2 className="text-xl font-extrabold text-emerald-600 sm:text-3xl">{title}</h2>
          <div className="mt-6 grid gap-20 md:grid-cols-2">
            <div className="space-y-5">
              {specs.map((spec) => (
                <ProductSpecGroup key={spec.label} label={spec.label} value={spec.value} />
              ))}
            </div>

            <div>
              <h3 className="text-xl leading-4 font-semibold text-black/90">Key Features</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-black/55 sm:text-lg">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailSpecsSection
