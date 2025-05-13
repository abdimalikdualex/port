import Link from "next/link"
import { getCourseById } from "@/lib/data/courses"
import { getSectionsForCourse } from "@/lib/data/videos"
import { getVideosBySectionId } from "@/lib/data/videos"
import { getMaterialsBySectionId } from "@/lib/data/materials"
import { getInstructorById } from "@/lib/data/instructors"
import CommentSection from "@/components/comment-section"
import CourseContentAccordion from "@/components/course-content-accordion"
import RelatedCourses from "@/components/related-courses"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = getCourseById(params.id)

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The course you're looking for doesn't exist or has been removed.",
    }
  }

  return {
    title: course.title,
    description: course.description,
  }
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses" className="text-blue-600 hover:text-blue-800">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const sections = getSectionsForCourse(params.id)
  const instructor = getInstructorById(course.instructorId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{course.title}</h1>
              <p className="mt-3 max-w-3xl text-lg">{course.description}</p>

              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={instructor?.imageUrl || "/placeholder.svg?height=40&width=40"}
                    alt={instructor?.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Instructor: {instructor?.name}</p>
                  <p className="text-sm">{instructor?.title}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {course.category}
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {course.level}
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                  {course.duration}
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {course.lectures} lectures
                </span>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">${course.salePrice || course.price}</span>
                      {course.salePrice && (
                        <span className="ml-2 text-lg text-gray-500 line-through">${course.price}</span>
                      )}
                    </div>
                    {course.rating && (
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">
                          {course.rating} ({course.ratingCount})
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>

                  <div className="mt-6">
                    <Link
                      href={`/payment?courseId=${course.id}`}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Enroll Now
                    </Link>
                    <button className="mt-3 w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">What You'll Learn</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn?.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Course Content</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {sections.length} sections • {course.lectures} lectures • {course.duration} total
                </p>
              </div>
              <div className="border-t border-gray-200">
                <CourseContentAccordion
                  sections={sections}
                  getVideosBySectionId={getVideosBySectionId}
                  getMaterialsBySectionId={getMaterialsBySectionId}
                />
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Requirements</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <ul className="list-disc pl-5 space-y-2">
                  {course.requirements?.map((req, index) => (
                    <li key={index} className="text-gray-700">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Description</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <p className="text-gray-700 whitespace-pre-line">{course.longDescription || course.description}</p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Instructor</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={instructor?.imageUrl || "/placeholder.svg?height=64&width=64"}
                      alt={instructor?.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">{instructor?.name}</h4>
                    <p className="text-sm text-gray-500">{instructor?.title}</p>

                    <div className="mt-2 flex items-center">
                      {instructor?.rating && (
                        <>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${i < Math.floor(instructor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{instructor.rating} Instructor Rating</span>
                        </>
                      )}

                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{instructor?.courseCount} Courses</span>

                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-sm text-gray-600">
                        {instructor?.studentCount?.toLocaleString()} Students
                      </span>
                    </div>

                    <p className="mt-3 text-gray-700">{instructor?.bio}</p>

                    {instructor?.socialLinks && (
                      <div className="mt-4 flex space-x-3">
                        {instructor.socialLinks.website && (
                          <a
                            href={instructor.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Website</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                          </a>
                        )}
                        {instructor.socialLinks.twitter && (
                          <a
                            href={`https://twitter.com/${instructor.socialLinks.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Twitter</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        )}
                        {instructor.socialLinks.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${instructor.socialLinks.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.632-1.842-1.698-1.842-.957 0-1.37.685-1.37 1.842v4.178H7.934V8.546h2.556v1.17h.036c.378-.71 1.3-1.456 2.668-1.456 2.853 0 3.382 1.882 3.382 4.33v3.748z"
                                clipRule="evenodd"
                              />
                              <path fillRule="evenodd" d="M4.253 8.546H6.91V16.338H4.253V8.546z" clipRule="evenodd" />
                              <path
                                fillRule="evenodd"
                                d="M5.581 3.667c.85 0 1.542.692 1.542 1.543 0 .85-.692 1.543-1.542 1.543-.85 0-1.543-.692-1.543-1.543 0-.85.692-1.543 1.543-1.543z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        )}
                        {instructor.socialLinks.github && (
                          <a
                            href={`https://github.com/${instructor.socialLinks.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">GitHub</span>
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Student Feedback</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <CommentSection courseId={params.id} />
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <RelatedCourses currentCourseId={params.id} category={course.category} />
          </div>
        </div>
      </main>
    </div>
  )
}
