import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import {
  selectAboutUsPageContent,
  selectCareerDetailBySlug,
  selectCareersPageContent,
  selectCollectionDetailBySlug,
  selectCompanyPageContent,
  selectHomePageContent,
  selectProductBySlug,
  selectProductDetailBySlug,
  selectProductsPageContent,
  selectResourceArticleBySlug,
  selectResourcesPageContent,
  selectUseCaseDetailBySlug,
  selectUseCasesPageContent,
} from '../../features/catalog/catalogSelectors'

const SITE_ORIGIN = 'https://chang-hsi.github.io'
const SITE_BASE_PATH = '/idtech-clone'
const SITE_NAME = 'IDTECH Clone'

const DEFAULT_META = {
  title: 'IDTECH Clone',
  description:
    'Enterprise-grade payment products, use cases, resources, and company information.',
  type: 'website',
  noindex: false,
}

const STATIC_META = {
  '/': {
    title: 'Home',
    description:
      'Enterprise-grade payment foundation for product teams shipping secure payment experiences.',
  },
  '/products': {
    title: 'Products',
    description: 'Explore product collections and payment devices across multiple deployment models.',
  },
  '/use-cases': {
    title: 'Use Cases',
    description: 'Reference payment use cases for unattended, mobile, countertop, and OEM workflows.',
  },
  '/software-services': {
    title: 'Software Services',
    description: 'Implementation and lifecycle services for scalable payment architecture programs.',
  },
  '/support': {
    title: 'Support',
    description: 'Support resources, integration links, and product assistance entry points.',
  },
  '/support/knowledge-base': {
    title: 'Knowledge Base',
    description: 'Browse technical support and implementation guidance for payment integrations.',
  },
  '/support/product-updates': {
    title: 'Product Updates',
    description: 'Review updates and release-related information for current product lines.',
  },
  '/support/request-help': {
    title: 'Request Help',
    description: 'Request support for deployment, integration, and troubleshooting needs.',
  },
  '/resources': {
    title: 'Resources',
    description: 'Read technical articles, whitepapers, case studies, and release announcements.',
  },
  '/resources/whitepapers': {
    title: 'Whitepapers',
    description: 'Explore downloadable whitepapers related to payment products and implementation.',
  },
  '/resources/case-studies': {
    title: 'Case Studies',
    description: 'Read deployment examples and practical outcomes from payment solution programs.',
  },
  '/resources/press-releases': {
    title: 'Press Releases',
    description: 'Review official announcements and media updates.',
  },
  '/company': {
    title: 'Company',
    description: 'Company overview, mission, and strategic direction.',
  },
  '/company/about-us': {
    title: 'About Us',
    description: 'Learn about company history, highlights, and global contact points.',
  },
  '/company/careers': {
    title: 'Careers',
    description: 'View open positions across Taiwan, United States, and Japan.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Contact the team for product inquiries and collaboration opportunities.',
  },
  '/legal/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read the privacy policy and data handling guidelines.',
  },
}

const upsertMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.keys(attrs)
      .filter((key) => key !== 'content')
      .forEach((key) => el.setAttribute(key, attrs[key]))
    document.head.appendChild(el)
  }
  el.setAttribute('content', attrs.content)
}

const removeMeta = (selector) => {
  const el = document.head.querySelector(selector)
  if (el) el.remove()
}

const upsertCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const upsertJsonLd = (id, data) => {
  let script = document.head.querySelector(`script[data-seo-jsonld="${id}"]`)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', id)
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

const removeJsonLd = (id) => {
  const script = document.head.querySelector(`script[data-seo-jsonld="${id}"]`)
  if (script) script.remove()
}

const getCanonicalUrl = (pathname) => {
  const normalizedPath = pathname === '/' ? '' : pathname
  return `${SITE_ORIGIN}${SITE_BASE_PATH}${normalizedPath}`
}

const getBreadcrumbItems = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  const items = [{ name: 'Home', path: '/' }]

  let accum = ''
  for (const segment of segments) {
    accum += `/${segment}`
    items.push({
      name: segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      path: accum,
    })
  }

  return items
}

const Seo = () => {
  const { pathname } = useLocation()

  const productSlug = matchPath('/products/:productSlug', pathname)?.params?.productSlug ?? null
  const collectionSlug =
    matchPath('/products/collections/:collectionSlug', pathname)?.params?.collectionSlug ?? null
  const useCaseSlug = matchPath('/use-cases/:slug', pathname)?.params?.slug ?? null
  const articleSlug = matchPath('/resources/:articleSlug', pathname)?.params?.articleSlug ?? null
  const jobSlug = matchPath('/company/careers/:jobSlug', pathname)?.params?.jobSlug ?? null

  const homePage = useSelector(selectHomePageContent)
  const productsPage = useSelector(selectProductsPageContent)
  const useCasesPage = useSelector(selectUseCasesPageContent)
  const resourcesPage = useSelector(selectResourcesPageContent)
  const companyPage = useSelector(selectCompanyPageContent)
  const aboutUsPage = useSelector(selectAboutUsPageContent)
  const careersPage = useSelector(selectCareersPageContent)
  const collectionDetail = useSelector((state) =>
    collectionSlug ? selectCollectionDetailBySlug(state, collectionSlug) : null
  )
  const productDetail = useSelector((state) =>
    productSlug ? selectProductDetailBySlug(state, productSlug) : null
  )
  const productCard = useSelector((state) => (productSlug ? selectProductBySlug(state, productSlug) : null))
  const useCaseDetail = useSelector((state) =>
    useCaseSlug ? selectUseCaseDetailBySlug(state, useCaseSlug) : null
  )
  const resourceArticle = useSelector((state) =>
    articleSlug ? selectResourceArticleBySlug(state, articleSlug) : null
  )
  const careerDetail = useSelector((state) =>
    jobSlug ? selectCareerDetailBySlug(state, jobSlug) : null
  )

  const routeSeo = useMemo(() => {
    if (pathname === '/') return homePage?.seo ?? null
    if (pathname === '/products') return productsPage?.seo ?? null
    if (pathname === '/use-cases') return useCasesPage?.seo ?? null
    if (pathname === '/resources') return resourcesPage?.seo ?? null
    if (pathname === '/company') return companyPage?.seo ?? null
    if (pathname === '/company/about-us') return aboutUsPage?.seo ?? null
    if (pathname === '/company/careers') return careersPage?.seo ?? null
    if (pathname === '/contact') return null
    if (pathname === '/legal/privacy-policy') return null
    if (collectionSlug) return collectionDetail?.seo ?? null
    if (productSlug) return productDetail?.seo ?? productCard?.seo ?? null
    if (useCaseSlug) return useCaseDetail?.seo ?? null
    if (articleSlug) return resourceArticle?.seo ?? null
    if (jobSlug) return careerDetail?.seo ?? null
    return null
  }, [
    aboutUsPage?.seo,
    articleSlug,
    careerDetail?.seo,
    careersPage?.seo,
    collectionDetail?.seo,
    collectionSlug,
    companyPage?.seo,
    homePage?.seo,
    jobSlug,
    pathname,
    productCard?.seo,
    productDetail?.seo,
    productSlug,
    productsPage?.seo,
    resourceArticle?.seo,
    resourcesPage?.seo,
    useCaseDetail?.seo,
    useCaseSlug,
    useCasesPage?.seo,
  ])

  const meta = useMemo(() => {
    const exact = STATIC_META[pathname]
    const hasDynamicRoute = Boolean(collectionSlug || productSlug || useCaseSlug || articleSlug || jobSlug)
    const hasKnownPage = Boolean(exact || routeSeo || hasDynamicRoute)
    const noindex = Boolean(routeSeo?.noindex ?? !hasKnownPage)

    return {
      ...DEFAULT_META,
      ...(exact ?? {}),
      ...(routeSeo ?? {}),
      noindex,
      robots: routeSeo?.robots ?? (noindex ? 'noindex,nofollow' : 'index,follow'),
      canonicalPath: routeSeo?.canonicalPath ?? pathname,
    }
  }, [articleSlug, collectionSlug, jobSlug, pathname, productSlug, routeSeo, useCaseSlug])

  useEffect(() => {
    const fullTitle = `${meta.title} | IDTECH Clone`
    const canonical = getCanonicalUrl(meta.canonicalPath ?? pathname)

    document.title = fullTitle
    upsertCanonical(canonical)

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: meta.description,
    })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    if (meta.ogImageUrl) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: meta.ogImageUrl })
    } else {
      removeMeta('meta[property="og:image"]')
    }
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: meta.description,
    })
    if (meta.ogImageUrl) {
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: meta.ogImageUrl })
    } else {
      removeMeta('meta[name="twitter:image"]')
    }
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: meta.robots,
    })

    const breadcrumbItems = getBreadcrumbItems(pathname).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    }))

    upsertJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: getCanonicalUrl('/'),
      logo: `${SITE_ORIGIN}${SITE_BASE_PATH}/logo.jpg`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'sales@idtechproducts.com',
        },
      ],
    })

    upsertJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: getCanonicalUrl('/'),
      inLanguage: 'en',
    })

    upsertJsonLd('breadcrumbs', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    })

    if (resourceArticle) {
      const preferredTranslation =
        resourceArticle?.translations?.en ?? resourceArticle?.translations?.zh ?? {}
      upsertJsonLd('article', {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: preferredTranslation.title ?? meta.title,
        description: preferredTranslation.excerpt ?? meta.description,
        datePublished: resourceArticle.publishedAt ?? undefined,
        mainEntityOfPage: canonical,
        image: meta.ogImageUrl ? [meta.ogImageUrl] : undefined,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: getCanonicalUrl('/'),
        },
      })
    } else {
      removeJsonLd('article')
    }

    if (productSlug && (productDetail || productCard)) {
      const productEntity = productDetail ?? productCard
      upsertJsonLd('product', {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productEntity?.name ?? meta.title,
        description:
          productEntity?.shortDescription ??
          productEntity?.detail?.heroDescription ??
          meta.description,
        image: meta.ogImageUrl ? [meta.ogImageUrl] : undefined,
        sku: productEntity?.slug ?? productSlug,
        url: canonical,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
      })
    } else {
      removeJsonLd('product')
    }

    if (jobSlug && careerDetail) {
      upsertJsonLd('jobposting', {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: careerDetail.title ?? meta.title,
        description: careerDetail.summary ?? meta.description,
        datePosted: new Date().toISOString().slice(0, 10),
        employmentType: careerDetail.employmentType ?? 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: SITE_NAME,
          sameAs: getCanonicalUrl('/company'),
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: careerDetail.region ?? 'US',
          },
        },
      })
    } else {
      removeJsonLd('jobposting')
    }
  }, [careerDetail, jobSlug, meta, pathname, productCard, productDetail, productSlug, resourceArticle])

  return null
}

export default Seo
