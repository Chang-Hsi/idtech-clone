import { request } from '../lib/request'

export async function fetchProductsFromApi() {
  const payload = await request('/api/products', { cache: 'no-store' })

  return {
    products: Array.isArray(payload?.data) ? payload.data : [],
    collections: Array.isArray(payload?.collections) ? payload.collections : [],
    productsPage: payload?.productsPage ?? null,
  }
}
