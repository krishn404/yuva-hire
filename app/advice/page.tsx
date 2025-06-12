"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Heart, User, Search, TrendingUp, BookOpen, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useMobile } from "@/lib/hooks/use-mobile"
import { Skeleton } from "@/components/ui/skeleton"
import { mockApiClient } from "@/lib/mock-api"
import { Header } from "@/components/desktop/header"
import { useAuth } from "@/contexts/AuthContext"

interface Article {
  id: string
  title: string
  excerpt: string
  author: string
  readTime: string
  likes: number
  date: string
  category: string
  featured?: boolean
  trending?: boolean
}

function ArticleSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center space-x-4 pt-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FeaturedArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-lime-50 to-green-50"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="relative h-64 bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 text-center text-white p-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Star className="w-8 h-8" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 mb-3">Featured</Badge>
            </div>
            {article.trending && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              </div>
            )}
          </div>
          <div className="p-6">
            <Badge variant="secondary" className="mb-3 bg-lime-100 text-lime-800">
              {article.category}
            </Badge>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {article.likes}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const isMobile = useMobile()

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {article.category.charAt(0)}
            </div>
            {article.trending && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-red-500 text-white border-0 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              </div>
            )}
          </div>
          <div className={`p-4 ${isMobile ? "" : "p-6"}`}>
            <Badge variant="secondary" className="mb-3 bg-gray-100 text-gray-700">
              {article.category}
            </Badge>
            <h3
              className={`font-bold text-gray-900 mb-3 group-hover:text-lime-600 transition-colors ${isMobile ? "text-lg" : "text-xl"}`}
            >
              {article.title}
            </h3>
            <p className={`text-gray-600 mb-4 line-clamp-2 leading-relaxed ${isMobile ? "text-sm" : ""}`}>
              {article.excerpt}
            </p>
            <div className={`flex items-center justify-between text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  {article.likes}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function AdvicePage() {
  const { user, loading: authLoading } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const isMobile = useMobile()
  const router = useRouter()

  const categories = [
    { id: "all", name: "All Articles", icon: BookOpen },
    { id: "Campus Placements", name: "Placements", icon: TrendingUp },
    { id: "Programming", name: "Programming", icon: BookOpen },
    { id: "Career Growth", name: "Career", icon: Star },
  ]

  const CategoryTabs = () => {
    if (isMobile) {
      return (
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-lime-400 hover:bg-lime-500 text-gray-900"
                    : "hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 pointer-events-none"></div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`h-auto py-3 ${
              selectedCategory === category.id
                ? "bg-lime-400 hover:bg-lime-500 text-gray-900"
                : "hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <category.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          </Button>
        ))}
      </div>
    )
  }

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        const response = await mockApiClient.getArticles()
        if (response.data) {
          // Mark some articles as featured and trending
          const enhancedArticles = response.data.articles.map((article, index) => ({
            ...article,
            featured: index === 0, // First article is featured
            trending: index < 2, // First two articles are trending
          }))
          setArticles(enhancedArticles)
        }
      } catch (error) {
        console.error("Error loading articles:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const handleArticleClick = (articleId: string) => {
    router.push(`/advice/${articleId}`)
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = filteredArticles.find((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMobile && <Header />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Career Advice & Insights</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover expert tips, industry insights, and career guidance to help you succeed in your professional
            journey
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
                <div className={isMobile ? "" : "md:col-span-2"}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-lime-400 focus:ring-lime-400"
                    />
                  </div>
                </div>
                <div className={isMobile ? "" : "md:col-span-3"}>
                  <CategoryTabs />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {/* Featured Article Skeleton */}
            <div className="mb-8">
              <ArticleSkeleton />
            </div>
            {/* Regular Articles Skeleton */}
            <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center mb-6">
                  <Star className="w-5 h-5 text-lime-500 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Featured Article</h2>
                </div>
                <FeaturedArticleCard article={featuredArticle} onClick={() => handleArticleClick(featuredArticle.id)} />
              </motion.div>
            )}

            {/* Regular Articles */}
            {regularArticles.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Latest Articles</h2>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    {regularArticles.length} articles
                  </Badge>
                </div>
                <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                  {regularArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ArticleCard article={article} onClick={() => handleArticleClick(article.id)} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search terms or browse different categories</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                      }}
                      className="hover:bg-lime-50 hover:text-lime-700 hover:border-lime-300"
                    >
                      Clear filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
