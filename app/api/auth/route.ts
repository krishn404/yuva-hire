import { type NextRequest, NextResponse } from "next/server"
import { mockApiClient } from "@/lib/mock-api"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const response = await mockApiClient.login(email, password)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 401 })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const response = await mockApiClient.getMe()
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 401 })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Get me error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 