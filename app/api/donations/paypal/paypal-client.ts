export type PaypalEnvironment = 'sandbox' | 'live'

export type PaypalConfig = {
  clientId: string
  clientSecret: string
  environment: PaypalEnvironment
  baseUrl: string
}

type OAuthTokenResponse = {
  access_token?: string
  token_type?: string
  expires_in?: number
  error?: string
  error_description?: string
}

const BASE_URL_BY_ENV: Record<PaypalEnvironment, string> = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
}

let cachedToken: {
  token: string
  expiresAt: number
  key: string
} | null = null

const isTokenValid = (key: string): boolean => {
  if (!cachedToken) return false
  if (cachedToken.key !== key) return false
  return Date.now() < cachedToken.expiresAt
}

const buildCacheKey = (config: PaypalConfig): string =>
  `${config.environment}:${config.clientId.slice(-6)}`

export const resolvePaypalConfig = (): PaypalConfig => {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const rawEnvironment = process.env.PAYPAL_ENVIRONMENT?.toLowerCase() ?? 'live'

  if (!clientId || !clientSecret) {
    throw new Error('PayPal client credentials are not fully configured.')
  }

  const environment: PaypalEnvironment =
    rawEnvironment === 'sandbox' ? 'sandbox' : 'live'

  if (rawEnvironment !== 'sandbox' && rawEnvironment !== 'live') {
    console.warn(
      '[paypal] Invalid PAYPAL_ENVIRONMENT provided. Falling back to live environment.',
      { provided: rawEnvironment },
    )
  }

  return {
    clientId,
    clientSecret,
    environment,
    baseUrl: BASE_URL_BY_ENV[environment],
  }
}

export const obtainPaypalAccessToken = async (config: PaypalConfig): Promise<string> => {
  const cacheKey = buildCacheKey(config)

  if (isTokenValid(cacheKey)) {
    return cachedToken!.token
  }

  const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')
  const response = await fetch(`${config.baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => null)
    console.error('[paypal] Failed to obtain OAuth token', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })
    throw new Error('Unable to authenticate with PayPal.')
  }

  const data = (await response.json().catch(() => ({}))) as OAuthTokenResponse

  if (!data.access_token || typeof data.access_token !== 'string') {
    console.error('[paypal] OAuth response missing access token', { data })
    throw new Error('PayPal authentication response was malformed.')
  }

  const expiresIn = typeof data.expires_in === 'number' ? data.expires_in : 0
  cachedToken = {
    token: data.access_token,
    key: cacheKey,
    expiresAt: Date.now() + Math.max(0, expiresIn - 60) * 1000,
  }

  console.log('[paypal] OAuth token obtained', {
    environment: config.environment,
    expiresIn,
  })

  return data.access_token
}

export const paypalApiFetch = async <T>(
  config: PaypalConfig,
  accessToken: string,
  path: string,
  init: RequestInit = {},
): Promise<T> => {
  const { headers, ...rest } = init

  const response = await fetch(`${config.baseUrl}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...Object.fromEntries(new Headers(headers ?? {})),
    },
  })

  if (!response.ok) {
    const errorPayload = await response.text().catch(() => null)
    console.error('[paypal] API request failed', {
      path,
      status: response.status,
      statusText: response.statusText,
      body: errorPayload,
    })
    throw new Error('PayPal API request failed.')
  }

  return (await response.json()) as T
}