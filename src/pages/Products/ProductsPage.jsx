import LeadFormSection from '../../components/home/LeadFormSection'
import ProductsCollectionsGridSection from '../../components/products/ProductsCollectionsGridSection'
import ProductsHeroSection from '../../components/products/ProductsHeroSection'
import useLoadProductsOnPage from '../../features/catalog/useLoadProductsOnPage'
import { useSelector } from 'react-redux'
import { selectProductsPageContent } from '../../features/catalog/catalogSelectors'

const ProductsPage = () => {
  useLoadProductsOnPage()
  const productsPage = useSelector(selectProductsPageContent)

  return (
    <>
      <ProductsHeroSection hero={productsPage?.hero} />
      <ProductsCollectionsGridSection />
      <LeadFormSection config={productsPage?.leadForm} />
    </>
  )
}

export default ProductsPage
