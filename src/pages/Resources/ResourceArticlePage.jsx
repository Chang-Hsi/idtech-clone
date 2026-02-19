import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ResourceArticleContentSection from '../../components/resources/detail/ResourceArticleContentSection'
import {
  selectResourceArticleBySlug,
  selectResourceArticleStatusBySlug,
  selectResourcesPageContent,
  selectResourcesPageStatus,
} from '../../features/catalog/catalogSelectors'
import {
  loadResourceArticleBySlugFromApi,
  loadResourcesPageFromApi,
} from '../../features/catalog/catalogSlice'

const LANGS = ['zh', 'en']

const normalizeLang = (lang) => {
  if (LANGS.includes(lang)) return lang
  return 'en'
}

const ResourceArticlePage = () => {
  const { articleSlug } = useParams()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const resourcesPage = useSelector(selectResourcesPageContent)
  const resourcesPageStatus = useSelector(selectResourcesPageStatus)
  const article = useSelector((state) => selectResourceArticleBySlug(state, articleSlug))
  const articleStatus = useSelector((state) => selectResourceArticleStatusBySlug(state, articleSlug))
  const orderedArticles = resourcesPage?.items ?? []
  const requestedLang = searchParams.get('lang')
  const storedLang =
    typeof window !== 'undefined' ? window.localStorage.getItem('resources-article-lang') : null
  const activeLang = normalizeLang(requestedLang ?? storedLang ?? 'en')
  const translation = article?.translations?.[activeLang] ?? article?.translations?.en ?? null
  const currentIndex = orderedArticles.findIndex((item) => item.slug === articleSlug)
  const prevArticle = currentIndex > 0 ? orderedArticles[currentIndex - 1] : null
  const nextArticle =
    currentIndex >= 0 && currentIndex < orderedArticles.length - 1
      ? orderedArticles[currentIndex + 1]
      : null

  useEffect(() => {
    if (!articleSlug) return
    if (resourcesPageStatus !== 'loading' && resourcesPageStatus !== 'success') {
      dispatch(loadResourcesPageFromApi())
    }
    if (articleStatus !== 'loading' && articleStatus !== 'success') {
      dispatch(loadResourceArticleBySlugFromApi(articleSlug))
    }
  }, [articleSlug, articleStatus, dispatch, resourcesPageStatus])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('resources-article-lang', activeLang)
  }, [activeLang])

  useEffect(() => {
    if (requestedLang) return
    const next = new URLSearchParams(searchParams)
    next.set('lang', activeLang)
    setSearchParams(next, { replace: true })
  }, [activeLang, requestedLang, searchParams, setSearchParams])

  if (!article) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold">Article Not Found</h1>
          <Link to="/resources" className="mt-4 inline-flex text-[#7DC242] hover:underline">
            Back to Resources
          </Link>
        </div>
      </section>
    )
  }

  const handleChangeLang = (nextLang) => {
    const normalized = normalizeLang(nextLang)
    const next = new URLSearchParams(searchParams)
    next.set('lang', normalized)
    setSearchParams(next, { replace: true })
  }

  const withLang = (slug) => `/resources/${slug}?lang=${activeLang}`

  return (
    <ResourceArticleContentSection
      article={article}
      translation={translation}
      lang={activeLang}
      onChangeLang={handleChangeLang}
      prevArticle={
        prevArticle
          ? {
              href: withLang(prevArticle.slug),
              title:
                prevArticle.previewTitle ??
                prevArticle.slug,
            }
          : null
      }
      nextArticle={
        nextArticle
          ? {
              href: withLang(nextArticle.slug),
              title:
                nextArticle.previewTitle ??
                nextArticle.slug,
            }
          : null
      }
    />
  )
}

export default ResourceArticlePage
