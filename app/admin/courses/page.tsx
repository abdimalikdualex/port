"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Film, MoreVertical, Plus, Search, Users, Trash2 } from "lucide-react"
import { dataStore, type Course } from "@/lib/data-store"
import { toast } from "sonner"

// Course form component
function CourseForm({ onSuccess, onCancel }: { onSuccess: (course: Course) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    instructor: "",
    level: "",
    status: "draft" as "published" | "draft",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.category ||
        !formData.instructor ||
        !formData.level
      ) {
        throw new Error("All fields are required")
      }

      const newCourse = dataStore.addCourse({
        title: formData.title,
        description: formData.description,
        thumbnail: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(formData.title)}`,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        instructor: formData.instructor,
        level: formData.level,
        status: formData.status,
        enrollments: 0,
        videos: [],
      })

      onSuccess(newCourse)
      toast.success("Course created successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create course")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="title">Course Title *</label>
          <Input
            id="title"
            name="title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter course description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="price">Price (USD) *</label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter course price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="category">Category *</label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Kiswahili">Kiswahili</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="instructor">Instructor *</label>
          <Select
            value={formData.instructor}
            onValueChange={(value) => handleSelectChange("instructor", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select instructor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ABDULMALIK OMAR DUALE">ABDULMALIK OMAR DUALE</SelectItem>
              <SelectItem value="Mr. Abdijabar">Mr. Abdijabar</SelectItem>
              <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
              <SelectItem value="Prof. Michael Chen">Prof. Michael Chen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="level">Level *</label>
          <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="All Levels">All Levels</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="status">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value as "published" | "draft")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        >
          {isSubmitting ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </form>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = () => {
    setIsLoading(true)
    const coursesData = dataStore.getCourses()
    setCourses(coursesData)
    setIsLoading(false)
  }

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

  const handleCourseCreated = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev])
    setIsDialogOpen(false)
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course? This will also delete all associated videos.")) {
      try {
        const success = dataStore.deleteCourse(courseId)
        if (success) {
          setCourses((prev) => prev.filter((course) => course.id !== courseId))
          toast.success("Course deleted successfully!")
        } else {
          toast.error("Failed to delete course")
        }
      } catch (error) {
        toast.error("An error occurred while deleting the course")
      }
    }
  }

  const exchangeRate = dataStore.getSettings().payment.exchangeRate

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-gray-500">Loading courses...</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Course Management</h1>
          <p className="text-lg text-indigo-700">Create and manage your courses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" /> Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>Add a new course to your platform. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <CourseForm onSuccess={handleCourseCreated} onCancel={() => setIsDialogOpen(false)} />
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
            const kshPrice = Math.round(course.price * exchangeRate)
            const videoCount = dataStore.getVideosByCourse(course.id).length

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
                            <Link href={`/admin/videos?course=${course.id}`}>Manage Videos</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/courses/${course.id}`} target="_blank">
                              Preview Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
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
                        <p className="text-xs text-muted-foreground">KSH {kshPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-2 w-full text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{course.enrollments}</p>
                        <span className="text-muted-foreground">students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Film className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{videoCount}</p>
                        <span className="text-muted-foreground">videos</span>
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
    </div>
  )
}
