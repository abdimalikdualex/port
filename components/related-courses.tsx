import Link from "next/link"
import { getAllCourses } from "@/lib/data/courses"

interface RelatedCoursesProps {
  currentCourseId: string
  category: string
  limit?: number
}

export default function RelatedCourses({ currentCourseId, category, limit = 3 }: RelatedCoursesProps) {
  const allCourses = getAllCourses()

  // Filter courses by category and exclude current course
  const relatedCourses = allCourses
    .filter((course) => course.category === category && course.id !== currentCourseId)
    .slice(0, limit)

  if (relatedCourses.length === 0) {
    return null
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Related Courses</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Other courses in {category}</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {relatedCourses.map((course) => (
            <li key={course.id}>
              <Link href={`/courses/${course.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                      <img
                        src={course.imageUrl || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600 truncate">{course.title}</p>
                      <p className="mt-1 text-sm text-gray-500 truncate">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{course.level}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">{course.duration}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p className="font-medium text-indigo-600">${course.salePrice || course.price}</p>
                      {course.salePrice && <p className="ml-2 line-through">${course.price}</p>}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
