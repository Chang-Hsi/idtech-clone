import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CompanyGridSection from '../../components/company/CompanyGridSection'
import CompanyHeroSection from '../../components/company/CompanyHeroSection'
import {
  selectCompanyPageContent,
  selectCompanyPageStatus,
} from '../../features/catalog/catalogSelectors'
import { loadCompanyPageFromApi } from '../../features/catalog/catalogSlice'

const CompanyPage = () => {
  const dispatch = useDispatch()
  const companyPage = useSelector(selectCompanyPageContent)
  const companyPageStatus = useSelector(selectCompanyPageStatus)

  useEffect(() => {
    if (companyPageStatus === 'loading' || companyPageStatus === 'success') return
    dispatch(loadCompanyPageFromApi())
  }, [companyPageStatus, dispatch])

  return (
    <>
      <CompanyHeroSection hero={companyPage?.hero} />
      <CompanyGridSection cards={companyPage?.cards} />
    </>
  )
}

export default CompanyPage
