import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useInViewOnce from '../../../hooks/useInViewOnce'
import { selectOpenJobsByTab } from '../../../data/company/careers'

const CareersOpeningsSection = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? 'all')
  const { ref, isInView } = useInViewOnce({
    threshold: 0,
    rootMargin: '0px 0px 85% 0px',
  })

  const jobs = useMemo(() => selectOpenJobsByTab(activeTab), [activeTab])

  return (
    <section ref={ref} className="bg-[#fff] py-12 text-emerald-500 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <h2
          className={`${isInView ? 'fade-up-in' : 'opacity-0'} text-3xl font-semibold py-4 text-center sm:text-4xl`}
          style={{ '--anim-distance': '18px' }}
        >
          Open Positions
        </h2>

        <div className="mt-6 flex flex-wrap gap-3 items-center justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-sm border px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-black-500 bg-emerald-500 text-white'
                  : 'border-black/20 bg-white text-black/70 hover:border-[#00B388] hover:text-[#00B388]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {jobs.length ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, index) => (
              <Link
                key={job.id}
                to={`/company/careers/${job.slug}`}
                className={`${isInView ? 'zoom-in-title' : 'opacity-0'} group relative h-[320px] overflow-hidden rounded-sm border border-black/10 bg-white`}
                style={{
                  '--zoom-start': '0.86',
                  '--zoom-duration': '620ms',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="h-full w-full overflow-hidden">
                  {job.imageUrl ? (
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#ECEFF2] text-sm text-black/55">
                      Job Image
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/55 transition-colors duration-300 group-hover:bg-black/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                  <h3 className="text-3xl font-semibold text-white">{job.title}</h3>
                  <p className="mt-2 text-base font-medium tracking-[0.04em] text-white/90">
                    {job.employmentType} | {job.locationLabel}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-sm border border-black/10 bg-white p-6 text-sm text-black/65">
            No openings in this region yet.
          </div>
        )}
      </div>
    </section>
  )
}

export default CareersOpeningsSection
