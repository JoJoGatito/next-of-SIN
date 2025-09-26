'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, CreditCard, Gift, Heart, Loader2 } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

type DonationType = 'monthly' | 'onetime'

const MINIMUM_ONETIME_DONATION_CENTS = 100

type PayPalButtonsActions = {
  enable: () => void
  disable: () => void
}

type PayPalButtonsInstance = {
  render: (container: HTMLElement) => Promise<void> | void
  close: () => Promise<void> | void
}

type PayPalButtonsOptions = {
  style?: Record<string, unknown>
  onInit?: (data: Record<string, unknown>, actions: PayPalButtonsActions) => void
  onClick?: () => void
  onCancel?: (data: Record<string, unknown>) => void
  createOrder: (data: Record<string, unknown>, actions: Record<string, unknown>) => Promise<string>
  onApprove: (data: { orderID?: string }) => Promise<void>
  onError?: (error: unknown) => void
}

type PayPalNamespace = {
  Buttons: (options: PayPalButtonsOptions) => PayPalButtonsInstance
}

declare global {
  interface Window {
    paypal?: PayPalNamespace
  }
}

let paypalSdkPromise: Promise<PayPalNamespace> | null = null

const loadPaypalSdk = async (clientId: string): Promise<PayPalNamespace> => {
  if (typeof window === 'undefined') {
    throw new Error('PayPal SDK can only be loaded in the browser.')
  }

  if (window.paypal) {
    return window.paypal
  }

  if (paypalSdkPromise) {
    return paypalSdkPromise
  }

  paypalSdkPromise = new Promise<PayPalNamespace>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>('script[data-paypal-sdk="true"]')

    const handleLoad = () => {
      if (window.paypal) {
        resolve(window.paypal)
      } else {
        reject(new Error('PayPal SDK loaded without exposing the paypal namespace.'))
      }
    }

    const handleError = () => {
      script?.remove()
      reject(new Error('Failed to load the PayPal SDK script.'))
    }

    if (!script) {
      script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
        clientId,
      )}&currency=USD&intent=CAPTURE`
      script.async = true
      script.dataset.paypalSdk = 'true'
      document.head.appendChild(script)
    }

    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })
  }).catch((error) => {
    paypalSdkPromise = null
    throw error
  })

  return paypalSdkPromise
}

type OneTimePaymentFormProps = {
  amount: number
  isSubmitting: boolean
  setIsSubmitting: (value: boolean) => void
  setPaymentErrorMessage: (value: string | null) => void
  setPaymentSuccessMessage: (value: string | null) => void
}

function OneTimePaymentForm({
  amount,
  isSubmitting,
  setIsSubmitting,
  setPaymentErrorMessage,
  setPaymentSuccessMessage,
}: OneTimePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setPaymentErrorMessage(null)
    setPaymentSuccessMessage(null)

    if (!stripe || !elements) {
      setPaymentErrorMessage('Stripe has not finished loading. Please try again in a moment.')
      return
    }

    try {
      setIsSubmitting(true)

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: 'if_required',
      })

      if (error) {
        setPaymentErrorMessage(error.message ?? 'Payment failed. Please try again.')
        return
      }

      if (!paymentIntent) {
        setPaymentErrorMessage('Payment status is unknown. Please contact us to confirm.')
        return
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setPaymentSuccessMessage('Thank you! Your donation was processed successfully.')
          break
        case 'processing':
          setPaymentSuccessMessage('Your donation is processing. We will email you once it completes.')
          break
        case 'requires_payment_method':
          setPaymentErrorMessage('Your payment was not completed. Please choose a different payment method.')
          break
        default:
          setPaymentErrorMessage(
            `Payment status: ${paymentIntent.status}. Please contact support if this persists.`,
          )
      }
    } catch (error) {
      setPaymentErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while confirming your payment. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: 'tabs' }} />
      <button
        type="submit"
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
        disabled={isSubmitting || !stripe || !elements}
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <CreditCard className="h-5 w-5" />
        )}
        {isSubmitting ? 'Processing donation...' : `Donate $${amount}`}
      </button>
    </form>
  )
}

export default function DonatePage() {
  const [donationType, setDonationType] = useState<DonationType>('onetime')
  const [amount, setAmount] = useState<number>(25)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isPreparingIntent, setIsPreparingIntent] = useState(false)
  const [intentError, setIntentError] = useState<string | null>(null)
  const [configurationWarning, setConfigurationWarning] = useState<string | null>(null)
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null)
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(null)
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false)
  const [isPaypalScriptLoading, setIsPaypalScriptLoading] = useState(false)
  const [paypalScriptError, setPaypalScriptError] = useState<string | null>(null)
  const [paypalStatusMessage, setPaypalStatusMessage] = useState<string | null>(null)
  const [paypalSuccessMessage, setPaypalSuccessMessage] = useState<string | null>(null)
  const [paypalErrorMessage, setPaypalErrorMessage] = useState<string | null>(null)
  const [isPaypalProcessing, setIsPaypalProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const stripePromise = useMemo(() => {
    if (!publishableKey) return null
    return loadStripe(publishableKey)
  }, [publishableKey])

  const paypalContainerRef = useRef<HTMLDivElement | null>(null)
  const paypalButtonsInstanceRef = useRef<PayPalButtonsInstance | null>(null)
  const paypalActionsRef = useRef<PayPalButtonsActions | null>(null)

  const suggestedAmounts = [10, 25, 50, 100, 250]
  const amountInCents = Math.max(0, Math.round(amount * 100))

  const amountRef = useRef(amountInCents)

  useEffect(() => {
    amountRef.current = amountInCents
  }, [amountInCents])

  useEffect(() => {
    setPaymentSuccessMessage(null)
    setPaymentErrorMessage(null)
    setPaypalStatusMessage(null)
    setPaypalSuccessMessage(null)
    setPaypalErrorMessage(null)
    setPaypalScriptError(null)
    setIsPaypalProcessing(false)
    setPaymentMethod('stripe')
  }, [donationType, amountInCents])

  useEffect(() => {
    if (donationType !== 'onetime') {
      setClientSecret(null)
      setIntentError(null)
      setConfigurationWarning(null)
      setIsPreparingIntent(false)

      // Clean up PayPal buttons when switching to monthly
      if (paypalButtonsInstanceRef.current) {
        paypalButtonsInstanceRef.current.close()
        paypalButtonsInstanceRef.current = null
        paypalActionsRef.current = null
      }

      return
    }

    if (!publishableKey) {
      setConfigurationWarning(
        'Secure one-time checkout is currently unavailable because Stripe keys are not configured.',
      )
      setClientSecret(null)
      setIntentError(null)
      setIsPreparingIntent(false)
      return
    }

    setConfigurationWarning(null)

    if (amountInCents < MINIMUM_ONETIME_DONATION_CENTS) {
      setIntentError('Please enter an amount of at least $1.00 for one-time donations.')
      setClientSecret(null)
      setIsPreparingIntent(false)
      return
    }

    let cancelled = false
    const controller = new AbortController()

    const preparePaymentIntent = async () => {
      setIsPreparingIntent(true)
      setIntentError(null)

      try {
        const response = await fetch('/api/donations/create-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountInCents }),
          signal: controller.signal,
        })

        const data = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(data?.error ?? 'Unable to prepare checkout. Please try again.')
        }

        if (!data?.clientSecret || typeof data.clientSecret !== 'string') {
          throw new Error('Received an invalid response from the payment service.')
        }

        if (!cancelled) {
          setClientSecret(data.clientSecret)
        }
      } catch (error) {
        if (cancelled || controller.signal.aborted) return

        const message =
          error instanceof Error
            ? error.message
            : 'Unable to prepare checkout. Please try again.'
        setIntentError(message)
        setClientSecret(null)
      } finally {
        if (!cancelled) {
          setIsPreparingIntent(false)
        }
      }
    }

    preparePaymentIntent()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [amountInCents, donationType, publishableKey])

 // PayPal initialization effect
 useEffect(() => {
   if (donationType !== 'onetime' || !paypalClientId || paymentMethod !== 'paypal') {
     // Clean up PayPal when not in PayPal mode
     if (paypalButtonsInstanceRef.current) {
       paypalButtonsInstanceRef.current.close()
       paypalButtonsInstanceRef.current = null
       paypalActionsRef.current = null
     }
     setIsPaypalScriptLoading(false)
     setPaypalScriptError(null)
     return
   }

   if (amountInCents < MINIMUM_ONETIME_DONATION_CENTS) {
     return
   }

   let cancelled = false

   const initializePayPal = async () => {
     try {
       setIsPaypalScriptLoading(true)
       setPaypalScriptError(null)
       setPaypalStatusMessage(null)
       setPaypalSuccessMessage(null)
       setPaypalErrorMessage(null)

       const paypal = await loadPaypalSdk(paypalClientId)

       if (cancelled) return

       const currentAmount = amountRef.current

       const paypalButtons = paypal.Buttons({
         style: {
           layout: 'vertical',
           color: 'blue',
           shape: 'rect',
           label: 'paypal',
         },
         onInit: (data, actions) => {
           paypalActionsRef.current = actions
           console.log('[paypal] Buttons initialized', { data })
         },
         onClick: () => {
           setIsPaypalProcessing(true)
           setPaypalStatusMessage('Processing your donation...')
           setPaypalSuccessMessage(null)
           setPaypalErrorMessage(null)
         },
         onCancel: (data) => {
           setIsPaypalProcessing(false)
           setPaypalStatusMessage(null)
           console.log('[paypal] Payment cancelled', { data })
         },
         createOrder: async (data, actions) => {
           if (cancelled || amountRef.current !== currentAmount) {
             throw new Error('Donation amount changed during processing.')
           }

           const response = await fetch('/api/donations/paypal/create-order', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ amount: currentAmount }),
           })

           const orderData = await response.json().catch(() => null)

           if (!response.ok) {
             throw new Error(orderData?.error ?? 'Failed to create PayPal order.')
           }

           if (!orderData?.orderId || typeof orderData.orderId !== 'string') {
             throw new Error('Invalid PayPal order response.')
           }

           return orderData.orderId
         },
         onApprove: async (data) => {
           if (!data.orderID) {
             throw new Error('Missing PayPal order ID.')
           }

           const response = await fetch('/api/donations/paypal/capture-order', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ orderId: data.orderID }),
           })

           const captureData = await response.json().catch(() => null)

           if (!response.ok) {
             throw new Error(captureData?.error ?? 'Failed to capture PayPal payment.')
           }

           if (captureData?.status === 'COMPLETED') {
             setPaypalSuccessMessage('Thank you! Your donation was processed successfully.')
             setPaypalStatusMessage(null)
           } else {
             setPaypalStatusMessage('Your donation is processing. We will email you once it completes.')
           }

           setIsPaypalProcessing(false)
         },
         onError: (error) => {
           console.error('[paypal] Button error', { error })
           setPaypalErrorMessage('PayPal payment failed. Please try again.')
           setPaypalStatusMessage(null)
           setIsPaypalProcessing(false)
         },
       })

       paypalButtonsInstanceRef.current = paypalButtons

       if (paypalContainerRef.current) {
         await paypalButtons.render(paypalContainerRef.current)
       }
     } catch (error) {
       if (cancelled) return

       const message =
         error instanceof Error
           ? error.message
           : 'Failed to initialize PayPal. Please try again.'
       setPaypalScriptError(message)
       setIsPaypalScriptLoading(false)
       console.error('[paypal] Initialization error', { error })
     } finally {
       if (!cancelled) {
         setIsPaypalScriptLoading(false)
       }
     }
   }

   initializePayPal()

   return () => {
     cancelled = true
     if (paypalButtonsInstanceRef.current) {
       paypalButtonsInstanceRef.current.close()
       paypalButtonsInstanceRef.current = null
       paypalActionsRef.current = null
     }
   }
 }, [donationType, paypalClientId, amountInCents, paymentMethod])

 return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 mx-auto mb-6 text-sin-orange animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Support Our Mission
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Your donation helps us continue supporting queer, disabled, and BIPOC communities
            through our inclusive programs and initiatives.
          </p>
        </div>

        {/* Donation Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-full p-1 inline-flex">
            <button
              onClick={() => setDonationType('monthly')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                donationType === 'monthly'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Monthly
            </button>
            <button
              onClick={() => setDonationType('onetime')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                donationType === 'onetime'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Gift className="w-4 h-4" />
              One-Time
            </button>
          </div>
        </div>

        {/* Donation Card */}
        <div className="card-glass max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              {donationType === 'monthly' ? 'Monthly Contribution' : 'One-Time Gift'}
            </h3>
            <p className="text-foreground/60 text-sm">
              {donationType === 'monthly'
                ? 'Become a sustaining supporter with a recurring monthly donation.'
                : 'Make a single contribution to support our programs.'}
            </p>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            {donationType === 'onetime' ? (
              <>
                <label className="block text-sm font-medium mb-3">Select Amount</label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {suggestedAmounts.map((suggestedAmount) => (
                    <button
                      key={suggestedAmount}
                      onClick={() => setAmount(suggestedAmount)}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        amount === suggestedAmount
                          ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-md'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      ${suggestedAmount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    min={0}
                    onChange={(event) => {
                      const nextValue = Number(event.target.value)
                      if (Number.isNaN(nextValue)) {
                        setAmount(0)
                      } else {
                        setAmount(Math.max(0, Math.round(nextValue)))
                      }
                    }}
                    className="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-sin-orange focus:border-transparent
                         transition-all duration-200"
                    placeholder="Enter custom amount"
                  />
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-4 py-3 text-sm text-foreground/70">
                Monthly donations are processed through Open Collective. You can choose the amount on the checkout page.
              </div>
            )}
          </div>

          {/* Donation Impact */}
          <div className="bg-sin-orange/10 dark:bg-sin-yellow/10 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">Your Impact</h4>
            <p className="text-sm text-foreground/70">
              {donationType === 'monthly' ? (
                <>Recurring gifts provide steady, predictable support for our programs.</>
              ) : (
                <>Your ${amount} donation helps us continue our mission.</>
              )}
            </p>
          </div>

          {/* Donate CTA */}
          <div className="space-y-4">
            {donationType === 'monthly' ? (
              <a
                href="https://opencollective.com/sunstone-inclusivity-network/contribute/monthly-supporter-88863/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Give Monthly on Open Collective
              </a>
            ) : (
              <div className="space-y-4">
                {configurationWarning && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                    {configurationWarning}
                  </div>
                )}

                {intentError && !configurationWarning && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {intentError}
                  </div>
                )}

                {isPreparingIntent && !configurationWarning && (
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-4 py-3 text-sm text-foreground/70">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-sin-orange" />
                    Preparing secure checkout...
                  </div>
                )}

                {paymentMethod === 'stripe' && !configurationWarning && clientSecret && stripePromise && !isPreparingIntent && (
                  <Elements
                    key={clientSecret}
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                      },
                    }}
                  >
                    <OneTimePaymentForm
                      amount={amount}
                      isSubmitting={isSubmittingPayment}
                      setIsSubmitting={setIsSubmittingPayment}
                      setPaymentErrorMessage={setPaymentErrorMessage}
                      setPaymentSuccessMessage={setPaymentSuccessMessage}
                    />
                  </Elements>
                )}

                {paymentMethod === 'stripe' && (
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full py-2 px-4 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                    disabled={!paypalClientId || isPaypalScriptLoading}
                  >
                    Pay with PayPal instead
                  </button>
                )}

                {paymentMethod === 'paypal' && paypalClientId && (
                  <div className="space-y-4">
                    {isPaypalScriptLoading && (
                      <div className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-4 py-3 text-sm text-foreground/70">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-sin-orange" />
                        Loading PayPal...
                      </div>
                    )}

                    {paypalScriptError && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {paypalScriptError}
                      </div>
                    )}

                    {!isPaypalScriptLoading && !paypalScriptError && (
                      <div
                        ref={paypalContainerRef}
                        className="flex justify-center"
                      />
                    )}

                    {isPaypalProcessing && (
                      <div className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 px-4 py-3 text-sm text-foreground/70">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-sin-orange" />
                        {paypalStatusMessage}
                      </div>
                    )}

                    <button
                      onClick={() => setPaymentMethod('stripe')}
                      className="w-full py-2 px-4 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
                      disabled={isPaypalProcessing}
                    >
                      Back to card payment
                    </button>
                  </div>
                )}

                {paymentMethod === 'paypal' && !paypalClientId && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                    PayPal payments are not currently available. Please use card payment.
                  </div>
                )}

                <div role="status" aria-live="polite" className="min-h-[1.25rem] text-sm space-y-2">
                  {/* Stripe Messages */}
                  {paymentMethod === 'stripe' && paymentSuccessMessage && (
                    <p className="font-medium text-emerald-600">{paymentSuccessMessage}</p>
                  )}
                  {paymentMethod === 'stripe' && paymentErrorMessage && (
                    <p className="font-medium text-red-600">{paymentErrorMessage}</p>
                  )}

                  {/* PayPal Messages */}
                  {paymentMethod === 'paypal' && paypalSuccessMessage && (
                    <p className="font-medium text-emerald-600">{paypalSuccessMessage}</p>
                  )}
                  {paymentMethod === 'paypal' && paypalErrorMessage && (
                    <p className="font-medium text-red-600">{paypalErrorMessage}</p>
                  )}
                  {paymentMethod === 'paypal' && paypalStatusMessage && !paypalSuccessMessage && !paypalErrorMessage && (
                    <p className="text-foreground/70">{paypalStatusMessage}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Security Note */}
          <p className="text-xs text-center text-foreground/50 mt-4">
            Your donation is processed securely. SIN is a registered 501(c)(3) nonprofit organization.
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <Heart className="w-8 h-8 mx-auto mb-3 text-sin-orange" />
            <h3 className="font-semibold mb-2">Tax Deductible</h3>
            <p className="text-sm text-foreground/60">
              All donations are tax-deductible to the fullest extent allowed by law.
            </p>
          </div>
          <div className="text-center">
            <Gift className="w-8 h-8 mx-auto mb-3 text-sin-orange" />
            <h3 className="font-semibold mb-2">100% Goes to Programs</h3>
            <p className="text-sm text-foreground/60">
              Every dollar supports our community programs and initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
