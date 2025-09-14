"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Search,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Clock,
  Star,
  ArrowLeft,
  Filter,
  Download,
  Play,
  Users,
  Brain,
  Zap,
  Moon,
  Activity,
} from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen },
    { id: "anxiety", name: "Anxiety", icon: Brain },
    { id: "depression", name: "Depression", icon: Heart },
    { id: "stress", name: "Stress Management", icon: Zap },
    { id: "sleep", name: "Sleep", icon: Moon },
    { id: "wellness", name: "General Wellness", icon: Activity },
  ]

  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Student's Guide",
      description:
        "Learn about anxiety symptoms, triggers, and coping strategies specifically for university students.",
      type: "article",
      category: "anxiety",
      duration: "8 min read",
      rating: 4.8,
      downloads: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "Mindfulness Meditation for Beginners",
      description: "A guided meditation series to help reduce stress and improve focus during exam periods.",
      type: "audio",
      category: "stress",
      duration: "15 min",
      rating: 4.9,
      downloads: 2100,
      featured: true,
    },
    {
      id: 3,
      title: "Sleep Hygiene for Students",
      description: "Evidence-based tips for better sleep quality and establishing healthy sleep routines.",
      type: "video",
      category: "sleep",
      duration: "12 min",
      rating: 4.7,
      downloads: 890,
      featured: false,
    },
    {
      id: 4,
      title: "Cognitive Behavioral Techniques Workbook",
      description: "Interactive exercises and worksheets to help identify and change negative thought patterns.",
      type: "workbook",
      category: "depression",
      duration: "Self-paced",
      rating: 4.6,
      downloads: 1560,
      featured: true,
    },
    {
      id: 5,
      title: "Building Resilience in College",
      description: "Strategies for developing emotional resilience and bouncing back from academic challenges.",
      type: "article",
      category: "wellness",
      duration: "6 min read",
      rating: 4.5,
      downloads: 720,
      featured: false,
    },
    {
      id: 6,
      title: "Progressive Muscle Relaxation",
      description: "Audio guide for physical relaxation techniques to reduce tension and anxiety.",
      type: "audio",
      category: "anxiety",
      duration: "20 min",
      rating: 4.8,
      downloads: 1340,
      featured: false,
    },
    {
      id: 7,
      title: "Time Management and Stress Reduction",
      description: "Practical strategies for managing academic workload and reducing overwhelm.",
      type: "video",
      category: "stress",
      duration: "18 min",
      rating: 4.7,
      downloads: 980,
      featured: false,
    },
    {
      id: 8,
      title: "Healthy Coping Strategies Toolkit",
      description: "A comprehensive collection of healthy ways to cope with difficult emotions and situations.",
      type: "workbook",
      category: "wellness",
      duration: "Self-paced",
      rating: 4.9,
      downloads: 1890,
      featured: true,
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter((resource) => resource.featured)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "audio":
        return Headphones
      case "workbook":
        return FileText
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "audio":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "workbook":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Mind Care Resources</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Mental Health Resources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our curated collection of evidence-based mental health resources designed specifically for
            university students. Find articles, videos, audio guides, and interactive tools to support your wellbeing
            journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory !== category.id ? "bg-transparent" : ""}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing {filteredResources.length} of {resources.length} resources
              </p>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <Card key={resource.id} className="border-border hover:shadow-lg transition-shadow group">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge className={`${getTypeColor(resource.type)} border-0`}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {resource.type}
                        </Badge>
                        {resource.featured && (
                          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">{resource.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            {resource.rating}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {resource.downloads}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {resource.type === "video" || resource.type === "audio" ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Play
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Read
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type)
                return (
                  <Card key={resource.id} className="border-border hover:shadow-lg transition-shadow group">
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge className={`${getTypeColor(resource.type)} border-0`}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {resource.type}
                        </Badge>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">{resource.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            {resource.rating}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {resource.downloads}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {resource.type === "video" || resource.type === "audio" ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Play
                            </>
                          ) : (
                            <>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Read
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="icon" className="bg-transparent">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 6)
                .map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type)
                  return (
                    <Card key={resource.id} className="border-border hover:shadow-lg transition-shadow group">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge className={`${getTypeColor(resource.type)} border-0`}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {resource.type}
                          </Badge>
                          {resource.featured && (
                            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          <CardDescription className="mt-2 line-clamp-3">{resource.description}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {resource.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                              {resource.rating}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {resource.downloads}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1">
                            {resource.type === "video" || resource.type === "audio" ? (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Play
                              </>
                            ) : (
                              <>
                                <BookOpen className="h-4 w-4 mr-2" />
                                Read
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="icon" className="bg-transparent">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-12 border-border bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Need More Support?
            </CardTitle>
            <CardDescription>
              These resources are a great starting point, but sometimes you need more personalized help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/support" className="flex-1">
                <Button className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Get Personal Support
                </Button>
              </Link>
              <Link href="/appointments" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Book a Session
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
