"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Loader2, Briefcase, MapPin, Clock, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { mockApiClient } from "@/lib/mock-api"
import { useMobile } from "@/lib/hooks/use-mobile"
import { JobCard } from "@/components/mobile/job-card"
import { Header } from "@/components/desktop/header"
import { JobCardSkeleton, MobileJobCardSkeleton } from "@/components/skeletons/job-card-skeleton"

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
}

export default function JobsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    deadline: "",
  })

  useEffect(() => {
    // Always fetch jobs on mount, regardless of auth status for demonstration in mock environment
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      // Only include filters that have values
      const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, string>)

      const response = await mockApiClient.getJobs(activeFilters)
      if (response.data) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (jobId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation() // Prevent navigation when applying
    }

    if (user?.role !== "student") return

    setApplying(jobId)
    try {
      const response = await mockApiClient.applyToJob(jobId)
      if (response.data) {
        setJobs(
          jobs.map((job) =>
            job.id === jobId ? { ...job, hasApplied: true, applicantCount: job.applicantCount + 1 } : job,
          ),
        )
      } else if (response.error) {
        console.error("Application error:", response.error)
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error applying to job:", error)
    } finally {
      setApplying(null)
    }
  }

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`)
  }

  const handleSearch = () => {
    fetchJobs()
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Find Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className={`p-4 ${isMobile ? "" : "p-6"}`}>
            <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "md:grid-cols-5 gap-4"}`}>
              <div className={isMobile ? "" : "md:col-span-2"}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search jobs by title or company..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Input
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>

              <div>
                <Select value={filters.jobType} onValueChange={(value) => handleFilterChange("jobType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button onClick={handleSearch} className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900">
                  <Filter className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        {loading ? (
          <div className="space-y-4 md:space-y-6">
            {isMobile
              ? Array.from({ length: 5 }).map((_, i) => <MobileJobCardSkeleton key={i} />)
              : Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters or check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {isMobile
              ? // Mobile job cards
                jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={(e) => handleApply(job.id, e)}
                    isApplying={applying === job.id}
                    onClick={() => handleJobClick(job.id)}
                  />
                ))
              : // Desktop job cards
                jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                            <Briefcase className="w-8 h-8 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                            <p className="text-gray-600 mb-2">{job.college}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {job.jobType}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Deadline: {new Date(job.deadline).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{job.salary}</div>
                          <div className="text-sm text-gray-600">{job.salaryPeriod}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                            >
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                              +{job.requirements.length - 3} more
                            </span>
                          )}
                        </div>
                        {user?.role === "student" && (
                          <Button
                            onClick={(e) => handleApply(job.id, e)}
                            disabled={job.hasApplied || applying === job.id}
                            className={`${
                              job.hasApplied
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-lime-400 hover:bg-lime-500"
                            } text-gray-900`}
                          >
                            {applying === job.id ? (
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {job.hasApplied ? "Applied" : "Apply Now"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        )}
      </div>
    </div>
  )
}
