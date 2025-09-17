'use client'

import { useState } from 'react'
import { Heart, Calendar, CreditCard, Gift } from 'lucide-react'

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'monthly' | 'onetime'>('monthly')
  const [amount, setAmount] = useState(25)

  const suggestedAmounts = [10, 25, 50, 100, 250]

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
                : 'Make a single contribution to support our programs.'
              }
            </p>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
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
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 bg-background border border-border rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-sin-orange focus:border-transparent
                         transition-all duration-200"
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Donation Impact */}
          <div className="bg-sin-orange/10 dark:bg-sin-yellow/10 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-2">Your Impact</h4>
            <p className="text-sm text-foreground/70">
              {donationType === 'monthly' ? (
                <>A ${amount} monthly donation provides ongoing support for our programs.</>
              ) : (
                <>Your ${amount} donation helps us continue our mission.</>
              )}
            </p>
          </div>

          {/* Donate Button */}
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            {donationType === 'monthly' 
              ? `Donate $${amount} Monthly`
              : `Donate $${amount}`
            }
          </button>

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