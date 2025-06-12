import { type NextRequest, NextResponse } from "next/server"
import { withAuth, withRole } from "@/lib/middleware"
import { sql } from "@/lib/db"

export const GET = withAuth(async (req: NextRequest, user: any) => {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""
    const jobType = searchParams.get("jobType") || ""
    const deadline = searchParams.get("deadline") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    const whereConditions = ["j.status = $1"]
    const params: any[] = ["active"]
    let paramIndex = 2

    // Filter by college for students
    if (user.role === "student") {
      whereConditions.push(`j.college = $${paramIndex}`)
      params.push(user.college)
      paramIndex++
    }

    // Search filters
    if (search) {
      whereConditions.push(`(j.title ILIKE $${paramIndex} OR j.description ILIKE $${paramIndex})`)
      params.push(`%${search}%`)
      paramIndex++
    }

    if (location) {
      whereConditions.push(`j.location ILIKE $${paramIndex}`)
      params.push(`%${location}%`)
      paramIndex++
    }

    if (jobType) {
      whereConditions.push(`j.job_type = $${paramIndex}`)
      params.push(jobType)
      paramIndex++
    }

    if (deadline) {
      whereConditions.push(`j.deadline >= $${paramIndex}`)
      params.push(deadline)
      paramIndex++
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : ""

    // Get jobs with application status for students
    const query = `
      SELECT 
        j.*,
        u.name as posted_by_name,
        COUNT(a.id) as applicant_count,
        ${
          user.role === "student"
            ? `
          CASE WHEN student_apps.student_id IS NOT NULL THEN true ELSE false END as has_applied
        `
            : "false as has_applied"
        }
      FROM jobs j
      LEFT JOIN users u ON j.posted_by = u.id
      LEFT JOIN applications a ON j.id = a.job_id
      ${
        user.role === "student"
          ? `
        LEFT JOIN applications student_apps ON j.id = student_apps.job_id AND student_apps.student_id = $${paramIndex}
      `
          : ""
      }
      ${whereClause}
      GROUP BY j.id, u.name${user.role === "student" ? ", student_apps.student_id" : ""}
      ORDER BY j.created_at DESC
      LIMIT $${paramIndex + (user.role === "student" ? 1 : 0)} OFFSET $${paramIndex + (user.role === "student" ? 2 : 1)}
    `

    if (user.role === "student") {
      params.push(user.userId)
      paramIndex++
    }
    params.push(limit, offset)

    const jobs = await sql.unsafe(query, params)

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT j.id) as total
      FROM jobs j
      LEFT JOIN users u ON j.posted_by = u.id
      ${whereClause}
    `

    const countParams = params.slice(0, -2) // Remove limit and offset
    const countResult = await sql.unsafe(countQuery, countParams)
    const total = Number.parseInt(countResult[0].total)

    return NextResponse.json({
      jobs: jobs.map((job: any) => ({
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
        postedBy: job.posted_by,
        postedByName: job.posted_by_name,
        status: job.status,
        createdAt: job.created_at,
        applicantCount: Number.parseInt(job.applicant_count),
        hasApplied: job.has_applied,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get jobs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})

export const POST = withRole(["admin"])(async (req: NextRequest, user: any) => {
  try {
    const body = await req.json()
    const { title, description, location, jobType, salary, salaryPeriod, deadline, requirements } = body

    if (!title || !description || !location || !jobType || !salary || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const jobs = await sql`
      INSERT INTO jobs (title, description, location, job_type, salary, salary_period, deadline, requirements, college, posted_by)
      VALUES (${title}, ${description}, ${location}, ${jobType}, ${salary}, ${salaryPeriod || "Monthly"}, ${deadline}, ${requirements}, ${user.college}, ${user.userId})
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
        postedBy: job.posted_by,
        status: job.status,
        createdAt: job.created_at,
      },
    })
  } catch (error) {
    console.error("Create job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
})
