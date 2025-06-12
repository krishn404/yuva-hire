"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Edit, LogOut, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

interface ProfileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  if (!user) return null

  const handleLogout = () => {
    logout()
    onClose()
    router.push("/")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
    onClose()
  }

  const handleViewProfile = () => {
    router.push("/profile")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl z-50 p-6 pb-8 border-t border-gray-200/50"
            style={{
              boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile</h2>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            <motion.div
              className="flex items-center space-x-4 mb-8 p-4 bg-lime-50/80 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs">{user.college}</p>
              </div>
            </motion.div>

            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/80 border-gray-200/80 hover:bg-gray-50/80 rounded-2xl h-12 text-gray-900 font-medium"
                  onClick={handleViewProfile}
                >
                  <UserIcon className="w-4 h-4 mr-3 text-gray-600" />
                  View Profile
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/80 border-gray-200/80 hover:bg-gray-50/80 rounded-2xl h-12 text-gray-900 font-medium"
                  onClick={handleEditProfile}
                >
                  <Edit className="w-4 h-4 mr-3 text-gray-600" />
                  Edit Profile
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-red-50/80 border-red-200/80 text-red-600 hover:text-red-700 hover:bg-red-100/80 rounded-2xl h-12 font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
