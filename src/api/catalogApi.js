import { request } from '../lib/request'

export async function fetchHomePageFromApi() {
  const payload = await request('/api/home', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    homePage: data?.homePage ?? null,
  }
}

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

export async function fetchProductCollectionBySlugFromApi(collectionSlug) {
  const payload = await request(`/api/products/collections/${collectionSlug}`, { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    collection: data?.collection ?? null,
  }
}

export async function fetchProductDetailBySlugFromApi(productSlug) {
  const payload = await request(`/api/products/${productSlug}`, { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    product: data?.product ?? null,
  }
}

export async function fetchUseCasesPageFromApi() {
  const payload = await request('/api/use-cases', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    hero: data?.hero ?? null,
    items: Array.isArray(data?.items) ? data.items : [],
  }
}

export async function fetchUseCaseDetailBySlugFromApi(slug) {
  const payload = await request(`/api/use-cases/${slug}`, { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    useCase: data?.useCase ?? null,
  }
}

export async function fetchResourcesPageFromApi() {
  const payload = await request('/api/resources', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    hero: data?.hero ?? null,
    items: Array.isArray(data?.items) ? data.items : [],
  }
}

export async function fetchResourceArticleBySlugFromApi(articleSlug) {
  const payload = await request(`/api/resources/${articleSlug}`, { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    article: data?.article ?? null,
  }
}

export async function fetchCompanyPageFromApi() {
  const payload = await request('/api/company', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    companyPage: data?.companyPage ?? null,
  }
}

export async function fetchAboutUsPageFromApi() {
  const payload = await request('/api/company/about-us', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    aboutUsPage: data?.aboutUsPage ?? null,
  }
}

export async function fetchCareersPageFromApi() {
  const payload = await request('/api/company/careers', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    careersPage: data?.careersPage ?? null,
  }
}

export async function fetchCareerDetailBySlugFromApi(jobSlug) {
  const payload = await request(`/api/company/careers/${jobSlug}`, { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    job: data?.job ?? null,
  }
}

export async function fetchPrivacyPolicyFromApi() {
  const payload = await request('/api/legal/privacy-policy', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    privacyPolicy: data?.privacyPolicy ?? null,
  }
}
