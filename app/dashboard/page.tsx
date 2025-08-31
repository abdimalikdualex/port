"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Play, PlayCircle } from "lucide-react"
import VideoPlayer from "@/components/video-player"

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "Web Design Masterclass",
    image: "/placeholder.svg?height=400&width=600",
    progress: 65,
    instructor: "ABDULMALIK OMAR DUALE",
    lastAccessed: "2 days ago",
    nextLesson: "CSS Grid Layout",
  },
  {
    id: 2,
    title: "Advanced English for Professionals",
    image: "/placeholder.svg?height=400&width=600",
    progress: 30,
    instructor: "Mr. Abdijabar",
    lastAccessed: "1 week ago",
    nextLesson: "Business Communication",
  },
  {
    id: 3,
    title: "Kiswahili for Beginners",
    image: "/placeholder.svg?height=400&width=600",
    progress: 10,
    instructor: "Mr. Abdijabar",
    lastAccessed: "3 days ago",
    nextLesson: "Basic Greetings and Introductions",
  },
]

// Mock data for certificates
const certificates = [
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
]

export default function DashboardPage() {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<null | (typeof enrolledCourses)[0]>(null)

  const handlePlayVideo = (course: (typeof enrolledCourses)[0]) => {
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
            <VideoPlayer onClose={() => setShowVideoPlayer(false)} />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="pt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
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
        </TabsContent>
        <TabsContent value="certificates" className="pt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{certificate.title}</CardTitle>
                  <CardDescription>Issued: {certificate.issueDate}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
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
              <p className="mt-2 text-2xl font-bold">3</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Hours Learned</span>
              </div>
              <p className="mt-2 text-2xl font-bold">42</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Videos Watched</span>
              </div>
              <p className="mt-2 text-2xl font-bold">87</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Certificates Earned</span>
              </div>
              <p className="mt-2 text-2xl font-bold">2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
