"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Drawer } from "@/components/ui/drawer"
import { Loader2, ArrowLeft, Clock, User, ThumbsUp, Heart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { mockApiClient } from "@/lib/mock-api"
import { useMobile } from "@/lib/hooks/use-mobile"
import ReactMarkdown from "react-markdown"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  author: string
  likes: number
  date: string
}

export default function ArticlePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const isMobile = useMobile()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/login")
      } else {
        fetchArticle()
      }
    }
  }, [user, authLoading, router, params.id])

  // Show drawer after article is loaded on mobile
  useEffect(() => {
    if (article && isMobile) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        setShowDrawer(true)
      }, 100)
    }
  }, [article, isMobile])

  const fetchArticle = async () => {
    setLoading(true)
    try {
      const response = await mockApiClient.getArticle(params.id as string)
      if (response.data) {
        setArticle(response.data.article)
      } else {
        console.error("Article not found")
        router.push("/advice")
      }
    } catch (error) {
      console.error("Error fetching article:", error)
      router.push("/advice")
    } finally {
      setLoading(false)
    }
  }

  const handleLike = () => {
    if (article) {
      setLiked(!liked)
      setArticle({
        ...article,
        likes: liked ? article.likes - 1 : article.likes + 1,
      })
    }
  }

  const handleCloseDrawer = () => {
    setShowDrawer(false)
    // Wait for animation to complete before navigating back
    setTimeout(() => {
      router.back()
    }, 300)
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Article not found</h3>
              <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
              <Button onClick={() => router.push("/advice")}>Back to Articles</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const ArticleContent = () => (
    <>
      <Badge className="mb-4 bg-lime-100 text-lime-800 hover:bg-lime-200">{article.category}</Badge>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

      <div className="flex items-center justify-between mb-6 pb-6 border-b">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime}
          </div>
          <div>{new Date(article.date).toLocaleDateString()}</div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-gray-500"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          <span>{article.likes}</span>
        </Button>
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">{children}</h3>,
            p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
            li: ({ children }) => <li className="text-gray-700">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-lime-400 pl-4 italic text-gray-600 my-4">{children}</blockquote>
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      <div className="mt-8 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-gray-500"}`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>
            <div className="flex items-center text-gray-500">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{article.likes} likes</span>
            </div>
          </div>

          <Button onClick={() => router.push("/advice")}>Read More Articles</Button>
        </div>
      </div>
    </>
  )

  // For mobile, render in a drawer
  if (isMobile) {
    return (
      <Drawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        title={article.title}
        position="bottom"
        className="pb-20" // Extra padding for bottom navigation
      >
        <ArticleContent />
      </Drawer>
    )
  }

  // For desktop, render normally
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/advice")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </motion.div>

        <Card>
          <CardContent className="p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <ArticleContent />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
