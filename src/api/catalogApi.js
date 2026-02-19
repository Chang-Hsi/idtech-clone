import { request } from '../lib/request'

export async function fetchProductsFromApi() {
  const payload = await request('/api/products', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    products: Array.isArray(data?.products) ? data.products : [],
    collections: Array.isArray(data?.collections) ? data.collections : [],
    productsPage: data?.productsPage ?? null,
  }
}
