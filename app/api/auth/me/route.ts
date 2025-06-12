import { type NextRequest, NextResponse } from "next/server"
import { mockApiClient } from "@/lib/mock-api"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No valid token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const response = await mockApiClient.getMe()
    
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 401 })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
