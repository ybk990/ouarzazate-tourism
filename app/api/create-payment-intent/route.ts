import { type NextRequest, NextResponse } from "next/server"
import { stripe, formatAmountForStripe, CURRENCY } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { reservationId, amount, customerInfo } = await request.json()

    if (!reservationId || !amount || amount < 100) {
      return NextResponse.json({ error: "Données de paiement invalides" }, { status: 400 })
    }

    // Vérifier que la réservation existe
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .select("*")
      .eq("id", reservationId)
      .single()

    if (reservationError || !reservation) {
      return NextResponse.json({ error: "Réservation non trouvée" }, { status: 404 })
    }

    // Créer le PaymentIntent avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: CURRENCY,
      metadata: {
        reservationId: reservationId,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
      },
      receipt_email: customerInfo.email,
      description: `Réservation ${reservation.type_hebergement} - ${reservation.nom}`,
    })

    // Enregistrer le paiement dans la base de données
    const { error: paymentError } = await supabase.from("payments").insert([
      {
        reservation_id: reservationId,
        stripe_payment_intent_id: paymentIntent.id,
        amount: amount,
        currency: CURRENCY,
        status: "pending",
        customer_email: customerInfo.email,
      },
    ])

    if (paymentError) {
      console.error("Erreur lors de l'enregistrement du paiement:", paymentError)
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la création du paiement" }, { status: 500 })
  }
}
