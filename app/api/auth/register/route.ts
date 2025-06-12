import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, name, role, college, department, studentId } = body

    if (!email || !password || !name || !role || !college) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Mock registration logic
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      college,
      department,
      student_id: studentId,
    }

    // Generate a simple token
    const token = `mock-token-${newUser.id}-${Date.now()}`

    return NextResponse.json({
      user: newUser,
      token,
    })
  } catch (error) {
    console.error("Register API error:", error)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
