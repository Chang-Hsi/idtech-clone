import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductsFromApi } from './catalogSlice'
import { selectCatalogDataSource, selectCatalogStatus } from './catalogSelectors'

const useLoadProductsOnPage = (deps = []) => {
  const dispatch = useDispatch()
  const status = useSelector(selectCatalogStatus)
  const dataSource = useSelector(selectCatalogDataSource)

  useEffect(() => {
    // In React StrictMode (dev), effects run twice.
    // Skip if a request is already in-flight or data already came from API.
    if (status === 'loading' || dataSource === 'api') return
    dispatch(loadProductsFromApi())
  }, [dispatch, status, dataSource, ...deps])
}

export default useLoadProductsOnPage
