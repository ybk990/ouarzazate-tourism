"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface CalendarProps {
  selectedDates: { checkIn: string; checkOut: string }
  onDateSelect: (dates: { checkIn: string; checkOut: string }) => void
  unavailableDates?: string[]
}

export default function BookingCalendar({ selectedDates, onDateSelect, unavailableDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Jours du mois précédent
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateUnavailable = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return unavailableDates.includes(dateString) || date < new Date()
  }

  const isDateInRange = (date: Date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false
    const checkIn = new Date(selectedDates.checkIn)
    const checkOut = new Date(selectedDates.checkOut)
    return date >= checkIn && date <= checkOut
  }

  const isDateSelected = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return dateString === selectedDates.checkIn || dateString === selectedDates.checkOut
  }

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date)) return

    const dateString = date.toISOString().split("T")[0]

    if (!selectedDates.checkIn || selectingCheckOut) {
      if (!selectedDates.checkIn) {
        onDateSelect({ checkIn: dateString, checkOut: "" })
        setSelectingCheckOut(true)
      } else {
        if (date > new Date(selectedDates.checkIn)) {
          onDateSelect({ ...selectedDates, checkOut: dateString })
          setSelectingCheckOut(false)
        } else {
          onDateSelect({ checkIn: dateString, checkOut: "" })
        }
      }
    } else {
      onDateSelect({ checkIn: dateString, checkOut: "" })
      setSelectingCheckOut(true)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="aspect-square">
              {date && (
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isDateUnavailable(date)}
                  className={`w-full h-full rounded-lg text-sm font-medium transition-all ${
                    isDateUnavailable(date)
                      ? "text-gray-300 cursor-not-allowed"
                      : isDateSelected(date)
                        ? "bg-orange-600 text-white"
                        : isDateInRange(date)
                          ? "bg-orange-100 text-orange-800"
                          : "hover:bg-orange-50 text-gray-700"
                  }`}
                >
                  {date.getDate()}
                </button>
              )}
            </div>
          ))}
        </div>

        {selectedDates.checkIn && (
          <div className="mt-4 p-3 bg-orange-50 rounded-lg text-sm">
            <div className="flex justify-between">
              <span>Arrivée:</span>
              <span className="font-medium">{new Date(selectedDates.checkIn).toLocaleDateString("fr-FR")}</span>
            </div>
            {selectedDates.checkOut && (
              <div className="flex justify-between">
                <span>Départ:</span>
                <span className="font-medium">{new Date(selectedDates.checkOut).toLocaleDateString("fr-FR")}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
