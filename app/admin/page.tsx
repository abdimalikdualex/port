import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Film, Users } from "lucide-react"
import AdminRevenueChart from "@/components/admin/admin-revenue-chart"
import AdminStatCards from "@/components/admin/admin-stat-cards"
import RecentActivities from "@/components/admin/recent-activities"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Welcome to your e-learning admin panel</p>

      <AdminStatCards />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <div className="p-2 rounded-md bg-indigo-100">
                <Film className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Upload New Video</p>
                <p className="text-sm text-gray-500">Add a new video to your courses</p>
              </div>
            </div>

            <div className="p-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <div className="p-2 rounded-md bg-purple-100">
                <BookOpen className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Create New Course</p>
                <p className="text-sm text-gray-500">Set up a new course with videos</p>
              </div>
            </div>

            <div className="p-3 border rounded-lg flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <div className="p-2 rounded-md bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Manage Students</p>
                <p className="text-sm text-gray-500">View and manage student accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>Key metrics for your e-learning platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Course Completion Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <div className="w-24 h-24">
                  <div className="w-full h-full rounded-full border-8 border-indigo-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-r-transparent border-b-transparent rotate-45"></div>
                    <span className="text-lg font-bold">68%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Average Rating</p>
                  <p className="text-2xl font-bold">4.7/5</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 ${i < 4 ? "text-yellow-400" : i === 4 ? "text-yellow-400 opacity-70" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Students</p>
                  <p className="text-2xl font-bold">876</p>
                </div>
                <div className="text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1">+12% this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
