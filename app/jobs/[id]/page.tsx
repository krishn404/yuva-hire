"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Drawer } from "@/components/ui/drawer"
import { ArrowLeft, MapPin, Clock, Calendar, DollarSign, Users, Briefcase, CheckCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { mockApiClient } from "@/lib/mock-api"
import { useMobile } from "@/lib/hooks/use-mobile"
import { Header } from "@/components/desktop/header"

interface Job {
  id: string
  title: string
  description: string
  location: string
  jobType: string
  salary: string
  salaryPeriod: string
  deadline: string
  requirements: string[]
  college: string
  applicantCount: number
  hasApplied: boolean
  createdAt: string
  responsibilities?: string[]
  qualifications?: string[]
  benefits?: string[]
  companyInfo?: string
}

export default function JobDetailsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const isMobile = useMobile()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        fetchJobDetails()
      }
    }
  }, [user, authLoading, router, params.id])

  // Show drawer after job is loaded on mobile
  useEffect(() => {
    if (job && isMobile) {
      setShowDrawer(true)
    }
  }, [job, isMobile])

  const fetchJobDetails = async () => {
    setLoading(true)
    try {
      // Since we don't have a specific job details API, we'll get all jobs and find the one we need
      const response = await mockApiClient.getJobs()
      if (response.data) {
        const foundJob = response.data.jobs.find((j: Job) => j.id === params.id)
        if (foundJob) {
          // Enhance job data with additional details
          const enhancedJob = {
            ...foundJob,
            responsibilities: [
              "Develop and maintain web applications using modern frameworks",
              "Collaborate with cross-functional teams to define and implement features",
              "Write clean, maintainable, and efficient code",
              "Participate in code reviews and technical discussions",
              "Stay up-to-date with emerging technologies and industry trends",
            ],
            qualifications: [
              "Bachelor's degree in Computer Science or related field",
              "Strong problem-solving and analytical skills",
              "Excellent communication and teamwork abilities",
              "Ability to work in a fast-paced environment",
              "Passion for learning and continuous improvement",
            ],
            benefits: [
              "Competitive salary and performance bonuses",
              "Health, dental, and vision insurance",
              "Flexible working hours and remote work options",
              "Professional development opportunities",
              "Collaborative and inclusive work environment",
            ],
            companyInfo:
              "We are a leading technology company focused on innovation and excellence. Our team is passionate about creating solutions that make a difference in people's lives.",
          }
          setJob(enhancedJob)
        } else {
          router.push("/jobs")
        }
      }
    } catch (error) {
      console.error("Error fetching job details:", error)
      router.push("/jobs")
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!job || user?.role !== "student") return

    setApplying(true)
    try {
      const response = await mockApiClient.applyToJob(job.id)
      if (response.data) {
        setJob({ ...job, hasApplied: true, applicantCount: job.applicantCount + 1 })
      }
    } catch (error) {
      console.error("Error applying to job:", error)
    } finally {
      setApplying(false)
    }
  }

  const handleCloseDrawer = () => {
    setShowDrawer(false)
    // Wait for animation to complete before navigating back
    setTimeout(() => {
      router.back()
    }, 300)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/jobs")} className="bg-lime-400 hover:bg-lime-500 text-gray-900">
            Back to Jobs
          </Button>
        </div>
      </div>
    )
  }

  const JobContent = () => (
    <>
      <div className={`flex ${isMobile ? "flex-col" : "items-start justify-between"} mb-4`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
            <Briefcase className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-lg text-gray-600">{job.college}</p>
          </div>
        </div>
        <div className={`${isMobile ? "w-full" : "text-right"}`}>
          <div className="text-3xl font-bold text-gray-900">{job.salary}</div>
          <div className="text-gray-600">{job.salaryPeriod}</div>
          {job.hasApplied && <Badge className="bg-green-600 text-white mt-2">Applied</Badge>}
        </div>
      </div>

      {/* Job Meta Info */}
      <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-4"} gap-4 mb-6`}>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-sm">{job.jobType}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="text-sm">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-5 h-5 mr-2" />
          <span className="text-sm">{job.applicantCount} applicants</span>
        </div>
      </div>

      {/* Apply Button */}
      {user?.role === "student" && (
        <Button
          onClick={handleApply}
          disabled={applying || job.hasApplied}
          className={`w-full ${
            job.hasApplied ? "bg-green-500 hover:bg-green-600" : "bg-lime-400 hover:bg-lime-500"
          } text-gray-900 font-semibold mb-6`}
        >
          {applying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Applying...
            </>
          ) : job.hasApplied ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Applied
            </>
          ) : (
            "Apply Now"
          )}
        </Button>
      )}

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
        <p className="text-gray-600 leading-relaxed">{job.description}</p>
        {job.companyInfo && (
          <>
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Company</h3>
            <p className="text-gray-600 leading-relaxed">{job.companyInfo}</p>
          </>
        )}
      </div>

      {/* Responsibilities */}
      {job.responsibilities && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements & Qualifications */}
      <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-2 gap-6"} mb-6`}>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {req}
              </Badge>
            ))}
          </div>
        </div>

        {job.qualifications && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Qualifications</h2>
            <ul className="space-y-2">
              {job.qualifications.map((qualification, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{qualification}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Benefits */}
      {job.benefits && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {job.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <DollarSign className="w-4 h-4 text-lime-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )

  // For mobile, render in a drawer
  if (isMobile) {
    return (
      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        title={job.title}
        position="bottom"
        className="pb-20" // Extra padding for bottom navigation
      >
        <JobContent />
      </Drawer>
    )
  }

  // For desktop, render normally
  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </motion.div>

        {/* Job Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <JobContent />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
