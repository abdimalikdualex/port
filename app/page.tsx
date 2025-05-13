import Link from "next/link"
import { getFeaturedCourses } from "@/lib/course-service"

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to Express Academy
            </h1>
            <p className="mt-4 text-xl">Unlock your potential with our expert-led online courses</p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Featured Courses</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Explore our most popular courses</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No featured courses available at the moment.</p>
            </div>
          ) : (
            featuredCourses.map((course) => (
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
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Courses
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Course Categories</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">Find the perfect course for your needs</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Web Development</h3>
                <p className="mt-1 text-sm text-gray-600">Learn to build modern websites and web applications</p>
                <div className="mt-4">
                  <Link href="/courses?category=Web Development" className="text-blue-600 hover:text-blue-800">
                    Browse Web Development Courses →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Language</h3>
                <p className="mt-1 text-sm text-gray-600">Master new languages for personal and professional growth</p>
                <div className="mt-4">
                  <Link href="/courses?category=Language" className="text-blue-600 hover:text-blue-800">
                    Browse Language Courses →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Marketing</h3>
                <p className="mt-1 text-sm text-gray-600">Develop skills in digital marketing and brand promotion</p>
                <div className="mt-4">
                  <Link href="/courses?category=Marketing" className="text-blue-600 hover:text-blue-800">
                    Browse Marketing Courses →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Express Academy
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-blue-600">50+</div>
            <div className="mt-2 text-lg font-medium text-gray-900">Courses</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-extrabold text-blue-600">10,000+</div>
            <div className="mt-2 text-lg font-medium text-gray-900">Students</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-extrabold text-blue-600">5,000+</div>
            <div className="mt-2 text-lg font-medium text-gray-900">Video Lessons</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-extrabold text-blue-600">98%</div>
            <div className="mt-2 text-lg font-medium text-gray-900">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
