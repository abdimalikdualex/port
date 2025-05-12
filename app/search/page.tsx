"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import AdvancedSearch from "@/components/advanced-search"
import CourseCard from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface Course {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  category: string
  level: string
  instructor: string
  _count: {
    purchases: number
    videos: number
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const level = searchParams.get("level") || ""
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (query) params.set("q", query)
        if (category && category !== "All Categories") params.set("category", category)
        if (level && level !== "All Levels") params.set("level", level)
        if (minPrice) params.set("minPrice", minPrice)
        if (maxPrice) params.set("maxPrice", maxPrice)

        const response = await fetch(`/api/search?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        setCourses(data.courses)
      } catch (err) {
        console.error("Search error:", err)
        setError("An error occurred while searching. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [query, category, level, minPrice, maxPrice])

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Courses</h1>

      <div className="mb-8">
        <AdvancedSearch />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {isLoading
            ? "Searching..."
            : courses.length > 0
              ? `Found ${courses.length} course${courses.length === 1 ? "" : "s"}`
              : "No courses found"}
        </h2>
        {query && (
          <p className="text-gray-600">
            Search results for: <span className="font-medium">{query}</span>
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <span className="ml-2 text-lg">Searching for courses...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                image={course.imageUrl || "/placeholder.svg?height=220&width=400"}
                category={course.category}
                instructor={course.instructor}
                students={course._count.purchases}
                lessons={course._count.videos}
              />
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No courses found matching your search criteria.</p>
          <Button
            onClick={() => {
              window.history.pushState({}, "", "/search")
              window.location.reload()
            }}
            variant="outline"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
