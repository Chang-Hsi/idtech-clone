import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useInViewOnce from '../../../hooks/useInViewOnce'

const CollectionFeaturedProductsSection = ({ collection, products }) => {
  const { ref, isInView } = useInViewOnce()
  const exploreDescChars = useMemo(
    () => Array.from(collection?.exploreDesc ?? ''),
    [collection?.exploreDesc]
  )

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <p className="text-xl font-extrabold tracking-[0.12em] text-[#00B388]">FEATURED PRODUCTS</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-3xl">Explore Products</h2>
        {collection?.exploreDesc ? (
          <p
            className="mt-4 max-w-5xl text-lg leading-7 text-black/75 sm:text-lg"
            aria-label={collection.exploreDesc}
          >
            <span aria-hidden="true">
              {exploreDescChars.map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="inline-block transition-all duration-300"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(4px)',
                    transitionDelay: `${index * 10}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </p>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="group overflow-hidden rounded-sm border border-black/10 bg-[#F4F6F8] transition-colors hover:border-[#00B388]/70"
            >
              {product.media?.heroImageUrl ? (
                <div className="overflow-hidden">
                  <img
                    src={product.media.heroImageUrl}
                    alt={product.name}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#d9dee3] text-sm text-black/55">
                  Product Image
                </div>
              )}

              <div className="p-4">
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                <p className="mt-2 text-lg text-black/70">{product.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CollectionFeaturedProductsSection
