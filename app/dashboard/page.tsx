"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, PlayCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import VideoPlayer from "@/components/video-player"
import { dataStore } from "@/lib/data-store"
import { getCurrentUser, getUserEnrolledCourses } from "@/lib/auth-utils"
import { certificates } from "@/lib/certificates-utils" // Declare the certificates variable

export default function DashboardPage() {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEnrolledCourses = () => {
      const user = getCurrentUser()
      setCurrentUser(user)

      if (!user) {
        setIsLoading(false)
        return
      }

      const enrolledCourseIds = getUserEnrolledCourses(user.id)
      const allCourses = dataStore.getCourses()

      const userCourses = allCourses
        .filter((course) => enrolledCourseIds.includes(course.id))
        .map((course) => ({
          ...course,
          progress: Math.floor(Math.random() * 100),
          instructor: course.instructor,
          lastAccessed: "2 days ago",
          nextLesson: "Next Video",
        }))

      setEnrolledCourses(userCourses)
      setIsLoading(false)
    }

    loadEnrolledCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Logged In</AlertTitle>
          <AlertDescription>
            Please log in to view your enrolled courses.{" "}
            <Link href="/auth/login" className="underline font-semibold">
              Log in here
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handlePlayVideo = (course: any) => {
    setSelectedCourse(course)
    setShowVideoPlayer(true)
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Student Dashboard</h1>

      {showVideoPlayer && selectedCourse && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {selectedCourse.title} - {selectedCourse.nextLesson}
            </CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <VideoPlayer onClose={() => setShowVideoPlayer(false)} courseId={selectedCourse.id} isPremium={true} />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="pt-6">
          {enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
                  <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Start learning today!</p>
                  <Button asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={() => handlePlayVideo(course)}
                    >
                      <PlayCircle className="w-5 h-5" />
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
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                    <Button size="sm" onClick={() => handlePlayVideo(course)}>
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="certificates" className="pt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Completed
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{certificate.title}</CardTitle>
                  <CardDescription>Issued: {certificate.issueDate}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    Download Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Learning Statistics</CardTitle>
          <CardDescription>Track your learning progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Courses Enrolled</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{enrolledCourses.length}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Hours Learned</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{enrolledCourses.length * 10}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Videos Watched</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{enrolledCourses.length * 12}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Certificates Earned</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{certificates.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
