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

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('[DonationsWebhook] Missing STRIPE_WEBHOOK_SECRET environment variable.')
    return NextResponse.json(
      { error: 'Stripe webhook secret is not configured.' },
      { status: 400 },
    )
  }

  if (!secretKey) {
    console.error('[DonationsWebhook] Missing STRIPE_SECRET_KEY environment variable.')
    return NextResponse.json(
      { error: 'Stripe secret key is not configured on the server.' },
      { status: 500 },
    )
  }

  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[DonationsWebhook] Missing stripe-signature header.')
    return NextResponse.json(
      { error: 'Missing Stripe signature header.' },
      { status: 400 },
    )
  }

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    const stripe = getStripe(secretKey)
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('[DonationsWebhook] Signature verification failed.', error)
    return NextResponse.json(
      { error: 'Invalid Stripe signature.' },
      { status: 400 },
    )
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      const metadata = paymentIntent.metadata ?? {}
      const metadataIds = Object.fromEntries(
        Object.entries(metadata).filter(([key]) => key.toLowerCase().endsWith('id')),
      )

      console.info('[DonationsWebhook] payment_intent.succeeded', {
        intentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadataIds,
        livemode: event.livemode,
      })

      // TODO: Replace console logging with centralized telemetry once available.
      break
    }
    default: {
      console.info('[DonationsWebhook] Event received', {
        eventType: event.type,
        eventId: event.id,
        livemode: event.livemode,
      })
      break
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}