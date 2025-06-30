import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: "ID de paiement manquant" }, { status: 400 })
    }

    // Récupérer les détails du paiement depuis Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === "succeeded") {
      const reservationId = paymentIntent.metadata.reservationId

      // Mettre à jour le statut de la réservation
      const { error: reservationError } = await supabase
        .from("reservations")
        .update({
          statut: "confirmee",
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", reservationId)

      if (reservationError) {
        console.error("Erreur mise à jour réservation:", reservationError)
      }

      // Mettre à jour le statut du paiement
      const { error: paymentError } = await supabase
        .from("payments")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
        })
        .eq("stripe_payment_intent_id", paymentIntentId)

      if (paymentError) {
        console.error("Erreur mise à jour paiement:", paymentError)
      }

      return NextResponse.json({
        success: true,
        message: "Paiement confirmé avec succès",
      })
    }

    return NextResponse.json({
      success: false,
      message: "Paiement non confirmé",
    })
  } catch (error) {
    console.error("Erreur lors de la confirmation du paiement:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la confirmation" }, { status: 500 })
  }
}
