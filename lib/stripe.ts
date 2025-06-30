import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

export const CURRENCY = "mad" // Dirham marocain
export const MIN_AMOUNT = 100 // 1 MAD minimum

export function formatAmountForStripe(amount: number): number {
  // Stripe utilise les centimes pour MAD
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}
