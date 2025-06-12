"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Loader2, User, MapPin, Briefcase, GraduationCap, Star, TrendingUp, Award } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { mockApiClient } from "@/lib/mock-api"
import { Header } from "@/components/desktop/header"

interface Candidate {
  id: string
  name: string
  email: string
  title: string
  location: string
  experience: string
  education: string
  skills: string[]
  bio: string
  college: string
  studentId: string
  department: string
  gpa: string
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  achievements: string[]
  applicationCount?: number
  recentApplications?: any[]
}

export default function CandidatesPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    role: "",
  })
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const fetchCandidates = useCallback(async () => {
    setLoading(true)
    try {
      const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value
        }
        return acc
      }, {} as Record<string, string>)

      const response = await mockApiClient.getCandidates(activeFilters)
      if (response.data) {
        const candidatesWithApplications = response.data.candidates.map((candidate: Candidate) => ({
          ...candidate,
          applicationCount: Math.floor(Math.random() * 5) + 1,
          recentApplications: [],
        }))
        setCandidates(candidatesWithApplications)
      }
    } catch (error) {
      console.error("Error fetching candidates:", error)
    } finally {
      setLoading(false)
    }
  }, [filters, setCandidates, setLoading])

  useEffect(() => {
    fetchCandidates()
  }, [fetchCandidates])

  const handleSearch = () => {
    fetchCandidates()
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: typeof filters) => ({ ...prev, [key]: value }))
  }

  const handleViewProfile = async (candidateId: string) => {
    setProfileLoading(true)
    try {
      const response = await mockApiClient.getCandidate(candidateId)
      if (response.data && response.data.candidate) {
        setSelectedCandidate(response.data.candidate)
        setIsProfileOpen(true)
      } else if (response.error) {
        console.error("Error:", response.error)
        alert("Unable to view candidate profile. Please try again.")
      }
    } catch (error) {
      console.error("Error fetching candidate:", error)
      alert("Unable to view candidate profile. Please try again.")
    } finally {
      setProfileLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") {
      router.push("/jobs")
    }
  }, [authLoading, user, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Talented Candidates</h1>
            <p className="text-lg text-gray-600">Discover exceptional students from top institutions</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className={`p-4 ${isMobile ? "" : "p-6"}`}>
            <div className={`grid ${isMobile ? "grid-cols-1 gap-3" : "md:grid-cols-4 gap-4"}`}>
              <div className={isMobile ? "" : "md:col-span-2"}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by name, skills, or role..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-10 border-gray-200 focus:border-lime-400 focus:ring-lime-400"
                  />
                </div>
              </div>

              <div>
                <Input
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="border-gray-200 focus:border-lime-400 focus:ring-lime-400"
                />
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

        {/* Candidates Listing */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border-0 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-6 ${isMobile ? "p-4" : ""}`}>
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      {Number.parseFloat(candidate.gpa) > 8.5 && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                            {Number.parseFloat(candidate.gpa) > 8.5 && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs py-0.5 px-2">
                                <Star className="w-3 h-3 mr-1" />
                                Top Performer
                              </Badge>
                            )}
                          </div>
                          <p className="text-md text-gray-600 mb-2">{candidate.title}</p>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="w-4 h-4 mr-1 text-gray-400" />
                              <span>{candidate.experience}</span>
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
                              <span>GPA: {candidate.gpa}</span>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1 text-gray-400" />
                              <span>{candidate.applicationCount} applications</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="bg-gray-100 text-gray-700 text-xs py-0.5 px-2">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-gray-600 line-clamp-2 mb-4">{candidate.bio}</p>
                        </div>

                        <div className="flex flex-col gap-3 lg:ml-6">
                          <Button
                            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold"
                            onClick={() => handleViewProfile(candidate.id)}
                          >
                            View Profile
                          </Button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {candidates.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search filters to find more candidates</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({ search: "", location: "", role: "" })
                    }}
                    className="hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300"
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Profile View - Desktop Dialog / Mobile Drawer */}
      {isMobile ? (
        <AnimatePresence>
          {isProfileOpen && (
            <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <SheetContent side="bottom" className="h-[90vh] p-0">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="h-full"
                >
                  <SheetHeader className="border-b sticky top-0 bg-white z-10 p-4">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      Candidate Profile
                    </SheetTitle>
                  </SheetHeader>

                  {profileLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full"
                      />
                    </div>
                  ) : selectedCandidate ? (
                    <div className="overflow-y-auto p-4 space-y-6">
                      {/* Basic Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col gap-4 p-4 bg-gradient-to-br from-lime-50 to-green-50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                              {Number.parseFloat(selectedCandidate.gpa) > 8.5 && (
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  Top Performer
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600">{selectedCandidate.title}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {selectedCandidate.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {selectedCandidate.experience}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            GPA: {selectedCandidate.gpa}
                          </div>
                        </div>
                        <Button className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold">
                          Contact Candidate
                        </Button>
                      </motion.div>

                      {/* Contact Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 p-4 rounded-xl"
                      >
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="ml-2 text-gray-600">{selectedCandidate.email}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Student ID:</span>
                            <span className="ml-2 text-gray-600">{selectedCandidate.studentId}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Department:</span>
                            <span className="ml-2 text-gray-600">{selectedCandidate.department}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">College:</span>
                            <span className="ml-2 text-gray-600">{selectedCandidate.college}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Bio */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{selectedCandidate.bio}</p>
                      </motion.div>

                      {/* Skills */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <Badge variant="secondary" className="bg-lime-100 text-lime-800">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Projects */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-3">Projects</h3>
                        <div className="space-y-3">
                          {selectedCandidate.projects.map((project, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              className="border rounded-xl p-4 hover:shadow-sm transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                {project.link && (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lime-600 hover:text-lime-700 text-sm font-medium"
                                  >
                                    View →
                                  </a>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="outline" className="text-xs border-gray-300">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Achievements */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          Achievements
                        </h3>
                        <div className="space-y-2">
                          {selectedCandidate.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              className="flex items-start"
                            >
                              <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Recent Applications */}
                      {selectedCandidate.recentApplications && selectedCandidate.recentApplications.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <h3 className="font-semibold text-gray-900 mb-3">Recent Applications</h3>
                          <div className="space-y-2">
                            {selectedCandidate.recentApplications.map((application, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-gray-900 text-sm">{application.company}</h4>
                                  <p className="text-xs text-gray-600">{application.position}</p>
                                </div>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                                  {application.status}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : null}
                </motion.div>
              </SheetContent>
            </Sheet>
          )}
        </AnimatePresence>
      ) : (
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              Candidate Profile
            </DialogTitle>
          </DialogHeader>

            {profileLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
              </div>
            ) : selectedCandidate ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-lime-50 to-green-50 rounded-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                    {Number.parseFloat(selectedCandidate.gpa) > 8.5 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Top Performer
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{selectedCandidate.title}</p>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedCandidate.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {selectedCandidate.experience}
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      GPA: {selectedCandidate.gpa}
                    </div>
                  </div>
                </div>
                  <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold">
                    Contact Candidate
                  </Button>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-600">{selectedCandidate.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Student ID:</span>
                    <span className="ml-2 text-gray-600">{selectedCandidate.studentId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Department:</span>
                    <span className="ml-2 text-gray-600">{selectedCandidate.department}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">College:</span>
                    <span className="ml-2 text-gray-600">{selectedCandidate.college}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{selectedCandidate.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-lime-100 text-lime-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Projects</h3>
                <div className="space-y-4">
                  {selectedCandidate.projects.map((project, index) => (
                    <div key={index} className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-lg">{project.name}</h4>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lime-600 hover:text-lime-700 text-sm font-medium"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs border-gray-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Achievements & Recognition
                </h3>
                <div className="space-y-3">
                  {selectedCandidate.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-lime-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
                </div>

                {/* Recent Applications */}
                {selectedCandidate.recentApplications && selectedCandidate.recentApplications.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Applications</h3>
                    <div className="space-y-3">
                      {selectedCandidate.recentApplications.map((application, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{application.company}</h4>
                            <p className="text-sm text-gray-600">{application.position}</p>
                          </div>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                            {application.status}
                          </Badge>
                        </div>
                      ))}
              </div>
            </div>
          )}
              </div>
            ) : null}
        </DialogContent>
      </Dialog>
      )}
    </div>
  )
}
