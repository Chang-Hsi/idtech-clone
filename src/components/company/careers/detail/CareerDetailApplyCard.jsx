import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import imNotARobotIcon from '../../../../assets/common/imNotARobotIcon.jpg'
import useInViewOnce from '../../../../hooks/useInViewOnce'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  resume: null,
}

const CareerDetailApplyCard = ({ job }) => {
  const { ref, isInView } = useInViewOnce()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHuman, setIsHuman] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!formData.firstName.trim()) nextErrors.firstName = 'This field is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'This field is required.'
    if (!formData.email.trim()) nextErrors.email = 'This field is required.'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = 'Invalid email'
    if (!formData.phone.trim()) nextErrors.phone = 'This field is required.'
    if (!formData.resume) nextErrors.resume = 'Please upload your resume.'
    if (!isHuman) nextErrors.humanCheck = 'Please confirm you are not a robot.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    console.log('Career application payload:', {
      jobSlug: job.slug,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      resumeName: formData.resume?.name ?? null,
    })

    setIsSubmitted(true)
    setIsHuman(false)
    setFormData(INITIAL_FORM)

    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <aside
      ref={ref}
      className={`${isInView ? 'fade-right-in' : 'opacity-0'} h-full rounded-sm border border-black/10 bg-white p-6 md:p-16`}
      style={{ '--anim-distance': '24px' }}
    >
      <h2 className="text-2xl font-semibold text-black">Apply for this Role</h2>
      <p className="mt-2 text-sm leading-6 text-black/65">
        Submit your information and resume. Our recruiting team will contact qualified candidates.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span>First Name *</span>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
            />
            {errors.firstName ? <p className="text-xs text-red-500">{errors.firstName}</p> : null}
          </label>

          <label className="space-y-2 text-sm">
            <span>Last Name *</span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
            />
            {errors.lastName ? <p className="text-xs text-red-500">{errors.lastName}</p> : null}
          </label>
        </div>

        <label className="space-y-2 text-sm">
          <span>Email *</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
          />
          {errors.email ? <p className="text-xs text-red-500">{errors.email}</p> : null}
        </label>

        <label className="space-y-2 text-sm">
          <span>Phone *</span>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
          />
          {errors.phone ? <p className="text-xs text-red-500">{errors.phone}</p> : null}
        </label>

        <label className="space-y-2 text-sm">
          <span>Upload Resume (.pdf, .doc, .docx) *</span>
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="w-full rounded-sm bg-[#fff] px-3 py-2 text-sm text-black/65 file:mr-3 file:rounded-sm file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-[#7DC242]"
          />
          {errors.resume ? <p className="text-xs text-red-500">{errors.resume}</p> : null}
        </label>

        <label className="inline-flex cursor-pointer items-center gap-3 rounded-sm border border-black/20 bg-white px-4 py-2 text-sm">
          <input
            type="checkbox"
            checked={isHuman}
            onChange={(event) => setIsHuman(event.target.checked)}
            className="h-5 w-5 accent-[#7DC242]"
          />
          <span>I'm not a robot</span>
          <span className="ml-auto flex flex-col items-center text-[10px] leading-tight text-black/50">
            <img
              src={imNotARobotIcon}
              alt="reCAPTCHA verification"
              className="h-10 rounded-[2px] object-cover"
            />
            <span className="mt-1">Privacy - Terms</span>
          </span>
        </label>
        {errors.humanCheck ? <p className="text-xs text-red-500">{errors.humanCheck}</p> : null}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={!isHuman}
            className="w-fit rounded-sm bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#121417] transition-colors hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/50 disabled:text-[#121417]/60"
          >
            Submit Application
          </button>
          {isSubmitted ? (
            <p className="text-center text-sm text-[#7DC242]">Application sent successfully.</p>
          ) : null}
        </div>
      </form>

      <div className="mt-6 border-t border-black/10 pt-4 text-sm text-black/65">
        <p className="font-medium text-black/80">Prefer direct contact?</p>
        <div className="mt-2 space-y-2">
          <a
            href={`mailto:${job.applyEmail}`}
            className="inline-flex items-center gap-2 hover:text-[#00B388]"
          >
            <EnvelopeIcon className="h-4 w-4" />
            {job.applyEmail}
          </a>
          <a
            href="tel:+1-7147616368"
            className="inline-flex items-center gap-2 hover:text-[#00B388]"
          >
            <PhoneIcon className="h-4 w-4" />
            +1 (714) 761-6368
          </a>
        </div>
      </div>
    </aside>
  )
}

export default CareerDetailApplyCard
