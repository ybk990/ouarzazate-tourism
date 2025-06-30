"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import PaymentForm from "@/components/payment-form"
import PaymentSuccess from "@/components/payment-success"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ReservationData {
  id: string
  nom: string
  email: string
  telephone: string
  type_hebergement: string
  date_arrivee: string
  date_depart: string
  nombre_personnes: number
  total_amount: number
  payment_status: string
}

export default function PaymentPage() {
  const params = useParams()
  const router = useRouter()
  const reservationId = params.reservationId as string

  const [reservation, setReservation] = useState<ReservationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [paymentStep, setPaymentStep] = useState<"form" | "success" | "error">("form")

  useEffect(() => {
    if (reservationId) {
      fetchReservation()
    }
  }, [reservationId])

  const fetchReservation = async () => {
    try {
      const { data, error } = await supabase.from("reservations").select("*").eq("id", reservationId).single()

      if (error) throw error

      if (data.payment_status === "paid") {
        setPaymentStep("success")
      }

      setReservation(data)
    } catch (error) {
      console.error("Erreur lors de la récupération de la réservation:", error)
      setError("Réservation non trouvée")
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    setPaymentStep("success")
    // Actualiser les données de la réservation
    fetchReservation()
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
    setPaymentStep("error")
  }

  const handleReturnHome = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p>Chargement de votre réservation...</p>
        </div>
      </div>
    )
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="text-xl font-semibold">Erreur</h2>
            <p className="text-gray-600">{error || "Réservation non trouvée"}</p>
            <button
              onClick={handleReturnHome}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg"
            >
              Retour à l'accueil
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {paymentStep === "success" ? "Paiement confirmé" : "Finaliser votre réservation"}
          </h1>
          <p className="text-gray-600">
            {paymentStep === "success"
              ? "Votre réservation a été confirmée avec succès"
              : "Complétez votre paiement pour confirmer votre réservation"}
          </p>
        </div>

        {paymentStep === "form" && (
          <PaymentForm
            reservationId={reservation.id}
            amount={reservation.total_amount || 1000} // Montant par défaut si non défini
            customerInfo={{
              name: reservation.nom,
              email: reservation.email,
              phone: reservation.telephone,
            }}
            accommodationName={reservation.type_hebergement}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        )}

        {paymentStep === "success" && (
          <PaymentSuccess
            reservationId={reservation.id}
            customerName={reservation.nom}
            accommodationName={reservation.type_hebergement}
            amount={reservation.total_amount || 1000}
            onClose={handleReturnHome}
          />
        )}

        {paymentStep === "error" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-semibold">Erreur de paiement</h2>
              <p className="text-gray-600">{error}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setPaymentStep("form")}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg"
                >
                  Réessayer
                </button>
                <button
                  onClick={handleReturnHome}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                >
                  Retour à l'accueil
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
