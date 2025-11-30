"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react"
import { adminDataStore } from "@/lib/admin-data-store"

interface Course {
  id: string
  title: string
  instructor: string
  status: "active" | "pending" | "archived"
  students: number
  rating: number
  price: number
  createdAt: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Design Masterclass",
    instructor: "Sarah Johnson",
    status: "active",
    students: 324,
    rating: 4.8,
    price: 49.99,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "JavaScript Essentials",
    instructor: "Mike Davis",
    status: "active",
    students: 291,
    rating: 4.7,
    price: 39.99,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    title: "Python for Beginners",
    instructor: "Emily Chen",
    status: "pending",
    students: 0,
    rating: 0,
    price: 29.99,
    createdAt: "2024-11-20",
  },
]

export default function CourseManagement() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  useEffect(() => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((course) => course.status === filterStatus)
    }

    setFilteredCourses(filtered)
  }, [searchTerm, filterStatus, courses])

  const handleApproveCourse = (courseId: string) => {
    setCourses(courses.map((c) => (c.id === courseId ? { ...c, status: "active" as const } : c)))
    adminDataStore.activityLog.log("course_approved", { courseId }, "admin")
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId))
      adminDataStore.activityLog.log("course_deleted", { courseId }, "admin")
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Course Management</h1>
          <p className="text-slate-600 mt-1">Create, edit, and manage all courses on the platform</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Course Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Instructor</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium">{course.title}</td>
                    <td className="py-3 px-4 text-slate-600">{course.instructor}</td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">${course.price}</td>
                    <td className="py-3 px-4">{course.rating > 0 ? `${course.rating} ⭐` : "N/A"}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          course.status === "active"
                            ? "bg-green-100 text-green-700"
                            : course.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                        }
                      >
                        {course.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {course.status === "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApproveCourse(course.id)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-slate-600 hover:bg-slate-100">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
