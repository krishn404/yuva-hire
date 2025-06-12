"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Save, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function EditProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    bio: "",
  })

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        // Pre-fill form with user data
        setFormData({
          name: user.name || "",
          email: user.email || "",
          department: user.department || "",
          skills: "JavaScript, React, Node.js, TypeScript, UI/UX Design",
          bio: "Computer Science student passionate about web development and UI/UX design.",
        })
      }
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/profile")
    }, 1000)
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex justify-between items-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Profile</h1>
          <Button variant="outline" onClick={() => router.push("/profile")}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </motion.div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                {user.role === "student" && (
                  <>
                    <div>
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                    </div>
                  </>
                )}
              </div>

              <Button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
