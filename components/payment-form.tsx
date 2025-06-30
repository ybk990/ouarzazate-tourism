"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, AlertCircle, Loader2, Lock } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  reservationId: string
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  accommodationName: string
  onPaymentSuccess: () => void
  onPaymentError: (error: string) => void
}

function CheckoutForm({
  reservationId,
  amount,
  customerInfo,
  accommodationName,
  onPaymentSuccess,
  onPaymentError,
}: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentError, setPaymentError] = useState("")

  useEffect(() => {
    // Créer le PaymentIntent
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId,
        amount,
        customerInfo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          onPaymentError(data.error)
        } else {
          setClientSecret(data.clientSecret)
        }
      })
      .catch((error) => {
        onPaymentError("Erreur lors de l'initialisation du paiement")
      })
  }, [reservationId, amount, customerInfo, onPaymentError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsProcessing(true)
    setPaymentError("")

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentError("Élément de carte non trouvé")
      setIsProcessing(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      },
    })

    if (error) {
      setPaymentError(error.message || "Erreur de paiement")
      setIsProcessing(false)
    } else if (paymentIntent.status === "succeeded") {
      // Confirmer le paiement côté serveur
      try {
        const response = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        })

        const result = await response.json()

        if (result.success) {
          onPaymentSuccess()
        } else {
          onPaymentError("Erreur lors de la confirmation du paiement")
        }
      } catch (error) {
        onPaymentError("Erreur lors de la confirmation du paiement")
      }

      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  return (
    <div className="space-y-6">
      {/* Récapitulatif de la commande */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Récapitulatif de votre réservation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{accommodationName}</span>
            <Badge variant="outline">Réservation</Badge>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Client:</span>
              <span>{customerInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{customerInfo.email}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total à payer:</span>
            <span className="text-orange-600">{amount.toLocaleString()} DH</span>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Informations de paiement
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50">
              <CardElement options={cardElementOptions} />
            </div>

            {paymentError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{paymentError}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="h-3 w-3" />
                <span>Vos informations de paiement sont sécurisées et cryptées</span>
              </div>

              <Button
                type="submit"
                disabled={!stripe || isProcessing || !clientSecret}
                className="w-full bg-orange-600 hover:bg-orange-700 h-12"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payer {amount.toLocaleString()} DH
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Informations de sécurité */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>SSL Sécurisé</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Cryptage 256-bit</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">Nous ne stockons jamais vos informations de carte bancaire</p>
      </div>
    </div>
  )
}

export default function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
}
