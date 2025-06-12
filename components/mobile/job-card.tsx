"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Calendar, Briefcase, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

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

interface JobCardProps {
  job: Job
  onApply: (e?: React.MouseEvent) => void
  isApplying: boolean
  onClick?: () => void
}

export function JobCard({ job, onApply, isApplying, onClick }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-2xl cursor-pointer overflow-hidden"
        onClick={onClick}
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-3 mb-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{job.title}</h3>
              <p className="text-gray-600 text-xs mb-2 truncate">{job.college}</p>
              <div className="text-lg font-bold text-gray-900">{job.salary}</div>
              <div className="text-xs text-gray-600">{job.salaryPeriod}</div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{job.description}</p>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                <MapPin className="w-2.5 h-2.5" />
              </div>
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                <Clock className="w-2.5 h-2.5" />
              </div>
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                <Calendar className="w-2.5 h-2.5" />
              </div>
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {job.requirements.slice(0, 2).map((req, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100/80 text-gray-700 border-0 rounded-lg"
              >
                {req}
              </Badge>
            ))}
            {job.requirements.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-100/80 text-gray-700 border-0 rounded-lg">
                +{job.requirements.length - 2}
              </Badge>
            )}
          </div>

          <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onApply(e)
              }}
              disabled={isApplying || job.hasApplied}
              className={`w-full text-sm font-semibold rounded-xl border-0 shadow-sm ${
                job.hasApplied
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-lime-400 hover:bg-lime-500 text-gray-900"
              }`}
              style={{
                boxShadow: job.hasApplied ? "0 4px 12px rgba(34, 197, 94, 0.3)" : "0 4px 12px rgba(163, 230, 53, 0.3)",
              }}
            >
              {isApplying ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Applying...
                </>
              ) : job.hasApplied ? (
                "Applied"
              ) : (
                "Apply Now"
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
