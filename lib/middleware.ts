import { type NextRequest, NextResponse } from "next/server"
import { mockApiClient } from "./mock-api"

export const withAuth = (handler: Function) => {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1]
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const response = await mockApiClient.getMe()
      if (!response.success) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      return handler(req, response.data.user, ...args)
    } catch (error) {
      console.error("Auth middleware error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}

export const withRole = (roles: string[]) => {
  return (handler: Function) => {
    return withAuth(async (req: NextRequest, user: any, ...args: any[]) => {
      if (!roles.includes(user.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      return handler(req, user, ...args)
    })
  }
}
