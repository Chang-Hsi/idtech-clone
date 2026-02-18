import { useEffect, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { careersJobs } from '../../data/company/careers'
import { collections } from '../../data/products/collections'
import { products } from '../../data/products/products'
import { resourceArticles } from '../../data/resources/articles'
import { useCases } from '../../data/usecases/useCases'

const SITE_ORIGIN = 'https://chang-hsi.github.io'
const SITE_BASE_PATH = '/idtech-clone'

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

const upsertCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const getCanonicalUrl = (pathname) => {
  const normalizedPath = pathname === '/' ? '' : pathname
  return `${SITE_ORIGIN}${SITE_BASE_PATH}${normalizedPath}`
}

const getDynamicMeta = (pathname) => {
  const productMatch = matchPath('/products/:productSlug', pathname)
  if (productMatch) {
    const product = products.find((item) => item.slug === productMatch.params.productSlug)
    if (product) {
      return {
        title: `${product.name} | Products`,
        description: product.shortDescription,
      }
    }
  }

  const collectionMatch = matchPath('/products/collections/:collectionSlug', pathname)
  if (collectionMatch) {
    const collection = collections.find((item) => item.slug === collectionMatch.params.collectionSlug)
    if (collection) {
      return {
        title: `${collection.name} | Product Collection`,
        description: collection.seo?.description ?? collection.intro,
      }
    }
  }

  const useCaseMatch = matchPath('/use-cases/:slug', pathname)
  if (useCaseMatch) {
    const useCase = useCases.find((item) => item.slug === useCaseMatch.params.slug)
    if (useCase) {
      return {
        title: `${useCase.title} | Use Cases`,
        description: useCase.description,
      }
    }
  }

  const articleMatch = matchPath('/resources/:articleSlug', pathname)
  if (articleMatch) {
    const article = resourceArticles.find((item) => item.slug === articleMatch.params.articleSlug)
    const title = article?.translations?.en?.title ?? article?.translations?.zh?.title
    const excerpt = article?.translations?.en?.excerpt ?? article?.translations?.zh?.excerpt
    if (title || excerpt) {
      return {
        title: `${title ?? 'Article'} | Resources`,
        description: excerpt ?? DEFAULT_META.description,
        type: 'article',
      }
    }
  }

  const careerMatch = matchPath('/company/careers/:jobSlug', pathname)
  if (careerMatch) {
    const job = careersJobs.find((item) => item.slug === careerMatch.params.jobSlug)
    if (job) {
      return {
        title: `${job.title} | Careers`,
        description: job.summary,
      }
    }
  }

  return null
}

const Seo = () => {
  const { pathname } = useLocation()

  const meta = useMemo(() => {
    const exact = STATIC_META[pathname]
    const dynamic = getDynamicMeta(pathname)
    const merged = {
      ...DEFAULT_META,
      ...(exact ?? {}),
      ...(dynamic ?? {}),
    }
    const hasKnownPage = Boolean(exact || dynamic)
    return {
      ...merged,
      noindex: hasKnownPage ? false : true,
    }
  }, [pathname])

  useEffect(() => {
    const fullTitle = `${meta.title} | IDTECH Clone`
    const canonical = getCanonicalUrl(pathname)

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
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: meta.noindex ? 'noindex,nofollow' : 'index,follow',
    })
  }, [meta, pathname])

  return null
}

export default Seo
