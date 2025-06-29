"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Vérifier le thème sauvegardé ou la préférence système
    const savedTheme = localStorage.getItem("ouarzazate-theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("ouarzazate-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("ouarzazate-theme", "light")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-2 hidden sm:inline">{isDark ? "Mode Jour" : "Mode Nuit"}</span>
    </Button>
  )
}
