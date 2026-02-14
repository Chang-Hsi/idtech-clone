import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import AboutSection from '../../components/home/AboutSection'
import FeaturedProductsSection from '../../components/home/FeaturedProductsSection'
import GetInTouchBanner from '../../components/home/GetInTouchBanner'
import HeroCarousel from '../../components/home/HeroCarousel'
import LeadFormSection from '../../components/home/LeadFormSection'
import NewsSection from '../../components/home/NewsSection'
import SearchResultsSection from '../../components/home/SearchResultsSection'
import UseCasesSection from '../../components/home/UseCasesSection'
import { homeFeaturedProducts } from '../../data/home/homeFeaturedProducts'
import { homeHeroSlides } from '../../data/home/homeHero'
import { homeLeadForm } from '../../data/home/homeLeadForm'
import { homeNews } from '../../data/home/homeNews'
import { homeUseCases } from '../../data/home/homeUseCases'

const HomePage = () => {
  const [searchParams] = useSearchParams()
  const keyword = (searchParams.get('s') ?? '').trim()

  const searchResults = useMemo(() => {
    if (!keyword) return []

    const normalizedKeyword = keyword.toLowerCase()
    const sources = [
      ...homeUseCases.map((item) => ({ type: 'Use Case', title: item.title, desc: item.desc, to: item.to })),
      ...homeFeaturedProducts.map((item) => ({
        type: 'Featured Product',
        title: item.name,
        desc: item.desc,
        to: item.to,
      })),
      ...homeNews.map((item) => ({ type: 'News', title: item.title, desc: item.excerpt, to: item.to })),
      ...homeHeroSlides.map((item) => ({ type: 'Hero', title: item.title, desc: item.desc, to: item.primaryCta.to })),
    ]

    return sources.filter((item) =>
      `${item.title} ${item.desc}`.toLowerCase().includes(normalizedKeyword)
    )
  }, [keyword])

  return (
    <>
      <HeroCarousel slides={homeHeroSlides} />
      {keyword && <SearchResultsSection keyword={keyword} results={searchResults} />}
      <UseCasesSection items={homeUseCases} />
      <FeaturedProductsSection items={homeFeaturedProducts} />
      <GetInTouchBanner imageUrl="" />
      <AboutSection />
      <NewsSection items={homeNews} />
      <LeadFormSection config={homeLeadForm} />
    </>
  )
}

export default HomePage
