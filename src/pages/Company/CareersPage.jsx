import CareersHeroSection from '../../components/company/careers/CareersHeroSection'
import CareersIntroSection from '../../components/company/careers/CareersIntroSection'
import CareersOpeningsSection from '../../components/company/careers/CareersOpeningsSection'
import { careersPageContent } from '../../data/company/careers'

const CareersPage = () => {
  return (
    <>
      <CareersHeroSection hero={careersPageContent.hero} />
      <CareersIntroSection intro={careersPageContent.intro} />
      <CareersOpeningsSection tabs={careersPageContent.tabs} />
    </>
  )
}

export default CareersPage
