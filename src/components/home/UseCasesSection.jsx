import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import ImagePlaceholder from './ImagePlaceholder'

const UseCasesSection = ({ items }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#1F2328] py-12 text-white text-center md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2
          className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 pb-6 text-3xl font-semibold sm:text-4xl md:pb-10 lg:text-6xl`}
          style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
        >
          Accelerate{' '}
          <span className="underline decoration-[4px] underline-offset-[14px] md:underline-offset-[24px] lg:underline-offset-[32px]">
            Your
          </span>{' '}
          Payments
        </h2>
        <p
          className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mx-auto mt-3 max-w-3xl text-center text-sm text-white/70 sm:text-base`}
          style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
        >
          Choose deployment-ready payment paths for unattended, mobile, countertop, OEM, and
          enterprise environments.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="group overflow-hidden rounded-sm border border-white/10 bg-[#2B3036]/60 transition-colors hover:border-[#7DC242]/60"
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <ImagePlaceholder
                  label="Use Case Image"
                  className="rounded-none border-x-0 border-t-0"
                />
              )}
              <div className="p-5">
                <h3 className="text-lg font-medium transition-colors group-hover:text-[#7DC242] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection
