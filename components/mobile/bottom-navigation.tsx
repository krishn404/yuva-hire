"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Briefcase, BookOpen, Bell, User, Users } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"
import { ProfileDrawer } from "./profile-drawer"

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const isMobile = useMobile()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  if (!isMobile || !user) return null

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  // Different navigation items based on user role - NO HOME for mobile logged-in users
  const navItems =
    user.role === "admin"
      ? [
          {
            name: "Candidates",
            icon: Users,
            path: "/candidates",
          },
          {
            name: "Jobs",
            icon: Briefcase,
            path: "/admin/jobs",
          },
          {
            name: "Advice",
            icon: BookOpen,
            path: "/advice",
          },
        ]
      : [
          {
            name: "Jobs",
            icon: Briefcase,
            path: "/jobs",
          },
          {
            name: "Alerts",
            icon: Bell,
            path: "/alerts",
          },
          {
            name: "Advice",
            icon: BookOpen,
            path: "/advice",
          },
        ]

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-40 safe-area-bottom"
        style={{
          boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive(item.path) ? "text-lime-600" : "text-gray-500"
              }`}
              onClick={() => router.push(item.path)}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isActive(item.path) ? "bg-lime-100" : ""
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? "text-lime-600" : "text-gray-500"}`} />
              </div>
              <span className="text-xs mt-0.5">{item.name}</span>
            </motion.button>
          ))}

          <motion.button
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              isActive("/profile") || isActive("/settings") ? "text-lime-600" : "text-gray-500"
            }`}
            onClick={() => setIsProfileOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isActive("/profile") || isActive("/settings") ? "bg-lime-100" : ""
              }`}
            >
              <User
                className={`w-5 h-5 ${isActive("/profile") || isActive("/settings") ? "text-lime-600" : "text-gray-500"}`}
              />
            </div>
            <span className="text-xs mt-0.5">Profile</span>
          </motion.button>
        </div>
      </motion.div>

      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}
