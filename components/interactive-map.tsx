"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock, Star, Camera, Mountain, Castle } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  category: string
  description: string
  coordinates: { lat: number; lng: number }
  address: string
  phone?: string
  hours?: string
  rating?: number
  image: string
  price?: string
  duration?: string
}

const locations: MapLocation[] = [
  {
    id: "1",
    name: "Kasbah Taourirt",
    category: "Patrimoine",
    description: "Palais fortifié du XIXe siècle, résidence des Glaoui",
    coordinates: { lat: 30.9335, lng: -6.937 },
    address: "Centre-ville, Ouarzazate",
    phone: "+212 524-882312",
    hours: "9h00 - 18h00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    price: "30 DH",
    duration: "2h",
  },
  {
    id: "2",
    name: "Atlas Studios",
    category: "Cinéma",
    description: "Plus grands studios de cinéma d'Afrique",
    coordinates: { lat: 30.9189, lng: -6.8897 },
    address: "Route de Marrakech, Ouarzazate",
    phone: "+212 524-882677",
    hours: "8h00 - 18h00",
    rating: 4.8,
    image: "/images/cinema-principal.jpg",
    price: "80 DH",
    duration: "3h",
  },
  {
    id: "3",
    name: "Ksar Ait Ben Haddou",
    category: "UNESCO",
    description: "Village fortifié classé patrimoine mondial",
    coordinates: { lat: 31.0472, lng: -7.1325 },
    address: "Ait Ben Haddou, 30km de Ouarzazate",
    phone: "+212 524-890002",
    hours: "8h00 - 19h00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&sat=-20&hue=30",
    price: "50 DH",
    duration: "4h",
  },
  {
    id: "4",
    name: "Oasis de Fint",
    category: "Nature",
    description: "Palmeraie verdoyante aux portes du désert",
    coordinates: { lat: 30.8833, lng: -6.8167 },
    address: "Fint, 10km de Ouarzazate",
    hours: "Toute la journée",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    price: "40 DH",
    duration: "3h",
  },
  {
    id: "5",
    name: "Musée du Cinéma",
    category: "Culture",
    description: "Histoire du cinéma à Ouarzazate",
    coordinates: { lat: 30.93, lng: -6.935 },
    address: "Avenue Mohammed V, Ouarzazate",
    phone: "+212 524-882234",
    hours: "9h00 - 17h00",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: "25 DH",
    duration: "1h30",
  },
]

const categories = ["Tous", "Patrimoine", "Cinéma", "UNESCO", "Nature", "Culture"]

export default function InteractiveMap() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const filteredLocations =
    selectedCategory === "Tous" ? locations : locations.filter((loc) => loc.category === selectedCategory)

  useEffect(() => {
    // Demander la géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Géolocalisation non disponible:", error)
        },
      )
    }
  }, [])

  const calculateDistance = (loc1: { lat: number; lng: number }, loc2: { lat: number; lng: number }) => {
    const R = 6371 // Rayon de la Terre en km
    const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180
    const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.lat * Math.PI) / 180) *
        Math.cos((loc2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const openInMaps = (location: MapLocation) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`
    window.open(url, "_blank")
  }

  const getDirections = (location: MapLocation) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.coordinates.lat},${location.coordinates.lng}`
      window.open(url, "_blank")
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`
      window.open(url, "_blank")
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Patrimoine":
        return <Castle className="h-4 w-4" />
      case "Cinéma":
        return <Camera className="h-4 w-4" />
      case "UNESCO":
        return <Star className="h-4 w-4" />
      case "Nature":
        return <Mountain className="h-4 w-4" />
      case "Culture":
        return <MapPin className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Carte interactive simulée */}
      <Card className="overflow-hidden">
        <div className="relative h-96 bg-gradient-to-br from-orange-100 to-amber-100">
          {/* Simulation d'une carte */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-green-200 via-yellow-200 to-orange-200" />
          </div>

          {/* Points d'intérêt sur la carte */}
          {filteredLocations.map((location, index) => (
            <div
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + ((index * 15) % 60)}%`,
                top: `${30 + ((index * 12) % 40)}%`,
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  {getCategoryIcon(location.category)}
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">{location.name}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Légende */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h3 className="font-semibold text-sm mb-2">Légende</h3>
            <div className="space-y-1 text-xs">
              {categories.slice(1).map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs">
                    {getCategoryIcon(category)}
                  </div>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contrôles de la carte */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              <Navigation className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              +
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
              -
            </Button>
          </div>
        </div>
      </Card>

      {/* Filtres */}
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
            {getCategoryIcon(category)}
            <span className="ml-2">{category}</span>
          </Button>
        ))}
      </div>

      {/* Liste des lieux */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              selectedLocation?.id === location.id ? "ring-2 ring-orange-500 shadow-xl" : ""
            }`}
            onClick={() => setSelectedLocation(location)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={location.image || "/placeholder.svg"}
                alt={location.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <Badge className="absolute top-2 left-2 bg-orange-600 text-white">{location.category}</Badge>
              {location.rating && (
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {location.rating}
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{location.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{location.address}</span>
                </div>

                {location.hours && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{location.hours}</span>
                  </div>
                )}

                {location.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{location.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-sm">
                  {location.price && <span className="font-semibold text-orange-600">{location.price}</span>}
                  {location.duration && <span className="text-gray-500">{location.duration}</span>}
                </div>

                {userLocation && (
                  <span className="text-xs text-gray-500">
                    {calculateDistance(userLocation, location.coordinates).toFixed(1)} km
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    openInMaps(location)
                  }}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    getDirections(location)
                  }}
                  className="flex-1"
                >
                  <Navigation className="h-4 w-4 mr-1" />Y aller
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Panneau de détails du lieu sélectionné */}
      {selectedLocation && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {getCategoryIcon(selectedLocation.category)}
                {selectedLocation.name}
              </span>
              <Button size="sm" variant="ghost" onClick={() => setSelectedLocation(null)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedLocation.image || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">{selectedLocation.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>{selectedLocation.address}</span>
                  </div>

                  {selectedLocation.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span>{selectedLocation.phone}</span>
                    </div>
                  )}

                  {selectedLocation.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>{selectedLocation.hours}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => openInMaps(selectedLocation)} className="bg-orange-600 hover:bg-orange-700">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ouvrir dans Maps
                  </Button>
                  <Button variant="outline" onClick={() => getDirections(selectedLocation)}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Itinéraire
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
