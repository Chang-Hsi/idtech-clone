import { useState } from 'react'
import imNotARobotIcon from '../../assets/common/imNotARobotIcon.jpg'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  region: '',
  message: '',
}

const LeadFormSection = ({ config }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHuman, setIsHuman] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.firstName.trim()) nextErrors.firstName = 'This field is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'This field is required.'
    if (!formData.email.trim()) nextErrors.email = 'This field is required.'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = 'Invalid email'
    if (!formData.region.trim()) nextErrors.region = 'This field is required.'
    if (!formData.message.trim()) nextErrors.message = 'This field is required.'
    if (!isHuman) nextErrors.humanCheck = 'Please confirm you are not a robot.'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    console.log('Lead form payload:', formData)
    setIsSubmitted(true)
    setIsHuman(false)
    setFormData(INITIAL_FORM)

    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className="py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-sm p-2 sm:p-4 md:p-8">
          <h2 className="text-3xl font-extrabold text-emerald-600 sm:text-4xl lg:text-6xl">
            {config.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-black/70 sm:text-base">{config.desc}</p>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span>First Name *</span>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.firstName && <span className="text-xs text-red-300">{errors.firstName}</span>}
            </label>

            <label className="space-y-2 text-sm">
              <span>Last Name *</span>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.lastName && <span className="text-xs text-red-300">{errors.lastName}</span>}
            </label>

            <label className="space-y-2 text-sm">
              <span>Email *</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.email && <span className="text-xs text-red-300">{errors.email}</span>}
            </label>

            <label className="space-y-2 text-sm">
              <span>Company</span>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Phone</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
            </label>

            <label className="space-y-2 text-sm">
              <span>Region *</span>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              >
                <option value="">Select a region</option>
                {config.regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.region && <span className="text-xs text-red-300">{errors.region}</span>}
            </label>

            <label className="space-y-2 text-sm md:col-span-2">
              <span>Message / Comments *</span>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.message && <span className="text-xs text-red-300">{errors.message}</span>}
            </label>

            <div className="md:col-span-2">
              <label className="inline-flex w-full max-w-[22rem] cursor-pointer items-center gap-3 rounded-sm border border-black/20 bg-white px-4 py-3 text-sm">
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
              {errors.humanCheck && (
                <p className="mt-2 text-xs text-red-300">{errors.humanCheck}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={!isHuman}
                className="rounded-sm bg-[#7DC242] px-5 py-3 text-sm font-medium text-[#121417] hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/40 disabled:text-[#121417]/60"
              >
                Submit
              </button>
              {isSubmitted && <p className="text-sm text-[#7DC242]">Message sent successfully.</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
