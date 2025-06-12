import { type NextRequest, NextResponse } from "next/server"
import { withRole } from "@/lib/middleware"
import { mockApiClient } from "@/lib/mock-api"

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const college = searchParams.get("college")
    const status = searchParams.get("status")

    const response = await mockApiClient.getJobs({ college, status })
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ jobs: response.data.jobs })
  } catch (error) {
    console.error("Get jobs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withRole(["admin"])(async (req: NextRequest, user: any) => {
  try {
    const body = await req.json()
    const response = await mockApiClient.createJob(body)
    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 })
    }

    return NextResponse.json({ job: response.data.job })
  } catch (error) {
    console.error("Create job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
