import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

export interface User {
  id: string
  email: string
  password_hash: string
  name: string
  role: "student" | "admin"
  college: string
  student_id?: string
  department?: string
  created_at: Date
  updated_at: Date
}

export interface Job {
  id: string
  title: string
  description: string
  location: string
  job_type: string
  salary: string
  salary_period: string
  deadline: string
  requirements: string[]
  college: string
  posted_by: string
  status: "active" | "closed"
  created_at: Date
  updated_at: Date
  applicant_count?: number
  has_applied?: boolean
}

export interface Application {
  id: string
  job_id: string
  student_id: string
  status: "pending" | "accepted" | "rejected"
  applied_at: Date
}
