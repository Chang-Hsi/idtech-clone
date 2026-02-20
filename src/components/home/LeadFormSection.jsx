import { useEffect, useRef, useState } from 'react'
import { submitLeadFormToApi } from '../../api/leadApi'

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script'
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

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

const loadTurnstileScript = () =>
  new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile)
      return
    }

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.turnstile), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Turnstile script')),
        {
          once: true,
        }
      )
      return
    }

    const script = document.createElement('script')
    script.id = TURNSTILE_SCRIPT_ID
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => reject(new Error('Failed to load Turnstile script'))
    document.head.appendChild(script)
  })

const LeadFormSection = ({ config }) => {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [captchaReady, setCaptchaReady] = useState(false)
  const turnstileContainerRef = useRef(null)
  const turnstileWidgetIdRef = useRef(null)

  useEffect(() => {
    let mounted = true

    const setupTurnstile = async () => {
      if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) return

      try {
        const turnstile = await loadTurnstileScript()
        if (!mounted || !turnstile || !turnstileContainerRef.current) return

        if (turnstileWidgetIdRef.current !== null) {
          turnstile.remove(turnstileWidgetIdRef.current)
          turnstileWidgetIdRef.current = null
        }

        turnstileWidgetIdRef.current = turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          callback: (token) => {
            if (!mounted) return
            setTurnstileToken(token)
            setErrors((prev) => {
              if (!prev.humanCheck) return prev
              const next = { ...prev }
              delete next.humanCheck
              return next
            })
          },
          'expired-callback': () => {
            if (!mounted) return
            setTurnstileToken('')
          },
          'error-callback': () => {
            if (!mounted) return
            setTurnstileToken('')
            setErrors((prev) => ({
              ...prev,
              humanCheck: 'Captcha verification failed. Please retry.',
            }))
          },
        })

        setCaptchaReady(true)
      } catch (error) {
        if (!mounted) return
        setCaptchaReady(false)
        setErrors((prev) => ({
          ...prev,
          humanCheck: 'Captcha is unavailable. Please retry later.',
        }))
        console.log(error)
      }
    }

    setupTurnstile()

    return () => {
      mounted = false
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
      }
    }
  }, [])

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
    if (!TURNSTILE_SITE_KEY) nextErrors.humanCheck = 'Captcha is not configured.'
    else if (!turnstileToken) nextErrors.humanCheck = 'Please complete captcha verification.'

    return nextErrors
  }

  const resetCaptcha = () => {
    if (!window.turnstile || turnstileWidgetIdRef.current === null) return
    window.turnstile.reset(turnstileWidgetIdRef.current)
    setTurnstileToken('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setSubmitState('submitting')
    setStatusMessage('Submitting...')

    try {
      await submitLeadFormToApi({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        region: formData.region.trim(),
        message: formData.message.trim(),
        captchaToken: turnstileToken,
        website: formData.website.trim(),
      })

      setSubmitState('success')
      setStatusMessage('Message sent successfully.')
      setFormData(INITIAL_FORM)
      resetCaptcha()
    } catch (error) {
      setSubmitState('error')
      setStatusMessage(error.message || 'Unable to submit right now.')
      resetCaptcha()
    }
  }

  return (
    <section className="py-12 text-black md:py-16 bg-white">
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
              <div
                className={`rounded-sm border px-4 py-3 ${
                  errors.humanCheck ? 'border-red-300 bg-red-50/30' : 'border-black/20 bg-white'
                }`}
              >
                <div ref={turnstileContainerRef} />
                {!captchaReady && TURNSTILE_SITE_KEY ? (
                  <p className="mt-2 text-xs text-black/50">Loading captcha...</p>
                ) : null}
              </div>
              {errors.humanCheck && (
                <p className="mt-2 text-xs text-red-300">{errors.humanCheck}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={submitState === 'submitting' || !TURNSTILE_SITE_KEY}
                className="rounded-sm bg-[#7DC242] px-5 py-3 text-sm font-medium text-[#121417] hover:bg-[#93d25b] disabled:cursor-not-allowed disabled:bg-[#7DC242]/40 disabled:text-[#121417]/60"
              >
                {submitState === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
              {statusMessage ? (
                <p
                  className={`text-sm ${
                    submitState === 'success'
                      ? 'text-[#7DC242]'
                      : submitState === 'error'
                        ? 'text-red-400'
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
