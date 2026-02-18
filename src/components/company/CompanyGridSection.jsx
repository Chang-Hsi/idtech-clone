import { Link } from 'react-router-dom'
import useInViewOnce from '../../hooks/useInViewOnce'

const CompanyGridSection = ({ cards = [] }) => {
  const { ref, isInView } = useInViewOnce({
    threshold: 0,
    rootMargin: '0px 0px 85% 0px',
  })

  return (
    <section ref={ref} className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Link
              key={card.id}
              to={card.to ?? '#'}
              className={`${isInView ? 'zoom-in-title' : 'opacity-0'} group relative h-[320px] overflow-hidden rounded-sm border border-black/10`}
              style={{
                '--zoom-start': '0.86',
                '--zoom-duration': '620ms',
                animationDelay: `${index * 120}ms`,
              }}
            >
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-125"
                />
              ) : (
                <div className="h-full w-full bg-[#b8c0c7] bg-[linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px)] bg-[size:18px_18px]" />
              )}

              <div className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                <h3 className="text-3xl font-semibold text-white">{card.title}</h3>
                {/* <p className="mt-3 max-w-[22rem] text-sm text-white/85">{card.description}</p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyGridSection
