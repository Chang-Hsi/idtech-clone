import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AboutUsConnectInfoSection from '../../components/company/aboutus/AboutUsConnectInfoSection'
import AboutUsHeroSection from '../../components/company/aboutus/AboutUsHeroSection'
import AboutUsHighlightsSection from '../../components/company/aboutus/AboutUsHighlightsSection'
import AboutUsInnovationTimelineSection from '../../components/company/aboutus/AboutUsInnovationTimelineSection'
import AboutUsIntroSection from '../../components/company/aboutus/AboutUsIntroSection'
import {
  selectAboutUsPageContent,
  selectAboutUsPageStatus,
} from '../../features/catalog/catalogSelectors'
import { loadAboutUsPageFromApi } from '../../features/catalog/catalogSlice'

const AboutUsPage = () => {
  const dispatch = useDispatch()
  const aboutUsPage = useSelector(selectAboutUsPageContent)
  const aboutUsPageStatus = useSelector(selectAboutUsPageStatus)

  useEffect(() => {
    if (aboutUsPageStatus === 'loading' || aboutUsPageStatus === 'success') return
    dispatch(loadAboutUsPageFromApi())
  }, [aboutUsPageStatus, dispatch])

  return (
    <>
      <AboutUsHeroSection hero={aboutUsPage?.hero} />
      <AboutUsIntroSection intro={aboutUsPage?.intro} />
      <AboutUsHighlightsSection highlights={aboutUsPage?.highlights} />
      <AboutUsInnovationTimelineSection timeline={aboutUsPage?.innovationTimeline} />
      <AboutUsConnectInfoSection connectInfo={aboutUsPage?.connectInfo} />
    </>
  )
}

export default AboutUsPage
