"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Briefcase, Calendar, Users, Edit, Trash2, Loader2, Eye } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { mockApiClient } from "@/lib/mock-api"
import { Header } from "@/components/desktop/header"
import { useMobile } from "@/lib/hooks/use-mobile"

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
  postedBy: string
  status: "active" | "closed"
  applicantCount: number
  createdAt: string
}

export default function AdminJobsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddJobOpen, setIsAddJobOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    salary: "",
    salaryPeriod: "Monthly",
    deadline: "",
    requirements: "",
  })

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
      } else if (user.role !== "admin") {
        router.push("/dashboard")
      } else {
        fetchJobs()
      }
    }
  }, [user, authLoading, router])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await mockApiClient.getJobs()
      if (response.data) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const jobData = {
        ...newJob,
        requirements: newJob.requirements
          .split(",")
          .map((req) => req.trim())
          .filter((req) => req.length > 0),
      }

      const response = await mockApiClient.createJob(jobData)
      if (response.data) {
        setJobs([response.data.job, ...jobs])
        setNewJob({
          title: "",
          description: "",
          location: "",
          jobType: "",
          salary: "",
          salaryPeriod: "Monthly",
          deadline: "",
          requirements: "",
        })
        setIsAddJobOpen(false)
      }
    } catch (error) {
      console.error("Error creating job:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return

    try {
      const response = await mockApiClient.deleteJob(jobId)
      if (response.data) {
        setJobs(jobs.filter((job) => job.id !== jobId))
      }
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const activeJobs = jobs.filter((job) => job.status === "active")
  const closedJobs = jobs.filter((job) => job.status === "closed")
  const totalApplicants = jobs.reduce((sum, job) => sum + job.applicantCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Job Management</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage job postings for {user.college}</p>
          </div>
          <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Post New Job</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select value={newJob.jobType} onValueChange={(value) => setNewJob({ ...newJob, jobType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newJob.deadline}
                      onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryPeriod">Salary Period</Label>
                    <Select
                      value={newJob.salaryPeriod}
                      onValueChange={(value) => setNewJob({ ...newJob, salaryPeriod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                  <Textarea
                    id="requirements"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    rows={2}
                    placeholder="e.g., React, Node.js, TypeScript"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddJobOpen(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Job"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <h3 className="text-xl font-bold">{activeJobs.length}</h3>
                </div>
                <Briefcase className="w-8 h-8 text-lime-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Closed Jobs</p>
                  <h3 className="text-xl font-bold">{closedJobs.length}</h3>
                </div>
                <Calendar className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applicants</p>
                  <h3 className="text-xl font-bold">{totalApplicants}</h3>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <h3 className="text-xl font-bold">
                    {totalApplicants > 0 ? Math.round((activeJobs.length / jobs.length) * 100) : 0}%
                  </h3>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="active" className="flex-1 sm:flex-none">Active Jobs</TabsTrigger>
            <TabsTrigger value="closed" className="flex-1 sm:flex-none">Closed Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : activeJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No active jobs found</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {activeJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <Badge variant="secondary" className="bg-lime-100 text-lime-800">
                              {job.jobType}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="text-right">
                            <p className="text-lg font-bold">{job.salary}</p>
                            <p className="text-sm text-gray-600">{job.salaryPeriod}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : closedJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No closed jobs found</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {closedJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                              {job.jobType}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="text-right">
                            <p className="text-lg font-bold">{job.salary}</p>
                            <p className="text-sm text-gray-600">{job.salaryPeriod}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleDeleteJob(job.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
