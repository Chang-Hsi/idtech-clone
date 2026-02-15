import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collections } from '../../data/products/collections'
import { products } from '../../data/products/products'

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const toCollectionMap = (collectionList) =>
  collectionList.reduce((acc, collection) => {
    acc[collection.slug] = collection
    return acc
  }, {})

const buildInitialState = () => {
  const state = productsAdapter.getInitialState({
    collectionsBySlug: toCollectionMap(collections),
    status: 'success',
    error: null,
  })
  return productsAdapter.setAll(state, products)
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: buildInitialState(),
  reducers: {
    setCatalogData(state, action) {
      const nextProducts = action.payload?.products ?? []
      const nextCollections = action.payload?.collections ?? []
      productsAdapter.setAll(state, nextProducts)
      state.collectionsBySlug = toCollectionMap(nextCollections)
      state.status = 'success'
      state.error = null
    },
  },
})

export const { setCatalogData } = catalogSlice.actions
export const catalogProductSelectors = productsAdapter.getSelectors((state) => state.catalog)

export default catalogSlice.reducer
