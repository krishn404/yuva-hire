"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Shield,
  Building,
  BarChart,
  User,
  Rocket,
  Target,
  CheckCircle,
  LogIn,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/lib/hooks/use-mobile"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/desktop/header"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const trendingJobs = [
  {
    id: 1,
    title: "Senior UI Designer",
    company: "Infosys",
    logo: "🎨",
    salary: "₹8,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Flipkart",
    logo: "🚀",
    salary: "₹12,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Remote",
  },
  {
    id: 3,
    title: "Marketing Officer",
    company: "Zomato",
    logo: "📈",
    salary: "₹6,00,000",
    period: "Per Year",
    location: "Gurgaon, India",
    type: "Full-time",
  },
]

const categories = [
  { name: "Marketing", count: "2k Jobs Available", icon: TrendingUp },
  { name: "Development", count: "3k Jobs Available", icon: Code },
  { name: "UI/UX Design", count: "1.5k Jobs Available", icon: Palette },
  { name: "Human Research", count: "800 Jobs Available", icon: Users },
  { name: "Security", count: "1.2k Jobs Available", icon: Shield },
  { name: "Business", count: "2.5k Jobs Available", icon: Building },
  { name: "Management", count: "1.8k Jobs Available", icon: BarChart },
  { name: "Finance", count: "1k Jobs Available", icon: DollarSign },
]

const featuredJobs = [
  {
    id: 4,
    title: "Senior UI Designer",
    company: "TCS",
    logo: "🎨",
    salary: "₹8,00,000",
    period: "Per Year",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Join our design team to create amazing user experiences for enterprise solutions.",
  },
  {
    id: 5,
    title: "Product Designer",
    company: "Paytm",
    logo: "🚀",
    salary: "₹10,00,000",
    period: "Per Year",
    location: "Noida, India",
    type: "Remote",
    description: "Design products that impact millions of users in the fintech space.",
  },
  {
    id: 6,
    title: "Marketing Officer",
    company: "Swiggy",
    logo: "📈",
    salary: "₹7,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Drive marketing campaigns for India's leading food delivery platform.",
  },
  {
    id: 7,
    title: "App Development",
    company: "PhonePe",
    logo: "📱",
    salary: "₹15,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Build mobile applications used by millions of Indians for digital payments.",
  },
  {
    id: 8,
    title: "UX Engineer",
    company: "Ola",
    logo: "🎵",
    salary: "₹12,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Remote",
    description: "Bridge design and engineering to create seamless mobility experiences.",
  },
  {
    id: 9,
    title: "Data Analyst",
    company: "Byju's",
    logo: "📊",
    salary: "₹9,00,000",
    period: "Per Year",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Analyze educational data to improve learning outcomes for millions of students.",
  },
]

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Product Designer",
    company: "Flipkart",
    rating: 5,
    text: "Yuva Hire helped me land my dream job at Flipkart! The platform's job matching algorithm is excellent, and I received relevant job alerts that led to my current position. Highly recommended for Indian students!",
  },
  {
    name: "Priya Patel",
    role: "Software Engineer",
    company: "TCS",
    rating: 5,
    text: "The platform made my campus placement preparation so much easier. The career advice section and mock interviews helped me crack multiple interviews. Found my perfect role within 3 weeks!",
  },
]

export default function HomePage() {
  const isMobile = useMobile()
  const { user } = useAuth()
  const router = useRouter()

  // Redirect mobile logged-in users to their appropriate starting page
  useEffect(() => {
    if (isMobile && user) {
      if (user.role === "admin") {
        router.push("/candidates")
      } else {
        router.push("/jobs")
      }
    }
  }, [isMobile, user, router])

  // Don't render anything for mobile logged-in users while redirecting
  if (isMobile && user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header for desktop */}
      {!isMobile && <Header />}

      {/* Mobile Header with Auth Buttons */}
      {isMobile && !user && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Yuva Hire</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/auth/login")}
              className="flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>

          </div>
        </div>
      )}

      <main>
        {/* Hero Section - No Images */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-lime-50 to-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Hero Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-lime-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-10 h-10 text-gray-800" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-gray-800" />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Find Your Dream Job with <span className="text-lime-500">Yuva Hire</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                1,85,973 jobs listed here! Connect with top employers and discover opportunities that match your skills
                and career goals.
              </p>

              {/* Mobile CTA Buttons */}
              {isMobile && !user && (
                <div className="flex flex-col gap-3 mb-8 max-w-sm mx-auto">

                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth/login")}
                    className="py-4 text-lg rounded-xl"
                  >
                    Already have an account? Login
                  </Button>
                </div>
              )}

              {/* Search Bar - Desktop Only */}
              {!isMobile && (
                <div className="max-w-4xl mx-auto mb-8">
                  <div className="bg-white rounded-2xl shadow-xl p-2 flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-200">
                      <Search className="w-5 h-5 text-gray-400 mr-3" />
                      <Input placeholder="Job title or keyword" className="border-0 focus-visible:ring-0 text-lg" />
                    </div>
                    <div className="flex-1 flex items-center px-4 py-3">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <Input placeholder="Bangalore, Mumbai, Delhi" className="border-0 focus-visible:ring-0 text-lg" />
                    </div>
                    <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-8 py-4 text-lg rounded-xl">
                      Search Jobs
                    </Button>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">185K+</div>
                  <div className="text-xs md:text-sm text-gray-600">Active Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-xs md:text-sm text-gray-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">2M+</div>
                  <div className="text-xs md:text-sm text-gray-600">Job Seekers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-xs md:text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Sign up and build your professional profile to showcase your skills and experience.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Discover Opportunities</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Browse through job listings that match your skills and preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3">Apply & Connect</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Apply to jobs with a single click and connect directly with employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Jobs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Jobs</h2>
              {!isMobile && (
                <Link href="/jobs" className="text-lime-600 hover:text-lime-700 font-semibold">
                  See All Jobs
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900">{job.salary}</div>
                        <div className="text-sm text-gray-600">{job.period}</div>
                      </div>
                      <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold rounded-xl">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">One platform Many Solutions</h2>
              {!isMobile && (
                <Link href="/categories" className="text-lime-600 hover:text-lime-700 font-semibold">
                  See All Categories
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-0 shadow-sm">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-lime-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{category.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{category.count}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Featured Job Circulars</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredJobs.slice(0, isMobile ? 3 : 6).map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{job.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-gray-900">{job.salary}</div>
                        <div className="text-sm text-gray-600">{job.period}</div>
                      </div>
                      <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold rounded-xl">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              {isMobile ? (
                <Link href="/jobs">
                  <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-8 py-3 rounded-xl">
                    Find More Jobs
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
              Review of People
              <br />
              Who Have Found
              <br />
              Jobs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-semibold text-gray-900">Verified Review</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">{testimonial.text}</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-r from-teal-800 to-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Never Want to Miss Any
                <br />
                Job News?
              </h2>
              <p className="text-teal-200 mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Subscribe to stay up-to-date on insights every and new guidance, straight to your inbox every week.
              </p>

              <div className="max-w-md mx-auto flex gap-2">
                <Input
                  placeholder="Enter your email address"
                  className="bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 border-white/20 rounded-xl"
                />
                <Button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Y</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Yuva Hire</span>
              </div>
              <p className="text-gray-600 text-sm">
                Connecting talented individuals with their dream careers through innovative job matching technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/about" className="hover:text-lime-600 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-lime-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-lime-600 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Jobs</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/jobs" className="hover:text-lime-600 transition-colors">
                    Job Referrals
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-lime-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-lime-600 transition-colors">
                    Help & Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Terms</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-lime-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-lime-600 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-lime-600 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p className="text-sm">&copy; 2025 Yuva Hire. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
