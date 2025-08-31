"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, DollarSign, Film, Users, TrendingUp, Clock, Eye } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = () => {
      const data = dataStore.getAnalytics()
      setAnalytics(data)
      setIsLoading(false)
    }

    loadAnalytics()

    // Refresh analytics every 30 seconds
    const interval = setInterval(loadAnalytics, 30000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

  const exchangeRate = dataStore.getSettings().payment.exchangeRate
  const kshRevenue = Math.round(analytics.totalRevenue * exchangeRate)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-indigo-900">Dashboard</h1>
        <p className="text-lg text-indigo-700">Welcome to your e-learning admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-indigo-900">{analytics.totalStudents.toLocaleString()}</div>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Published Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-indigo-900">{analytics.totalCourses}</div>
              <div className="p-2 rounded-full bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Clock className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-xs text-blue-600">3 drafts pending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-indigo-900">{analytics.totalVideos}</div>
              <div className="p-2 rounded-full bg-orange-100">
                <Film className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Eye className="h-3 w-3 text-orange-500 mr-1" />
              <span className="text-xs text-orange-600">2.5k total views</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-indigo-900">${analytics.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-500">KSH {kshRevenue.toLocaleString()}</div>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-indigo-900">Recent Payments</CardTitle>
            <CardDescription>Latest transactions on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentPayments.length > 0 ? (
                analytics.recentPayments.map((payment: any) => (
                  <div key={payment.id} className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{payment.studentName}</p>
                      <p className="text-sm text-gray-500">{payment.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">${payment.amount}</p>
                      <Badge
                        className={
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent payments</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-indigo-900">Popular Courses</CardTitle>
            <CardDescription>Most enrolled courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularCourses.map((course: any, index: number) => (
                <div key={course.id} className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-100">
                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{course.enrollments} students</p>
                    <p className="text-sm text-gray-500">${course.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-indigo-900">Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/admin/videos"
              className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-md bg-indigo-100">
                <Film className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Upload New Video</p>
                <p className="text-sm text-gray-500">Add content to your courses</p>
              </div>
            </Link>

            <Link
              href="/admin/courses"
              className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-md bg-purple-100">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Create New Course</p>
                <p className="text-sm text-gray-500">Set up a new course</p>
              </div>
            </Link>

            <Link
              href="/admin/students"
              className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-md bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Manage Students</p>
                <p className="text-sm text-gray-500">View student accounts</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
