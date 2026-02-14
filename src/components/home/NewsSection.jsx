import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import ImagePlaceholder from './ImagePlaceholder'

const NewsSection = ({ items }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#171A1F] py-[6rem] text-white text-center">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div className="mx-auto w-full">
            <h2
              className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 pb-10 text-6xl font-semibold underline underline-offset-[32px] decoration-[4px]`}
              style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
            >
              NEWS
            </h2>
          </div>
        </div>

        <div className="my-10 grid grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="group rounded-sm bg-[#fff]">
              <div className="overflow-hidden rounded-sm">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <ImagePlaceholder label="News Image" />
                )}
              </div>

              <p className="mt-4 text-xs tracking-[0.08em] text-black/55">{item.date}</p>
              <h3 className="mt-2 text-lg text-emerald-600/85 text-left font-medium px-8">
                {item.title}
              </h3>
              <p className="mt-3 text-lg text-left text-black/70 px-8">{item.excerpt}</p>
              <Link
                to={item.to}
                className="my-8 inline-flex text-sm text-[#7DC242] hover:underline"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
        <Link
          to="/resources/press-releases"
          className="rounded-sm border border-white/30 px-4 py-2 text-sm font-medium hover:border-[#7DC242] hover:text-[#7DC242]"
        >
          View All News
        </Link>
      </div>
    </section>
  )
}

export default NewsSection
