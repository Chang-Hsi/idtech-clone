import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import ImagePlaceholder from './ImagePlaceholder'

const FeaturedProductsSection = ({ items }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#171A1F] py-[6rem] text-white text-center">
      <div className="mx-auto w-full max-w-[100rem] px-6">
        <div className="flex items-end justify-center">
          <div>
            <h2
              className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 pb-10 text-6xl font-semibold`}
              style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
            >
              Built for{' '}
              <span className="underline underline-offset-[32px] decoration-[4px]">
                Performance
              </span>{' '}
              at Scale
            </h2>
          </div>
        </div>

        <div className="my-10 grid grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={item.to}
              className={`${isInView ? 'fade-down-in' : 'opacity-0'} group my-8 p-4 transition-colors hover:border-[#7DC242]/60`}
              style={{
                '--anim-distance': '56px',
                '--anim-duration': '850ms',
                '--anim-delay': `${index * 180}ms`,
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
              <h3 className="mt-4 text-xl font-medium transition-colors group-hover:text-[#7DC242]">
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
