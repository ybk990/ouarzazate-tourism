"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Chrome, Bookmark, Copy, ExternalLink, Search, Globe, Lock, Settings } from "lucide-react"

export default function AdminAccessHelper() {
  const [copied, setCopied] = useState(false)

  const currentUrl = typeof window !== "undefined" ? window.location.origin : "https://your-domain.com"
  const adminUrl = `${currentUrl}/admin/login`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const openAdminInNewTab = () => {
    window.open("/admin/login", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quick Access Card */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Shield className="h-6 w-6" />
            Accès Rapide Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input value={adminUrl} readOnly className="bg-white border-orange-200" />
            </div>
            <Button
              onClick={() => copyToClipboard(adminUrl)}
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copié!" : "Copier"}
            </Button>
            <Button onClick={openAdminInNewTab} className="bg-orange-600 hover:bg-orange-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ouvrir Admin
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-orange-600" />
                Identifiants
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Utilisateur:</strong> admin_ouarzazate
                </p>
                <p>
                  <strong>Mot de passe:</strong> Ouarzazate2025!
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" />
                Pages Admin
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  • <strong>/admin/login</strong> - Connexion
                </p>
                <p>
                  • <strong>/admin/dashboard</strong> - Dashboard
                </p>
                <p>
                  • <strong>/admin/test-connection</strong> - Tests
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browser Instructions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="h-5 w-5 text-blue-600" />
              Google Chrome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 mt-1">1</Badge>
                <div>
                  <p className="font-medium">Ouvrir Chrome</p>
                  <p className="text-sm text-gray-600">Lancez Google Chrome</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 mt-1">2</Badge>
                <div>
                  <p className="font-medium">Barre d'adresse</p>
                  <p className="text-sm text-gray-600">
                    Tapez: <code className="bg-gray-100 px-1 rounded">localhost:3000/admin/login</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 mt-1">3</Badge>
                <div>
                  <p className="font-medium">Appuyez sur Entrée</p>
                  <p className="text-sm text-gray-600">La page de connexion s'ouvre</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-orange-600" />
              Créer un Marque-page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800 mt-1">1</Badge>
                <div>
                  <p className="font-medium">Aller sur la page admin</p>
                  <p className="text-sm text-gray-600">Naviguez vers /admin/login</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800 mt-1">2</Badge>
                <div>
                  <p className="font-medium">Ctrl + D (Windows) ou Cmd + D (Mac)</p>
                  <p className="text-sm text-gray-600">Raccourci pour ajouter un marque-page</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800 mt-1">3</Badge>
                <div>
                  <p className="font-medium">Nommer le marque-page</p>
                  <p className="text-sm text-gray-600">"Admin Ouarzazate" par exemple</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-green-600" />
            Conseils de Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">🔍 Dans la barre d'adresse Chrome:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <code>localhost:3000/admin</code>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code>127.0.0.1:3000/admin/login</code>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <code>your-domain.com/admin</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-900">⚡ Raccourcis Chrome:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + L</kbd> - Aller à la barre d'adresse
                </p>
                <p>
                  <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + T</kbd> - Nouvel onglet
                </p>
                <p>
                  <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + Shift + T</kbd> - Rouvrir onglet fermé
                </p>
                <p>
                  <kbd className="bg-gray-100 px-2 py-1 rounded">Ctrl + D</kbd> - Ajouter marque-page
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Accès Mobile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">📱 Sur téléphone/tablette:</h3>
            <div className="space-y-2 text-sm text-purple-700">
              <p>1. Ouvrez Chrome mobile</p>
              <p>2. Tapez l'adresse dans la barre d'URL</p>
              <p>3. Ajoutez à l'écran d'accueil pour un accès rapide</p>
              <p>4. L'interface s'adapte automatiquement au mobile</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
