import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function withAuth(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get("authorization")?.replace("Bearer ", "")

      if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 })
      }

      const payload = verifyToken(token)
      if (!payload) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      return handler(req, payload)
    } catch (error) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }
  }
}

export function withRole(roles: string[]) {
  return (handler: (req: NextRequest, user: any) => Promise<NextResponse>) =>
    withAuth(async (req: NextRequest, user: any) => {
      if (!roles.includes(user.role)) {
        return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
      }
      return handler(req, user)
    })
}
