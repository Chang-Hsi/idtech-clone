import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'
import ImagePlaceholder from './ImagePlaceholder'

const UseCasesSection = ({ items }) => {
  const { ref, isInView } = useInViewOnce()

  return (
    <section ref={ref} className="bg-[#1F2328] py-[4rem] text-white text-center">
      <div className="mx-auto w-full max-w-7xl px-6">
        <h2
          className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 pb-10 text-6xl font-semibold`}
          style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
        >
          Accelerate{' '}
          <span className="underline underline-offset-[32px] decoration-[4px]">Your</span> Payments
        </h2>
        <p
          className={`${isInView ? 'zoom-in-title' : 'opacity-0'} mt-3 text-center text-white/70`}
          style={{ '--zoom-start': '0.1', '--zoom-duration': '700ms' }}
        >
          Choose deployment-ready payment paths for unattended, mobile, countertop, OEM, and
          enterprise environments.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6">
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
                <h3 className="text-xl font-medium transition-colors group-hover:text-[#7DC242]">
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
