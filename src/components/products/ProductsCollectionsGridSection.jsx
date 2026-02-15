import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useInViewOnce from '../../hooks/useInViewOnce'
import { selectAllCollections } from '../../features/catalog/catalogSelectors'

const ProductsCollectionsGridSection = () => {
  const collections = useSelector(selectAllCollections)
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              to={`/products/collections/${collection.slug}`}
              className={`${isInView ? 'zoom-in-title' : 'opacity-0'} group relative h-[320px] min-w-[360px] overflow-hidden rounded-sm border border-black/10`}
              style={{
                '--zoom-start': '0.86',
                '--zoom-duration': '620ms',
                animationDelay: `${index * 120}ms`,
              }}
            >
              {collection.media?.heroImageUrl ? (
                <img
                  src={collection.media.heroImageUrl}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-125"
                />
              ) : (
                <div className="h-full w-full bg-[#b8c0c7] bg-[linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px)] bg-[size:18px_18px]" />
              )}

              <div className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45" />
              <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
                <h3 className="text-3xl font-etrabold text-white">{collection.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsCollectionsGridSection
