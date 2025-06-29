"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import AdminAuthGuard from "@/components/admin-auth-guard"
import { Database, CheckCircle, XCircle, Plus, Trash2, Eye, ArrowLeft, Shield } from "lucide-react"

function TestConnectionContent() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [reservations, setReservations] = useState<any[]>([])
  const router = useRouter()

  const runTests = async () => {
    setLoading(true)
    setResults(null)

    const testResults = {
      connection: false,
      read: false,
      write: false,
      delete: false,
      data: null,
      errors: [] as string[],
    }

    try {
      // Test 1: Connection
      console.log("🔗 Test de connexion...")
      const { data: connectionTest, error: connectionError } = await supabase
        .from("reservations")
        .select("count", { count: "exact" })

      if (connectionError) {
        testResults.errors.push(`Connexion: ${connectionError.message}`)
      } else {
        testResults.connection = true
        console.log("✅ Connexion OK")
      }

      // Test 2: Read
      console.log("📖 Test de lecture...")
      const { data: readData, error: readError } = await supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false })

      if (readError) {
        testResults.errors.push(`Lecture: ${readError.message}`)
      } else {
        testResults.read = true
        testResults.data = readData
        setReservations(readData || [])
        console.log("✅ Lecture OK:", readData?.length, "réservations")
      }

      // Test 3: Write
      console.log("✍️ Test d'écriture...")
      const testReservation = {
        nom: "Test Connexion Admin",
        email: "admin@test.com",
        telephone: "+212600000000",
        type_hebergement: "test",
        date_arrivee: "2025-02-15",
        date_depart: "2025-02-18",
        nombre_personnes: 2,
        message: "Test automatique depuis l'admin",
        statut: "test",
      }

      const { data: writeData, error: writeError } = await supabase
        .from("reservations")
        .insert([testReservation])
        .select()

      if (writeError) {
        testResults.errors.push(`Écriture: ${writeError.message}`)
      } else {
        testResults.write = true
        console.log("✅ Écriture OK:", writeData)
      }

      // Test 4: Delete (optional)
      if (writeData && writeData[0]) {
        console.log("🗑️ Test de suppression...")
        const { error: deleteError } = await supabase.from("reservations").delete().eq("id", writeData[0].id)

        if (deleteError) {
          testResults.errors.push(`Suppression: ${deleteError.message}`)
        } else {
          testResults.delete = true
          console.log("✅ Suppression OK")
        }
      }
    } catch (error) {
      testResults.errors.push(`Erreur générale: ${error}`)
      console.error("❌ Erreur générale:", error)
    }

    setResults(testResults)
    setLoading(false)
  }

  const addTestReservation = async () => {
    const testData = {
      nom: `Test Admin ${Date.now()}`,
      email: `admin${Date.now()}@test.com`,
      telephone: "+212600000000",
      type_hebergement: "riad_prestige",
      date_arrivee: "2025-03-15",
      date_depart: "2025-03-18",
      nombre_personnes: 2,
      message: "Réservation de test depuis l'admin",
      statut: "test",
    }

    const { data, error } = await supabase.from("reservations").insert([testData]).select()

    if (error) {
      alert(`Erreur: ${error.message}`)
    } else {
      alert("Réservation test ajoutée!")
      runTests() // Reload
    }
  }

  const deleteTestReservations = async () => {
    const { error } = await supabase.from("reservations").delete().eq("statut", "test")

    if (error) {
      alert(`Erreur: ${error.message}`)
    } else {
      alert("Réservations test supprimées!")
      runTests() // Reload
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test de Connexion</h1>
                <p className="text-gray-600">Vérifiez que votre base de données fonctionne</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-600">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={runTests} disabled={loading} className="bg-orange-600 hover:bg-orange-700">
            <Database className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Test en cours..." : "Lancer les tests"}
          </Button>

          <Button onClick={addTestReservation} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter test
          </Button>

          <Button onClick={deleteTestReservations} variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Nettoyer tests
          </Button>
        </div>

        {/* Test Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Résultats des Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  {results.connection ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="font-medium">Connexion</p>
                </div>

                <div className="text-center">
                  {results.read ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="font-medium">Lecture</p>
                </div>

                <div className="text-center">
                  {results.write ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="font-medium">Écriture</p>
                </div>

                <div className="text-center">
                  {results.delete ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  )}
                  <p className="font-medium">Suppression</p>
                </div>
              </div>

              {results.errors.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Erreurs:</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {results.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.connection && results.read && results.write && (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800">🎉 Tous les tests sont réussis !</p>
                  <p className="text-sm text-green-700">Votre base de données Supabase fonctionne parfaitement.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Current Data */}
        {reservations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Réservations dans la base ({reservations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reservations.map((reservation, index) => (
                  <div key={reservation.id || index} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{reservation.nom}</span>
                      <Badge
                        className={
                          reservation.statut === "test"
                            ? "bg-blue-100 text-blue-800"
                            : reservation.statut === "confirmee"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {reservation.statut}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📧 {reservation.email}</p>
                      <p>📞 {reservation.telephone}</p>
                      <p>🏨 {reservation.type_hebergement}</p>
                      <p>
                        📅 {reservation.date_arrivee} → {reservation.date_depart}
                      </p>
                      <p>👥 {reservation.nombre_personnes} personne(s)</p>
                      <p className="text-xs text-gray-500">
                        Créé: {new Date(reservation.created_at).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Supabase Access Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>🔗 Accès direct à Supabase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Pour voir vos données directement dans Supabase:</h3>
              <ol className="text-sm text-blue-700 space-y-2">
                <li>
                  1. Allez sur <strong>supabase.com</strong>
                </li>
                <li>2. Connectez-vous à votre compte</li>
                <li>3. Sélectionnez votre projet</li>
                <li>
                  4. Cliquez sur <strong>"Table Editor"</strong> dans le menu
                </li>
                <li>
                  5. Sélectionnez la table <strong>"reservations"</strong>
                </li>
                <li>6. Vous verrez toutes vos réservations en temps réel!</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TestConnectionPage() {
  return (
    <AdminAuthGuard>
      <TestConnectionContent />
    </AdminAuthGuard>
  )
}
