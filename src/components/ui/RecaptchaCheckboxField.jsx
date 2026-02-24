import { useEffect, useMemo, useRef, useState } from 'react'

const RECAPTCHA_SCRIPT_ID = 'idtech-google-recaptcha-v2-script'
const RECAPTCHA_WAIT_TIMEOUT_MS = 8000
const RECAPTCHA_WAIT_POLL_MS = 50

let recaptchaScriptPromise = null

const isRecaptchaReady = () =>
  Boolean(
    window.grecaptcha &&
      typeof window.grecaptcha.render === 'function' &&
      typeof window.grecaptcha.ready === 'function',
  )

const waitForRecaptchaReady = () =>
  new Promise((resolve, reject) => {
    const deadline = Date.now() + RECAPTCHA_WAIT_TIMEOUT_MS

    const probe = () => {
      if (isRecaptchaReady()) {
        resolve(window.grecaptcha)
        return
      }

      if (Date.now() >= deadline) {
        reject(new Error('reCAPTCHA failed to initialize.'))
        return
      }

      window.setTimeout(probe, RECAPTCHA_WAIT_POLL_MS)
    }

    probe()
  })

const loadRecaptchaScript = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('reCAPTCHA requires a browser environment.'))
  }

  if (isRecaptchaReady()) {
    return Promise.resolve(window.grecaptcha)
  }

  if (recaptchaScriptPromise) return recaptchaScriptPromise

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const resolveWhenReady = () => {
      waitForRecaptchaReady().then(resolve).catch(reject)
    }

    const existingScript =
      document.getElementById(RECAPTCHA_SCRIPT_ID) ??
      document.querySelector('script[src*="www.google.com/recaptcha/api.js"]')

    if (existingScript instanceof HTMLScriptElement) {
      existingScript.addEventListener('load', resolveWhenReady, { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA script.')), {
        once: true,
      })
      resolveWhenReady()
      return
    }

    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.async = true
    script.defer = true
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.addEventListener('load', resolveWhenReady, { once: true })
    script.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA script.')), {
      once: true,
    })
    document.head.appendChild(script)
  })
    .catch((error) => {
      recaptchaScriptPromise = null
      throw error
    })

  return recaptchaScriptPromise
}

const RecaptchaCheckboxField = ({
  errorMessage = '',
  onTokenChange,
  resetSignal = 0,
  className = '',
}) => {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const prevResetSignalRef = useRef(resetSignal)
  const [runtimeError, setRuntimeError] = useState('')

  const siteKey = useMemo(() => String(import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '').trim(), [])
  const renderError = siteKey ? runtimeError : 'reCAPTCHA is not configured. Please set VITE_RECAPTCHA_SITE_KEY.'

  useEffect(() => {
    if (!siteKey) {
      onTokenChange('')
      return
    }

    let cancelled = false

    loadRecaptchaScript()
      .then((grecaptcha) => {
        if (cancelled) return
        if (!grecaptcha || typeof grecaptcha.render !== 'function') {
          throw new Error('reCAPTCHA failed to initialize.')
        }

        setRuntimeError('')

        grecaptcha.ready(() => {
          if (cancelled || widgetIdRef.current !== null || !containerRef.current) return
          try {
            widgetIdRef.current = grecaptcha.render(containerRef.current, {
              sitekey: siteKey,
              callback: (token) => onTokenChange(String(token ?? '')),
              'expired-callback': () => onTokenChange(''),
              'error-callback': () => onTokenChange(''),
            })
          } catch (error) {
            setRuntimeError(error instanceof Error ? error.message : 'reCAPTCHA failed to initialize.')
            onTokenChange('')
          }
        })
      })
      .catch((error) => {
        if (cancelled) return
        setRuntimeError(error.message || 'Unable to load reCAPTCHA.')
        onTokenChange('')
      })

    return () => {
      cancelled = true
    }
  }, [siteKey, onTokenChange])

  useEffect(() => {
    if (prevResetSignalRef.current === resetSignal) return
    prevResetSignalRef.current = resetSignal

    onTokenChange('')

    if (widgetIdRef.current === null) return
    if (!window.grecaptcha || typeof window.grecaptcha.reset !== 'function') return

    window.grecaptcha.reset(widgetIdRef.current)
  }, [resetSignal, onTokenChange])

  return (
    <div className={className}>
      <div ref={containerRef} />
      {renderError ? <p className="mt-2 text-xs text-red-500">{renderError}</p> : null}
      {!renderError ? (
        <p className="mt-2 text-[11px] text-black/45">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      ) : null}
      {errorMessage ? <p className="mt-2 text-xs text-red-500">{errorMessage}</p> : null}
    </div>
  )
}

export default RecaptchaCheckboxField
