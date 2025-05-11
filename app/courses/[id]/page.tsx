"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Play, Star, Users, Heart } from "lucide-react"
import CourseContentAccordion from "@/components/course-content-accordion"
import RelatedCourses from "@/components/related-courses"
import CommentSection from "@/components/comment-section"
import { toast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

// Mock data for a single course - Web Design Masterclass
const course = {
  id: 1,
  title: "Web Design Masterclass",
  description:
    "Comprehensive course on modern web design principles, HTML, CSS, and responsive design. This course will take you from beginner to advanced level, covering all the essential concepts and tools used in modern web design.",
  image: "/placeholder.svg?height=600&width=1200",
  price: 94.99,
  category: "Web Design",
  instructor: {
    name: "ABDULMALIK OMAR DUALE",
    bio: "Senior Web Designer and IT instructor with extensive experience in web development, graphic design, and digital marketing. ABDULMALIK has taught thousands of students and specializes in practical, hands-on training.",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  level: "All Levels",
  rating: 4.9,
  students: 1089,
  duration: "38 hours",
  lectures: 72,
  lastUpdated: "August 2023",
  whatYouWillLearn: [
    "Design responsive websites that work on all devices",
    "Master HTML5 and CSS3 for modern web design",
    "Understand UI/UX principles and best practices",
    "Create professional website layouts and navigation",
    "Implement typography, color theory, and visual hierarchy",
    "Optimize websites for performance and SEO",
  ],
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate KSH price
  const kshPrice = Math.round(course.price * exchangeRate)

  useEffect(() => {
    // Check if course is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.some((item: any) => item.id === Number(params.id)))

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleEnroll = () => {
    // Store course info for payment page
    localStorage.setItem("enrollCourse", JSON.stringify(course))
    // Redirect to payment page
    router.push("/payment")
  }

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.id !== Number(params.id))
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(false)
      toast({
        title: "Removed from wishlist",
        description: `${course.title} has been removed from your wishlist`,
      })
    } else {
      // Add to wishlist
      const updatedWishlist = [
        ...wishlist,
        {
          id: Number(params.id),
          title: course.title,
          image: course.image,
          price: course.price,
          instructor: course.instructor.name,
        },
      ]
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(true)
      toast({
        title: "Added to wishlist",
        description: `${course.title} has been added to your wishlist`,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700">Loading course details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className="px-3 py-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{course.category}</Badge>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{course.rating}</span>
              <span className="ml-1 text-muted-foreground">({course.students} students)</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{course.duration}</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{course.lectures} lectures</span>
            </div>
            <div className="text-muted-foreground">Last updated: {course.lastUpdated}</div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] mb-8 overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <Button size="lg" className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Play className="w-5 h-5" />
                Preview Course
              </Button>
            </div>
            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-6">
              <h3 className="mb-4 text-xl font-bold">About This Course</h3>
              <p className="mb-6 text-muted-foreground">{course.description}</p>

              <h3 className="mb-4 text-xl font-bold">What You'll Learn</h3>
              <ul className="grid gap-3 mb-6 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 text-indigo-600">✓</div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="curriculum" className="pt-6">
              <h3 className="mb-4 text-xl font-bold">Course Content</h3>
              <div className="mb-4 text-muted-foreground">
                {course.lectures} lectures • {course.duration} total length
              </div>
              <CourseContentAccordion />
            </TabsContent>
            <TabsContent value="instructor" className="pt-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <div className="relative w-24 h-24 overflow-hidden rounded-full shrink-0">
                  <Image
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">{course.instructor.name}</h3>
                  <p className="text-muted-foreground">{course.instructor.bio}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="pt-6">
              <CommentSection courseId={params.id} />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sticky top-4">
            <div className="p-6 border rounded-lg shadow-sm">
              <div className="mb-6">
                <div className="text-3xl font-bold text-indigo-800">${course.price}</div>
                <div className="text-lg text-muted-foreground">KSH {kshPrice}</div>
              </div>
              <Button
                className="w-full mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                size="lg"
                onClick={handleEnroll}
              >
                Enroll Now
              </Button>
              <Button
                variant={isInWishlist ? "default" : "outline"}
                className={`w-full mb-6 ${isInWishlist ? "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-200" : "text-gray-700"}`}
                size="lg"
                onClick={toggleWishlist}
              >
                <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? "fill-pink-500 text-pink-500" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

              <div className="space-y-4">
                <h4 className="font-medium">This course includes:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Play className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{course.duration} on-demand video</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{course.lectures} lessons</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>Access on all devices</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>Lifetime access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">Related Courses</h2>
        <RelatedCourses />
      </div>
    </div>
  )
}
