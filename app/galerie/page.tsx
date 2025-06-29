import EnhancedPhotoGallery from "@/components/enhanced-photo-gallery"
import MobileOptimizedNav from "@/components/mobile-optimized-nav"
import { Badge } from "@/components/ui/badge"
import { Camera, ImageIcon } from "lucide-react"

export default function GalleriePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <MobileOptimizedNav />

      {/* Header */}
      <div className="bg-white shadow-sm dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            <Camera className="mr-2 h-4 w-4" />
            Galerie Photos
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 dark:text-white">Découvrez Ouarzazate</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Plongez dans la beauté de Ouarzazate à travers notre collection de photos haute qualité. Des paysages
            désertiques aux studios de cinéma, en passant par l'architecture berbère traditionnelle.
          </p>
        </div>
      </div>

      {/* Galerie */}
      <div className="container mx-auto px-4 py-16">
        <EnhancedPhotoGallery />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <ImageIcon className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Envie de vivre ces moments ?</h2>
          <p className="text-xl mb-8 opacity-90">Réservez votre séjour et découvrez ces lieux magiques en personne</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Réserver maintenant
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Voir les hébergements
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
