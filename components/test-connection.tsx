"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function TestConnection() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function testConnection() {
    setIsLoading(true)
    setResult(null)

    try {
      // Test 1: Connexion à Supabase
      console.log("🔗 Test de connexion Supabase...")
      const { data: testData, error: testError } = await supabase
        .from("reservations")
        .select("count", { count: "exact" })

      if (testError) {
        setResult({
          success: false,
          error: `Erreur de connexion: ${testError.message}`,
          details: testError,
        })
        setIsLoading(false)
        return
      }

      // Test 2: Insérer une réservation de test
      console.log("📝 Test d'insertion...")
      const testReservation = {
        nom: "Test Connection",
        email: "test@connection.com",
        telephone: "+212600000000",
        type_hebergement: "riad_prestige",
        date_arrivee: "2025-02-15",
        date_depart: "2025-02-18",
        nombre_personnes: 2,
        message: "Test de connexion automatique",
        statut: "test",
      }

      const { data: insertData, error: insertError } = await supabase
        .from("reservations")
        .insert([testReservation])
        .select()

      if (insertError) {
        setResult({
          success: false,
          error: `Erreur d'insertion: ${insertError.message}`,
          details: insertError,
        })
        setIsLoading(false)
        return
      }

      // Test 3: Lire les données
      console.log("📖 Test de lecture...")
      const { data: readData, error: readError } = await supabase
        .from("reservations")
        .select("*")
        .eq("statut", "test")
        .order("created_at", { ascending: false })

      if (readError) {
        setResult({
          success: false,
          error: `Erreur de lecture: ${readError.message}`,
          details: readError,
        })
        setIsLoading(false)
        return
      }

      setResult({
        success: true,
        message: "✅ Connexion réussie !",
        data: {
          totalReservations: testData,
          insertedData: insertData,
          readData: readData,
        },
      })
    } catch (error) {
      console.error("Erreur:", error)
      setResult({
        success: false,
        error: `Erreur générale: ${error}`,
        details: error,
      })
    }

    setIsLoading(false)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🔧 Test de Connexion Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Test en cours...
            </>
          ) : (
            "Tester la connexion"
          )}
        </Button>

        {result && (
          <div
            className={`p-4 rounded-lg ${
              result.success ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-semibold ${result.success ? "text-green-800" : "text-red-800"}`}>
                {result.success ? "Succès" : "Erreur"}
              </span>
            </div>

            <p className={result.success ? "text-green-700" : "text-red-700"}>{result.message || result.error}</p>

            {result.details && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm opacity-75">Détails techniques</summary>
                <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </details>
            )}

            {result.success && result.data && (
              <div className="mt-3 text-sm">
                <p>✅ Tables accessibles</p>
                <p>✅ Insertion réussie</p>
                <p>✅ Lecture réussie</p>
                <p className="text-green-600 font-medium">Votre backend fonctionne parfaitement !</p>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Ce test vérifie :</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Connexion à Supabase</li>
            <li>Existence des tables</li>
            <li>Permissions d'écriture</li>
            <li>Permissions de lecture</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
