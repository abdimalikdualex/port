"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, DollarSign, TrendingUp, Clock, Star, ArrowUpRight, Activity, PlayCircle } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalVideos: 0,
    recentPayments: [] as any[],
    popularCourses: [] as any[],
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const analytics = dataStore.getAnalytics()
      setStats(analytics)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      change: "+3",
      changeType: "positive" as const,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: "+8%",
      changeType: "positive" as const,
      color: "bg-purple-500",
    },
    {
      title: "Published Videos",
      value: stats.totalVideos,
      icon: PlayCircle,
      change: "+5",
      changeType: "positive" as const,
      color: "bg-orange-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      message: "New student enrolled in Web Design Masterclass",
      time: "2 minutes ago",
      icon: Users,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "payment",
      message: "Payment received for Advanced English course",
      time: "15 minutes ago",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "course",
      message: "New video uploaded to Kiswahili for Beginners",
      time: "1 hour ago",
      icon: PlayCircle,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "review",
      message: "5-star review received for Web Design course",
      time: "2 hours ago",
      icon: Star,
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
            <p className="text-indigo-100 text-lg">Here's what's happening with your e-learning platform today.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Activity className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">{stat.change}</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest activities on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Courses */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Popular Courses
            </CardTitle>
            <CardDescription>Top performing courses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularCourses.slice(0, 4).map((course, index) => (
                <div
                  key={course.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{course.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{course.enrollments} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">${course.price}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {course.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              asChild
              className="h-auto p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <Link href="/admin/courses">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Add New Course</div>
                  <div className="text-xs opacity-90">Create a new course</div>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 border-green-200 hover:bg-green-50 bg-transparent">
              <Link href="/admin/videos">
                <div className="text-center">
                  <PlayCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="font-medium text-green-700">Upload Video</div>
                  <div className="text-xs text-green-600">Add new video content</div>
                </div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto p-4 border-purple-200 hover:bg-purple-50 bg-transparent"
            >
              <Link href="/admin/students">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className="font-medium text-purple-700">Manage Students</div>
                  <div className="text-xs text-purple-600">View student progress</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
