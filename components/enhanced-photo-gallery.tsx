"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2, Heart, MapPin } from "lucide-react"

interface Photo {
  id: string
  src: string
  title: string
  category: string
  description: string
  location: string
  coordinates?: { lat: number; lng: number }
  photographer?: string
  date?: string
}

const photos: Photo[] = [
  {
    id: "1",
    src: "/images/beauty.jpg",
    title: "Coucher de soleil sur Ouarzazate",
    category: "Paysages",
    description: "Vue magnifique sur la ville au coucher du soleil avec l'architecture traditionnelle berbère",
    location: "Centre-ville Ouarzazate",
    coordinates: { lat: 30.9335, lng: -6.937 },
    photographer: "Tourism Ouarzazate",
    date: "2024",
  },
  {
    id: "2",
    src: "/images/kasbah-taourirt.jpg",
    title: "Kasbah Taourirt - Joyau de l'Architecture Berbère",
    category: "Patrimoine",
    description:
      "Magnifique kasbah du XIXe siècle au coucher du soleil, résidence historique des Glaoui avec ses tours imposantes et palmiers",
    location: "Centre historique Ouarzazate",
    coordinates: { lat: 30.9335, lng: -6.937 },
    photographer: "Morocco Heritage",
    date: "Patrimoine du XIXe siècle",
  },
  {
    id: "3",
    src: "/images/ait-ben-haddou.jpg",
    title: "Ksar Ait Ben Haddou - Site UNESCO",
    category: "Patrimoine",
    description:
      "Village fortifié du XIe siècle classé patrimoine mondial, décor de plus de 20 films internationaux dont Gladiator et Game of Thrones",
    location: "Ait Ben Haddou, 30km de Ouarzazate",
    coordinates: { lat: 31.0472, lng: -7.1325 },
    photographer: "UNESCO World Heritage",
    date: "Classé UNESCO 1987",
  },
  {
    id: "4",
    src: "/images/oasis-fint.jpg",
    title: "Oasis de Fint - Miroir du Désert",
    category: "Nature",
    description:
      "Oasis spectaculaire avec reflets parfaits dans l'eau, palmeraie verdoyante contrastant avec les montagnes rocheuses de l'Atlas",
    location: "Oasis de Fint, 10km de Ouarzazate",
    coordinates: { lat: 30.8833, lng: -6.8167 },
    photographer: "Nature Morocco",
    date: "2024",
  },
  {
    id: "5",
    src: "/images/atlas-studios.jpg",
    title: "Atlas Studios - Hollywood de l'Afrique",
    category: "Cinéma",
    description:
      "Entrée des célèbres Atlas Studios avec affiches de films internationaux, plus grands studios de cinéma d'Afrique",
    location: "Atlas Studios, Route de Marrakech",
    coordinates: { lat: 30.9189, lng: -6.8897 },
    photographer: "Atlas Corporation Studios",
    date: "2024",
  },
  {
    id: "6",
    src: "https://morocco-nomad-safari.com/img/slider/taourirt-kasah-and-cinema-museum-2.jpg",
    title: "Musée de Cinéma - Décors Monumentaux",
    category: "Cinéma",
    description: "Décors grandioses des studios qui ont accueilli Lawrence d'Arabie, Gladiator, Game of Thrones",
    location: "Atlas Studios",
    coordinates: { lat: 30.9189, lng: -6.8897 },
    photographer: "Atlas Corporation",
    date: "2024",
  },
  {
    id: "7",
    src: "/images/cinema-studios.jpg",
    title: "Monument du Cinéma",
    category: "Cinéma",
    description: "Clap géant symbolisant l'industrie cinématographique mondiale de Ouarzazate",
    location: "Entrée des Studios",
    coordinates: { lat: 30.9189, lng: -6.8897 },
    photographer: "CLA Studios",
    date: "2024",
  },
  {
    id: "8",
    src: "https://desert-maroc.com/wordpress2012/wp-content/uploads/merzouga-Gu%CC%88ldem-U%CC%88stu%CC%88n-1024x585.jpg",
    title: "Dunes de Merzouga - Erg Chebbi",
    category: "Désert",
    description: "Les majestueuses dunes dorées du Sahara, hautes de 150 mètres, accessible depuis Ouarzazate",
    location: "Merzouga, 350km de Ouarzazate",
    coordinates: { lat: 31.0801, lng: -4.0142 },
    photographer: "Sahara Expeditions",
    date: "2024",
  },
  {
    id: "9",
    src: "https://sudestmaroc.com/wp-content/uploads/2019/11/cooperative-femme-tapis-ozt-02-1024x768.jpg",
    title: "Artisanat Berbère Traditionnel",
    category: "Culture",
    description:
      "Tapis berbères tissés à la main selon des techniques millénaires transmises de génération en génération",
    location: "Coopératives d'Ouarzazate",
    coordinates: { lat: 30.9335, lng: -6.937 },
    photographer: "Artisans Berbères",
    date: "Tradition ancestrale",
  },
  {
    id: "10",
    src: "https://www.ksarighnda.com/wp-content/uploads/2024/08/GettyImages-181285444-1536x1024.jpg",
    title: "Vallée du Drâa - Route des Mille Kasbahs",
    category: "Paysages",
    description: "Paysage spectaculaire de la vallée du Drâa avec ses kasbahs en terre crue et palmeraies",
    location: "Vallée du Drâa",
    coordinates: { lat: 30.7167, lng: -6.6167 },
    photographer: "Morocco Landscapes",
    date: "2024",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&hue=60",
    title: "Gorges du Todra - Canyon Spectaculaire",
    category: "Nature",
    description: "Gorges impressionnantes hautes de 300 mètres, paradis des grimpeurs et randonneurs",
    location: "Gorges du Todra, 165km de Ouarzazate",
    coordinates: { lat: 31.5833, lng: -5.5833 },
    photographer: "Adventure Morocco",
    date: "2024",
  },
  {
    id: "12",
    src: "https://thumbs.dreamstime.com/b/le-souk-ouarzazate-morocco-90151570.jpg?w=992",
    title: "Marché Traditionnel - Souk d'Ouarzazate",
    category: "Culture",
    description: "Marché coloré avec épices, dattes, artisanat local et produits du terroir berbère",
    location: "Centre-ville Ouarzazate",
    coordinates: { lat: 30.9335, lng: -6.937 },
    photographer: "Local Markets",
    date: "2024",
  },
]

const categories = ["Tous", "Paysages", "Cinéma", "Patrimoine", "Désert", "Nature", "Culture"]

export default function EnhancedPhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filteredPhotos =
    selectedCategory === "Tous" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  useEffect(() => {
    // Simuler le chargement des photos
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Charger les favoris depuis localStorage
    const savedFavorites = localStorage.getItem("ouarzazate-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (photoId: string) => {
    const newFavorites = favorites.includes(photoId)
      ? favorites.filter((id) => id !== photoId)
      : [...favorites, photoId]

    setFavorites(newFavorites)
    localStorage.setItem("ouarzazate-favorites", JSON.stringify(newFavorites))
  }

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

  const sharePhoto = async (photo: Photo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Partage annulé")
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papiers!")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <div key={category} className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Statistiques */}
      <div className="text-center space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold text-orange-600">{filteredPhotos.length}</span> photos
          {selectedCategory !== "Tous" && (
            <span>
              {" "}
              dans la catégorie <span className="font-semibold">{selectedCategory}</span>
            </span>
          )}
        </p>
        {favorites.length > 0 && (
          <p className="text-sm text-gray-500">
            <Heart className="inline h-4 w-4 text-red-500 mr-1" />
            {favorites.length} photo{favorites.length > 1 ? "s" : ""} en favoris
          </p>
        )}
      </div>

      {/* Filtres par catégorie avec animations */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? "bg-orange-600 hover:bg-orange-700 shadow-lg"
                : "bg-transparent hover:bg-orange-50 hover:border-orange-300"
            }`}
          >
            {category}
            <span className="ml-2 text-xs opacity-75">
              ({category === "Tous" ? photos.length : photos.filter((p) => p.category === category).length})
            </span>
          </Button>
        ))}
      </div>

      {/* Grille de photos avec animations améliorées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
          <Card
            key={photo.id}
            className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
            onClick={() => openLightbox(photo)}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Overlay avec gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Icônes d'action */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Badge catégorie */}
              <Badge className="absolute top-3 left-3 bg-orange-600/90 text-white backdrop-blur-sm">
                {photo.category}
              </Badge>

              {/* Bouton favori */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(photo.id)
                }}
              >
                <Heart
                  className={`h-4 w-4 ${favorites.includes(photo.id) ? "text-red-500 fill-red-500" : "text-white"}`}
                />
              </Button>

              {/* Informations en bas */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{photo.location}</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                {photo.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">{photo.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{photo.photographer}</span>
                <span>{photo.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox amélioré */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full">
            {/* Barre d'outils */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleFavorite(selectedPhoto.id)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Heart
                  className={`h-4 w-4 ${favorites.includes(selectedPhoto.id) ? "text-red-500 fill-red-500" : ""}`}
                />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => sharePhoto(selectedPhoto)}
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

            {/* Navigation avec raccourcis clavier */}
            <Button
              size="lg"
              variant="outline"
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 p-3"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 p-3"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image principale */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Panneau d'informations détaillées */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-orange-600 text-white">{selectedPhoto.category}</Badge>
                  <span className="text-sm opacity-75">
                    {currentIndex + 1} / {filteredPhotos.length}
                  </span>
                  {selectedPhoto.coordinates && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-xs"
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Voir sur la carte
                    </Button>
                  )}
                </div>

                <h2 className="text-3xl font-bold mb-3">{selectedPhoto.title}</h2>
                <p className="text-gray-200 mb-3 text-lg">{selectedPhoto.description}</p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-orange-300 font-medium">Lieu:</span>
                    <p className="text-gray-200">{selectedPhoto.location}</p>
                  </div>
                  <div>
                    <span className="text-orange-300 font-medium">Photographe:</span>
                    <p className="text-gray-200">{selectedPhoto.photographer}</p>
                  </div>
                  <div>
                    <span className="text-orange-300 font-medium">Date:</span>
                    <p className="text-gray-200">{selectedPhoto.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
