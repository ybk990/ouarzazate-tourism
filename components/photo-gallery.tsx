"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2 } from "lucide-react"

interface Photo {
  id: string
  src: string
  title: string
  category: string
  description: string
  location: string
}

const photos: Photo[] = [
  {
    id: "1",
    src: "/images/beauty.jpg",
    title: "Coucher de soleil sur Ouarzazate",
    category: "Paysages",
    description: "Vue magnifique sur la ville au coucher du soleil avec l'architecture traditionnelle",
    location: "Centre-ville Ouarzazate",
  },
  {
    id: "2",
    src: "/images/cinema-principal.jpg",
    title: "Studios de Cinéma",
    category: "Cinéma",
    description: "Les célèbres studios qui ont accueilli les plus grandes productions mondiales",
    location: "Atlas Studios",
  },
  {
    id: "3",
    src: "/images/cinema-studios.jpg",
    title: "Clap de Cinéma Géant",
    category: "Cinéma",
    description: "Monument emblématique symbolisant l'industrie cinématographique de la région",
    location: "Entrée des Studios",
  },
  // Ajout de photos placeholder pour la démo
  {
    id: "4",
    src: "/placeholder.svg?height=400&width=600",
    title: "Kasbah Taourirt",
    category: "Patrimoine",
    description: "Palais fortifié du XIXe siècle, joyau de l'architecture berbère",
    location: "Centre historique",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=400&width=600",
    title: "Dunes du Sahara",
    category: "Désert",
    description: "Les majestueuses dunes de sable doré du désert du Sahara",
    location: "Merzouga",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=400&width=600",
    title: "Oasis de Fint",
    category: "Nature",
    description: "Palmeraie verdoyante contrastant avec les paysages arides",
    location: "Oasis de Fint",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=400&width=600",
    title: "Artisanat Local",
    category: "Culture",
    description: "Tapis berbères et poteries traditionnelles faits à la main",
    location: "Souks d'Ouarzazate",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=400&width=600",
    title: "Ksar Ait Ben Haddou",
    category: "Patrimoine",
    description: "Village fortifié classé UNESCO, décor de nombreux films",
    location: "Ait Ben Haddou",
  },
]

const categories = ["Tous", "Paysages", "Cinéma", "Patrimoine", "Désert", "Nature", "Culture"]

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredPhotos =
    selectedCategory === "Tous" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo)
    setCurrentIndex(filteredPhotos.findIndex((p) => p.id === photo.id))
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(filteredPhotos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    setCurrentIndex(prevIndex)
    setSelectedPhoto(filteredPhotos[prevIndex])
  }

  return (
    <div className="space-y-8">
      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : "bg-transparent hover:bg-orange-50"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grille de photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            onClick={() => openLightbox(photo)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <Badge className="absolute top-2 left-2 bg-orange-600 text-white">{photo.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{photo.description}</p>
              <p className="text-xs text-orange-600 mt-2">{photo.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Boutons de contrôle */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={closeLightbox}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <Button
              size="sm"
              variant="outline"
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image principale */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Informations */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-orange-600 text-white">{selectedPhoto.category}</Badge>
                <span className="text-sm opacity-75">
                  {currentIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
              <p className="text-gray-200 mb-1">{selectedPhoto.description}</p>
              <p className="text-orange-300 text-sm">{selectedPhoto.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
