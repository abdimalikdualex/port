"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Users, Star, Search } from "lucide-react"
import Link from "next/link"
import { dataStore, type Course } from "@/lib/data-store"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterAndSortCourses()
  }, [courses, searchQuery, categoryFilter, levelFilter, sortBy])

  const loadData = () => {
    setIsLoading(true)
    // Only show published courses to public
    const allCourses = dataStore.getCourses().filter((course) => course.status === "published")
    const appSettings = dataStore.getSettings()

    setCourses(allCourses)
    setSettings(appSettings)
    setIsLoading(false)
  }

  const filterAndSortCourses = () => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
      const matchesLevel = levelFilter === "all" || course.level === levelFilter

      return matchesSearch && matchesCategory && matchesLevel
    })

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.enrollments - a.enrollments)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    setFilteredCourses(filtered)
  }

  const categories = ["all", ...new Set(courses.map((course) => course.category))]
  const levels = ["all", ...new Set(courses.map((course) => course.level))]
  const exchangeRate = settings?.payment?.exchangeRate || 145

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-900 mb-4">Our Courses</h1>
            <p className="text-xl text-indigo-700">Loading courses...</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Courses
          </motion.h1>
          <motion.p
            className="text-xl text-indigo-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {settings?.general?.siteDescription || "Discover our comprehensive collection of courses"}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="mb-8 bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => {
              const kshPrice = Math.round(course.price * exchangeRate)
              const videoCount = dataStore.getVideosByCourse(course.id).length

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-purple-200 group">
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-indigo-900 hover:bg-white">{course.category}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-black/50 text-white">
                          {course.level}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-indigo-900 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">by {course.instructor}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="text-gray-700 mb-4 line-clamp-3">{course.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.enrollments} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{videoCount} videos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="text-2xl font-bold text-green-600">${course.price}</div>
                          <div className="text-sm text-gray-500">KSH {kshPrice.toLocaleString()}</div>
                        </div>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                        >
                          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">
                {searchQuery || categoryFilter !== "all" || levelFilter !== "all"
                  ? "Try adjusting your search criteria"
                  : "No courses are currently available"}
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {filteredCourses.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Ready to Start Learning?</h2>
            <p className="text-indigo-700 mb-6">Join thousands of students already learning with us</p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Link href="/auth/signup">Get Started Today</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
