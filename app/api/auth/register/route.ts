import { type NextRequest, NextResponse } from "next/server"
import { mockApiClient } from "@/lib/mock-api"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { name, email, password, role, college } = body

    if (!name || !email || !password || !role || !college) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const response = await mockApiClient.register(body)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
