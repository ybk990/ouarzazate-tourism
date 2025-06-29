import AdminAccessHelper from "@/components/admin-access-helper"
import MobileOptimizedNav from "@/components/mobile-optimized-nav"
import { Badge } from "@/components/ui/badge"
import { Shield, Chrome } from "lucide-react"

export default function AdminAccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <MobileOptimizedNav />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800">
            <Shield className="mr-2 h-4 w-4" />
            Guide d'Accès Admin
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Comment Accéder au Dashboard Admin</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guide complet pour accéder à votre interface d'administration depuis n'importe quel navigateur
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <AdminAccessHelper />
      </div>

      {/* Quick Links */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Liens Rapides</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admin/login"
              target="_blank"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              rel="noreferrer"
            >
              <Shield className="mr-2 h-5 w-5" />
              Ouvrir Admin Dashboard
            </a>
            <a
              href="/"
              className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Retour au Site Principal
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
