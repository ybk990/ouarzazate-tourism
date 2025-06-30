"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pathname + searchParams.toString(),
      })
    }

    // Simple analytics tracking
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          }),
        })
      } catch (error) {
        console.log("Analytics tracking failed:", error)
      }
    }

    trackPageView()
  }, [pathname, searchParams])

  return null
}
