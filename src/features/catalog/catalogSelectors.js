import { createSelector } from '@reduxjs/toolkit'
import { catalogProductSelectors } from './catalogSlice'

// 基礎 selector：從 root store 取出 catalog 區塊。
export const selectCatalogState = (state) => state.catalog

// 由 adapter 產生的產品 selectors。
export const selectAllProducts = catalogProductSelectors.selectAll
export const selectProductEntities = catalogProductSelectors.selectEntities
export const selectCatalogStatus = (state) => state.catalog.status

// collections 在 state 內是物件，這裡轉為陣列供元件遍歷。
export const selectAllCollections = createSelector(selectCatalogState, (catalog) =>
  Object.values(catalog.collectionsBySlug)
)

// 依 collection slug 快速查單筆資料。
export const selectCollectionBySlug = (state, collectionSlug) =>
  state.catalog.collectionsBySlug[collectionSlug] ?? null

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
