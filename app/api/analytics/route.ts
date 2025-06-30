import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { page, timestamp, userAgent } = await request.json()

    // Store analytics data
    const { error } = await supabase.from("analytics").insert([
      {
        page,
        timestamp,
        user_agent: userAgent,
        ip_address: request.ip || "unknown",
      },
    ])

    if (error) {
      console.error("Analytics error:", error)
      return NextResponse.json({ error: "Failed to track" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
