import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { collections } from '../../data/products/collections'
import { products } from '../../data/products/products'
import { fetchProductsFromApi } from '../../api/catalogApi'

const fallbackProductsPage = {
  hero: {
    eyebrow: 'PRODUCTS',
    title: 'NEXA empowers payments in every type of business',
    description: "Explore NEXA's range of payment solutions for any payment situation.",
  },
  leadForm: {
    heading: 'Talk to Our Team',
    desc: 'Share your project goals and our payment experts will get back to you shortly.',
    regions: ['North America', 'Latin America', 'Europe', 'Asia-Pacific', 'Middle East & Africa'],
  },
}

// Entity adapter 用來管理產品清單：
// - ids：產品 id 陣列
// - entities：以 id 為 key 的產品映射
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

const mapApiProductsToCatalog = (apiProducts, localProducts) => {
  const localBySlug = new Map(localProducts.map((item) => [item.slug, item]))
  const merged = localProducts.map((item) => {
    const remote = apiProducts.find((product) => product.slug === item.slug)
    if (!remote) return item

    return {
      ...item,
      name: remote.name,
      shortDescription: remote.shortDescription ?? item.shortDescription,
      apiId: remote.id,
      createdAt: remote.createdAt,
      updatedAt: remote.updatedAt,
    }
  })

  const appended = apiProducts
    .filter((product) => !localBySlug.has(product.slug))
    .map((product) => ({
      id: `api-${product.id}`,
      slug: product.slug,
      name: product.name,
      shortDescription: product.shortDescription ?? '',
      collectionSlugs: [],
      useCases: [],
      bullets: [],
      media: { gallery: [] },
      specs: [],
      features: [],
      relatedSlugs: [],
      detail: {},
      apiId: product.id,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }))

  return [...merged, ...appended]
}

export const loadProductsFromApi = createAsyncThunk(
  'catalog/loadProductsFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductsFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Products API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch products API')
    }
  }
)

// 以本地靜態資料初始化 catalog state。
const buildInitialState = () => {
  const state = productsAdapter.getInitialState({
    collectionsBySlug: toCollectionMap(collections),
    productsPage: fallbackProductsPage,
    status: 'success',
    error: null,
    dataSource: 'local',
    lastSyncedAt: null,
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
      state.dataSource = 'manual'
      state.lastSyncedAt = new Date().toISOString()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductsFromApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadProductsFromApi.fulfilled, (state, action) => {
        const currentProducts = state.ids.map((id) => state.entities[id]).filter(Boolean)
        const mergedProducts = mapApiProductsToCatalog(action.payload.products, currentProducts)

        productsAdapter.setAll(state, mergedProducts)
        if (action.payload.collections.length > 0) {
          state.collectionsBySlug = toCollectionMap(action.payload.collections)
        }
        if (action.payload.productsPage) {
          state.productsPage = action.payload.productsPage
        }
        state.status = 'success'
        state.error = null
        state.dataSource = 'api'
        state.lastSyncedAt = new Date().toISOString()
      })
      .addCase(loadProductsFromApi.rejected, (state, action) => {
        state.status = 'fallback'
        state.error = action.payload || action.error.message || 'Unable to fetch products API'
      })
  },
})

export const { setCatalogData } = catalogSlice.actions
export const catalogProductSelectors = productsAdapter.getSelectors((state) => state.catalog)

export default catalogSlice.reducer
