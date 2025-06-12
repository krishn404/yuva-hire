"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { ArrowLeft, Loader2, User, Shield } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        // Redirect will be handled by the auth context
        router.push("/profile")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (type: "student" | "admin") => {
    if (type === "student") {
      setFormData({
        email: "student@iitd.ac.in",
        password: "password123",
      })
    } else {
      setFormData({
        email: "admin@iitd.ac.in",
        password: "admin123",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Yuva Hire</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Credentials Section */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">🚀 Try Demo Accounts</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials("student")}
                  className="flex items-center justify-center space-x-1 text-xs border-lime-300 hover:bg-lime-100"
                >
                  <User className="w-3 h-3" />
                  <span>Student</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillDemoCredentials("admin")}
                  className="flex items-center justify-center space-x-1 text-xs border-lime-300 hover:bg-lime-100"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin</span>
                </Button>
              </div>
              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Student:</span>
                  <span className="text-gray-500">student@iitd.ac.in</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Admin:</span>
                  <span className="text-gray-500">admin@iitd.ac.in</span>
                </div>
                <div className="text-center text-gray-500 mt-2">
                  Password: <span className="font-mono">password123</span> / <span className="font-mono">admin123</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-lime-600 hover:text-lime-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
