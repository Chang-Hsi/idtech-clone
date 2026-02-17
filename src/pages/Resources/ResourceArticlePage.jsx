import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ResourceArticleContentSection from '../../components/resources/detail/ResourceArticleContentSection'
import { resourceArticles } from '../../data/resources/articles'

const LANGS = ['zh', 'en']

const normalizeLang = (lang) => {
  if (LANGS.includes(lang)) return lang
  return 'en'
}

const ResourceArticlePage = () => {
  const { articleSlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const article = resourceArticles.find((item) => item.slug === articleSlug)
  const requestedLang = searchParams.get('lang')
  const storedLang =
    typeof window !== 'undefined' ? window.localStorage.getItem('resources-article-lang') : null
  const activeLang = normalizeLang(requestedLang ?? storedLang ?? 'en')
  const translation = article?.translations?.[activeLang] ?? article?.translations?.en ?? null
  const currentIndex = resourceArticles.findIndex((item) => item.slug === articleSlug)
  const prevArticle = currentIndex > 0 ? resourceArticles[currentIndex - 1] : null
  const nextArticle =
    currentIndex >= 0 && currentIndex < resourceArticles.length - 1
      ? resourceArticles[currentIndex + 1]
      : null

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
                prevArticle.translations?.[activeLang]?.title ??
                prevArticle.translations?.en?.title ??
                prevArticle.slug,
            }
          : null
      }
      nextArticle={
        nextArticle
          ? {
              href: withLang(nextArticle.slug),
              title:
                nextArticle.translations?.[activeLang]?.title ??
                nextArticle.translations?.en?.title ??
                nextArticle.slug,
            }
          : null
      }
    />
  )
}

export default ResourceArticlePage
