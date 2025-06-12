"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  User,
  Mail,
  Building,
  GraduationCap,
  Edit,
  MapPin,
  Briefcase,
  LogOut,
  ArrowLeft,
  Bell,
  Shield,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"

// Mock user profile data
const mockStudentProfile = {
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "IIT Delhi - Indian Institute of Technology Delhi",
      year: "2021 - 2025",
    },
  ],
  experience: [
    {
      title: "Software Engineering Intern",
      company: "Infosys Limited",
      location: "Bangalore, Karnataka",
      period: "Summer 2025",
      description: "Developed and maintained web applications using React and Node.js for enterprise clients.",
    },
    {
      title: "Web Developer",
      company: "Student Projects",
      location: "New Delhi, Delhi",
      period: "2023 - Present",
      description: "Created websites for student organizations and participated in Smart India Hackathon.",
    },
  ],
}

const mockAdminProfile = {
  department: "Career Services",
  position: "Career Advisor",
  contactInfo: {
    phone: "+91 98765 43210",
    office: "Block A, Room 142",
  },
}

export default function SettingsPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, authLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const isStudent = user.role === "student"
  const profileData = isStudent ? mockStudentProfile : mockAdminProfile

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/profile")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Basic Information</CardTitle>
                <Button
                  onClick={() => router.push("/profile/edit")}
                  className="bg-lime-400 hover:bg-lime-500 text-gray-900"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-12 h-12 text-lime-600" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                    <p className="text-gray-600 mb-1">{isStudent ? "Student" : "College Admin"}</p>
                    <p className="text-gray-500 mb-4">{user.college}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-center md:justify-start">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {user.email}
                      </div>

                      {isStudent && (
                        <div className="flex items-center justify-center md:justify-start">
                          <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                          {user.department}
                        </div>
                      )}

                      {!isStudent && (
                        <div className="flex items-center justify-center md:justify-start">
                          <Building className="w-4 h-4 mr-2 text-gray-500" />
                          {profileData.department}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student-specific content */}
            {isStudent && (
              <>
                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileData.education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Building className="w-4 h-4 mr-2" />
                          {edu.institution}
                        </div>
                        <div className="text-gray-500 text-sm">{edu.year}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profileData.experience.map((exp, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {exp.company}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {exp.location} • {exp.period}
                        </div>
                        <p className="text-gray-600 text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {/* Admin-specific content */}
            {!isStudent && (
              <>
                {/* Admin Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Administrative Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{profileData.position}</h3>
                      <div className="text-gray-600 text-sm mb-4">{profileData.department}</div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{profileData.contactInfo.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{profileData.contactInfo.office}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Job alerts</label>
                        <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Application updates</label>
                        <p className="text-sm text-gray-500">Updates on your job applications</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Interview reminders</label>
                        <p className="text-sm text-gray-500">Reminders for upcoming interviews</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Instant notifications</label>
                        <p className="text-sm text-gray-500">Real-time updates on your device</p>
                      </div>
                      <input type="checkbox" className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Weekly digest</label>
                        <p className="text-sm text-gray-500">Weekly summary of activities</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Visibility</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Public profile</label>
                        <p className="text-sm text-gray-500">Make your profile visible to recruiters</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Show contact information</label>
                        <p className="text-sm text-gray-500">Display email and phone to recruiters</p>
                      </div>
                      <input type="checkbox" className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Show activity status</label>
                        <p className="text-sm text-gray-500">Let others see when you're active</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Usage analytics</label>
                        <p className="text-sm text-gray-500">Help improve our platform with usage data</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-700 font-medium">Personalized recommendations</label>
                        <p className="text-sm text-gray-500">Get job recommendations based on your activity</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded text-lime-500" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
