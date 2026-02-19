import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import AboutSection from '../../components/home/AboutSection'
import FeaturedProductsSection from '../../components/home/FeaturedProductsSection'
import GetInTouchBanner from '../../components/home/GetInTouchBanner'
import HeroCarousel from '../../components/home/HeroCarousel'
import LeadFormSection from '../../components/home/LeadFormSection'
import NewsSection from '../../components/home/NewsSection'
import SearchResultsSection from '../../components/home/SearchResultsSection'
import UseCasesSection from '../../components/home/UseCasesSection'
import { selectHomePageContent, selectHomePageStatus } from '../../features/catalog/catalogSelectors'
import { loadHomePageFromApi } from '../../features/catalog/catalogSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const homePage = useSelector(selectHomePageContent)
  const homePageStatus = useSelector(selectHomePageStatus)
  const keyword = (searchParams.get('s') ?? '').trim()
  const heroSlides = homePage?.heroSlides ?? []
  const useCases = homePage?.useCases ?? []
  const featuredProducts = homePage?.featuredProducts ?? []
  const rawNews = homePage?.news ?? []
  const news = useMemo(
    () =>
      rawNews.map((item) => ({
        id: item.id,
        title: item.title ?? item.previewTitle ?? item.slug ?? '',
        excerpt: item.excerpt ?? item.previewExcerpt ?? '',
        date: item.date ?? item.publishedAt ?? '',
        to: item.to ?? (item.slug ? `/resources/${item.slug}?lang=en` : '/resources'),
        imageUrl: item.imageUrl ?? item.coverImageUrl ?? null,
      })),
    [rawNews]
  )
  const leadForm = homePage?.leadForm ?? null

  useEffect(() => {
    if (homePageStatus === 'loading' || homePageStatus === 'success') return
    dispatch(loadHomePageFromApi())
  }, [dispatch, homePageStatus])

  const searchResults = useMemo(() => {
    if (!keyword) return []

    const normalizedKeyword = keyword.toLowerCase()
    const sources = [
      ...useCases.map((item) => ({ type: 'Use Case', title: item.title, desc: item.desc, to: item.to })),
      ...featuredProducts.map((item) => ({
        type: 'Featured Product',
        title: item.name,
        desc: item.desc,
        to: item.to,
      })),
      ...news.map((item) => ({ type: 'News', title: item.title, desc: item.excerpt, to: item.to })),
      ...heroSlides.map((item) => ({
        type: 'Hero',
        title: item.title,
        desc: item.desc,
        to: item.primaryCta.to,
      })),
    ]

    return sources.filter((item) =>
      `${item.title} ${item.desc}`.toLowerCase().includes(normalizedKeyword)
    )
  }, [featuredProducts, heroSlides, keyword, news, useCases])

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      {keyword && <SearchResultsSection keyword={keyword} results={searchResults} />}
      <UseCasesSection items={useCases} />
      <FeaturedProductsSection items={featuredProducts} />
      <GetInTouchBanner imageUrl="" />
      <AboutSection />
      <NewsSection items={news} />
      {leadForm ? <LeadFormSection config={leadForm} /> : null}
    </>
  )
}

export default HomePage
