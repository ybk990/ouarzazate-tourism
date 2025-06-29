import AdvancedBookingSystem from "@/components/advanced-booking-system"
import MobileOptimizedNav from "@/components/mobile-optimized-nav"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, CheckCircle } from "lucide-react"

export default function ReservationAvanceePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <MobileOptimizedNav />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">
            <Calendar className="mr-2 h-4 w-4" />
            Réservation Avancée
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Réservez votre séjour</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Système de réservation complet avec sélection d'hébergement, calendrier interactif et confirmation
            instantanée
          </p>
        </div>
      </div>

      {/* Système de réservation */}
      <div className="container mx-auto px-4 py-16">
        <AdvancedBookingSystem />
      </div>

      {/* Garanties */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos garanties</h2>
            <p className="text-gray-600">Réservez en toute confiance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confirmation Immédiate</h3>
              <p className="text-gray-600 text-sm">Réservation confirmée instantanément avec email de confirmation</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">Paiement à l'arrivée ou par virement bancaire sécurisé</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Annulation Flexible</h3>
              <p className="text-gray-600 text-sm">Annulation gratuite jusqu'à 48h avant l'arrivée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
