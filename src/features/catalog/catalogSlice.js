import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collections } from '../../data/products/collections'
import { products } from '../../data/products/products'

// Entity adapter 用來管理產品清單：
// - ids：產品 id 陣列
// - entities：以 id 為 key 的產品映射
// 並且可自動產生常用 selectors。
const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

// collections 轉成 slug -> collection 的物件，方便快速查詢。
const toCollectionMap = (collectionList) =>
  collectionList.reduce((acc, collection) => {
    acc[collection.slug] = collection
    return acc
  }, {})

// 以本地靜態資料初始化 catalog state。
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
    // 一次替換整份 catalog（適合 API 載入後覆蓋資料）。
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
// 將 adapter selectors 綁定在 state.catalog 節點下。
export const catalogProductSelectors = productsAdapter.getSelectors((state) => state.catalog)

export default catalogSlice.reducer
