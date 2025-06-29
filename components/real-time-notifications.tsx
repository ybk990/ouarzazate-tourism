"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { Bell, X, CheckCircle, Calendar } from "lucide-react"

interface Notification {
  id: string
  type: "new_reservation" | "status_change"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export default function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [lastCheck, setLastCheck] = useState(new Date())

  useEffect(() => {
    // Vérifier les nouvelles réservations toutes les 10 secondes
    const interval = setInterval(async () => {
      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("*")
          .gte("created_at", lastCheck.toISOString())
          .order("created_at", { ascending: false })

        if (!error && data && data.length > 0) {
          const newNotifications = data.map((reservation) => ({
            id: reservation.id,
            type: "new_reservation" as const,
            title: "Nouvelle réservation",
            message: `${reservation.nom} a fait une réservation`,
            timestamp: new Date(reservation.created_at),
            read: false,
          }))

          setNotifications((prev) => [...newNotifications, ...prev])
          setLastCheck(new Date())
        }
      } catch (error) {
        console.error("Erreur notifications:", error)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [lastCheck])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[1.2rem] h-5">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearAll}>
                    Effacer
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setShowNotifications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune notification</p>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      notification.read ? "bg-gray-50 border-gray-200" : "bg-orange-50 border-orange-200"
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        {notification.type === "new_reservation" ? (
                          <Calendar className="h-4 w-4 text-orange-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp.toLocaleTimeString("fr-FR")}
                        </p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
