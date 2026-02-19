import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LeadFormSection from '../../components/home/LeadFormSection'
import UseCaseDetailFeaturedProductsSection from '../../components/usecases/detail/UseCaseDetailFeaturedProductsSection'
import UseCaseDetailHeroSection from '../../components/usecases/detail/UseCaseDetailHeroSection'
import UseCaseDetailIntroSection from '../../components/usecases/detail/UseCaseDetailIntroSection'
import { homeLeadForm } from '../../data/home/homeLeadForm'
import {
  selectAllProducts,
  selectUseCaseDetailBySlug,
  selectUseCaseDetailStatusBySlug,
} from '../../features/catalog/catalogSelectors'
import { loadUseCaseDetailBySlugFromApi } from '../../features/catalog/catalogSlice'
import useLoadProductsOnPage from '../../features/catalog/useLoadProductsOnPage'

const UseCasesDetailPage = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  useLoadProductsOnPage([slug])

  const allProducts = useSelector(selectAllProducts)
  const useCase = useSelector((state) => selectUseCaseDetailBySlug(state, slug))
  const useCaseStatus = useSelector((state) => selectUseCaseDetailStatusBySlug(state, slug))

  useEffect(() => {
    if (!slug) return
    if (useCaseStatus === 'loading' || useCaseStatus === 'success') return
    dispatch(loadUseCaseDetailBySlugFromApi(slug))
  }, [dispatch, slug, useCaseStatus])

  if (!useCase) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold">Use Case Not Found</h1>
          <Link to="/use-cases" className="mt-4 inline-flex text-[#7DC242] hover:underline">
            Back to Use Cases
          </Link>
        </div>
      </section>
    )
  }

  const featuredProductsByUseCase = allProducts.filter((product) =>
    (product.useCases ?? []).includes(useCase.slug)
  )
  const featuredProductsBySlug = (useCase.featuredProductSlugs ?? [])
    .map((productSlug) => allProducts.find((product) => product.slug === productSlug))
    .filter(Boolean)
  const featuredProducts = featuredProductsByUseCase.length
    ? featuredProductsByUseCase
    : featuredProductsBySlug

  return (
    <>
      <UseCaseDetailHeroSection useCase={useCase} />
      <UseCaseDetailIntroSection rows={useCase.introRows} />
      <UseCaseDetailFeaturedProductsSection products={featuredProducts} />
      <LeadFormSection config={homeLeadForm} />
    </>
  )
}

export default UseCasesDetailPage
