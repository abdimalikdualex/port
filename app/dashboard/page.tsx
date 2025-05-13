import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Loading component
import Loading from "./loading"

// Mock data for when database is not available
const mockEnrollments = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 45,
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and patterns",
    thumbnail: "/placeholder.svg?height=200&width=300",
    progress: 20,
  },
]

async function DashboardContent() {
  // Get the current user
  const user = await getAuthUser()

  if (!user) {
    redirect("/auth/login?redirect=/dashboard")
  }

  let enrollments = []
  let recentActivities = []

  try {
    // Try to fetch enrollments from database
    enrollments = await prisma.enrollment.findMany({
      where: { userId: user.id },
    })

    // If no enrollments found or database error occurred, use mock data in development
    if (!enrollments || enrollments.length === 0) {
      console.log("No enrollments found or using mock data")
      enrollments = mockEnrollments
    }

    // Try to fetch recent activities
    // This is just a placeholder - implement according to your schema
    recentActivities = [
      { id: "1", type: "comment", course: "Introduction to Web Development", date: new Date().toISOString() },
      { id: "2", type: "progress", course: "Advanced React Patterns", progress: 20, date: new Date().toISOString() },
    ]
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Use mock data if there's an error
    enrollments = mockEnrollments
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.name || "Student"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={enrollment.thumbnail || "/placeholder.svg?height=200&width=300"}
                  alt={enrollment.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{enrollment.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{enrollment.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${enrollment.progress || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{enrollment.progress || 0}% complete</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                <p className="font-medium">{activity.course}</p>
                <p className="text-sm text-gray-600">
                  {activity.type === "comment"
                    ? "You commented on this course"
                    : activity.type === "progress"
                      ? `You completed ${activity.progress}% of this course`
                      : "Activity recorded"}
                </p>
                <p className="text-xs text-gray-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  )
}
