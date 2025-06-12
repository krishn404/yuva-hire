import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sql } from "./db"
import type { User } from "./db"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-for-development"

export interface JWTPayload {
  userId: string
  email: string
  role: "student" | "admin"
  college: string
}

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, 12)
  } catch (error) {
    console.error("Password hashing error:", error)
    throw new Error("Failed to hash password")
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

export function generateToken(payload: JWTPayload): string {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
  } catch (error) {
    console.error("Token generation error:", error)
    throw new Error("Failed to generate token")
  }
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const payload = verifyToken(token)
    if (!payload) return null

    const users = await sql`
      SELECT * FROM users WHERE id = ${payload.userId}
    `

    return (users[0] as User) || null
  } catch (error) {
    console.error("Get user from token error:", error)
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    const user = users[0] as User
    if (!user) return null

    const isValid = await verifyPassword(password, user.password_hash)
    return isValid ? user : null
  } catch (error) {
    console.error("User authentication error:", error)
    return null
  }
}
