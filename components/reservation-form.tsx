"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createReservation } from "@/app/actions"
import { Calendar, CheckCircle, AlertCircle } from "lucide-react"

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage("")
    setIsSuccess(false)

    const result = await createReservation(formData)

    if (result.success) {
      setMessage("Réservation envoyée avec succès! Nous vous contactons sous 24h.")
      setIsSuccess(true)
      // Reset form
      const form = document.getElementById("reservation-form") as HTMLFormElement
      form?.reset()
    } else {
      setMessage(result.error || "Erreur lors de la réservation")
      setIsSuccess(false)
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-orange-600">
          <Calendar className="inline mr-2 h-6 w-6" />
          Réserver votre séjour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form id="reservation-form" action={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom complet *</Label>
              <Input id="nom" name="nom" required placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required placeholder="votre@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input id="telephone" name="telephone" required placeholder="+212 6XX XXX XXX" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type_hebergement">Type d'hébergement *</Label>
            <Select name="type_hebergement" required>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre hébergement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riad_prestige">Riad de Prestige</SelectItem>
                <SelectItem value="hotel_moderne">Hôtel Moderne</SelectItem>
                <SelectItem value="campement_desert">Campement Désert</SelectItem>
                <SelectItem value="auberge">Auberge/Guesthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_arrivee">Date d'arrivée *</Label>
              <Input id="date_arrivee" name="date_arrivee" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_depart">Date de départ *</Label>
              <Input id="date_depart" name="date_depart" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre_personnes">Nombre de personnes *</Label>
              <Select name="nombre_personnes" required>
                <SelectTrigger>
                  <SelectValue placeholder="Personnes" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} personne{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea id="message" name="message" placeholder="Demandes spéciales, questions..." rows={4} />
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer la réservation"}
          </Button>

          {message && (
            <div
              className={`p-4 rounded-lg text-center flex items-center justify-center gap-2 ${
                isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {isSuccess ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              {message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
