import { BookOpen, DollarSign, Film, Users } from "lucide-react"

export default function RecentActivities() {
  return (
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

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-orange-100">
          <BookOpen className="h-4 w-4 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium">New Course Created</p>
          <p className="text-sm text-gray-500">Advanced JavaScript Programming course added</p>
        </div>
        <div className="text-xs text-gray-500">3 hours ago</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-100">
          <Users className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium">New Instructor</p>
          <p className="text-sm text-gray-500">Michael Johnson joined as an instructor</p>
        </div>
        <div className="text-xs text-gray-500">5 hours ago</div>
      </div>
    </div>
  )
}
