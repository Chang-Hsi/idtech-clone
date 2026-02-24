import { request } from '../lib/request'
import { createIdempotencyKey, submitSubmissionToApi } from './submissionsApi'

export async function fetchContactPageFromApi() {
  const payload = await request('/api/contact', { cache: 'no-store' })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    contactPage: data?.contactPage ?? null,
  }
}

export async function submitContactInquiryToApi(inquiryPayload) {
  const response = await submitSubmissionToApi(
    {
      source: 'contact',
      firstName: inquiryPayload.firstName,
      lastName: inquiryPayload.lastName,
      email: inquiryPayload.email,
      phone: inquiryPayload.phone,
      message: inquiryPayload.message,
      captchaToken: inquiryPayload.captchaToken,
      website: inquiryPayload.website,
      payload: {
        subject: inquiryPayload.subject,
        product: inquiryPayload.product,
        company: inquiryPayload.company,
        region: inquiryPayload.region,
        privacyConsent: Boolean(inquiryPayload.privacyConsent),
      },
    },
    {
      idempotencyKey: inquiryPayload.idempotencyKey || createIdempotencyKey('contact'),
    },
  )

  return {
    code: response.code,
    message: response.message,
    inquiry: response.submission,
    replayed: response.replayed,
  }
}
