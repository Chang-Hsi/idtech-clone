import { createSelector } from '@reduxjs/toolkit'
import { catalogProductSelectors } from './catalogSlice'

export const selectCatalogState = (state) => state.catalog

export const selectAllProducts = catalogProductSelectors.selectAll
export const selectProductEntities = catalogProductSelectors.selectEntities
export const selectCatalogStatus = (state) => state.catalog.status

export const selectAllCollections = createSelector(selectCatalogState, (catalog) =>
  Object.values(catalog.collectionsBySlug)
)

export const selectCollectionBySlug = (state, collectionSlug) =>
  state.catalog.collectionsBySlug[collectionSlug] ?? null

export const selectProductBySlug = createSelector(
  [selectAllProducts, (_, productSlug) => productSlug],
  (products, productSlug) => products.find((product) => product.slug === productSlug) ?? null
)

export const selectProductsByCollection = createSelector(
  [selectAllProducts, (_, collectionSlug) => collectionSlug],
  (products, collectionSlug) =>
    products.filter((product) => product.collectionSlugs?.includes(collectionSlug))
)

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
