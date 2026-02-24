import { request } from '../lib/request'

const fallbackKey = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const createIdempotencyKey = (prefix = 'submission') => {
  const normalizedPrefix = String(prefix ?? 'submission').trim() || 'submission'
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${normalizedPrefix}-${crypto.randomUUID()}`
  }
  return `${normalizedPrefix}-${fallbackKey()}`
}

export async function submitSubmissionToApi(submissionPayload, { idempotencyKey } = {}) {
  const normalizedKey = String(idempotencyKey ?? '').trim()

  const response = await request('/api/submissions', {
    method: 'POST',
    headers: normalizedKey ? { 'Idempotency-Key': normalizedKey } : {},
    body: {
      ...submissionPayload,
      ...(normalizedKey ? { idempotencyKey: normalizedKey } : {}),
    },
  })

  const data = response?.data ?? {}

  return {
    code: typeof response?.code === 'number' ? response.code : -1,
    message: response?.message ?? '',
    submission: data?.submission ?? null,
    replayed: Boolean(data?.replayed),
  }
}

export async function submitCareerSubmissionToApi({
  firstName,
  lastName,
  email,
  phone,
  message,
  captchaToken,
  website = '',
  payload = {},
  resume,
}, { idempotencyKey } = {}) {
  const normalizedKey = String(idempotencyKey ?? '').trim()
  const formData = new FormData()

  formData.set('source', 'career')
  formData.set('firstName', String(firstName ?? '').trim())
  formData.set('lastName', String(lastName ?? '').trim())
  formData.set('email', String(email ?? '').trim())
  formData.set('phone', String(phone ?? '').trim())
  formData.set('message', String(message ?? '').trim())
  formData.set('captchaToken', String(captchaToken ?? '').trim())
  formData.set('website', String(website ?? '').trim())
  formData.set('payload', JSON.stringify(payload ?? {}))

  if (normalizedKey) {
    formData.set('idempotencyKey', normalizedKey)
  }

  if (resume instanceof File || resume instanceof Blob) {
    const fileName = resume instanceof File ? resume.name : 'resume.pdf'
    formData.set('resume', resume, fileName)
  }

  const response = await request('/api/submissions', {
    method: 'POST',
    headers: normalizedKey ? { 'Idempotency-Key': normalizedKey } : {},
    body: formData,
  })

  const data = response?.data ?? {}

  return {
    code: typeof response?.code === 'number' ? response.code : -1,
    message: response?.message ?? '',
    submission: data?.submission ?? null,
    replayed: Boolean(data?.replayed),
  }
}
