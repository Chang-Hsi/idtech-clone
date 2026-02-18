import AboutUsConnectInfoSection from '../../components/company/aboutus/AboutUsConnectInfoSection'
import AboutUsHeroSection from '../../components/company/aboutus/AboutUsHeroSection'
import AboutUsHighlightsSection from '../../components/company/aboutus/AboutUsHighlightsSection'
import AboutUsInnovationTimelineSection from '../../components/company/aboutus/AboutUsInnovationTimelineSection'
import AboutUsIntroSection from '../../components/company/aboutus/AboutUsIntroSection'
import { aboutUsPageContent } from '../../data/company/aboutUs'

const AboutUsPage = () => {
  return (
    <>
      <AboutUsHeroSection hero={aboutUsPageContent.hero} />
      <AboutUsIntroSection intro={aboutUsPageContent.intro} />
      <AboutUsHighlightsSection highlights={aboutUsPageContent.highlights} />
      <AboutUsInnovationTimelineSection timeline={aboutUsPageContent.innovationTimeline} />
      <AboutUsConnectInfoSection connectInfo={aboutUsPageContent.connectInfo} />
    </>
  )
}

export default AboutUsPage
