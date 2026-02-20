import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const SITE_ORIGIN = process.env.SEO_SITE_ORIGIN || 'https://chang-hsi.github.io'
const SITE_BASE_PATH = process.env.SEO_SITE_BASE_PATH || '/idtech-clone'
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:4000'
const IS_PRODUCTION =
  (process.env.SEO_ENV || process.env.NODE_ENV || 'production').toLowerCase() === 'production'
const LASTMOD = new Date().toISOString().slice(0, 10)

const STATIC_ROUTES = [
  '/',
  '/products',
  '/use-cases',
  '/software-services',
  '/support',
  '/support/knowledge-base',
  '/support/product-updates',
  '/support/request-help',
  '/resources',
  '/resources/whitepapers',
  '/resources/case-studies',
  '/resources/press-releases',
  '/company',
  '/company/about-us',
  '/company/careers',
  '/contact',
  '/legal/privacy-policy',
]

const toAbsoluteUrl = (pathname) => {
  const normalizedBase = SITE_BASE_PATH.endsWith('/')
    ? SITE_BASE_PATH.slice(0, -1)
    : SITE_BASE_PATH
  const normalizedPath = pathname === '/' ? '' : pathname
  return `${SITE_ORIGIN}${normalizedBase}${normalizedPath}`
}

const dedupePaths = (paths) =>
  [...new Set(paths.filter((item) => typeof item === 'string' && item.startsWith('/')))]

const get = async (pathname) => {
  const response = await fetch(`${API_BASE_URL}${pathname}`)
  if (!response.ok) {
    throw new Error(`Request failed: ${pathname} (${response.status})`)
  }
  const payload = await response.json()
  return payload?.data ?? {}
}

const buildSitemapXml = (paths) => {
  const body = paths
    .map((pathname) => `  <url><loc>${toAbsoluteUrl(pathname)}</loc><lastmod>${LASTMOD}</lastmod></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

const buildRobotsTxt = () => {
  if (!IS_PRODUCTION) {
    return `User-agent: *\nDisallow: /\n\nSitemap: ${toAbsoluteUrl('/sitemap.xml')}\n`
  }

  return `User-agent: *\nAllow: /\n\nSitemap: ${toAbsoluteUrl('/sitemap.xml')}\n`
}

const collectDynamicRoutesFromApi = async () => {
  const [productsData, useCasesData, resourcesData, careersData] = await Promise.all([
    get('/api/products'),
    get('/api/use-cases'),
    get('/api/resources'),
    get('/api/company/careers'),
  ])

  const productRoutes = (productsData.products ?? []).map((item) => `/products/${item.slug}`)
  const collectionRoutes = (productsData.collections ?? []).map(
    (item) => `/products/collections/${item.slug}`
  )

  const useCaseRoutes = (useCasesData.items ?? [])
    .map((item) => item.to)
    .filter((to) => typeof to === 'string' && to.startsWith('/use-cases/') && to !== '/use-cases')

  const resourceRoutes = (resourcesData.items ?? []).map((item) => `/resources/${item.slug}`)
  const careerRoutes = (careersData.careersPage?.jobs ?? []).map(
    (item) => `/company/careers/${item.slug}`
  )

  return dedupePaths([
    ...STATIC_ROUTES,
    ...productRoutes,
    ...collectionRoutes,
    ...useCaseRoutes,
    ...resourceRoutes,
    ...careerRoutes,
  ])
}

const main = async () => {
  const publicDir = path.resolve(process.cwd(), 'public')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  const robotsPath = path.join(publicDir, 'robots.txt')

  let allPaths = STATIC_ROUTES
  try {
    allPaths = await collectDynamicRoutesFromApi()
    console.log(`[seo] Loaded dynamic routes from API (${API_BASE_URL}).`)
  } catch (error) {
    console.warn(
      `[seo] Failed to load API routes (${API_BASE_URL}). Using static fallback only.\n${String(error)}`
    )
  }

  await fs.writeFile(sitemapPath, buildSitemapXml(dedupePaths(allPaths)), 'utf8')
  await fs.writeFile(robotsPath, buildRobotsTxt(), 'utf8')
  console.log(`[seo] Generated ${sitemapPath}`)
  console.log(`[seo] Generated ${robotsPath}`)
}

main().catch((error) => {
  console.error('[seo] generation failed', error)
  process.exit(1)
})
