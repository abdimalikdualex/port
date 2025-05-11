import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, DollarSign, Film, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Welcome to your e-learning admin panel</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,245</div>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">24</div>
              <div className="p-2 rounded-full bg-purple-100">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">342</div>
              <div className="p-2 rounded-full bg-orange-100">
                <Film className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$26,550</div>
                <div className="text-xs text-gray-500">KSH 3,451,500</div>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New Enrollment</p>
                  <p className="text-sm text-gray-500">John Doe enrolled in Web Design Masterclass</p>
                </div>
                <div className="text-xs text-gray-500">10 minutes ago</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-gray-500">$94.99 via M-Pesa</p>
                </div>
                <div className="text-xs text-gray-500">25 minutes ago</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Film className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New Video Uploaded</p>
                  <p className="text-sm text-gray-500">CSS Animations Tutorial added to Web Design course</p>
                </div>
                <div className="text-xs text-gray-500">1 hour ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  )
}
