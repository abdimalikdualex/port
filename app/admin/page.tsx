"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, DollarSign, TrendingUp, Video, Star, Award, Activity, Eye, UserPlus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface DashboardStats {
  totalStudents: number
  totalCourses: number
  totalRevenue: number
  totalVideos: number
  activeStudents: number
  completionRate: number
  averageRating: number
  monthlyGrowth: number
}

interface RecentActivity {
  id: string
  type: "enrollment" | "completion" | "payment" | "review"
  user: string
  course: string
  timestamp: string
  amount?: number
  rating?: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalVideos: 0,
    activeStudents: 0,
    completionRate: 0,
    averageRating: 0,
    monthlyGrowth: 0,
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = () => {
      try {
        // Load data from localStorage or use default values
        const courses = JSON.parse(localStorage.getItem("courses") || "[]")
        const students = JSON.parse(localStorage.getItem("students") || "[]")
        const payments = JSON.parse(localStorage.getItem("payments") || "[]")
        const videos = JSON.parse(localStorage.getItem("videos") || "[]")

        // Calculate stats
        const totalRevenue = payments.reduce((sum: number, payment: any) => sum + (payment.amount || 0), 0)
        const activeStudents = students.filter((student: any) => student.status === "active").length
        const completionRate =
          students.length > 0 ? (students.filter((s: any) => s.progress >= 100).length / students.length) * 100 : 0

        setStats({
          totalStudents: students.length,
          totalCourses: courses.length,
          totalRevenue,
          totalVideos: videos.length,
          activeStudents,
          completionRate,
          averageRating: 4.8,
          monthlyGrowth: 12.5,
        })

        // Generate recent activities
        const activities: RecentActivity[] = [
          {
            id: "1",
            type: "enrollment",
            user: "John Doe",
            course: "React Fundamentals",
            timestamp: "2 hours ago",
          },
          {
            id: "2",
            type: "payment",
            user: "Jane Smith",
            course: "Advanced JavaScript",
            timestamp: "4 hours ago",
            amount: 99,
          },
          {
            id: "3",
            type: "completion",
            user: "Mike Johnson",
            course: "Node.js Basics",
            timestamp: "6 hours ago",
          },
          {
            id: "4",
            type: "review",
            user: "Sarah Wilson",
            course: "Python for Beginners",
            timestamp: "8 hours ago",
            rating: 5,
          },
        ]

        setRecentActivities(activities)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
        toast.error("Error loading dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses.toString(),
      change: "+3",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: "+18%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Videos",
      value: stats.totalVideos.toString(),
      change: "+5",
      icon: Video,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "enrollment":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "completion":
        return <Award className="h-4 w-4 text-purple-500" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "enrollment":
        return "bg-blue-50 border-blue-200"
      case "payment":
        return "bg-green-50 border-green-200"
      case "completion":
        return "bg-purple-50 border-purple-200"
      case "review":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-indigo-100 mb-4">Manage your e-learning platform with powerful tools and insights.</p>
        <div className="flex gap-4">
          <Button variant="secondary" asChild>
            <Link href="/admin/courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Courses
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-indigo-600 bg-transparent"
            asChild
          >
            <Link href="/admin/analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Performance Metrics
              </CardTitle>
              <CardDescription>Key performance indicators for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Active Students</span>
                    <span className="text-sm font-bold text-gray-900">{stats.activeStudents}</span>
                  </div>
                  <Progress value={(stats.activeStudents / stats.totalStudents) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Completion Rate</span>
                    <span className="text-sm font-bold text-gray-900">{stats.completionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Average Rating</span>
                    <span className="text-sm font-bold text-gray-900">{stats.averageRating}/5.0</span>
                  </div>
                  <Progress value={(stats.averageRating / 5) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Monthly Growth</span>
                    <span className="text-sm font-bold text-gray-900">+{stats.monthlyGrowth}%</span>
                  </div>
                  <Progress value={stats.monthlyGrowth} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/courses">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-xs">Add Course</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/videos">
                    <Video className="h-6 w-6" />
                    <span className="text-xs">Upload Video</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/students">
                    <Users className="h-6 w-6" />
                    <span className="text-xs">Manage Students</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                  <Link href="/admin/analytics">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-xs">View Reports</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}>
                    <div className="flex items-start gap-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-xs text-gray-600 truncate">{activity.course}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          {activity.amount && (
                            <Badge variant="secondary" className="text-xs">
                              ${activity.amount}
                            </Badge>
                          )}
                          {activity.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium">{activity.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/admin/analytics">
                  View All Activities
                  <Eye className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <Badge className="bg-yellow-100 text-yellow-800">85% Used</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CDN</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
