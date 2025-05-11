"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, PlayCircle, Award, GraduationCap, BookOpenCheck, Lock } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import { motion } from "framer-motion"
import { getPurchasedCourses } from "@/lib/payment-verification"

export default function DashboardPage() {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("courses")
  const [isLoading, setIsLoading] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [certificates, setCertificates] = useState<any[]>([])
  const [studentProgress, setStudentProgress] = useState({
    coursesEnrolled: 0,
    hoursLearned: 0,
    videosWatched: 0,
    certificatesEarned: 0,
    quizzesCompleted: 0,
    assignmentsSubmitted: 0,
  })

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true)

      try {
        // Get purchased courses
        const purchasedCourses = getPurchasedCourses()

        // If no purchased courses, use mock data for demo purposes
        if (purchasedCourses.length === 0) {
          // This is just for demo - in a real app, we'd show an empty state
          setEnrolledCourses([])
        } else {
          // Map purchased courses to enrolled courses with progress data
          const mappedCourses = purchasedCourses.map((course) => ({
            id: course.id,
            title: course.title,
            image: "/placeholder.svg?height=400&width=600",
            progress: Math.floor(Math.random() * 100), // Random progress for demo
            instructor: "ABDULMALIK OMAR DUALE",
            lastAccessed: "2 days ago",
            nextLesson: "CSS Grid Layout",
            videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          }))

          setEnrolledCourses(mappedCourses)
        }

        // Set certificates (mock data for now)
        setCertificates([
          {
            id: 1,
            title: "JavaScript Fundamentals",
            issueDate: "June 15, 2023",
            image: "/placeholder.svg?height=400&width=600",
          },
          {
            id: 2,
            title: "HTML & CSS Mastery",
            issueDate: "April 10, 2023",
            image: "/placeholder.svg?height=400&width=600",
          },
        ])

        // Set student progress
        setStudentProgress({
          coursesEnrolled: purchasedCourses.length || 0,
          hoursLearned: 42,
          videosWatched: 87,
          certificatesEarned: 2,
          quizzesCompleted: 15,
          assignmentsSubmitted: 8,
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const handlePlayVideo = (course: any) => {
    setSelectedCourse(course)
    setShowVideoPlayer(true)
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Student Dashboard</h1>

        {showVideoPlayer && selectedCourse && (
          <Card className="mb-8 border-indigo-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-indigo-800">
                {selectedCourse.title} - {selectedCourse.nextLesson}
              </CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoPlayer
                videoUrl={selectedCourse.videoUrl}
                onClose={() => setShowVideoPlayer(false)}
                courseId={selectedCourse.id}
                lessonTitle={selectedCourse.nextLesson}
              />
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="pt-6">
            {enrolledCourses.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Lock className="w-16 h-16 text-indigo-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Courses Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't enrolled in any courses yet. Browse our catalog and start learning today!
                  </p>
                  <Button asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      key={course.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-indigo-100"
                    >
                      <div className="relative h-48">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-indigo-100"
                          onClick={() => handlePlayVideo(course)}
                        >
                          <PlayCircle className="w-5 h-5 text-indigo-600" />
                          <span className="sr-only">Play</span>
                        </Button>
                      </div>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>Instructor: {course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2 bg-gray-200">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </Progress>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/courses/${course.id}`}>View Course</Link>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handlePlayVideo(course)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="certificates" className="pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    key={certificate.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-indigo-100"
                  >
                    <div className="relative h-48">
                      <Image
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{certificate.title}</CardTitle>
                      <CardDescription>Issued: {certificate.issueDate}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                        <Award className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="h-full border-dashed border-2 border-indigo-200 bg-indigo-50/50 flex flex-col items-center justify-center p-6 text-center">
                  <GraduationCap className="h-12 w-12 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-medium text-indigo-700">Complete More Courses</h3>
                  <p className="text-sm text-indigo-600 mt-2 mb-4">Finish your courses to earn more certificates</p>
                  <Button variant="outline" asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-indigo-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-indigo-800">Learning Statistics</CardTitle>
              <CardDescription>Track your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Courses Enrolled</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.coursesEnrolled}</p>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Hours Learned</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.hoursLearned}</p>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Videos Watched</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.videosWatched}</p>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Certificates Earned</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.certificatesEarned}</p>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpenCheck className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Quizzes Completed</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.quizzesCompleted}</p>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-lg border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Assignments Submitted</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-indigo-700">{studentProgress.assignmentsSubmitted}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
