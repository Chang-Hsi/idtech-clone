import { createIdempotencyKey, submitSubmissionToApi } from './submissionsApi'

export async function submitLeadFormToApi(payload) {
  const response = await submitSubmissionToApi(
    {
      source: 'lead',
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      captchaToken: payload.captchaToken,
      website: payload.website,
      payload: {
        company: payload.company,
        region: payload.region,
      },
    },
    {
      idempotencyKey: payload.idempotencyKey || createIdempotencyKey('lead'),
    },
  )

  return {
    code: response.code,
    message: response.message,
    lead: response.submission,
    replayed: response.replayed,
  }
}
