"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Video,
  Star,
  Clock,
  Award,
  Plus,
  ArrowUpRight,
  Activity,
} from "lucide-react"
import Link from "next/link"

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
  message: string
  time: string
  user: string
}

export default function AdminDashboard() {
  const router = useRouter()
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
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    const adminUser = localStorage.getItem("adminUser")

    if (isLoggedIn !== "true" || !adminUser) {
      console.log("[v0] Not authenticated, redirecting to login")
      router.push("/admin/login")
      return
    }

    console.log("[v0] User authenticated, loading dashboard")

    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - in a real app, this would come from your API
      setStats({
        totalStudents: 1247,
        totalCourses: 23,
        totalRevenue: 45670,
        totalVideos: 156,
        activeStudents: 892,
        completionRate: 78,
        averageRating: 4.6,
        monthlyGrowth: 12.5,
      })

      setRecentActivities([
        {
          id: "1",
          type: "enrollment",
          message: "New student enrolled in React Fundamentals",
          time: "2 minutes ago",
          user: "John Doe",
        },
        {
          id: "2",
          type: "completion",
          message: "Course completed: Advanced JavaScript",
          time: "15 minutes ago",
          user: "Sarah Smith",
        },
        {
          id: "3",
          type: "payment",
          message: "Payment received: $99.00",
          time: "1 hour ago",
          user: "Mike Johnson",
        },
        {
          id: "4",
          type: "review",
          message: "5-star review on Python Basics",
          time: "2 hours ago",
          user: "Emily Davis",
        },
        {
          id: "5",
          type: "enrollment",
          message: "New student enrolled in UI/UX Design",
          time: "3 hours ago",
          user: "Alex Wilson",
        },
      ])

      setIsLoading(false)
    }

    loadDashboardData()
  }, [router])

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      change: "+12.5%",
      changeType: "positive" as const,
      description: "Active learners",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses.toString(),
      icon: BookOpen,
      change: "+3",
      changeType: "positive" as const,
      description: "Published courses",
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+18.2%",
      changeType: "positive" as const,
      description: "This month",
    },
    {
      title: "Videos",
      value: stats.totalVideos.toString(),
      icon: Video,
      change: "+24",
      changeType: "positive" as const,
      description: "Total content",
    },
  ]

  const quickActions = [
    {
      title: "Add New Course",
      description: "Create a new course",
      href: "/admin/courses/new",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Upload Video",
      description: "Add new video content",
      href: "/admin/videos/new",
      icon: Video,
      color: "bg-green-500",
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      href: "/admin/analytics",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Manage Students",
      description: "View student progress",
      href: "/admin/students",
      icon: Users,
      color: "bg-orange-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="secondary" className="text-green-700 bg-green-100">
                  {stat.change}
                </Badge>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used admin functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Course Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{stats.completionRate}%</span>
              </div>
              <Progress value={stats.completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stats.averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(stats.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Active Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Currently Learning</span>
                <span>{stats.activeStudents}</span>
              </div>
              <Progress value={(stats.activeStudents / stats.totalStudents) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
