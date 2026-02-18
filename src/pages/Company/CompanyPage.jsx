import CompanyGridSection from '../../components/company/CompanyGridSection'
import CompanyHeroSection from '../../components/company/CompanyHeroSection'
import { companyPageContent } from '../../data/company/company'

const CompanyPage = () => {
  return (
    <>
      <CompanyHeroSection hero={companyPageContent.hero} />
      <CompanyGridSection cards={companyPageContent.cards} />
    </>
  )
}

export default CompanyPage
