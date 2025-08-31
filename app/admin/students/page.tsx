"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Search, Mail, Calendar, DollarSign, Eye } from "lucide-react"
import { dataStore, type Student, type Course } from "@/lib/data-store"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setIsLoading(true)
    const studentsData = dataStore.getStudents()
    const coursesData = dataStore.getCourses()

    setStudents(studentsData)
    setCourses(coursesData)
    setIsLoading(false)
  }

  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
        case "oldest":
          return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
        case "spending":
          return b.totalSpent - a.totalSpent
        case "courses":
          return b.enrolledCourses.length - a.enrolledCourses.length
        default:
          return 0
      }
    })

  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course?.title || "Unknown Course"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const totalStudents = students.length
  const totalRevenue = students.reduce((sum, student) => sum + student.totalSpent, 0)
  const averageSpending = totalStudents > 0 ? totalRevenue / totalStudents : 0
  const activeStudents = students.filter((student) => {
    const lastActive = new Date(student.lastActive)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return lastActive > thirtyDaysAgo
  }).length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500">Loading students...</p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Student Management</h1>
        <p className="text-lg text-indigo-700">Monitor and manage your student community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-indigo-900">{totalStudents}</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-2xl font-bold text-indigo-900">{activeStudents}</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-indigo-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Spending</p>
                <p className="text-2xl font-bold text-indigo-900">${averageSpending.toFixed(2)}</p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="spending">Highest Spending</SelectItem>
            <SelectItem value="courses">Most Courses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students List */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-indigo-900">Students ({filteredStudents.length})</CardTitle>
          <CardDescription>Manage your student community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {formatDate(student.joinedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye className="h-3 w-3" />
                            <span>Last active {formatDate(student.lastActive)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{student.enrolledCourses.length}</p>
                          <p className="text-xs text-gray-500">Enrolled</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{student.completedCourses.length}</p>
                          <p className="text-xs text-gray-500">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-green-600">${student.totalSpent}</p>
                          <p className="text-xs text-gray-500">Total Spent</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 justify-end">
                        {student.enrolledCourses.slice(0, 2).map((courseId) => (
                          <Badge key={courseId} variant="outline" className="text-xs">
                            {getCourseName(courseId)}
                          </Badge>
                        ))}
                        {student.enrolledCourses.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.enrolledCourses.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No students found</h3>
                <p className="text-gray-500">
                  {searchQuery ? "Try adjusting your search criteria" : "No students have enrolled yet"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
