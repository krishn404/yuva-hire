"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useMobile } from "@/lib/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isMobile = useMobile()

  // Don't render on mobile or auth pages
  if (isMobile || pathname.includes("/auth/")) {
    return null
  }

  // Define navigation items based on user role - KEEP HOME for desktop
  let navItems = [{ label: "Home", path: "/" }]

  if (user) {
    if (user.role === "admin") {
      navItems = [
        { label: "Home", path: "/" },
        { label: "Find Candidates", path: "/candidates" },
        { label: "Career Advice", path: "/advice" },
        { label: "Manage Jobs", path: "/admin/jobs" },
      ]
    } else {
      navItems = [
        { label: "Home", path: "/" },
        { label: "Find Jobs", path: "/jobs" },
        { label: "Job Alerts", path: "/alerts" },
        { label: "Career Advice", path: "/advice" },
      ]
    }
  } else {
    navItems = [
      { label: "Home", path: "/" },
      { label: "Find Jobs", path: "/jobs" },
      { label: "Career Advice", path: "/advice" },
    ]
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Yuva Hire</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "text-lime-600 font-medium"
                      : "text-gray-700 hover:text-gray-900 font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-lime-600" />
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6">Login Now</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
