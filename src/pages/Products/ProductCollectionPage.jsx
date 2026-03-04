import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LeadFormSection from '../../components/home/LeadFormSection'
import CollectionFeaturedProductsSection from '../../components/products/collection/CollectionFeaturedProductsSection'
import CollectionHeroSection from '../../components/products/collection/CollectionHeroSection'
import CollectionIntroSection from '../../components/products/collection/CollectionIntroSection'
import CollectionValuePropsSection from '../../components/products/collection/CollectionValuePropsSection'
import { homeLeadForm } from '../../data/home/homeLeadForm'
import {
  selectAllProducts,
  selectCollectionBySlug,
  selectCollectionDetailBySlug,
  selectCollectionDetailStatusBySlug,
  selectProductsByCollection,
} from '../../features/catalog/catalogSelectors'
import { loadProductCollectionBySlugFromApi } from '../../features/catalog/catalogSlice'
import useLoadProductsOnPage from '../../features/catalog/useLoadProductsOnPage'

const ProductCollectionPage = () => {
  const { collectionSlug } = useParams()
  const dispatch = useDispatch()
  useLoadProductsOnPage(collectionSlug)

  const collectionFromCatalog = useSelector((state) => selectCollectionBySlug(state, collectionSlug))
  const collectionFromApi = useSelector((state) => selectCollectionDetailBySlug(state, collectionSlug))
  const collectionDetailStatus = useSelector((state) =>
    selectCollectionDetailStatusBySlug(state, collectionSlug)
  )
  const allProducts = useSelector(selectAllProducts)
  const collectionProducts = useSelector((state) =>
    selectProductsByCollection(state, collectionSlug)
  )
  const collection = collectionFromApi ?? collectionFromCatalog

  useEffect(() => {
    if (!collectionSlug) return
    if (collectionDetailStatus === 'loading' || collectionDetailStatus === 'success') return
    dispatch(loadProductCollectionBySlugFromApi(collectionSlug))
  }, [collectionSlug, collectionDetailStatus, dispatch])

  if (!collection) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-semibold">Collection Not Found</h1>
        </div>
      </section>
    )
  }

  const featuredProducts = (collection.featuredSlugs ?? [])
    .map((slug) => allProducts.find((product) => product.slug === slug))
    .filter(Boolean)
  const displayProducts = (collection.displayProducts ?? []).map((item, index) => {
    const isValidSlug = (slug) => allProducts.some((product) => product.slug === slug)
    const firstValidFeaturedSlug =
      featuredProducts.find((product) => isValidSlug(product.slug))?.slug ?? null
    const featuredSlugAtIndex = featuredProducts[index]?.slug
    const fallbackSlug = isValidSlug(featuredSlugAtIndex)
      ? featuredSlugAtIndex
      : firstValidFeaturedSlug
    const preferredSlug = item.targetSlug ?? item.slug

    return {
      ...item,
      targetSlug: isValidSlug(preferredSlug) ? preferredSlug : fallbackSlug,
    }
  })
  const featuredProductsWithTarget = featuredProducts.map((product) => ({
    ...product,
    targetSlug: product.slug,
  }))
  const collectionProductsWithTarget = collectionProducts.slice(0, 6).map((product) => ({
    ...product,
    targetSlug: product.slug,
  }))

  const showcaseProducts = collection.displayProducts?.length
    ? displayProducts
    : featuredProductsWithTarget.length
      ? featuredProductsWithTarget
      : collectionProductsWithTarget

  return (
    <>
      <CollectionHeroSection collection={collection} />
      <CollectionIntroSection collection={collection} />
      <CollectionValuePropsSection collection={collection} products={showcaseProducts} />
      {collection.hasFeaturedProductsSection && (
        <CollectionFeaturedProductsSection collection={collection} products={featuredProducts} />
      )}
      <LeadFormSection config={homeLeadForm} />
    </>
  )
}

export default ProductCollectionPage
