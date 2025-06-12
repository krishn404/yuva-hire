"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  User,
  Briefcase,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Gift,
  Clock,
  TrendingUp,
  UserCheck,
  Users,
  Plus,
  Settings,
  Building,
  MapPin,
  Mail,
  GraduationCap,
  Edit,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"
import { mockApiClient } from "@/lib/mock-api"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"
import { Header } from "@/components/desktop/header"

// Mock user profile data
const mockStudentProfile = {
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "IIT Delhi",
      year: "2020 - 2025",
    },
  ],
  experience: [
    {
      title: "Software Engineering Intern",
      company: "TCS",
      location: "Bangalore",
      period: "Summer 2023",
      description: "Developed and maintained web applications using React and Node.js.",
    },
  ],
}

const mockAdminProfile = {
  department: "Career Services",
  position: "Career Advisor",
  contactInfo: {
    phone: "+91 98765 43210",
    office: "Building 26, Room 142",
  },
}

interface DashboardStats {
  admin?: {
    totalJobs: number
    activeJobs: number
    totalApplicants: number
    newApplicationsThisWeek: number
    candidatesInPipeline: number
    interviewsScheduled: number
  }
  student?: {
    jobsApplied: number
    applicationsRejected: number
    interviewsCompleted: number
    offersReceived: number
    applicationsPending: number
    profileViews: number
  }
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login")
    } else if (user) {
      fetchDashboardStats()
    }
  }, [user, authLoading, router])

  const fetchDashboardStats = async () => {
    setLoading(true)
    try {
      const response = await mockApiClient.getDashboardStats()
      if (response.data) {
        setStats({ [user!.role]: response.data.stats })
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
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
      {!isMobile && <Header />}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Profile</h1>
            <Button onClick={() => router.push("/settings")} variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* User Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-lime-600" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                      <p className="text-gray-600 mb-1">{isStudent ? "Student" : "College Admin"}</p>
                      <p className="text-gray-500 text-sm">{user.college}</p>
                    </div>
                    <Button
                      onClick={() => router.push("/settings")}
                      variant="outline"
                      size="sm"
                      className="mt-4 md:mt-0"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-center md:justify-start">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="truncate">{user.email}</span>
                    </div>

                    {isStudent && user.department && (
                      <div className="flex items-center justify-center md:justify-start">
                        <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user.department}</span>
                      </div>
                    )}

                    {!isStudent && (
                      <div className="flex items-center justify-center md:justify-start">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{profileData.department}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Profile Details */}
        {isStudent && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {/* Skills */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Building className="w-4 h-4 mr-2" />
                      {edu.institution}
                    </div>
                    <div className="text-gray-500 text-sm">{edu.year}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
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
          </motion.div>
        )}

        {/* Dashboard Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
          {loading ? (
            <DashboardSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {stats && isStudent && stats.student ? (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.jobsApplied}</div>
                        <div className="text-xs text-gray-600">Jobs Applied</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.applicationsPending}</div>
                        <div className="text-xs text-gray-600">Pending</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Gift className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.offersReceived}</div>
                        <div className="text-xs text-gray-600">Offers</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.interviewsCompleted}</div>
                        <div className="text-xs text-gray-600">Interviews</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.applicationsRejected}</div>
                        <div className="text-xs text-gray-600">Rejected</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.student.profileViews}</div>
                        <div className="text-xs text-gray-600">Profile Views</div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : stats?.admin ? (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.totalJobs}</div>
                        <div className="text-xs text-gray-600">Total Jobs</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.activeJobs}</div>
                        <div className="text-xs text-gray-600">Active Jobs</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Users className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.totalApplicants}</div>
                        <div className="text-xs text-gray-600">Total Applicants</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.newApplicationsThisWeek}</div>
                        <div className="text-xs text-gray-600">New This Week</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <UserCheck className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.candidatesInPipeline}</div>
                        <div className="text-xs text-gray-600">In Pipeline</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stats.admin.interviewsScheduled}</div>
                        <div className="text-xs text-gray-600">Interviews</div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : null}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {isStudent ? (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Applied to Software Engineering Intern at TCS
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Interview scheduled for UX Designer role at Flipkart
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Eye className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Profile viewed by 3 recruiters</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Posted new job: Data Science Intern</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">5 new applications received</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Interview scheduled with Rahul Sharma</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
