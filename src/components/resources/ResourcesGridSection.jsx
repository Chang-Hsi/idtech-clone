import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import { resourceArticles } from '../../data/resources/articles'

const ResourcesGridSection = () => {
  const { ref, isInView } = useInViewOnce({
    threshold: 0,
    rootMargin: '0px 0px 85% 0px',
  })

  return (
    <section ref={ref} className="bg-white py-12 text-black md:pt-16 pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resourceArticles.map((article, index) => {
            const preview = article.translations?.en ?? article.translations?.zh
            if (!preview) return null

            return (
              <Link
                key={article.id}
                to={`/resources/${article.slug}`}
                className={`${isInView ? 'fade-up-in' : 'opacity-0'} group bg-[#fff] p-5 transition-colors hover:bg-slate-50`}
                style={{ '--anim-distance': '14px', '--anim-delay': `${index * 120}ms` }}
              >
                <div className="mb-4 overflow-hidden rounded-sm">
                  {article.coverImageUrl ? (
                    <img
                      src={article.coverImageUrl}
                      alt={preview.title}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#fff] text-sm text-black/55">
                      Article Image
                    </div>
                  )}
                </div>
                <p className="text-xs tracking-[0.08em] text-black/55">{article.publishedAt}</p>
                <h3 className="mt-2 text-left text-lg font-semibold tracking-[0.02em] text-emerald-600">
                  {preview.title}
                </h3>
                <p className="mt-2 text-sm text-black/70">{preview.excerpt}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ResourcesGridSection
