import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import RecaptchaCheckboxField from '../ui/RecaptchaCheckboxField'

const INITIAL_FORM = {
  subject: '',
  product: '',
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  company: '',
  region: '',
  message: '',
  privacyConsent: false,
  website: '',
}

const FIELD_ORDER = [
  'subject',
  'product',
  'lastName',
  'firstName',
  'email',
  'phone',
  'company',
  'region',
  'message',
  'privacyConsent',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const defaultSubmitContactForm = async (payload) => {
  await sleep(900)
  // QA can reproduce the error state by using an email ending with @error.test.
  if (payload.email.toLowerCase().endsWith('@error.test')) {
    throw new Error('Unable to submit at the moment. Please try again.')
  }
}

const normalizePhoneDigits = (value) => value.replace(/[^\d]/g, '')
const SUCCESS_FEEDBACK_MESSAGE =
  'Your message has been sent successfully. Thank you for contacting us.'

const ContactFormSection = ({
  content,
  inquiryOptions,
  regionOptions,
  productOptions,
  onSubmitInquiry = defaultSubmitContactForm,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [recaptchaResetSignal, setRecaptchaResetSignal] = useState(0)
  const fieldRefs = useRef({})
  const statusRef = useRef(null)
  const isSuccessVisible = submitState === 'success' && Boolean(statusMessage)

  useEffect(() => {
    if (!isSuccessVisible) return undefined
    const timeoutId = window.setTimeout(() => {
      setSubmitState('idle')
      setStatusMessage('')
    }, 5000)
    return () => window.clearTimeout(timeoutId)
  }, [isSuccessVisible])

  const registerFieldRef = (name) => (node) => {
    if (!node) return
    fieldRefs.current[name] = node
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const updateCheckboxField = (event) => {
    const { name, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.subject) nextErrors.subject = 'Please select a subject.'
    if (!formData.product) nextErrors.product = 'Please select a product.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(formData.email.trim()))
      nextErrors.email = 'Please enter a valid email address.'
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.'
    else if (normalizePhoneDigits(formData.phone).length < 8)
      nextErrors.phone = 'Phone number must contain at least 8 digits.'
    if (!formData.company.trim()) nextErrors.company = 'Company name is required.'
    if (!formData.region) nextErrors.region = 'Please select a region.'
    if (!formData.message.trim()) nextErrors.message = 'Message is required.'
    else if (formData.message.trim().length < content.messageMinLength)
      nextErrors.message = `Message must be at least ${content.messageMinLength} characters.`
    if (!formData.privacyConsent)
      nextErrors.privacyConsent = 'You must agree to the privacy policy before submitting.'
    if (!captchaToken) nextErrors.captchaToken = 'Please complete reCAPTCHA verification.'

    return nextErrors
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

  const focusFirstError = (nextErrors) => {
    const firstErrorField = FIELD_ORDER.find((field) => Boolean(nextErrors[field]))
    if (!firstErrorField) return
    const node = fieldRefs.current[firstErrorField]
    if (!node) return
    node.focus()
    node.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const resetAfterSuccess = () => {
    setFormData(INITIAL_FORM)
    setErrors({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.website.trim()) {
      setSubmitState('error')
      setStatusMessage('Submission rejected.')
      return
    }

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error')
      setStatusMessage('Please fix the highlighted fields and submit again.')
      focusFirstError(nextErrors)
      return
    }

    setSubmitState('submitting')
    setStatusMessage('')

    try {
      await onSubmitInquiry({
        ...formData,
        source: 'contact',
        captchaToken,
      })
      setSubmitState('success')
      setStatusMessage(SUCCESS_FEEDBACK_MESSAGE)
      resetAfterSuccess()
      setCaptchaToken('')
      setRecaptchaResetSignal((value) => value + 1)
    } catch (error) {
      setSubmitState('error')
      setStatusMessage(error.message)
    } finally {
      statusRef.current?.focus()
    }
  }

  const getInputClassName = (name) =>
    `w-full rounded-md border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition ${
      errors[name]
        ? 'border-red-500 focus:border-red-600'
        : 'border-slate-300 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/15'
    }`

  return (
    <section className="bg-slate-100 p-6 sm:py-5 lg:py-10">
      <div className="mx-auto w-full max-w-7xl ">
        <div className="rounded-xl sm:p-8">
          <form noValidate onSubmit={handleSubmit} className="space-y-7">
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={formData.website}
              onChange={updateField}
              className="sr-only"
              aria-hidden="true"
            />

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Inquiry
              </legend>

              <label htmlFor="contact-subject" className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Subject of Inquiry *</span>
                <select
                  ref={registerFieldRef('subject')}
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={updateField}
                  className={getInputClassName('subject')}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                >
                  <option value="">Select a subject</option>
                  {inquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject ? (
                  <p id="contact-subject-error" className="text-sm text-red-600">
                    {errors.subject}
                  </p>
                ) : null}
              </label>

              <label htmlFor="contact-product" className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Product(s) *</span>
                <select
                  ref={registerFieldRef('product')}
                  id="contact-product"
                  name="product"
                  value={formData.product}
                  onChange={updateField}
                  className={getInputClassName('product')}
                  aria-invalid={Boolean(errors.product)}
                  aria-describedby={errors.product ? 'contact-product-error' : undefined}
                >
                  <option value="">Select a product</option>
                  {productOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.product ? (
                  <p id="contact-product-error" className="text-sm text-red-600">
                    {errors.product}
                  </p>
                ) : null}
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contact Details
              </legend>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label htmlFor="contact-lastName" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-800">Last Name *</span>
                  <input
                    ref={registerFieldRef('lastName')}
                    id="contact-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={updateField}
                    className={getInputClassName('lastName')}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={errors.lastName ? 'contact-lastName-error' : undefined}
                  />
                  {errors.lastName ? (
                    <p id="contact-lastName-error" className="text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  ) : null}
                </label>

                <label htmlFor="contact-firstName" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-800">First Name *</span>
                  <input
                    ref={registerFieldRef('firstName')}
                    id="contact-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={updateField}
                    className={getInputClassName('firstName')}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? 'contact-firstName-error' : undefined}
                  />
                  {errors.firstName ? (
                    <p id="contact-firstName-error" className="text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  ) : null}
                </label>
              </div>

              <label htmlFor="contact-email" className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Email *</span>
                <input
                  ref={registerFieldRef('email')}
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField}
                  className={getInputClassName('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email ? (
                  <p id="contact-email-error" className="text-sm text-red-600">
                    {errors.email}
                  </p>
                ) : null}
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label htmlFor="contact-phone" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-800">Phone Number *</span>
                  <input
                    ref={registerFieldRef('phone')}
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={updateField}
                    className={getInputClassName('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  {errors.phone ? (
                    <p id="contact-phone-error" className="text-sm text-red-600">
                      {errors.phone}
                    </p>
                  ) : null}
                </label>

                <label htmlFor="contact-company" className="block space-y-2">
                  <span className="text-sm font-medium text-slate-800">Company *</span>
                  <input
                    ref={registerFieldRef('company')}
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={updateField}
                    className={getInputClassName('company')}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'contact-company-error' : undefined}
                  />
                  {errors.company ? (
                    <p id="contact-company-error" className="text-sm text-red-600">
                      {errors.company}
                    </p>
                  ) : null}
                </label>
              </div>

              <label htmlFor="contact-region" className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Region *</span>
                <select
                  ref={registerFieldRef('region')}
                  id="contact-region"
                  name="region"
                  value={formData.region}
                  onChange={updateField}
                  className={getInputClassName('region')}
                  aria-invalid={Boolean(errors.region)}
                  aria-describedby={errors.region ? 'contact-region-error' : undefined}
                >
                  <option value="">Select a region</option>
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.region ? (
                  <p id="contact-region-error" className="text-sm text-red-600">
                    {errors.region}
                  </p>
                ) : null}
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Message
              </legend>

              <label htmlFor="contact-message" className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Message *</span>
                <textarea
                  ref={registerFieldRef('message')}
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={updateField}
                  rows={6}
                  className={getInputClassName('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="text-sm text-red-600">
                    {errors.message}
                  </p>
                ) : null}
              </label>
            </fieldset>

            <label
              htmlFor="contact-privacyConsent"
              className="flex items-start gap-3 text-sm text-slate-700"
            >
              <input
                ref={registerFieldRef('privacyConsent')}
                id="contact-privacyConsent"
                name="privacyConsent"
                type="checkbox"
                checked={formData.privacyConsent}
                onChange={updateCheckboxField}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#00B388] focus:ring-[#00B388]/35"
                aria-invalid={Boolean(errors.privacyConsent)}
                aria-describedby={
                  errors.privacyConsent ? 'contact-privacyConsent-error' : undefined
                }
              />
              <span>
                I agree to the{' '}
                <Link
                  to="/legal/privacy-policy"
                  className="font-medium text-slate-900 underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{' '}
                and consent to be contacted regarding my inquiry. *
              </span>
            </label>
            {errors.privacyConsent ? (
              <p id="contact-privacyConsent-error" className="text-sm text-red-600">
                {errors.privacyConsent}
              </p>
            ) : null}

            <RecaptchaCheckboxField
              className="pt-2"
              resetSignal={recaptchaResetSignal}
              onTokenChange={handleCaptchaTokenChange}
              errorMessage={errors.captchaToken}
            />

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#00B388] px-6 text-sm font-semibold text-white transition hover:bg-[#009a76] disabled:cursor-not-allowed disabled:bg-[#00B388]/45"
              >
                {submitState === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>

              <div
                className={`transform overflow-hidden transition-all duration-500 ease-out ${
                  isSuccessVisible ? 'max-h-24 translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'
                }`}
              >
                <p
                  ref={isSuccessVisible ? statusRef : null}
                  role="status"
                  tabIndex={-1}
                  className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                >
                  {statusMessage}
                </p>
              </div>

              {submitState === 'error' && statusMessage ? (
                <p ref={statusRef} role="alert" tabIndex={-1} className="text-sm text-red-600">
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

export default ContactFormSection
