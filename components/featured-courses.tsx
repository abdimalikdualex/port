"use client"
import AnimatedCourseCard from "./animated-course-card"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

const featuredCourses = [
  {
    id: 1,
    title: "Advanced English for Professionals",
    description: "Master business English, professional writing, and advanced conversation skills.",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "English",
    instructor: "Mr. Abdijabar",
    level: "Advanced",
  },
  {
    id: 2,
    title: "Kiswahili for Beginners",
    description: "Learn the fundamentals of Kiswahili language including basic vocabulary and grammar.",
    image: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    category: "Kiswahili",
    instructor: "Mr. Abdijabar",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Web Design Masterclass",
    description: "Comprehensive course on modern web design principles, HTML, CSS, and responsive design.",
    image: "/placeholder.svg?height=400&width=600",
    price: 94.99,
    category: "Web Design",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "All Levels",
  },
]

export default function FeaturedCourses() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredCourses.map((course, index) => (
        <AnimatedCourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  )
}
