import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LeadFormSection from '../../components/home/LeadFormSection'
import ProductDetailFullImageSection from '../../components/products/detail/ProductDetailFullImageSection'
import ProductDetailHeroSection from '../../components/products/detail/ProductDetailHeroSection'
import ProductDetailIntroSection from '../../components/products/detail/ProductDetailIntroSection'
import ProductDetailSpecsSection from '../../components/products/detail/ProductDetailSpecsSection'
import { homeLeadForm } from '../../data/home/homeLeadForm'
import {
  selectAllCollections,
  selectAllProducts,
  selectCollectionBySlug,
  selectProductBySlug,
} from '../../features/catalog/catalogSelectors'
import useLoadProductsOnPage from '../../features/catalog/useLoadProductsOnPage'

const ProductDetailPage = () => {
  const { productSlug } = useParams()
  useLoadProductsOnPage([productSlug])

  const product = useSelector((state) => selectProductBySlug(state, productSlug))
  const collectionAlias = useSelector((state) => selectCollectionBySlug(state, productSlug))
  const allProducts = useSelector(selectAllProducts)
  const allCollections = useSelector(selectAllCollections)
  const allProductSlugs = useMemo(() => allProducts.map((item) => item.slug), [allProducts])

  const aliasCollection = allCollections.find((collection) =>
    (collection.displayProducts ?? []).some((item) => item.slug === productSlug)
  )
  const aliasIndex =
    aliasCollection?.displayProducts?.findIndex((item) => item.slug === productSlug) ?? -1
  const aliasItem = aliasIndex >= 0 ? aliasCollection?.displayProducts?.[aliasIndex] : null
  const aliasCandidates = useMemo(
    () =>
      aliasItem
        ? [
            aliasItem.targetSlug,
            aliasItem.slug,
            aliasCollection?.featuredSlugs?.[aliasIndex],
            aliasCollection?.featuredSlugs?.[0],
          ].filter(Boolean)
        : [],
    [aliasCollection?.featuredSlugs, aliasIndex, aliasItem]
  )
  const validAliasCandidates = useMemo(
    () =>
      aliasCandidates.filter((candidateSlug) =>
        allProducts.some((productItem) => productItem.slug === candidateSlug)
      ),
    [aliasCandidates, allProducts]
  )
  const displayProductAliasTarget = validAliasCandidates[0] ?? null

  useEffect(() => {
    if (!import.meta.env.DEV) return

    console.groupCollapsed('[ProductDetail Debug]')
    console.log('routeSlug:', productSlug)
    console.log('productFound:', Boolean(product), product?.slug ?? null)
    console.log('collectionAliasFound:', Boolean(collectionAlias), collectionAlias?.slug ?? null)
    console.log('aliasCollection:', aliasCollection?.slug ?? null)
    console.log('aliasItem:', aliasItem)
    console.log('aliasCandidates:', aliasCandidates)
    console.log('validAliasCandidates:', validAliasCandidates)
    console.log('displayProductAliasTarget:', displayProductAliasTarget)
    console.log('allProductSlugs:', allProductSlugs)
    console.groupEnd()
  }, [
    aliasCandidates,
    aliasCollection?.slug,
    aliasItem,
    allProductSlugs,
    collectionAlias,
    displayProductAliasTarget,
    product,
    productSlug,
    validAliasCandidates,
  ])

  if (!product && displayProductAliasTarget) {
    return <Navigate to={`/products/${displayProductAliasTarget}`} replace />
  }

  if (!product && collectionAlias) {
    return <Navigate to={`/products/collections/${productSlug}`} replace />
  }

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

  const detail = product.detail ?? {}
  const hero = {
    title: product.name,
    subtitle: detail.heroSubtitle ?? product.tagline,
    description: detail.heroDescription ?? product.shortDescription,
    imageUrl: detail.heroImageUrl ?? product.media?.heroImageUrl ?? null,
    primaryCta: {
      label: detail.heroPrimaryCtaLabel ?? 'Download Datasheet',
      to: product.downloads?.datasheetUrl ?? '/resources/whitepapers',
    },
  }
  const intro = {
    paragraph: detail.introParagraph ?? product.shortDescription,
    bullets: detail.introBullets ?? product.bullets ?? [],
    imageUrl:
      detail.introImageUrl ?? product.media?.gallery?.[0] ?? product.media?.heroImageUrl ?? null,
    imageAlt: `${product.name} intro`,
  }
  const fullWidthImageUrl = detail.fullWidthImageUrl ?? product.media?.gallery?.[0] ?? null
  const specs = detail.specs ?? product.specs ?? []
  const specImageUrl = detail.specImageUrl ?? product.media?.heroImageUrl ?? null
  const features = detail.features ?? product.features ?? []

  return (
    <>
      <ProductDetailHeroSection hero={hero} />
      <ProductDetailIntroSection intro={intro} />
      <ProductDetailFullImageSection
        imageUrl={fullWidthImageUrl}
        imageAlt={`${product.name} visual`}
      />
      <ProductDetailSpecsSection
        title="Specifications"
        imageUrl={specImageUrl}
        imageAlt={`${product.name} specifications`}
        specs={specs.map((spec) => ({ label: spec.key, value: spec.value }))}
        features={features}
      />
      <LeadFormSection config={homeLeadForm} />
    </>
  )
}

export default ProductDetailPage
