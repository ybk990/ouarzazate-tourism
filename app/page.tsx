"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Camera,
  Mountain,
  Sun,
  Star,
  Calendar,
  Phone,
  Mail,
  Globe,
  Film,
  Trees,
  Castle,
  Wifi,
  Car,
  UtensilsCrossed,
  ArrowRight,
  Shield,
} from "lucide-react"
import ReservationForm from "@/components/reservation-form"
import ContactForm from "@/components/contact-form"
import ParallaxHero from "@/components/parallax-hero"
import MobileOptimizedNav from "@/components/mobile-optimized-nav"

export default function OuarzazateTourism() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <MobileOptimizedNav />

      {/* Hero Section */}
      <ParallaxHero />

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/reservation-avancee">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">Réservation Avancée</h3>
                  <p className="text-gray-600 mb-4">Système complet avec calendrier interactif</p>
                  <Button className="bg-orange-600 hover:bg-orange-700 w-full">
                    Réserver maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/galerie">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <Camera className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">Galerie Photos</h3>
                  <p className="text-gray-600 mb-4">Découvrez la beauté d'Ouarzazate</p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Voir les photos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/carte">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">Carte Interactive</h3>
                  <p className="text-gray-600 mb-4">Explorez tous les points d'intérêt</p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    Explorer la carte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin-access">
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">Admin Dashboard</h3>
                  <p className="text-gray-600 mb-4">Guide d'accès à l'administration</p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Guide d'accès
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Cinema Section */}
      <section id="cinema" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800">Hollywood de l'Afrique</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Studios de Cinéma Mondiaux</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ouarzazate est devenue la destination de choix pour les plus grandes productions cinématographiques
              internationales grâce à ses paysages uniques et ses infrastructures modernes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Image
                src="/images/cinema-principal.jpg"
                alt="Studios de cinéma Ouarzazate"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Des Décors Grandioses</h3>
              <p className="text-gray-600 text-lg">
                Nos studios ont accueilli des productions légendaires comme "Lawrence d'Arabie", "Gladiator", "Game of
                Thrones", et bien d'autres. Découvrez les coulisses du cinéma dans un cadre authentique exceptionnel.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Film className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Atlas Studios</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">CLA Studios</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Visites Guidées</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Ouvert 7j/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/cinema-studios.jpg"
              alt="Clap de cinéma géant Ouarzazate"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Film className="mr-2 h-5 w-5" />
                Réserver une Visite
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-600 text-white">Patrimoine & Nature</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Attractions Incontournables</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'architecture berbère aux paysages désertiques, Ouarzazate offre une richesse culturelle et naturelle
              exceptionnelle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Castle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Kasbah Taourirt</CardTitle>
                <CardDescription>Palais fortifié du XIXe siècle, joyau de l'architecture berbère</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explorez cette magnifique kasbah restaurée qui témoigne de la richesse historique de la région.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Mountain className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Atlas Studios</CardTitle>
                <CardDescription>Les plus grands studios de cinéma d'Afrique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Visitez les décors de vos films préférés et découvrez les secrets du cinéma international.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Réserver visite
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Désert du Sahara</CardTitle>
                <CardDescription>Excursions vers les dunes de Merzouga</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Partez à l'aventure dans le plus grand désert du monde pour une expérience inoubliable.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Organiser excursion
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Trees className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Oasis de Fint</CardTitle>
                <CardDescription>Palmeraie verdoyante aux portes du désert</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Découvrez cette oasis préservée, véritable havre de paix au cœur des paysages arides.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Découvrir
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Castle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Ksar Ait Ben Haddou</CardTitle>
                <CardDescription>Site UNESCO, village fortifié emblématique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Visitez ce ksar légendaire, décor de nombreux films et patrimoine mondial de l'humanité.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Planifier visite
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Musée du Cinéma</CardTitle>
                <CardDescription>Histoire du cinéma à Ouarzazate</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Plongez dans l'histoire cinématographique de la ville à travers une collection unique.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Visiter musée
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section id="hebergement" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-600 text-white">Séjour Authentique</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hébergements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection d'hébergements authentiques, des riads traditionnels aux campements sous les
              étoiles du désert.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-orange-400 to-amber-400">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Luxe</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Riads de Prestige</CardTitle>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>
                <CardDescription>Palais traditionnels restaurés avec tout le confort moderne</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">À partir de</span>
                  <span className="text-2xl font-bold text-orange-600">1200 DH</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Centre historique</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Spa & Hammam inclus</span>
                  </div>
                </div>
                <Link href="/reservation-avancee">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Réserver maintenant</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-blue-400 to-teal-400">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Populaire</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Hôtels Modernes</CardTitle>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <CardDescription>Confort international avec charme local</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">À partir de</span>
                  <span className="text-2xl font-bold text-orange-600">600 DH</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Proche des studios</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Piscine & Restaurant</span>
                  </div>
                </div>
                <Link href="/reservation-avancee">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Voir disponibilités</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-400">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30">Aventure</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Campements Désert</CardTitle>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <CardDescription>Nuit sous les étoiles dans le Sahara</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">À partir de</span>
                  <span className="text-2xl font-bold text-orange-600">800 DH</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Dunes de Merzouga</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4" />
                    <span>Transport & Repas inclus</span>
                  </div>
                </div>
                <Link href="/reservation-avancee">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Réserver excursion</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Services */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Services Inclus</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Petit-déjeuner</h4>
                <p className="text-sm text-gray-600">Traditionnel marocain inclus</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Transport</h4>
                <p className="text-sm text-gray-600">Transfert aéroport disponible</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">WiFi Gratuit</h4>
                <p className="text-sm text-gray-600">Dans tous les établissements</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Conciergerie</h4>
                <p className="text-sm text-gray-600">Organisation d'excursions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-20 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-600 text-white">Réservation</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Réservez votre séjour</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Remplissez le formulaire ci-dessous pour réserver votre hébergement. Nous vous contacterons dans les 24h
              pour confirmer votre réservation.
            </p>
            <Link href="/reservation-avancee">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 mb-8">
                <Calendar className="mr-2 h-5 w-5" />
                Système de Réservation Avancé
              </Button>
            </Link>
          </div>

          <ReservationForm />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-600 text-white">Contact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contactez-nous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une question ? Un besoin d'information ? N'hésitez pas à nous contacter, nous sommes là pour vous aider !
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ContactForm />

            <div className="space-y-8">
              <div className="grid gap-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">+212 615048842</p>
                      <p className="text-sm text-gray-500">Disponible 7j/7 de 8h à 20h</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@ouarzazate-tourism.ma</p>
                      <p className="text-sm text-gray-500">Réponse sous 24h</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Adresse</h3>
                      <p className="text-gray-600">Centre-ville Ouarzazate</p>
                      <p className="text-sm text-gray-500">Région Drâa-Tafilalet, Maroc</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi - Dimanche</span>
                    <span>9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgences</span>
                    <span>24h/24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Castle className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">Ouarzazate Tourism</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Découvrez la magie de Ouarzazate, porte du désert et capitale du cinéma africain.
              </p>
              <div className="flex gap-4">
                <Link href="/galerie">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  >
                    Galerie
                  </Button>
                </Link>
                <Link href="/carte">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white bg-transparent"
                  >
                    Carte
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Attractions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kasbah Taourirt
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Atlas Studios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ait Ben Haddou
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Oasis de Fint
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Visites guidées
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Excursions désert
                  </Link>
                </li>
                <li>
                  <Link href="#hebergement" className="hover:text-white transition-colors">
                    Hébergement
                  </Link>
                </li>
                <li>
                  <Link href="/reservation-avancee" className="hover:text-white transition-colors">
                    Réservation Avancée
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+212 615048842</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@ouarzazate-tourism.ma</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>www.ouarzazate-tourism.ma</span>
                </li>
              </ul>
              <div className="mt-4 space-y-2">
                <Link href="/admin-access">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:text-white bg-transparent w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Guide Admin
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-300 hover:text-white bg-transparent w-full"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Ouarzazate Tourism. Tous droits réservés.</p>
            <p className="mt-2">Site développé avec ❤️ pour promouvoir le tourisme à Ouarzazate - La Porte du Désert</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
