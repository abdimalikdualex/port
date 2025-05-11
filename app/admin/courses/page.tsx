"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Film, MoreVertical, Plus, Search, Users } from "lucide-react"
import CourseForm from "@/components/admin/course-form"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "Web Design Masterclass",
    description: "Comprehensive course on modern web design principles, HTML, CSS, and responsive design.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    price: 94.99,
    category: "IT",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "All Levels",
    status: "published",
    enrollments: 45,
    videos: 12,
  },
  {
    id: 2,
    title: "Advanced English for Professionals",
    description: "Master business English, professional writing, and advanced conversation skills.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "English",
    instructor: "Mr. Abdijabar",
    level: "Advanced",
    status: "published",
    enrollments: 32,
    videos: 18,
  },
  {
    id: 3,
    title: "Kiswahili for Beginners",
    description: "Learn the fundamentals of Kiswahili language including basic vocabulary and grammar.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    category: "Kiswahili",
    instructor: "Mr. Abdijabar",
    level: "Beginner",
    status: "published",
    enrollments: 28,
    videos: 15,
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    description: "Learn the basics of digital marketing, social media, and online advertising.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    price: 84.99,
    category: "IT",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Beginner",
    status: "draft",
    enrollments: 0,
    videos: 8,
  },
  {
    id: 5,
    title: "Graphic Design Essentials",
    description: "Master the fundamentals of graphic design using industry-standard tools.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "IT",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Intermediate",
    status: "draft",
    enrollments: 0,
    videos: 5,
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null)

  // Get unique categories for filter
  const categories = ["all", ...new Set(courses.map((course) => course.category))]

  // Filter courses based on search query, category filter, and status filter
  const filteredCourses = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((course) => categoryFilter === "all" || course.category === categoryFilter)
    .filter((course) => statusFilter === "all" || course.status === statusFilter)

  const handleDeleteCourse = (id: number) => {
    setCourseToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete))
      setIsDeleteDialogOpen(false)
      setCourseToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Course Management</h1>
          <p className="text-lg text-indigo-700">Create and manage your courses</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Add a new course to your platform. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <CourseForm
              onSuccess={(newCourse) => {
                setCourses([
                  {
                    id: courses.length + 1,
                    title: newCourse.title,
                    description: newCourse.description,
                    thumbnail: "/placeholder.svg?height=400&width=600",
                    price: Number.parseFloat(newCourse.price),
                    category: newCourse.category,
                    instructor: newCourse.instructor,
                    level: newCourse.level,
                    status: "draft",
                    enrollments: 0,
                    videos: 0,
                  },
                  ...courses,
                ])
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => {
            // Calculate KSH price
            const kshPrice = Math.round(course.price * exchangeRate)

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden border-purple-200 hover:shadow-md transition-shadow">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-1">
                          {course.category} • {course.level}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}`}>Edit Course</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/videos`}>Manage Videos</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                            Delete Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Instructor</p>
                        <p className="font-medium">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-medium text-green-600">${course.price}</p>
                        <p className="text-xs text-muted-foreground">KSH {kshPrice}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-2 w-full text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{course.enrollments}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Film className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{course.videos}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
                ? "Try different search terms or filters"
                : "Create your first course to get started"}
            </p>
          </div>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone and will remove all associated
              videos and materials.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
