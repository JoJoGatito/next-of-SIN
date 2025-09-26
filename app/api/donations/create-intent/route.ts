import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

let stripeClient: Stripe | null = null

const getStripe = (secretKey: string): Stripe => {
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
    })
  }
  return stripeClient
}

type CreateIntentRequest = {
  amount?: unknown
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe secret key is not configured on the server.' },
      { status: 500 },
    )
  }

  let payload: CreateIntentRequest
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 },
    )
  }

  const { amount } = payload

  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return NextResponse.json(
      { error: 'Amount must be a numeric value in cents.' },
      { status: 400 },
    )
  }

  const sanitizedAmount = Math.round(amount)

  if (sanitizedAmount < 100) {
    return NextResponse.json(
      { error: 'Amount must be at least 100 cents ($1.00).' },
      { status: 400 },
    )
  }

  try {
    const stripe = getStripe(secretKey)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sanitizedAmount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        donationType: 'onetime',
        source: 'donate_page',
      },
    })

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe did not return a client secret.')
    }

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 },
    )
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unable to create Stripe payment intent.'

    return NextResponse.json(
      { error: message },
      { status: 500 },
    )
  }
}