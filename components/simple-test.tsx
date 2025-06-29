"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function SimpleTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [reservations, setReservations] = useState<any[]>([])

  async function testInsert() {
    setIsLoading(true)
    setMessage("")

    try {
      const testData = {
        nom: "Test Simple",
        email: "simple@test.com",
        telephone: "+212600000000",
        type_hebergement: "riad_prestige",
        date_arrivee: "2025-02-15",
        date_depart: "2025-02-18",
        nombre_personnes: 2,
        message: "Test simple de connexion",
      }

      console.log("🔄 Tentative d'insertion...", testData)

      const { data, error } = await supabase.from("reservations").insert([testData]).select()

      if (error) {
        console.error("❌ Erreur:", error)
        setMessage(`❌ Erreur: ${error.message}`)
      } else {
        console.log("✅ Succès:", data)
        setMessage("✅ Réservation ajoutée avec succès!")
        loadReservations()
      }
    } catch (err) {
      console.error("❌ Erreur générale:", err)
      setMessage(`❌ Erreur: ${err}`)
    }

    setIsLoading(false)
  }

  async function loadReservations() {
    try {
      const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("❌ Erreur lecture:", error)
        setMessage(`❌ Erreur lecture: ${error.message}`)
      } else {
        console.log("📖 Réservations:", data)
        setReservations(data || [])
      }
    } catch (err) {
      console.error("❌ Erreur générale lecture:", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test Simple de Connexion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testInsert} disabled={isLoading} className="w-full">
            {isLoading ? "Test en cours..." : "Tester l'ajout d'une réservation"}
          </Button>

          <Button onClick={loadReservations} variant="outline" className="w-full bg-transparent">
            Charger les réservations
          </Button>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      {reservations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📋 Réservations trouvées ({reservations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reservations.map((reservation, index) => (
                <div key={reservation.id || index} className="p-3 border rounded-lg bg-gray-50">
                  <div className="font-semibold">{reservation.nom}</div>
                  <div className="text-sm text-gray-600">{reservation.email}</div>
                  <div className="text-sm text-gray-600">
                    {reservation.date_arrivee} → {reservation.date_depart}
                  </div>
                  <div className="text-xs text-gray-500">
                    Créé: {new Date(reservation.created_at).toLocaleString("fr-FR")}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
