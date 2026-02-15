import { Link } from 'react-router-dom'
import useInViewOnce from '../../../hooks/useInViewOnce'

const CollectionValuePropsSection = ({ collection, products = [] }) => {
  const { ref, isInView } = useInViewOnce()
  const displayProducts = products

  return (
    <section ref={ref} className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2
          className={`${isInView ? 'zoom-in-title' : 'opacity-0'} text-center text-3xl font-bold text-[#04a882] sm:text-4xl`}
          style={{ '--zoom-start': '0.26', '--zoom-duration': '900ms' }}
        >
          {collection.name} Products
        </h2>
        <div className="mx-auto mt-6 h-[2px] w-16 bg-white/70" />

        <div className="mt-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-12">
          {displayProducts.map((product, index) => {
            const destinationSlug = product.targetSlug ?? product.slug ?? null

            return (
              <Link
                key={product.slug ?? `${product.name}-${index}`}
                to={destinationSlug ? `/products/${destinationSlug}` : '#'}
                className={`${isInView ? 'fade-up-in' : 'opacity-0'} group flex w-[20rem] flex-col items-center text-center ${
                  destinationSlug ? '' : 'pointer-events-none cursor-default'
                }`}
                style={{
                  '--anim-distance': '4px',
                  '--anim-duration': '1050ms',
                  '--anim-delay': `${index * 220}ms`,
                }}
              >
              <div className="relative flex h-[14rem] w-[14rem] items-center justify-center overflow-hidden rounded-sm">
                {product.media?.heroImageUrl ? (
                  <img
                    src={product.media.heroImageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#b8c0c7] bg-[linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px)] bg-[size:18px_18px]" />
                )}
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white">{product.name}</h3>
              <p className="mt-3 text-sm text-white/80">{product.shortDescription}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CollectionValuePropsSection
