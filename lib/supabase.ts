import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Reservation {
  id?: string
  nom: string
  email: string
  telephone: string
  type_hebergement: string
  date_arrivee: string
  date_depart: string
  nombre_personnes: number
  message?: string
  statut?: string
  created_at?: string
}

export interface Contact {
  id?: string
  nom: string
  email: string
  sujet: string
  message: string
  created_at?: string
}
