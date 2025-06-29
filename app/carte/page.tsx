import InteractiveMap from "@/components/interactive-map"
import MobileOptimizedNav from "@/components/mobile-optimized-nav"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation } from "lucide-react"

export default function CartePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <MobileOptimizedNav />

      {/* Header */}
      <div className="bg-white shadow-sm dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            <MapPin className="mr-2 h-4 w-4" />
            Carte Interactive
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 dark:text-white">Explorez Ouarzazate</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Découvrez tous les points d'intérêt de Ouarzazate sur notre carte interactive. Planifiez votre visite et
            trouvez facilement votre chemin vers chaque attraction.
          </p>
        </div>
      </div>

      {/* Carte Interactive */}
      <div className="container mx-auto px-4 py-16">
        <InteractiveMap />
      </div>

      {/* Informations pratiques */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Informations Pratiques</h2>
            <p className="text-gray-600 dark:text-gray-300">Tout ce que vous devez savoir pour votre visite</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-orange-50 dark:bg-gray-800 rounded-lg">
              <Navigation className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Transport</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Aéroport à 5km, taxis et location de voitures disponibles
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 dark:bg-gray-800 rounded-lg">
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Distances</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Marrakech: 200km, Casablanca: 450km, Merzouga: 350km
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 dark:bg-gray-800 rounded-lg">
              <Navigation className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GPS</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Coordonnées: 30.9335°N, 6.9370°W</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
