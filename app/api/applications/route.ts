import { type NextRequest, NextResponse } from "next/server"
import { withRole } from "@/lib/middleware"
import { sql } from "@/lib/db"

export const POST = withRole(["student"])(async (req: NextRequest, user: any) => {
  try {
    const body = await req.json()
    const { jobId } = body

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    // Check if job exists and is from student's college
    const jobs = await sql`
      SELECT * FROM jobs WHERE id = ${jobId} AND college = ${user.college} AND status = 'active'
    `

    if (jobs.length === 0) {
      return NextResponse.json({ error: "Job not found or not available" }, { status: 404 })
    }

    // Check if already applied
    const existingApplications = await sql`
      SELECT * FROM applications WHERE job_id = ${jobId} AND student_id = ${user.userId}
    `

    if (existingApplications.length > 0) {
      return NextResponse.json({ error: "Already applied to this job" }, { status: 400 })
    }

    // Create application
    const applications = await sql`
      INSERT INTO applications (job_id, student_id)
      VALUES (${jobId}, ${user.userId})
      RETURNING *
    `

    const application = applications[0]
    return NextResponse.json({
      application: {
        id: application.id,
        jobId: application.job_id,
        studentId: application.student_id,
        status: application.status,
        appliedAt: application.applied_at,
      },
    })
  } catch (error) {
    console.error("Apply to job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const GET = withRole(["student"])(async (req: NextRequest, user: any) => {
  try {
    const applications = await sql`
      SELECT 
        a.*,
        j.title,
        j.description,
        j.location,
        j.job_type,
        j.salary,
        j.salary_period,
        j.deadline,
        j.requirements,
        j.college
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.student_id = ${user.userId}
      ORDER BY a.applied_at DESC
    `

    return NextResponse.json({
      applications: applications.map((app: any) => ({
        id: app.id,
        jobId: app.job_id,
        status: app.status,
        appliedAt: app.applied_at,
        job: {
          id: app.job_id,
          title: app.title,
          description: app.description,
          location: app.location,
          jobType: app.job_type,
          salary: app.salary,
          salaryPeriod: app.salary_period,
          deadline: app.deadline,
          requirements: app.requirements,
          college: app.college,
        },
      })),
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
