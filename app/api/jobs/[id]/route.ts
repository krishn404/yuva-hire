import { type NextRequest, NextResponse } from "next/server"
import { withRole } from "@/lib/middleware"
import { mockApiClient } from "@/lib/mock-api"

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const response = await mockApiClient.getJob(params.id)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 404 })
    }

    return NextResponse.json({ job: response.data.job })
  } catch (error) {
    console.error("Get job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const PUT = withRole(["admin"])(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json()
    const response = await mockApiClient.updateJob(params.id, body)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ job: response.data.job })
  } catch (error) {
    console.error("Update job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const DELETE = withRole(["admin"])(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    const response = await mockApiClient.deleteJob(params.id)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
