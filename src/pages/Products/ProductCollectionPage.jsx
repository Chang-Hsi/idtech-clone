import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectCollectionBySlug,
  selectProductsByCollection,
} from '../../features/catalog/catalogSelectors'

const ProductCollectionPage = () => {
  const { collectionSlug } = useParams()
  const collection = useSelector((state) => selectCollectionBySlug(state, collectionSlug))
  const products = useSelector((state) => selectProductsByCollection(state, collectionSlug))

  if (!collection) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold">Collection Not Found</h1>
          <Link to="/products" className="mt-4 inline-flex text-[#7DC242] hover:underline">
            Back to Products Hub
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#171A1F] py-12 text-white md:py-20">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6">
        <p className="text-sm tracking-[0.12em] text-[#7DC242]">COLLECTION</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{collection.heroTitle}</h1>
        <p className="mt-3 max-w-3xl text-white/75">{collection.heroSubtitle}</p>

        {collection.media?.heroImageUrl && (
          <img
            src={collection.media.heroImageUrl}
            alt={collection.name}
            className="mt-6 aspect-[21/8] w-full rounded-sm object-cover"
          />
        )}

        <p className="mt-6 max-w-4xl text-white/80">{collection.intro}</p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {collection.valueProps.map((value) => (
            <div key={value} className="rounded-sm border border-white/10 bg-[#232830] p-4 text-sm">
              {value}
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Featured Products</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="rounded-sm border border-white/10 bg-[#232830] p-4 hover:border-[#7DC242]/60"
            >
              <p className="text-lg font-medium">{product.name}</p>
              <p className="mt-2 text-sm text-white/70">{product.shortDescription}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Resources</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {collection.resources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.url}
              className="rounded-sm border border-white/30 px-4 py-2 text-sm hover:border-[#7DC242] hover:text-[#7DC242]"
            >
              {resource.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCollectionPage
