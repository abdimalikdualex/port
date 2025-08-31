"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
      {featuredCourses.map((course, index) => {
        // Calculate KSH price
        const kshPrice = Math.round(course.price * exchangeRate)

        return (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <Link href={`/courses/${course.id}`} className="block h-full">
              <Card className="h-full overflow-hidden border-purple-200 hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">View Course</span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500">{course.category}</Badge>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-indigo-600">${course.price}</span>
                      <span className="text-sm text-indigo-400">KSH {kshPrice}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-indigo-900">{course.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-700">{course.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2 border-t pt-4">
                  <p className="text-sm text-indigo-600">Instructor: {course.instructor}</p>
                  <p className="text-sm text-indigo-600">Level: {course.level}</p>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
