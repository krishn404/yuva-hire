"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrawerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title?: string
  position?: "bottom" | "right"
  className?: string
}

export function Drawer({ children, isOpen, onClose, title, position = "bottom", className }: DrawerProps) {
  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isBottom = position === "bottom"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={isBottom ? { y: "100%" } : { x: "100%" }}
            animate={isBottom ? { y: 0 } : { x: 0 }}
            exit={isBottom ? { y: "100%" } : { x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className={cn(
              "fixed z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/50",
              isBottom
                ? "bottom-0 left-0 right-0 rounded-t-3xl max-h-[90vh] overflow-auto"
                : "top-0 right-0 bottom-0 w-full sm:w-[400px] max-w-full border-l",
              className,
            )}
            style={{
              boxShadow: isBottom ? "0 -10px 40px rgba(0, 0, 0, 0.1)" : "-10px 0 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isBottom && <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />}

            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 transition-colors ml-auto"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
