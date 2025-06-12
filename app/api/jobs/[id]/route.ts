import { type NextRequest, NextResponse } from "next/server"
import { withRole } from "@/lib/middleware"
import { sql } from "@/lib/db"

export const PUT = withRole(["admin"])(async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json()
    const { title, description, location, jobType, salary, salaryPeriod, deadline, requirements, status } = body

    // Verify job belongs to the admin's college
    const existingJobs = await sql`
      SELECT * FROM jobs WHERE id = ${params.id} AND posted_by = ${user.userId}
    `

    if (existingJobs.length === 0) {
      return NextResponse.json({ error: "Job not found or unauthorized" }, { status: 404 })
    }

    const jobs = await sql`
      UPDATE jobs 
      SET title = ${title}, description = ${description}, location = ${location}, 
          job_type = ${jobType}, salary = ${salary}, salary_period = ${salaryPeriod}, 
          deadline = ${deadline}, requirements = ${requirements}, status = ${status || "active"},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `

    const job = jobs[0]
    return NextResponse.json({
      job: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        jobType: job.job_type,
        salary: job.salary,
        salaryPeriod: job.salary_period,
        deadline: job.deadline,
        requirements: job.requirements,
        college: job.college,
        status: job.status,
        updatedAt: job.updated_at,
      },
    })
  } catch (error) {
    console.error("Update job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const DELETE = withRole(["admin"])(
  async (req: NextRequest, user: any, { params }: { params: { id: string } }) => {
    try {
      // Verify job belongs to the admin's college
      const existingJobs = await sql`
      SELECT * FROM jobs WHERE id = ${params.id} AND posted_by = ${user.userId}
    `

      if (existingJobs.length === 0) {
        return NextResponse.json({ error: "Job not found or unauthorized" }, { status: 404 })
      }

      await sql`DELETE FROM jobs WHERE id = ${params.id}`

      return NextResponse.json({ message: "Job deleted successfully" })
    } catch (error) {
      console.error("Delete job error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  },
)
