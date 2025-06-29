"use server"

import { supabase } from "@/lib/supabase"

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

    // Notification par email à l'admin
    await notifyAdmin(contact)

    return { success: true, message: "Message envoyé avec succès!" }
  } catch (error) {
    console.error("Erreur:", error)
    return { success: false, error: "Erreur serveur" }
  }
}

async function notifyAdmin(contact: any) {
  // Envoyer notification à l'administrateur
  console.log("Nouveau message de contact reçu:", contact)
}
