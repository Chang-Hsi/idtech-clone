import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductBySlug, selectRelatedProducts } from '../../features/catalog/catalogSelectors'

const ProductDetailPage = () => {
  const { productSlug } = useParams()
  const product = useSelector((state) => selectProductBySlug(state, productSlug))
  const relatedProducts = useSelector((state) => selectRelatedProducts(state, productSlug))

  if (!product) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold">Product Not Found</h1>
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
        <p className="text-sm tracking-[0.12em] text-[#7DC242]">PRODUCT</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{product.name}</h1>
        <p className="mt-2 text-white/75">{product.tagline}</p>

        {product.media?.heroImageUrl && (
          <img
            src={product.media.heroImageUrl}
            alt={product.name}
            className="mt-6 aspect-[21/8] w-full rounded-sm object-cover"
          />
        )}

        <p className="mt-6 max-w-4xl text-white/80">{product.shortDescription}</p>

        <ul className="mt-5 list-disc space-y-2 pl-5 text-white/80">
          {product.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Downloads</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={product.downloads.datasheetUrl}
            className="rounded-sm border border-white/30 px-4 py-2 text-sm hover:border-[#7DC242] hover:text-[#7DC242]"
          >
            Datasheet
          </Link>
          <Link
            to={product.downloads.kbUrl}
            className="rounded-sm border border-white/30 px-4 py-2 text-sm hover:border-[#7DC242] hover:text-[#7DC242]"
          >
            Knowledge Base
          </Link>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Specs</h2>
        <div className="mt-4 overflow-hidden rounded-sm border border-white/10">
          {product.specs.map((spec) => (
            <div
              key={spec.key}
              className="grid grid-cols-1 border-b border-white/10 bg-[#232830] px-4 py-3 last:border-b-0 sm:grid-cols-[14rem_1fr]"
            >
              <p className="text-sm text-white/65">{spec.key}</p>
              <p className="text-sm text-white">{spec.value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Key Features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Related Products</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((related) => (
            <Link
              key={related.id}
              to={`/products/${related.slug}`}
              className="rounded-sm border border-white/10 bg-[#232830] p-4 hover:border-[#7DC242]/60"
            >
              <p className="text-lg font-medium">{related.name}</p>
              <p className="mt-2 text-sm text-white/70">{related.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
