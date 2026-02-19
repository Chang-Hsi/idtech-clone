import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CareersHeroSection from '../../components/company/careers/CareersHeroSection'
import CareersIntroSection from '../../components/company/careers/CareersIntroSection'
import CareersOpeningsSection from '../../components/company/careers/CareersOpeningsSection'
import {
  selectCareersPageContent,
  selectCareersPageStatus,
} from '../../features/catalog/catalogSelectors'
import { loadCareersPageFromApi } from '../../features/catalog/catalogSlice'

const CareersPage = () => {
  const dispatch = useDispatch()
  const careersPage = useSelector(selectCareersPageContent)
  const careersPageStatus = useSelector(selectCareersPageStatus)

  useEffect(() => {
    if (careersPageStatus === 'loading' || careersPageStatus === 'success') return
    dispatch(loadCareersPageFromApi())
  }, [careersPageStatus, dispatch])

  return (
    <>
      <CareersHeroSection hero={careersPage?.hero} />
      <CareersIntroSection intro={careersPage?.intro} />
      <CareersOpeningsSection tabs={careersPage?.tabs} jobs={careersPage?.jobs} />
    </>
  )
}

export default CareersPage
