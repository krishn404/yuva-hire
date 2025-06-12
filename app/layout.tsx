import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { BottomNavigation } from "@/components/mobile/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yuva Hire - Job Portal",
  description: "Get the right job you deserve",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#a3e635",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yuva Hire",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <div className="min-h-screen">{children}</div>
          <BottomNavigation />
          {/* Safe area padding for mobile */}
          <div className="h-20 md:h-0" />
        </AuthProvider>
      </body>
    </html>
  )
}
