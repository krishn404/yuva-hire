import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication logic for demo
    const mockUsers = [
      {
        id: "1",
        email: "student@iitd.ac.in",
        password: "password123",
        name: "Rahul Sharma",
        role: "student" as const,
        college: "IIT Delhi",
        department: "Computer Science & Engineering",
        student_id: "2021CS10001",
      },
      {
        id: "2",
        email: "admin@iitd.ac.in",
        password: "admin123",
        name: "Dr. Priya Patel",
        role: "admin" as const,
        college: "IIT Delhi",
        department: "Placement Office",
      },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate a simple token (in production, use proper JWT)
    const token = `mock-token-${user.id}-${Date.now()}`

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        college: user.college,
        department: user.department,
        student_id: user.student_id,
      },
      token,
    })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
