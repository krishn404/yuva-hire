import { type NextRequest, NextResponse } from "next/server"
import { withRole } from "@/lib/middleware"
import { mockApiClient } from "@/lib/mock-api"

export const POST = withRole(["student"])(async (req: NextRequest, user: any) => {
  try {
    const body = await req.json()
    const { jobId } = body

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    const response = await mockApiClient.applyToJob(jobId)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ application: response.data.application })
  } catch (error) {
    console.error("Apply to job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const GET = withRole(["student"])(async (req: NextRequest, user: any) => {
  try {
    const response = await mockApiClient.getApplications()
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ applications: response.data.applications })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
