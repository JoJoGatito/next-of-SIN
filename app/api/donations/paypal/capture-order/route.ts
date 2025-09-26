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

type CaptureOrderRequest = {
  orderId?: unknown
}

type CaptureResponse = {
  id?: string
  status?: string
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id?: string
        status?: string
      }>
    }
  }>
}

const ensureConfig = (): PaypalConfig => {
  try {
    return resolvePaypalConfig()
  } catch (error) {
    console.error('[paypal][capture-order] Missing configuration', { error })
    throw new Error('PayPal credentials are not configured on the server.')
  }
}

export async function POST(request: Request) {
  let payload: CaptureOrderRequest
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const { orderId } = payload

  if (typeof orderId !== 'string' || orderId.trim().length === 0) {
    return NextResponse.json(
      { error: 'A valid PayPal order ID is required.' },
      { status: 400 },
    )
  }

  const config = ensureConfig()

  try {
    const token = await obtainPaypalAccessToken(config)

    console.log('[paypal][capture-order] Capturing PayPal order', {
      orderId,
      environment: config.environment,
    })

    const capture = await paypalApiFetch<CaptureResponse>(
      config,
      token,
      `/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
      { method: 'POST' },
    )

    if (!capture?.status) {
      console.error('[paypal][capture-order] Capture response missing status', { capture })
      return NextResponse.json(
        { error: 'Failed to capture PayPal order. Please contact support.' },
        { status: 502 },
      )
    }

    const captureId =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? null
    const captureStatus =
      capture.purchase_units?.[0]?.payments?.captures?.[0]?.status ?? null

    console.log('[paypal][capture-order] Capture completed', {
      orderId: capture.id,
      status: capture.status,
      captureId,
      captureStatus,
    })

    return NextResponse.json(
      {
        orderId: capture.id,
        status: capture.status,
        captureId,
        captureStatus,
      },
      { status: 200 },
    )
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected error while capturing PayPal order.'
    console.error('[paypal][capture-order] Error capturing order', {
      orderId,
      error,
    })

    const statusCode =
      message === 'PayPal credentials are not configured on the server.' ? 500 : 502

    return NextResponse.json({ error: message }, { status: statusCode })
  }
}