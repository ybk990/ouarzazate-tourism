"use server"

import { supabase } from "@/lib/supabase"

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
      statut: "en_attente",
    }

    const { data, error } = await supabase.from("reservations").insert([reservation]).select()

    if (error) {
      console.error("Erreur Supabase:", error)
      return { success: false, error: "Erreur lors de la réservation" }
    }

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

export async function submitContact(formData: FormData) {
  try {
    const contact = {
      nom: formData.get("nom") as string,
      email: formData.get("email") as string,
      sujet: formData.get("sujet") as string,
      message: formData.get("message") as string,
    }

    const { data, error } = await supabase.from("contacts").insert([contact]).select()

    if (error) {
      console.error("Erreur Supabase:", error)
      return { success: false, error: "Erreur lors de l'envoi" }
    }

    return { success: true, message: "Message envoyé avec succès!" }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}
