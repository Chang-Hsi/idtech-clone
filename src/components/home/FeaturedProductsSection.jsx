import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import ImagePlaceholder from './ImagePlaceholder'

const FeaturedProductsSection = ({ items }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#171A1F] py-12 text-white text-center md:py-20">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6">
        <div className="flex items-end justify-center">
          <div>
            <h2
              className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 pb-6 text-3xl font-semibold leading-[1.28] sm:text-4xl md:pb-10 lg:text-6xl`}
              style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
            >
              Built for{' '}
              <span className="whitespace-nowrap underline decoration-[2px] underline-offset-[8px] sm:decoration-[3px] sm:underline-offset-[14px] md:underline-offset-[24px] lg:decoration-[4px] lg:underline-offset-[32px]">
                Performance
              </span>{' '}
              at Scale
            </h2>
          </div>
        </div>

        <div className="my-8 grid grid-cols-1 gap-4 sm:my-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={item.to}
              className={`${isInView ? 'fade-down-in' : 'opacity-0'} group rounded-sm border border-white/10 bg-[#232830] p-4 transition-colors hover:border-[#7DC242]/60`}
              style={{
                '--anim-distance': '42px',
                '--anim-duration': '700ms',
                '--anim-delay': `${index * 130}ms`,
              }}
            >
              <div className="overflow-hidden rounded-sm">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="aspect-[5/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <ImagePlaceholder ratio="aspect-[5/4]" label="Product Image" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium transition-colors group-hover:text-[#7DC242] sm:text-xl">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/products"
          className="rounded-sm border border-white/30 px-4 py-2 text-sm font-medium hover:border-[#7DC242] hover:text-[#7DC242]"
        >
          View All Products
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProductsSection
