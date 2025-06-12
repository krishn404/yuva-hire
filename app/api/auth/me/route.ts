import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No valid token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Mock token validation
    if (!token.startsWith("mock-token-")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Extract user ID from token
    const userId = token.split("-")[2]

    // Mock user data based on token
    const mockUsers = {
      "1": {
        id: "1",
        email: "student@iitd.ac.in",
        name: "Rahul Sharma",
        role: "student" as const,
        college: "IIT Delhi",
        department: "Computer Science & Engineering",
        student_id: "2021CS10001",
      },
      "2": {
        id: "2",
        email: "admin@iitd.ac.in",
        name: "Dr. Priya Patel",
        role: "admin" as const,
        college: "IIT Delhi",
        department: "Placement Office",
      },
    }

    const user = mockUsers[userId as keyof typeof mockUsers]

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
