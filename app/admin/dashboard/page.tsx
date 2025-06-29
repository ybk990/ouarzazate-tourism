"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import AdminAuthGuard from "@/components/admin-auth-guard"
import RealTimeNotifications from "@/components/real-time-notifications"
import {
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Shield,
  Settings,
} from "lucide-react"

interface Reservation {
  id: string
  nom: string
  email: string
  telephone: string
  type_hebergement: string
  date_arrivee: string
  date_depart: string
  nombre_personnes: number
  message?: string
  statut: string
  created_at: string
}

function AdminDashboardContent() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [adminInfo, setAdminInfo] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get admin info from localStorage
    const loginTime = localStorage.getItem("admin_login_time")
    if (loginTime) {
      setAdminInfo({
        loginTime: new Date(loginTime),
        sessionValid: true,
      })
    }
  }, [])

  // Load reservations
  const loadReservations = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Erreur:", error)
        alert(`Erreur: ${error.message}`)
      } else {
        setReservations(data || [])
        setLastRefresh(new Date())
        console.log("✅ Réservations chargées:", data?.length)
      }
    } catch (err) {
      console.error("Erreur générale:", err)
      alert("Erreur de connexion")
    }
    setLoading(false)
  }

  // Load on startup
  useEffect(() => {
    loadReservations()
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadReservations()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Filter reservations
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.telephone.includes(searchTerm)

    const matchesStatus = statusFilter === "tous" || reservation.statut === statusFilter

    return matchesSearch && matchesStatus
  })

  // Statistics
  const stats = {
    total: reservations.length,
    enAttente: reservations.filter((r) => r.statut === "en_attente").length,
    confirmees: reservations.filter((r) => r.statut === "confirmee").length,
    annulees: reservations.filter((r) => r.statut === "annulee").length,
  }

  // Update status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("reservations").update({ statut: newStatus }).eq("id", id)

      if (error) {
        alert(`Erreur: ${error.message}`)
      } else {
        loadReservations() // Reload data
        alert("Statut mis à jour!")
      }
    } catch (err) {
      alert("Erreur lors de la mise à jour")
    }
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_login_time")
    router.push("/admin/login")
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "confirmee":
        return "bg-green-100 text-green-800"
      case "annulee":
        return "bg-red-100 text-red-800"
      case "test":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "confirmee":
        return <CheckCircle className="h-4 w-4" />
      case "annulee":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-600">Connecté depuis {adminInfo?.loginTime?.toLocaleString("fr-FR")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <RealTimeNotifications />

              <Button
                onClick={() => router.push("/admin/test-connection")}
                variant="outline"
                size="sm"
                className="hidden md:flex"
              >
                <Settings className="h-4 w-4 mr-2" />
                Tests
              </Button>

              <Button onClick={() => router.push("/")} variant="outline" size="sm" className="hidden md:flex">
                <Eye className="h-4 w-4 mr-2" />
                Voir le site
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Gestion des réservations Ouarzazate Tourism</p>
            <p className="text-sm text-gray-500">Dernière mise à jour: {lastRefresh.toLocaleTimeString("fr-FR")}</p>
          </div>

          <Button onClick={loadReservations} disabled={loading} className="bg-orange-600 hover:bg-orange-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Chargement..." : "Actualiser"}
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.enAttente}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmées</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmees}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Annulées</p>
                  <p className="text-3xl font-bold text-red-600">{stats.annulees}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou téléphone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "tous" ? "default" : "outline"}
                  onClick={() => setStatusFilter("tous")}
                  size="sm"
                >
                  Tous ({stats.total})
                </Button>
                <Button
                  variant={statusFilter === "en_attente" ? "default" : "outline"}
                  onClick={() => setStatusFilter("en_attente")}
                  size="sm"
                >
                  En attente ({stats.enAttente})
                </Button>
                <Button
                  variant={statusFilter === "confirmee" ? "default" : "outline"}
                  onClick={() => setStatusFilter("confirmee")}
                  size="sm"
                >
                  Confirmées ({stats.confirmees})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Réservations ({filteredReservations.length})</span>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
                <p>Chargement des réservations...</p>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucune réservation trouvée</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{reservation.nom}</h3>
                          <p className="text-sm text-gray-500">
                            Réservé le {new Date(reservation.created_at).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(reservation.statut)}>
                          {getStatusIcon(reservation.statut)}
                          <span className="ml-1 capitalize">{reservation.statut.replace("_", " ")}</span>
                        </Badge>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{reservation.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{reservation.telephone}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {new Date(reservation.date_arrivee).toLocaleDateString("fr-FR")} →{" "}
                            {new Date(reservation.date_depart).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{reservation.nombre_personnes} personne(s)</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="capitalize">{reservation.type_hebergement.replace("_", " ")}</span>
                        </div>
                      </div>
                    </div>

                    {reservation.message && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Message:</strong> {reservation.message}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {reservation.statut === "en_attente" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateStatus(reservation.id, "confirmee")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Confirmer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(reservation.id, "annulee")}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Annuler
                          </Button>
                        </>
                      )}

                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>

                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Contacter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminAuthGuard>
      <AdminDashboardContent />
    </AdminAuthGuard>
  )
}
