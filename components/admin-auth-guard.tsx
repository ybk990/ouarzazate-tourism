"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock } from "lucide-react"

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("admin_authenticated")
      const loginTime = localStorage.getItem("admin_login_time")

      if (!isAuth || !loginTime) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      // Check if session is still valid (24 hours)
      const loginDate = new Date(loginTime)
      const now = new Date()
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

      if (hoursDiff > 24) {
        // Session expired
        localStorage.removeItem("admin_authenticated")
        localStorage.removeItem("admin_login_time")
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Vérification...</h2>
            <p className="text-gray-600">Vérification de l'authentification</p>
            <div className="mt-4 flex justify-center">
              <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès refusé</h2>
            <p className="text-gray-600">Redirection vers la page de connexion...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
