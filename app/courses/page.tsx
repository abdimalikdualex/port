import Link from "next/link"
import { getAllCourses } from "@/lib/course-service"

export default async function CoursesPage() {
  const courses = await getAllCourses()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700">No courses found</h2>
              <p className="mt-2 text-gray-500">Check back later for new courses.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {course.imageUrl ? (
                      <img
                        src={course.imageUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Course Image</span>
                    )}
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{course.description.substring(0, 100)}...</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{course.instructor}</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.level}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{course.category}</span>
                      <span className="text-lg font-bold text-gray-900">${course.price}</span>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/courses/${course.id}`}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
