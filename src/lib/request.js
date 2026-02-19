const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

const toAbsoluteUrl = (path) => {
  const normalizedBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export async function request(path, options = {}) {
  const { method = 'GET', headers = {}, body, signal, ...fetchOptions } = options

  const response = await fetch(toAbsoluteUrl(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
    ...fetchOptions,
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message =
      (isJson && (payload?.message || payload?.error)) ||
      `Request failed: ${response.status} ${response.statusText}`
    throw new Error(message)
  }

  return payload
}
