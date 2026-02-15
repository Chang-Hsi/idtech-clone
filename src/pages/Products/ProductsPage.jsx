import LeadFormSection from '../../components/home/LeadFormSection'
import ProductsCollectionsGridSection from '../../components/products/ProductsCollectionsGridSection'
import ProductsHeroSection from '../../components/products/ProductsHeroSection'
import { homeLeadForm } from '../../data/home/homeLeadForm'

const ProductsPage = () => {
  return (
    <>
      <ProductsHeroSection />
      <ProductsCollectionsGridSection />
      <LeadFormSection config={homeLeadForm} />
    </>
  )
}

export default ProductsPage
