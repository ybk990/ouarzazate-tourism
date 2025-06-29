"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createReservation(formData: FormData) {
  try {
    const reservation = {
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      telephone: formData.get("telephone") as string,
      type_hebergement: formData.get("type_hebergement") as string,
      date_arrivee: formData.get("date_arrivee") as string,
      date_depart: formData.get("date_depart") as string,
      nombre_personnes: Number.parseInt(formData.get("nombre_personnes") as string),
      message: formData.get("message") as string,
      statut: "en_attente" as const,
    }

    const { data, error } = await supabase.from("reservations").insert([reservation]).select()

    if (error) {
      console.error("Erreur Supabase:", error)
      return { success: false, error: "Erreur lors de la réservation" }
    }

    // Envoyer email de confirmation (optionnel)
    await sendConfirmationEmail(reservation.email, reservation.nom)

    revalidatePath("/admin/reservations")
    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

export async function getReservations() {
  try {
    const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur lors de la récupération" }
  }
}

async function sendConfirmationEmail(email: string, nom: string) {
  // Intégration avec un service d'email comme Resend ou SendGrid
  console.log(`Email de confirmation envoyé à ${email} pour ${nom}`)
}
