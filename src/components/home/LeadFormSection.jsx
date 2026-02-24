import { useCallback, useEffect, useState } from 'react'
import { submitLeadFormToApi } from '../../api/leadApi'
import { createIdempotencyKey } from '../../api/submissionsApi'
import RecaptchaCheckboxField from '../ui/RecaptchaCheckboxField'

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

const SUCCESS_FEEDBACK_MESSAGE =
  'Your message has been sent successfully. Thank you for reaching out to our team.'

const LeadFormSection = ({ config }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [recaptchaResetSignal, setRecaptchaResetSignal] = useState(0)
  const isSuccessVisible = submitState === 'success' && Boolean(statusMessage)

  useEffect(() => {
    if (!isSuccessVisible) return undefined
    const timeoutId = window.setTimeout(() => {
      setSubmitState('idle')
      setStatusMessage('')
    }, 5000)
    return () => window.clearTimeout(timeoutId)
  }, [isSuccessVisible])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleCaptchaTokenChange = useCallback((token) => {
    setCaptchaToken(String(token ?? '').trim())
    setErrors((prev) => {
      if (!prev.captchaToken) return prev
      const next = { ...prev }
      delete next.captchaToken
      return next
    })
  }, [])

  const validate = () => {
    const nextErrors = {}

    if (!formData.firstName.trim()) nextErrors.firstName = 'This field is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'This field is required.'
    if (!formData.email.trim()) nextErrors.email = 'This field is required.'
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Invalid email'
    }
    if (!formData.phone.trim()) nextErrors.phone = 'This field is required.'
    if (formData.phone.trim() && formData.phone.replace(/[^\d]/g, '').length < 8) {
      nextErrors.phone = 'Phone number must contain at least 8 digits.'
    }
    if (!formData.region.trim()) nextErrors.region = 'This field is required.'
    if (!formData.message.trim()) nextErrors.message = 'This field is required.'
    if (!captchaToken) nextErrors.captchaToken = 'Please complete reCAPTCHA verification.'

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
    setStatusMessage('')

    try {
      await submitLeadFormToApi({
        ...formData,
        captchaToken,
        idempotencyKey: createIdempotencyKey('lead'),
      })

      setSubmitState('success')
      setStatusMessage(SUCCESS_FEEDBACK_MESSAGE)
      setFormData(INITIAL_FORM)
      setCaptchaToken('')
      setRecaptchaResetSignal((value) => value + 1)
    } catch (error) {
      setSubmitState('error')
      setStatusMessage(error.message || 'Unable to submit right now.')
    }
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
              <span>Phone *</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-sm border border-black/20 bg-[#fff] px-3 py-2 outline-none focus:border-[#7DC242]"
              />
              {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
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
              <RecaptchaCheckboxField
                resetSignal={recaptchaResetSignal}
                onTokenChange={handleCaptchaTokenChange}
                errorMessage={errors.captchaToken}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="rounded-sm bg-[#7DC242] px-5 py-3 text-sm font-medium text-[#121417] hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/40 disabled:text-[#121417]/60"
              >
                {submitState === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>

              <div
                className={`mt-3 transform overflow-hidden transition-all duration-500 ease-out ${
                  isSuccessVisible ? 'max-h-24 translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'
                }`}
              >
                <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {statusMessage}
                </p>
              </div>

              {submitState === 'error' && statusMessage ? (
                <p className="mt-3 text-sm text-red-500">{statusMessage}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
