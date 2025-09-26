import { NextResponse } from 'next/server'
import {
  obtainPaypalAccessToken,
  paypalApiFetch,
  resolvePaypalConfig,
  type PaypalConfig,
} from '../paypal-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type CreateOrderRequest = {
  amount?: unknown
}

type CreateOrderResponse = {
  id?: string
  status?: string
}

const MINIMUM_AMOUNT_CENTS = 100

const ensureConfig = (): PaypalConfig => {
  try {
    return resolvePaypalConfig()
  } catch (error) {
    console.error('[paypal][create-order] Missing configuration', { error })
    throw new Error('PayPal credentials are not configured on the server.')
  }
}

export async function POST(request: Request) {
  let payload: CreateOrderRequest
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const { amount } = payload

  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return NextResponse.json(
      { error: 'Amount must be provided in cents as a numeric value.' },
      { status: 400 },
    )
  }

  const sanitizedAmount = Math.round(amount)

  if (sanitizedAmount < MINIMUM_AMOUNT_CENTS) {
    return NextResponse.json(
      { error: 'Amount must be at least 100 cents ($1.00).' },
      { status: 400 },
    )
  }

  const config = ensureConfig()

  try {
    const token = await obtainPaypalAccessToken(config)
    const amountValue = (sanitizedAmount / 100).toFixed(2)

    console.log('[paypal][create-order] Creating PayPal order', {
      amountCents: sanitizedAmount,
      amountValue,
      environment: config.environment,
    })

    const order = await paypalApiFetch<CreateOrderResponse>(config, token, '/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amountValue,
            },
            custom_id: `donation:onetime:donate_page:${sanitizedAmount}`,
          },
        ],
        application_context: {
          user_action: 'PAY_NOW',
        },
      }),
    })

    if (!order?.id || typeof order.id !== 'string') {
      console.error('[paypal][create-order] Order response missing id', { order })
      return NextResponse.json(
        { error: 'Failed to create PayPal order. Please try again.' },
        { status: 502 },
      )
    }

    console.log('[paypal][create-order] Order created', {
      orderId: order.id,
      status: order.status,
    })

    return NextResponse.json({ orderId: order.id }, { status: 200 })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected error while creating PayPal order.'
    console.error('[paypal][create-order] Error creating order', {
      error,
    })

    const statusCode =
      message === 'PayPal credentials are not configured on the server.' ? 500 : 502

    return NextResponse.json({ error: message }, { status: statusCode })
  }
}