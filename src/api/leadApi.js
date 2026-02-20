import { request } from '../lib/request'

export async function submitLeadFormToApi(payload) {
  const response = await request('/api/leads', {
    method: 'POST',
    body: payload,
  })

  const data = response?.data ?? {}

  return {
    code: typeof response?.code === 'number' ? response.code : -1,
    message: response?.message ?? '',
    lead: data?.lead ?? null,
  }
}
