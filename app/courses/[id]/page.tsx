"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Users, Star, Play, CheckCircle, Globe, Award, Target } from "lucide-react"
import Link from "next/link"
import { dataStore, type Course, type Video } from "@/lib/data-store"

export default function CoursePage() {
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    if (courseId) {
      loadCourseData()
    }
  }, [courseId])

  const loadCourseData = () => {
    setIsLoading(true)

    const courseData = dataStore.getCourse(courseId)
    const courseVideos = dataStore.getVideosByCourse(courseId).filter((video) => video.status === "published")
    const appSettings = dataStore.getSettings()

    setCourse(courseData)
    setVideos(courseVideos)
    setSettings(appSettings)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-gray-200 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Course Not Found</h1>
          <p className="text-gray-500 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const exchangeRate = settings?.payment?.exchangeRate || 145
  const kshPrice = Math.round(course.price * exchangeRate)
  const totalDuration = videos.reduce((total, video) => {
    const [minutes, seconds] = video.duration.split(":").map(Number)
    return total + minutes + seconds / 60
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-indigo-600">
              Courses
            </Link>
            <span>/</span>
            <span className="text-gray-900">{course.title}</span>
          </div>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-indigo-100 text-indigo-800">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {course.status === "published" ? "Available Now" : "Coming Soon"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">{course.title}</h1>

              <p className="text-xl text-gray-700 mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{course.enrollments.toLocaleString()} students enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{Math.round(totalDuration)} minutes total</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  <span>{videos.length} videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (324 reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Course Preview Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="overflow-hidden border-purple-200">
                <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-xl font-semibold mb-2">Course Preview</h3>
                    <p className="text-white/80">Get a taste of what you'll learn</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Target className="h-5 w-5" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {[
                      "Master the fundamentals and advanced concepts",
                      "Build real-world projects from scratch",
                      "Learn industry best practices and standards",
                      "Get hands-on experience with practical exercises",
                      "Understand the latest tools and technologies",
                      "Develop problem-solving and critical thinking skills",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Course Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <BookOpen className="h-5 w-5" />
                    Course Content
                  </CardTitle>
                  <CardDescription>
                    {videos.length} videos • {Math.round(totalDuration)} minutes total length
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {videos.length > 0 ? (
                      videos.map((video, index) => (
                        <div
                          key={video.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-600">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{video.title}</h4>
                              <p className="text-sm text-gray-500">{video.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Course content is being prepared. Check back soon!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Award className="h-5 w-5" />
                    Your Instructor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {course.instructor.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.instructor}</h3>
                      <p className="text-gray-600 mb-4">
                        Expert instructor with years of experience in {course.category.toLowerCase()}. Passionate about
                        teaching and helping students achieve their learning goals.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>1,234 students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>12 courses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>4.9 rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-8"
            >
              <Card className="border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">${course.price}</div>
                    <div className="text-lg text-gray-600">KSH {kshPrice.toLocaleString()}</div>
                  </div>

                  {/* Enroll Button */}
                  <Button
                    size="lg"
                    className="w-full mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    asChild
                  >
                    <Link href="/payment">Enroll Now</Link>
                  </Button>

                  <div className="text-center text-sm text-gray-500 mb-6">30-day money-back guarantee</div>

                  <Separator className="mb-6" />

                  {/* Course Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Skill Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{course.enrollments.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Videos</span>
                      <span className="font-medium">{videos.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{Math.round(totalDuration)} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Language</span>
                      <span className="font-medium flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        English
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">This course includes:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Mobile and desktop access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Downloadable resources</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
