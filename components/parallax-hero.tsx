"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Camera, MapPin, Play, ChevronDown } from "lucide-react"

export default function ParallaxHero() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Animation d'entrée
    setTimeout(() => setIsVisible(true), 500)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.5

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec effet parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <Image src="/images/beauty.jpg" alt="Coucher de soleil à Ouarzazate" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div
        className={`relative z-10 text-center text-white px-4 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge animé */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-bounce">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Hollywood de l'Afrique</span>
        </div>

        {/* Titre principal avec animation */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl">
          <span className="inline-block animate-pulse">O</span>
          <span className="inline-block" style={{ animationDelay: "0.1s" }}>
            u
          </span>
          <span className="inline-block" style={{ animationDelay: "0.2s" }}>
            a
          </span>
          <span className="inline-block" style={{ animationDelay: "0.3s" }}>
            r
          </span>
          <span className="inline-block" style={{ animationDelay: "0.4s" }}>
            z
          </span>
          <span className="inline-block" style={{ animationDelay: "0.5s" }}>
            a
          </span>
          <span className="inline-block" style={{ animationDelay: "0.6s" }}>
            z
          </span>
          <span className="inline-block" style={{ animationDelay: "0.7s" }}>
            a
          </span>
          <span className="inline-block" style={{ animationDelay: "0.8s" }}>
            t
          </span>
          <span className="inline-block" style={{ animationDelay: "0.9s" }}>
            e
          </span>
        </h1>

        {/* Sous-titre */}
        <div className="space-y-2 mb-8">
          <p className="text-2xl md:text-3xl font-light drop-shadow-lg">La Porte du Désert</p>
          <div className="flex items-center justify-center gap-4 text-lg md:text-xl">
            <span className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Studios Mondiaux
            </span>
            <span className="text-orange-300">•</span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Patrimoine UNESCO
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto drop-shadow-md leading-relaxed">
          Découvrez la magie de Ouarzazate, où l'architecture berbère millénaire rencontre l'industrie cinématographique
          mondiale dans un paysage à couper le souffle.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
          >
            <Camera className="mr-2 h-6 w-6" />
            Explorer les Studios
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Play className="mr-2 h-6 w-6" />
            Voir la Vidéo
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: "50+", label: "Films Tournés" },
            { number: "2M+", label: "Visiteurs/An" },
            { number: "1000+", label: "Ans d'Histoire" },
            { number: "5★", label: "Expérience" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              style={{
                animationDelay: `${1 + index * 0.2}s`,
              }}
            >
              <div className="text-2xl md:text-3xl font-bold text-orange-300 mb-1">{stat.number}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm opacity-75">Découvrir</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>

      {/* Overlay décoratif */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
    </section>
  )
}
