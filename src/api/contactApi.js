import { request } from '../lib/request'

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
  const payload = await request('/api/contact/inquiries', {
    method: 'POST',
    body: inquiryPayload,
  })
  const data = payload?.data ?? {}

  return {
    code: typeof payload?.code === 'number' ? payload.code : -1,
    message: payload?.message ?? '',
    inquiry: data?.inquiry ?? null,
  }
}
