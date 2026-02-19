import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ResourcesGridSection from '../../components/resources/ResourcesGridSection'
import ResourcesHeroSection from '../../components/resources/ResourcesHeroSection'
import {
  selectResourcesPageContent,
  selectResourcesPageStatus,
} from '../../features/catalog/catalogSelectors'
import { loadResourcesPageFromApi } from '../../features/catalog/catalogSlice'

const ResourcesPage = () => {
  const dispatch = useDispatch()
  const resourcesPage = useSelector(selectResourcesPageContent)
  const resourcesPageStatus = useSelector(selectResourcesPageStatus)

  useEffect(() => {
    if (resourcesPageStatus === 'loading' || resourcesPageStatus === 'success') return
    dispatch(loadResourcesPageFromApi())
  }, [dispatch, resourcesPageStatus])

  return (
    <>
      <ResourcesHeroSection hero={resourcesPage?.hero} />
      <ResourcesGridSection items={resourcesPage?.items} />
    </>
  )
}

export default ResourcesPage
