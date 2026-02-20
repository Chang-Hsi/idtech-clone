import { useState } from 'react'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  region: '',
  message: '',
  website: '',
}

const LeadFormSection = ({ config }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [isHumanChecked, setIsHumanChecked] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHumanCheck = (event) => {
    setIsHumanChecked(event.target.checked)
    setErrors((prev) => {
      if (!prev.humanCheck) return prev
      const next = { ...prev }
      delete next.humanCheck
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.firstName.trim()) nextErrors.firstName = 'This field is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'This field is required.'
    if (!formData.email.trim()) nextErrors.email = 'This field is required.'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Invalid email'
    }
    if (!formData.region.trim()) nextErrors.region = 'This field is required.'
    if (!formData.message.trim()) nextErrors.message = 'This field is required.'
    if (!isHumanChecked) nextErrors.humanCheck = 'Please verify you are not a robot.'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    if (formData.website.trim()) {
      setSubmitState('error')
      setStatusMessage('Unable to submit right now.')
      return
    }

    setSubmitState('submitting')
    setStatusMessage('Submitting...')

    await new Promise((resolve) => setTimeout(resolve, 450))

    setSubmitState('success')
    setStatusMessage('Message sent successfully.')
    setFormData(INITIAL_FORM)
    setIsHumanChecked(false)
  }

  return (
    <section className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-sm p-2 sm:p-4 md:p-8">
          <h2 className="text-3xl font-extrabold text-emerald-600 sm:text-4xl lg:text-6xl">
            {config.heading}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-black/70 sm:text-base">{config.desc}</p>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="sr-only"
              aria-hidden="true"
            />

            <label className="space-y-2 text-sm">
              <span>First Name *</span>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
            </label>

            <label className="space-y-2 text-sm">
              <span>Last Name *</span>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
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
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
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
              {errors.region && <span className="text-xs text-red-500">{errors.region}</span>}
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
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </label>

            <div className="md:col-span-2">
              <label
                htmlFor="lead-human-check"
                className={`flex w-full max-w-[380px] cursor-pointer items-center justify-between rounded-sm border px-4 py-3 transition ${
                  errors.humanCheck ? 'border-red-300 bg-red-50' : 'border-black/20 bg-white hover:border-black/35'
                }`}
              >
                <span className="flex items-center gap-3 text-sm text-black/80">
                  <input
                    id="lead-human-check"
                    type="checkbox"
                    checked={isHumanChecked}
                    onChange={handleHumanCheck}
                    className="h-4 w-4 rounded border-black/30 accent-[#7DC242]"
                  />
                  I'm not a robot
                </span>
                <span className="text-[11px] uppercase tracking-wide text-black/40">Simulated</span>
              </label>
              {errors.humanCheck && <p className="mt-2 text-xs text-red-500">{errors.humanCheck}</p>}
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="rounded-sm bg-[#7DC242] px-5 py-3 text-sm font-medium text-[#121417] hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/40 disabled:text-[#121417]/60"
              >
                {submitState === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
              {statusMessage ? (
                <p
                  className={`text-sm ${
                    submitState === 'success'
                      ? 'text-[#2f7f18]'
                      : submitState === 'error'
                        ? 'text-red-500'
                        : 'text-black/60'
                  }`}
                >
                  {statusMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
