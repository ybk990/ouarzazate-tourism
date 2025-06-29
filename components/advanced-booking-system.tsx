"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, MapPin, Star, CheckCircle, AlertCircle, CreditCard } from "lucide-react"
import { createReservation } from "@/app/actions/reservations"

interface Accommodation {
  id: string
  name: string
  type: string
  description: string
  pricePerNight: number
  maxGuests: number
  rating: number
  amenities: string[]
  images: string[]
  location: string
  available: boolean
}

interface BookingData {
  accommodation: Accommodation | null
  checkIn: string
  checkOut: string
  guests: number
  nights: number
  totalPrice: number
  customerInfo: {
    name: string
    email: string
    phone: string
    message: string
  }
}

const accommodations: Accommodation[] = [
  {
    id: "riad-prestige",
    name: "Riad Salam Prestige",
    type: "Riad de Luxe",
    description: "Riad traditionnel au cœur de la médina avec spa, hammam et terrasse panoramique",
    pricePerNight: 1200,
    maxGuests: 4,
    rating: 5,
    amenities: ["Spa & Hammam", "WiFi Gratuit", "Petit-déjeuner", "Terrasse", "Climatisation"],
    images: ["/images/beauty.jpg", "/images/kasbah-taourirt.jpg"],
    location: "Centre historique",
    available: true,
  },
  {
    id: "hotel-moderne",
    name: "Hotel Atlas Moderne",
    type: "Hôtel 4 Étoiles",
    description: "Hôtel moderne avec piscine, restaurant gastronomique et vue sur l'Atlas",
    pricePerNight: 600,
    maxGuests: 3,
    rating: 4,
    amenities: ["Piscine", "Restaurant", "WiFi Gratuit", "Parking", "Climatisation"],
    images: ["/images/atlas-studios.jpg", "/images/oasis-fint.jpg"],
    location: "Proche des studios",
    available: true,
  },
  {
    id: "campement-desert",
    name: "Camp Sahara Dreams",
    type: "Campement Désert",
    description: "Campement de luxe dans les dunes avec nuit sous les étoiles et excursions chamelières",
    pricePerNight: 800,
    maxGuests: 2,
    rating: 4,
    amenities: ["Excursion Chameau", "Repas Inclus", "Feu de Camp", "Guide Local", "Transport"],
    images: ["/images/ait-ben-haddou.jpg", "/images/beauty.jpg"],
    location: "Dunes de Merzouga",
    available: true,
  },
  {
    id: "auberge-atlas",
    name: "Auberge Atlas",
    type: "Auberge Conviviale",
    description: "Auberge familiale avec ambiance chaleureuse et cuisine traditionnelle",
    pricePerNight: 250,
    maxGuests: 6,
    rating: 3,
    amenities: ["Cuisine Traditionnelle", "WiFi Gratuit", "Terrasse", "Parking", "Petit-déjeuner"],
    images: ["/images/kasbah-taourirt.jpg", "/images/oasis-fint.jpg"],
    location: "Centre-ville",
    available: true,
  },
]

export default function AdvancedBookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState<BookingData>({
    accommodation: null,
    checkIn: "",
    checkOut: "",
    guests: 2,
    nights: 0,
    totalPrice: 0,
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState<any>(null)

  // Calculer le nombre de nuits et le prix total
  useEffect(() => {
    if (booking.checkIn && booking.checkOut && booking.accommodation) {
      const checkInDate = new Date(booking.checkIn)
      const checkOutDate = new Date(booking.checkOut)
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

      if (nights > 0) {
        const basePrice = nights * booking.accommodation.pricePerNight
        // Majoration selon la saison (exemple simple)
        const seasonMultiplier = isHighSeason(checkInDate) ? 1.3 : 1
        const totalPrice = Math.round(basePrice * seasonMultiplier)

        setBooking((prev) => ({
          ...prev,
          nights,
          totalPrice,
        }))
      }
    }
  }, [booking.checkIn, booking.checkOut, booking.accommodation])

  const isHighSeason = (date: Date) => {
    const month = date.getMonth() + 1
    // Haute saison : Décembre-Février et Juillet-Août
    return month >= 12 || month <= 2 || (month >= 7 && month <= 8)
  }

  const selectAccommodation = (accommodation: Accommodation) => {
    setBooking((prev) => ({ ...prev, accommodation }))
    setCurrentStep(2)
  }

  const handleDateSelection = () => {
    if (booking.checkIn && booking.checkOut && booking.nights > 0) {
      setCurrentStep(3)
    }
  }

  const handleCustomerInfo = (field: string, value: string) => {
    setBooking((prev) => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value },
    }))
  }

  const submitBooking = async () => {
    if (!booking.accommodation || !booking.checkIn || !booking.checkOut) return

    setIsSubmitting(true)

    // Créer les données de réservation
    const formData = new FormData()
    formData.append("nom", booking.customerInfo.name)
    formData.append("email", booking.customerInfo.email)
    formData.append("telephone", booking.customerInfo.phone)
    formData.append("type_hebergement", booking.accommodation.id)
    formData.append("date_arrivee", booking.checkIn)
    formData.append("date_depart", booking.checkOut)
    formData.append("nombre_personnes", booking.guests.toString())
    formData.append("message", booking.customerInfo.message)

    try {
      const result = await createReservation(formData)
      setBookingResult(result)
      if (result.success) {
        setCurrentStep(5) // Étape de confirmation
      }
    } catch (error) {
      setBookingResult({ success: false, error: "Erreur lors de la réservation" })
    }

    setIsSubmitting(false)
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const getMinCheckOutDate = () => {
    if (!booking.checkIn) return getMinDate()
    const checkIn = new Date(booking.checkIn)
    checkIn.setDate(checkIn.getDate() + 1)
    return checkIn.toISOString().split("T")[0]
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep
                  ? "bg-orange-600 text-white"
                  : step === currentStep + 1
                    ? "bg-orange-200 text-orange-600"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
            </div>
            {step < 5 && <div className="w-8 h-1 bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      {/* Étape 1: Sélection de l'hébergement */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez votre hébergement</h2>
            <p className="text-gray-600">Sélectionnez l'hébergement qui correspond à vos envies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {accommodations.map((accommodation) => (
              <Card
                key={accommodation.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onClick={() => selectAccommodation(accommodation)}
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={accommodation.images[0] || "/placeholder.svg"}
                    alt={accommodation.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-600 text-white">{accommodation.type}</Badge>
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {accommodation.rating}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{accommodation.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{accommodation.description}</p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{accommodation.location}</span>
                    <Users className="h-4 w-4 ml-2" />
                    <span>Max {accommodation.maxGuests} personnes</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{accommodation.pricePerNight} DH</span>
                      <span className="text-gray-500 text-sm">/nuit</span>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">Sélectionner</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Étape 2: Sélection des dates */}
      {currentStep === 2 && booking.accommodation && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choisissez vos dates</h2>
            <p className="text-gray-600">Sélectionnez vos dates d'arrivée et de départ</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {booking.accommodation.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkin">Date d'arrivée</Label>
                  <Input
                    id="checkin"
                    type="date"
                    min={getMinDate()}
                    value={booking.checkIn}
                    onChange={(e) => setBooking((prev) => ({ ...prev, checkIn: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout">Date de départ</Label>
                  <Input
                    id="checkout"
                    type="date"
                    min={getMinCheckOutDate()}
                    value={booking.checkOut}
                    onChange={(e) => setBooking((prev) => ({ ...prev, checkOut: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Nombre de personnes</Label>
                <Select
                  value={booking.guests.toString()}
                  onValueChange={(value) => setBooking((prev) => ({ ...prev, guests: Number.parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: booking.accommodation.maxGuests }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} personne{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {booking.nights > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Prix par nuit:</span>
                    <span className="font-semibold">{booking.accommodation.pricePerNight} DH</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Nombre de nuits:</span>
                    <span className="font-semibold">{booking.nights}</span>
                  </div>
                  {isHighSeason(new Date(booking.checkIn)) && (
                    <div className="flex justify-between items-center mb-2 text-orange-600">
                      <span>Majoration haute saison (+30%):</span>
                      <span className="font-semibold">Incluse</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between items-center text-lg font-bold text-orange-600">
                    <span>Prix total:</span>
                    <span>{booking.totalPrice} DH</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleDateSelection}
                disabled={!booking.checkIn || !booking.checkOut || booking.nights <= 0}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Continuer
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Étape 3: Informations client */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vos informations</h2>
            <p className="text-gray-600">Remplissez vos coordonnées pour finaliser la réservation</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    value={booking.customerInfo.name}
                    onChange={(e) => handleCustomerInfo("name", e.target.value)}
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={booking.customerInfo.email}
                    onChange={(e) => handleCustomerInfo("email", e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={booking.customerInfo.phone}
                  onChange={(e) => handleCustomerInfo("phone", e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  value={booking.customerInfo.message}
                  onChange={(e) => handleCustomerInfo("message", e.target.value)}
                  placeholder="Demandes spéciales, questions..."
                  rows={3}
                />
              </div>

              <Button
                onClick={() => setCurrentStep(4)}
                disabled={!booking.customerInfo.name || !booking.customerInfo.email || !booking.customerInfo.phone}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Continuer
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Étape 4: Récapitulatif et paiement */}
      {currentStep === 4 && booking.accommodation && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Récapitulatif de votre réservation</h2>
            <p className="text-gray-600">Vérifiez les détails avant de confirmer</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Détails de la réservation */}
            <Card>
              <CardHeader>
                <CardTitle>Détails de la réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={booking.accommodation.images[0] || "/placeholder.svg"}
                    alt={booking.accommodation.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{booking.accommodation.name}</h3>
                    <p className="text-sm text-gray-600">{booking.accommodation.type}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Arrivée:</span>
                    <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Départ:</span>
                    <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nuits:</span>
                    <span className="font-medium">{booking.nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personnes:</span>
                    <span className="font-medium">{booking.guests}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-orange-600">
                    <span>Total:</span>
                    <span>{booking.totalPrice} DH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations client */}
            <Card>
              <CardHeader>
                <CardTitle>Vos informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Nom:</span>
                  <span className="font-medium">{booking.customerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{booking.customerInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Téléphone:</span>
                  <span className="font-medium">{booking.customerInfo.phone}</span>
                </div>
                {booking.customerInfo.message && (
                  <div className="pt-2">
                    <span className="text-gray-600">Message:</span>
                    <p className="mt-1 text-gray-800">{booking.customerInfo.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Retour
            </Button>
            <Button onClick={submitBooking} disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700 px-8">
              <CreditCard className="mr-2 h-4 w-4" />
              {isSubmitting ? "Confirmation..." : "Confirmer la réservation"}
            </Button>
          </div>
        </div>
      )}

      {/* Étape 5: Confirmation */}
      {currentStep === 5 && bookingResult && (
        <div className="text-center space-y-6">
          {bookingResult.success ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Réservation confirmée !</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation dans quelques
                minutes avec tous les détails de votre séjour.
              </p>
              <div className="bg-green-50 p-6 rounded-lg max-w-md mx-auto">
                <h3 className="font-semibold text-green-800 mb-2">Prochaines étapes:</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Email de confirmation envoyé</li>
                  <li>• Nous vous contacterons sous 24h</li>
                  <li>• Paiement à l'arrivée ou par virement</li>
                  <li>• Informations de transport incluses</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Erreur de réservation</h2>
              <p className="text-gray-600">{bookingResult.error}</p>
              <Button onClick={() => setCurrentStep(4)} className="bg-orange-600 hover:bg-orange-700">
                Réessayer
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
