"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, DollarSign, TrendingUp, PlayCircle, ArrowUpRight } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import Link from "next/link"

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadAnalytics()
  }, [])

  const loadAnalytics = () => {
    try {
      const data = dataStore.getAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error("Error loading analytics:", error)
    }
  }

  if (!mounted || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Students",
      value: analytics.totalStudents,
      icon: Users,
      description: "Active learners",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Published Courses",
      value: analytics.totalCourses,
      icon: BookOpen,
      description: "Available courses",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: "Total earnings",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Videos",
      value: analytics.totalVideos,
      icon: PlayCircle,
      description: "Published videos",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your e-learning platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Recent Payments
            </CardTitle>
            <CardDescription>Latest transactions from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentPayments.length > 0 ? (
                analytics.recentPayments.map((payment: any) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{payment.studentName}</p>
                      <p className="text-xs text-gray-500">{payment.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${payment.amount}</p>
                      <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent payments</p>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <Link href="/admin/payments">
                View All Payments
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Popular Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Popular Courses
            </CardTitle>
            <CardDescription>Top performing courses by enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularCourses.length > 0 ? (
                analytics.popularCourses.map((course: any, index: number) => (
                  <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{course.title}</p>
                      <p className="text-xs text-gray-500">{course.enrollments} enrollments</p>
                    </div>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No courses available</p>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <Link href="/admin/courses">
                Manage Courses
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col gap-2">
              <Link href="/admin/courses">
                <BookOpen className="w-6 h-6" />
                <span>Add New Course</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <Link href="/admin/videos">
                <PlayCircle className="w-6 h-6" />
                <span>Upload Video</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
              <Link href="/admin/analytics">
                <TrendingUp className="w-6 h-6" />
                <span>View Analytics</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
