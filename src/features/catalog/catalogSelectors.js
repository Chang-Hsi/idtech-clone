import { createSelector } from '@reduxjs/toolkit'
import { catalogProductSelectors } from './catalogSlice'

// 基礎 selector：從 root store 取出 catalog 區塊。
export const selectCatalogState = (state) => state.catalog

// 由 adapter 產生的產品 selectors。
export const selectAllProducts = catalogProductSelectors.selectAll
export const selectProductEntities = catalogProductSelectors.selectEntities
export const selectCatalogStatus = (state) => state.catalog.status
export const selectCatalogDataSource = (state) => state.catalog.dataSource
export const selectProductsPageContent = (state) => state.catalog.productsPage

// collections 在 state 內是物件，這裡轉為陣列供元件遍歷。
export const selectAllCollections = createSelector(selectCatalogState, (catalog) =>
  Object.values(catalog.collectionsBySlug)
)

// 依 collection slug 快速查單筆資料。
export const selectCollectionBySlug = (state, collectionSlug) =>
  state.catalog.collectionsBySlug[collectionSlug] ?? null

export const selectCollectionDetailBySlug = (state, collectionSlug) =>
  state.catalog.collectionDetailsBySlug[collectionSlug] ?? null

export const selectCollectionDetailStatusBySlug = (state, collectionSlug) =>
  state.catalog.collectionDetailStatusBySlug[collectionSlug] ?? 'idle'

export const selectProductDetailBySlug = (state, productSlug) =>
  state.catalog.productDetailsBySlug[productSlug] ?? null

export const selectProductDetailStatusBySlug = (state, productSlug) =>
  state.catalog.productDetailStatusBySlug[productSlug] ?? 'idle'

export const selectUseCasesPageContent = (state) => state.catalog.useCasesPage

export const selectUseCasesPageStatus = (state) => state.catalog.useCasesPageStatus

export const selectUseCaseDetailBySlug = (state, slug) =>
  state.catalog.useCaseDetailsBySlug[slug] ?? null

export const selectUseCaseDetailStatusBySlug = (state, slug) =>
  state.catalog.useCaseDetailStatusBySlug[slug] ?? 'idle'

export const selectResourcesPageContent = (state) => state.catalog.resourcesPage

export const selectResourcesPageStatus = (state) => state.catalog.resourcesPageStatus

export const selectResourceArticleBySlug = (state, articleSlug) =>
  state.catalog.resourceArticlesBySlug[articleSlug] ?? null

export const selectResourceArticleStatusBySlug = (state, articleSlug) =>
  state.catalog.resourceArticleStatusBySlug[articleSlug] ?? 'idle'

export const selectHomePageContent = (state) => state.catalog.homePage
export const selectHomePageStatus = (state) => state.catalog.homePageStatus

export const selectCompanyPageContent = (state) => state.catalog.companyPage
export const selectCompanyPageStatus = (state) => state.catalog.companyPageStatus

export const selectAboutUsPageContent = (state) => state.catalog.aboutUsPage
export const selectAboutUsPageStatus = (state) => state.catalog.aboutUsPageStatus

export const selectCareersPageContent = (state) => state.catalog.careersPage
export const selectCareersPageStatus = (state) => state.catalog.careersPageStatus

export const selectCareerDetailBySlug = (state, jobSlug) =>
  state.catalog.careerDetailsBySlug[jobSlug] ?? null

export const selectCareerDetailStatusBySlug = (state, jobSlug) =>
  state.catalog.careerDetailStatusBySlug[jobSlug] ?? 'idle'

// 依產品頁路由 slug（/products/:productSlug）查單筆產品。
export const selectProductBySlug = createSelector(
  [selectAllProducts, (_, productSlug) => productSlug],
  (products, productSlug) => products.find((product) => product.slug === productSlug) ?? null
)

// 查詢屬於某個 collection slug 的產品列表。
export const selectProductsByCollection = createSelector(
  [selectAllProducts, (_, collectionSlug) => collectionSlug],
  (products, collectionSlug) =>
    products.filter((product) => product.collectionSlugs?.includes(collectionSlug))
)

// 相關產品規則：
// 1) 優先使用產品自訂的 relatedSlugs
// 2) 或者同 collection 的其他產品
export const selectRelatedProducts = createSelector(
  [selectAllProducts, (_, productSlug) => productSlug],
  (products, productSlug) => {
    const target = products.find((product) => product.slug === productSlug)
    if (!target) return []

    const explicitRelated = new Set(target.relatedSlugs ?? [])
    const collectionSet = new Set(target.collectionSlugs ?? [])

    return products.filter((product) => {
      if (product.slug === target.slug) return false
      if (explicitRelated.has(product.slug)) return true
      return (product.collectionSlugs ?? []).some((slug) => collectionSet.has(slug))
    })
  }
)
