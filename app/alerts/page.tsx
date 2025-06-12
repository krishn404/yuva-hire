"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Loader2, Plus, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"
import { Header } from "@/components/desktop/header"

// Mock data for job alerts
const mockAlerts = [
  {
    id: "1",
    title: "Software Engineer",
    location: "Remote",
    frequency: "Daily",
    isActive: true,
  },
  {
    id: "2",
    title: "UX Designer",
    location: "New York, NY",
    frequency: "Weekly",
    isActive: true,
  },
  {
    id: "3",
    title: "Data Scientist",
    location: "San Francisco, CA",
    frequency: "Daily",
    isActive: false,
  },
]

export default function AlertsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const isMobile = useMobile()
  const [alerts, setAlerts] = useState(mockAlerts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000)
      }
    }
  }, [user, authLoading, router])

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border"
              >
                <div className={`p-4 ${isMobile ? "" : "p-6"} flex items-center justify-between`}>
                  <div className="flex items-center space-x-4">
                    <div className={`${alert.isActive ? "bg-lime-100" : "bg-gray-100"} rounded-full p-2`}>
                      <Bell className={`${alert.isActive ? "text-lime-600" : "text-gray-400"} w-5 h-5`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <div className="text-sm text-gray-500 flex flex-wrap gap-x-4">
                        <span>{alert.location}</span>
                        <span>Frequency: {alert.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={() => toggleAlert(alert.id)}
                        id={`alert-${alert.id}`}
                      />
                      <Label htmlFor={`alert-${alert.id}`} className="sr-only">
                        Toggle alert
                      </Label>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {alerts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No job alerts</h3>
                  <p className="text-gray-600 mb-4">
                    Create job alerts to get notified when new jobs match your criteria
                  </p>
                  <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
