import { Link } from 'react-router-dom'
import useInViewOnce from '../../../hooks/useInViewOnce'

const UseCaseDetailFeaturedProductsSection = ({ products = [] }) => {
  const { ref, isInView } = useInViewOnce()

  if (!products.length) return null

  return (
    <section ref={ref} className="bg-white py-12 text-black md:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2
          className={`${isInView ? 'fade-up-in' : 'opacity-0'} text-2xl font-semibold sm:text-3xl`}
          style={{ '--anim-distance': '18px' }}
        >
          Featured Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className={`${isInView ? 'fade-up-in' : 'opacity-0'} group bg-[#fff] p-5 transition-colors hover:bg-slate-50`}
              style={{ '--anim-distance': '14px', '--anim-delay': `${index * 120}ms` }}
            >
              <div className="mb-4 overflow-hidden rounded-sm">
                {product.media?.heroImageUrl ? (
                  <img
                    src={product.media.heroImageUrl}
                    alt={product.name}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#fff] text-sm text-black/55">
                    Product Image
                  </div>
                )}
              </div>
              <h3 className="text-lg text-center font-semibold tracking-[0.05rem] text-emerald-600">
                {product.name}
              </h3>
              <p className="mt-2 text-sm tracking-[0.03rem] text-black/65">
                {product.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCaseDetailFeaturedProductsSection
