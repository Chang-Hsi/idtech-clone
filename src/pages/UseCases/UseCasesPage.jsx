import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UseCasesGridSection from '../../components/usecases/UseCasesGridSection'
import UseCasesHeroSection from '../../components/usecases/UseCasesHeroSection'
import {
  selectUseCasesPageContent,
  selectUseCasesPageStatus,
} from '../../features/catalog/catalogSelectors'
import { loadUseCasesPageFromApi } from '../../features/catalog/catalogSlice'

const UseCasesPage = () => {
  const dispatch = useDispatch()
  const useCasesPage = useSelector(selectUseCasesPageContent)
  const useCasesPageStatus = useSelector(selectUseCasesPageStatus)

  useEffect(() => {
    if (useCasesPageStatus === 'loading' || useCasesPageStatus === 'success') return
    dispatch(loadUseCasesPageFromApi())
  }, [dispatch, useCasesPageStatus])

  return (
    <>
      <UseCasesHeroSection hero={useCasesPage?.hero} />
      <UseCasesGridSection items={useCasesPage?.items} />
    </>
  )
}

export default UseCasesPage
