import { Link, useParams } from 'react-router-dom'
import CareerDetailApplyCard from '../../components/company/careers/detail/CareerDetailApplyCard'
import CareerDetailMainSection from '../../components/company/careers/detail/CareerDetailMainSection'
import { careersJobs } from '../../data/company/careers'

const CareerDetailPage = () => {
  const { jobSlug } = useParams()
  const job = careersJobs.find((item) => item.slug === jobSlug)

  if (!job) {
    return (
      <section className="bg-[#171A1F] py-16 text-white">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-semibold">Job Not Found</h1>
          <Link to="/company/careers" className="mt-4 inline-flex text-[#7DC242] hover:underline">
            Back to Careers
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F6F7F8] py-12 md:py-16">
      <div className="mx-auto grid w-full grid-cols-1 gap-6 px-4 sm:px-20 lg:grid-cols-2 lg:items-stretch">
        <CareerDetailMainSection job={job} />
        <CareerDetailApplyCard job={job} />
      </div>
    </section>
  )
}

export default CareerDetailPage
