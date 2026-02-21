import { Link } from 'react-router-dom'
import useInViewOnce from '../../../../hooks/useInViewOnce'
import renderMarkdownProse from '../../../../utils/renderMarkdownProse'

const toMarkdownText = (value) => {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value
    .map((item) => String(item ?? '').trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join('\n')
}

const CareerDetailMainSection = ({ job }) => {
  const { ref, isInView } = useInViewOnce()
  const jobDutiesMarkdown = toMarkdownText(job.jobDutiesMarkdown ?? job.jobDuties)
  const qualificationsMarkdown = toMarkdownText(job.qualificationsMarkdown ?? job.qualifications)

  return (
    <article
      ref={ref}
      className={`${isInView ? 'fade-left-in' : 'opacity-0'} h-full rounded-sm border border-black/10 bg-white p-6 sm:p-16`}
      style={{ '--anim-distance': '24px' }}
    >
      <nav className="text-sm text-black/55">
        <Link to="/company/careers" className="hover:text-[#00B388]">
          Careers
        </Link>
        <span className="mx-2">/</span>
        <span>{job.title}</span>
      </nav>

      <h1 className="mt-5 text-3xl font-semibold leading-tight text-black sm:text-4xl">
        {job.title}
      </h1>
      <p className="mt-3 text-sm font-semibold tracking-[0.06em] text-emerald-700">
        {job.employmentType} | {job.locationLabel}
      </p>
      <p className="mt-6 text-base leading-8 text-black/65">{job.summary}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-black">Job Duties</h2>
        <div className="md-prose mt-4 text-black/65">{renderMarkdownProse(jobDutiesMarkdown)}</div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-black">Qualifications</h2>
        <div className="md-prose mt-4 text-black/65">{renderMarkdownProse(qualificationsMarkdown)}</div>
      </div>
    </article>
  )
}

export default CareerDetailMainSection
