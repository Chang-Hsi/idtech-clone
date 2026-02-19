import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { aboutUsPageContent } from '../../data/company/aboutUs'
import { careersJobs, careersPageContent } from '../../data/company/careers'
import { companyPageContent } from '../../data/company/company'
import { homeFeaturedProducts } from '../../data/home/homeFeaturedProducts'
import { homeHeroSlides } from '../../data/home/homeHero'
import { homeLeadForm } from '../../data/home/homeLeadForm'
import { homeNews } from '../../data/home/homeNews'
import { homeUseCases } from '../../data/home/homeUseCases'
import { collections } from '../../data/products/collections'
import { products } from '../../data/products/products'
import { resourceArticles } from '../../data/resources/articles'
import { useCases } from '../../data/usecases/useCases'
import {
  fetchAboutUsPageFromApi,
  fetchCareerDetailBySlugFromApi,
  fetchCareersPageFromApi,
  fetchCompanyPageFromApi,
  fetchHomePageFromApi,
  fetchResourceArticleBySlugFromApi,
  fetchResourcesPageFromApi,
  fetchProductCollectionBySlugFromApi,
  fetchProductDetailBySlugFromApi,
  fetchProductsFromApi,
  fetchUseCaseDetailBySlugFromApi,
  fetchUseCasesPageFromApi,
} from '../../api/catalogApi'

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

const fallbackUseCasesPage = {
  hero: {
    eyebrow: 'USE CASES',
    title: 'Payment Solutions by Scenario',
    description:
      'Explore deployment scenarios across unattended, mobile, countertop, and OEM environments.',
  },
  items: homeUseCases,
}

const fallbackUseCaseDetailMap = useCases.reduce((acc, item) => {
  acc[item.slug] = item
  return acc
}, {})

const fallbackResourcesPage = {
  hero: {
    eyebrow: 'RESOURCES',
    title: 'Insights, Guides, and Technical Articles',
    description: 'Explore implementation guidance and practical knowledge for payment product teams.',
  },
  items: resourceArticles.map((article) => {
    const preview = article.translations?.en ?? article.translations?.zh
    return {
      id: article.id,
      slug: article.slug,
      coverImageUrl: article.coverImageUrl,
      publishedAt: article.publishedAt,
      previewTitle: preview?.title ?? article.slug,
      previewExcerpt: preview?.excerpt ?? '',
    }
  }),
}

const fallbackResourceArticleMap = resourceArticles.reduce((acc, article) => {
  acc[article.slug] = article
  return acc
}, {})

const fallbackHomePage = {
  heroSlides: homeHeroSlides,
  useCases: homeUseCases,
  featuredProducts: homeFeaturedProducts,
  news: homeNews,
  leadForm: homeLeadForm,
}

const fallbackCompanyPage = companyPageContent
const fallbackAboutUsPage = aboutUsPageContent
const fallbackCareersPage = {
  ...careersPageContent,
  jobs: careersJobs,
}
const fallbackCareerDetailMap = careersJobs.reduce((acc, job) => {
  acc[job.slug] = job
  return acc
}, {})

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

const mergeCollectionMap = (currentMap, incomingList) => {
  const nextMap = { ...currentMap }
  incomingList.forEach((collection) => {
    const previous = currentMap[collection.slug] ?? {}
    nextMap[collection.slug] = {
      ...previous,
      ...collection,
      media: {
        ...(previous.media ?? {}),
        ...(collection.media ?? {}),
      },
    }
  })
  return nextMap
}

const mapApiProductsToCatalog = (apiProducts, localProducts) => {
  const localBySlug = new Map(localProducts.map((item) => [item.slug, item]))
  const merged = localProducts.map((item) => {
    const remote = apiProducts.find((product) => product.slug === item.slug)
    if (!remote) return item

    return {
      ...item,
      name: remote.name,
      shortDescription: remote.shortDescription ?? item.shortDescription,
      media: {
        ...(item.media ?? {}),
        ...(remote.media ?? {}),
      },
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
      media: {
        gallery: [],
        ...(product.media ?? {}),
      },
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

export const loadProductCollectionBySlugFromApi = createAsyncThunk(
  'catalog/loadProductCollectionBySlugFromApi',
  async (collectionSlug, { rejectWithValue }) => {
    try {
      const response = await fetchProductCollectionBySlugFromApi(collectionSlug)
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Collection API returned a non-zero code')
      }
      return { collectionSlug, collection: response.collection }
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch product collection API')
    }
  }
)

export const loadProductDetailBySlugFromApi = createAsyncThunk(
  'catalog/loadProductDetailBySlugFromApi',
  async (productSlug, { rejectWithValue }) => {
    try {
      const response = await fetchProductDetailBySlugFromApi(productSlug)
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Product detail API returned a non-zero code')
      }
      return { productSlug, product: response.product }
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch product detail API')
    }
  }
)

export const loadUseCasesPageFromApi = createAsyncThunk(
  'catalog/loadUseCasesPageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUseCasesPageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Use cases page API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch use cases page API')
    }
  }
)

export const loadUseCaseDetailBySlugFromApi = createAsyncThunk(
  'catalog/loadUseCaseDetailBySlugFromApi',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetchUseCaseDetailBySlugFromApi(slug)
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Use case detail API returned a non-zero code')
      }
      return { slug, useCase: response.useCase }
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch use case detail API')
    }
  }
)

export const loadResourcesPageFromApi = createAsyncThunk(
  'catalog/loadResourcesPageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchResourcesPageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Resources page API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch resources page API')
    }
  }
)

export const loadResourceArticleBySlugFromApi = createAsyncThunk(
  'catalog/loadResourceArticleBySlugFromApi',
  async (articleSlug, { rejectWithValue }) => {
    try {
      const response = await fetchResourceArticleBySlugFromApi(articleSlug)
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Resource article API returned a non-zero code')
      }
      return { articleSlug, article: response.article }
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch resource article API')
    }
  }
)

export const loadHomePageFromApi = createAsyncThunk(
  'catalog/loadHomePageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchHomePageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Home page API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch home page API')
    }
  }
)

export const loadCompanyPageFromApi = createAsyncThunk(
  'catalog/loadCompanyPageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCompanyPageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Company page API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch company page API')
    }
  }
)

export const loadAboutUsPageFromApi = createAsyncThunk(
  'catalog/loadAboutUsPageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAboutUsPageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'About us API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch about us API')
    }
  }
)

export const loadCareersPageFromApi = createAsyncThunk(
  'catalog/loadCareersPageFromApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCareersPageFromApi()
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Careers page API returned a non-zero code')
      }
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch careers page API')
    }
  }
)

export const loadCareerDetailBySlugFromApi = createAsyncThunk(
  'catalog/loadCareerDetailBySlugFromApi',
  async (jobSlug, { rejectWithValue }) => {
    try {
      const response = await fetchCareerDetailBySlugFromApi(jobSlug)
      if (response.code !== 0) {
        return rejectWithValue(response.message || 'Career detail API returned a non-zero code')
      }
      return { jobSlug, job: response.job }
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to fetch career detail API')
    }
  }
)

// 以本地靜態資料初始化 catalog state。
const buildInitialState = () => {
  const state = productsAdapter.getInitialState({
    collectionsBySlug: toCollectionMap(collections),
    collectionDetailsBySlug: {},
    collectionDetailStatusBySlug: {},
    productDetailsBySlug: {},
    productDetailStatusBySlug: {},
    useCasesPage: fallbackUseCasesPage,
    useCasesPageStatus: 'idle',
    useCaseDetailsBySlug: fallbackUseCaseDetailMap,
    useCaseDetailStatusBySlug: {},
    resourcesPage: fallbackResourcesPage,
    resourcesPageStatus: 'idle',
    resourceArticlesBySlug: fallbackResourceArticleMap,
    resourceArticleStatusBySlug: {},
    homePage: fallbackHomePage,
    homePageStatus: 'idle',
    companyPage: fallbackCompanyPage,
    companyPageStatus: 'idle',
    aboutUsPage: fallbackAboutUsPage,
    aboutUsPageStatus: 'idle',
    careersPage: fallbackCareersPage,
    careersPageStatus: 'idle',
    careerDetailsBySlug: fallbackCareerDetailMap,
    careerDetailStatusBySlug: {},
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
          state.collectionsBySlug = mergeCollectionMap(
            state.collectionsBySlug,
            action.payload.collections
          )
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
      .addCase(loadProductCollectionBySlugFromApi.pending, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.collectionDetailStatusBySlug[slug] = 'loading'
      })
      .addCase(loadProductCollectionBySlugFromApi.fulfilled, (state, action) => {
        const { collectionSlug, collection } = action.payload
        if (!collectionSlug || !collection) return
        state.collectionDetailsBySlug[collectionSlug] = collection
        state.collectionDetailStatusBySlug[collectionSlug] = 'success'
      })
      .addCase(loadProductCollectionBySlugFromApi.rejected, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.collectionDetailStatusBySlug[slug] = 'fallback'
      })
      .addCase(loadProductDetailBySlugFromApi.pending, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.productDetailStatusBySlug[slug] = 'loading'
      })
      .addCase(loadProductDetailBySlugFromApi.fulfilled, (state, action) => {
        const { productSlug, product } = action.payload
        if (!productSlug || !product) return
        state.productDetailsBySlug[productSlug] = product
        state.productDetailStatusBySlug[productSlug] = 'success'
      })
      .addCase(loadProductDetailBySlugFromApi.rejected, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.productDetailStatusBySlug[slug] = 'fallback'
      })
      .addCase(loadUseCasesPageFromApi.pending, (state) => {
        state.useCasesPageStatus = 'loading'
      })
      .addCase(loadUseCasesPageFromApi.fulfilled, (state, action) => {
        state.useCasesPage = {
          hero: action.payload.hero ?? state.useCasesPage.hero,
          items: action.payload.items.length ? action.payload.items : state.useCasesPage.items,
        }
        state.useCasesPageStatus = 'success'
      })
      .addCase(loadUseCasesPageFromApi.rejected, (state) => {
        state.useCasesPageStatus = 'fallback'
      })
      .addCase(loadUseCaseDetailBySlugFromApi.pending, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.useCaseDetailStatusBySlug[slug] = 'loading'
      })
      .addCase(loadUseCaseDetailBySlugFromApi.fulfilled, (state, action) => {
        const { slug, useCase } = action.payload
        if (!slug || !useCase) return
        state.useCaseDetailsBySlug[slug] = useCase
        state.useCaseDetailStatusBySlug[slug] = 'success'
      })
      .addCase(loadUseCaseDetailBySlugFromApi.rejected, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.useCaseDetailStatusBySlug[slug] = 'fallback'
      })
      .addCase(loadResourcesPageFromApi.pending, (state) => {
        state.resourcesPageStatus = 'loading'
      })
      .addCase(loadResourcesPageFromApi.fulfilled, (state, action) => {
        state.resourcesPage = {
          hero: action.payload.hero ?? state.resourcesPage.hero,
          items: action.payload.items.length ? action.payload.items : state.resourcesPage.items,
        }
        state.resourcesPageStatus = 'success'
      })
      .addCase(loadResourcesPageFromApi.rejected, (state) => {
        state.resourcesPageStatus = 'fallback'
      })
      .addCase(loadResourceArticleBySlugFromApi.pending, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.resourceArticleStatusBySlug[slug] = 'loading'
      })
      .addCase(loadResourceArticleBySlugFromApi.fulfilled, (state, action) => {
        const { articleSlug, article } = action.payload
        if (!articleSlug || !article) return
        state.resourceArticlesBySlug[articleSlug] = article
        state.resourceArticleStatusBySlug[articleSlug] = 'success'
      })
      .addCase(loadResourceArticleBySlugFromApi.rejected, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.resourceArticleStatusBySlug[slug] = 'fallback'
      })
      .addCase(loadHomePageFromApi.pending, (state) => {
        state.homePageStatus = 'loading'
      })
      .addCase(loadHomePageFromApi.fulfilled, (state, action) => {
        if (action.payload.homePage) {
          state.homePage = action.payload.homePage
        }
        state.homePageStatus = 'success'
      })
      .addCase(loadHomePageFromApi.rejected, (state) => {
        state.homePageStatus = 'fallback'
      })
      .addCase(loadCompanyPageFromApi.pending, (state) => {
        state.companyPageStatus = 'loading'
      })
      .addCase(loadCompanyPageFromApi.fulfilled, (state, action) => {
        if (action.payload.companyPage) {
          state.companyPage = action.payload.companyPage
        }
        state.companyPageStatus = 'success'
      })
      .addCase(loadCompanyPageFromApi.rejected, (state) => {
        state.companyPageStatus = 'fallback'
      })
      .addCase(loadAboutUsPageFromApi.pending, (state) => {
        state.aboutUsPageStatus = 'loading'
      })
      .addCase(loadAboutUsPageFromApi.fulfilled, (state, action) => {
        if (action.payload.aboutUsPage) {
          state.aboutUsPage = action.payload.aboutUsPage
        }
        state.aboutUsPageStatus = 'success'
      })
      .addCase(loadAboutUsPageFromApi.rejected, (state) => {
        state.aboutUsPageStatus = 'fallback'
      })
      .addCase(loadCareersPageFromApi.pending, (state) => {
        state.careersPageStatus = 'loading'
      })
      .addCase(loadCareersPageFromApi.fulfilled, (state, action) => {
        if (action.payload.careersPage) {
          state.careersPage = action.payload.careersPage
          const jobs = action.payload.careersPage.jobs ?? []
          jobs.forEach((job) => {
            if (job?.slug) {
              state.careerDetailsBySlug[job.slug] = job
            }
          })
        }
        state.careersPageStatus = 'success'
      })
      .addCase(loadCareersPageFromApi.rejected, (state) => {
        state.careersPageStatus = 'fallback'
      })
      .addCase(loadCareerDetailBySlugFromApi.pending, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.careerDetailStatusBySlug[slug] = 'loading'
      })
      .addCase(loadCareerDetailBySlugFromApi.fulfilled, (state, action) => {
        const { jobSlug, job } = action.payload
        if (!jobSlug || !job) return
        state.careerDetailsBySlug[jobSlug] = job
        state.careerDetailStatusBySlug[jobSlug] = 'success'
      })
      .addCase(loadCareerDetailBySlugFromApi.rejected, (state, action) => {
        const slug = action.meta.arg
        if (slug) state.careerDetailStatusBySlug[slug] = 'fallback'
      })
  },
})

export const { setCatalogData } = catalogSlice.actions
export const catalogProductSelectors = productsAdapter.getSelectors((state) => state.catalog)

export default catalogSlice.reducer
