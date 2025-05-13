import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, DollarSign, Film, Users } from "lucide-react"

export default function AdminStatCards() {
  return (
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
  )
}
