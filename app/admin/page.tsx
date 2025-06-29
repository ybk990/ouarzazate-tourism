"use client"

import React from "react"

import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, Phone, User, MapPin, Clock, Users } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

async function getReservations() {
  const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Erreur:", error)
    return []
  }
  return data || []
}

async function getContacts() {
  const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Erreur:", error)
    return []
  }
  return data || []
}

export default function AdminDashboard() {
  const router = useRouter()
  const [reservations, setReservations] = React.useState([])
  const [contacts, setContacts] = React.useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations()
      setReservations(data)
    }

    const fetchContacts = async () => {
      const data = await getContacts()
      setContacts(data)
    }

    fetchReservations()
    fetchContacts()
  }, [])

  const stats = {
    totalReservations: reservations.length,
    enAttente: reservations.filter((r) => r.statut === "en_attente").length,
    confirmees: reservations.filter((r) => r.statut === "confirmee").length,
    totalContacts: contacts.length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Gestion des réservations et contacts - Ouarzazate Tourism</p>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.totalReservations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.enAttente}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Confirmées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.confirmees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Messages Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.totalContacts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Réservations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dernières Réservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reservations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune réservation pour le moment</p>
            ) : (
              <div className="space-y-4">
                {reservations.slice(0, 10).map((reservation) => (
                  <div
                    key={reservation.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <h3 className="font-semibold text-gray-900">{reservation.nom}</h3>
                          <Badge
                            variant={reservation.statut === "confirmee" ? "default" : "secondary"}
                            className={
                              reservation.statut === "confirmee"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {reservation.statut}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{reservation.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{reservation.telephone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span className="capitalize">{reservation.type_hebergement.replace("_", " ")}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(reservation.date_arrivee).toLocaleDateString("fr-FR")} →{" "}
                                {new Date(reservation.date_depart).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{reservation.nombre_personnes} personne(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(reservation.created_at).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>

                        {reservation.message && (
                          <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                            <strong>Message:</strong> {reservation.message}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          Contacter
                        </Button>
                        {reservation.statut === "en_attente" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Confirmer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages de Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Messages de Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun message pour le moment</p>
            ) : (
              <div className="space-y-4">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <h3 className="font-semibold text-gray-900">{contact.nom}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(contact.created_at).toLocaleDateString("fr-FR")}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-4 w-4" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="font-medium">Sujet: {contact.sujet}</div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded text-sm">{contact.message}</div>
                      </div>

                      <Button size="sm" variant="outline">
                        Répondre
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
