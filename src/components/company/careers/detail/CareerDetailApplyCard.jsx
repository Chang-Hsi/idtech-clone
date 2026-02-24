import { useCallback, useEffect, useState } from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { createIdempotencyKey, submitCareerSubmissionToApi } from '../../../../api/submissionsApi'
import useInViewOnce from '../../../../hooks/useInViewOnce'
import RecaptchaCheckboxField from '../../../ui/RecaptchaCheckboxField'

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  resume: null,
  website: '',
}

const SUCCESS_FEEDBACK_MESSAGE =
  'Your message has been sent successfully. Thank you for your interest in joining us.'

const CareerDetailApplyCard = ({ job }) => {
  const { ref, isInView } = useInViewOnce()
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

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, resume: file }))
    setErrors((prev) => {
      if (!prev.resume) return prev
      const next = { ...prev }
      delete next.resume
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
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      nextErrors.email = 'Invalid email'
    if (!formData.phone.trim()) nextErrors.phone = 'This field is required.'
    if (formData.phone.trim() && formData.phone.replace(/[^\d]/g, '').length < 8)
      nextErrors.phone = 'Phone number must contain at least 8 digits.'
    if (!formData.resume) nextErrors.resume = 'Please upload your resume.'
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
      await submitCareerSubmissionToApi({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: `Career application for ${job.title}`,
        captchaToken,
        website: formData.website,
        resume: formData.resume,
        payload: {
          jobSlug: job.slug,
          jobTitle: job.title,
          applyEmail: job.applyEmail,
          employmentType: job.employmentType,
          region: job.region,
        },
      }, {
        idempotencyKey: createIdempotencyKey('career'),
      })

      setSubmitState('success')
      setStatusMessage(SUCCESS_FEEDBACK_MESSAGE)
      setCaptchaToken('')
      setRecaptchaResetSignal((value) => value + 1)
      setFormData(INITIAL_FORM)
    } catch (error) {
      setSubmitState('error')
      setStatusMessage(error.message || 'Unable to submit your application right now.')
    }
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
        <input
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
        />

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

        <RecaptchaCheckboxField
          resetSignal={recaptchaResetSignal}
          onTokenChange={handleCaptchaTokenChange}
          errorMessage={errors.captchaToken}
        />

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={submitState === 'submitting'}
            className="w-fit rounded-sm bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#121417] transition-colors hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/50 disabled:text-[#121417]/60"
          >
            {submitState === 'submitting' ? 'Submitting...' : 'Submit Application'}
          </button>
          <div
            className={`transform overflow-hidden transition-all duration-500 ease-out ${
              isSuccessVisible ? 'max-h-24 translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'
            }`}
          >
            <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </p>
          </div>

          {submitState === 'error' && statusMessage ? (
            <p className="text-center text-sm text-red-500">{statusMessage}</p>
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
