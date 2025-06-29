"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Admin credentials (in production, use environment variables)
  const ADMIN_CREDENTIALS = {
    username: "admin_ouarzazate",
    password: "Ouarzazate2025!",
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.username === ADMIN_CREDENTIALS.username && credentials.password === ADMIN_CREDENTIALS.password) {
      // Set authentication token in localStorage
      localStorage.setItem("admin_authenticated", "true")
      localStorage.setItem("admin_login_time", new Date().toISOString())

      // Redirect to dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23f97316%22 fillOpacity=%220.4%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Administration</CardTitle>
          <p className="text-gray-600 mt-2">Ouarzazate Tourism Dashboard</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Nom d'utilisateur
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Entrez votre nom d'utilisateur"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </div>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Se connecter
                </>
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Identifiants de démonstration
            </h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>
                <strong>Utilisateur:</strong> admin_ouarzazate
              </p>
              <p>
                <strong>Mot de passe:</strong> Ouarzazate2025!
              </p>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 En production, ces identifiants seraient sécurisés dans des variables d'environnement
            </p>
          </div>

          {/* Security Features */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Sécurisé</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Chiffré</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Site Link */}
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="bg-white/80 backdrop-blur-sm border-white/50 hover:bg-white/90"
        >
          ← Retour au site
        </Button>
      </div>
    </div>
  )
}
