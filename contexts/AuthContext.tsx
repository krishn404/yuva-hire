"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { mockApiClient } from "@/lib/mock-api"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin"
  college: string
  department?: string
  student_id?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (userData: any) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        mockApiClient.setToken(token)
        const response = await mockApiClient.getMe()
        if (response.success) {
          setUser(response.data.user)
        } else {
          localStorage.removeItem("token")
          mockApiClient.removeToken()
        }
      }
    } catch (error) {
      console.error("Auth check error:", error)
      localStorage.removeItem("token")
      mockApiClient.removeToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await mockApiClient.login(email, password)
      if (!response.success) {
        return { success: false, error: response.error }
      }

      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)

      // Redirect to profile
      router.push("/profile")
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error. Please check your connection." }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    mockApiClient.removeToken()
    setUser(null)
    router.push("/")
  }

  const register = async (userData: any) => {
    try {
      const response = await mockApiClient.register(userData)
      if (!response.success) {
        return { success: false, error: response.error }
      }

      localStorage.setItem("token", response.data.token)
      setUser(response.data.user)

      // Redirect to profile
      router.push("/profile")
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Network error. Please check your connection." }
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
