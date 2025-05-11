"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"
import { motion } from "framer-motion"

interface Course {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
  instructor: string
  level: string
  rating: number
  students: number
}

interface CourseCardProps {
  course: Course
  index?: number
}

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  // Calculate KSH price
  const kshPrice = Math.round(course.price * exchangeRate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/courses/${course.id}`} className="block h-full">
        <Card className="h-full overflow-hidden border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-md">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{course.category}</Badge>
            </div>
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground">By {course.instructor}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.students} students</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2 border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm">Level: {course.level}</p>
              <div className="text-right">
                <p className="font-bold text-indigo-700">${course.price}</p>
                <p className="text-xs text-muted-foreground">KSH {kshPrice}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
