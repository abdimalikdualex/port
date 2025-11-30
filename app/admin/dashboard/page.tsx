"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react"
import AnalyticsChart from "@/components/admin/analytics-chart"
import RecentActivities from "@/components/admin/recent-activities"
import TopCourses from "@/components/admin/top-courses"
import QuickStats from "@/components/admin/quick-stats"

const DEFAULT_STATS = {
  totalUsers: 150,
  totalCourses: 12,
  totalRevenue: 2500,
  activeCourses: 10,
  pendingApprovals: 2,
  activeStudents: 120,
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats] = useState(DEFAULT_STATS)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn")
    const adminUser = localStorage.getItem("adminUser")

    if (isLoggedIn !== "true" || !adminUser) {
      router.push("/admin/login")
      return
    }
  }, [router])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's your platform overview.</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          View Settings
        </Button>
      </div>

      {/* Quick Stats */}
      <QuickStats stats={stats} />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">This Month</span>
                  <span className="text-2xl font-bold text-indigo-600">${stats.totalRevenue.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-600">Growth</span>
                </div>
                <span className="font-bold text-green-600">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Pending Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Course Approvals</span>
                </div>
                <span className="font-bold text-yellow-600">{stats.pendingApprovals}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Support Tickets</span>
                </div>
                <span className="font-bold text-red-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Instructor Applications</span>
                </div>
                <span className="font-bold text-green-600">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <TopCourses />
      </div>
    </div>
  )
}
