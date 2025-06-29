"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Castle, Camera, Mountain, Calendar, Phone, Mail, MapPin, Star, Home } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Attractions", href: "#attractions", icon: Mountain },
  { name: "Cinéma", href: "#cinema", icon: Camera },
  { name: "Hébergement", href: "#hebergement", icon: Castle },
  { name: "Galerie", href: "/galerie", icon: Camera },
  { name: "Carte", href: "/carte", icon: MapPin },
  { name: "Réserver", href: "#reservation", icon: Calendar },
  { name: "Contact", href: "#contact", icon: Mail },
]

export default function MobileOptimizedNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 dark:bg-gray-900/95">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Castle className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-800 dark:text-orange-400">Ouarzazate</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-2 dark:text-gray-300 dark:hover:text-orange-400"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Navigation Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="p-6 border-b bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Castle className="h-6 w-6" />
                        <span className="text-xl font-bold">Ouarzazate</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="text-sm opacity-90 mt-2">La Porte du Désert</p>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 p-6">
                    <nav className="space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group dark:hover:bg-gray-800"
                        >
                          <item.icon className="h-5 w-5 text-orange-600 group-hover:text-orange-700" />
                          <span className="font-medium text-gray-900 group-hover:text-orange-700 dark:text-gray-100">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>

                    {/* Actions rapides */}
                    <div className="mt-8 space-y-3">
                      <Badge className="w-full justify-center bg-orange-100 text-orange-800 py-2">
                        Actions Rapides
                      </Badge>

                      <Link
                        href="tel:+212615048842"
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-800">Appeler</div>
                          <div className="text-sm text-green-600">+212 615048842</div>
                        </div>
                      </Link>

                      <Link
                        href="#reservation"
                        className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="font-medium text-orange-800">Réserver</div>
                          <div className="text-sm text-orange-600">Votre séjour</div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Footer du menu */}
                  <div className="p-6 border-t bg-gray-50 dark:bg-gray-800">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expérience 5 étoiles garantie</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
