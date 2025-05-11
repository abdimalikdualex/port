"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users } from "lucide-react"

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

interface AnimatedCourseCardProps {
  course: Course
  index: number
}

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

export default function AnimatedCourseCard({ course, index }: AnimatedCourseCardProps) {
  // Calculate KSH price
  const kshPrice = Math.round(course.price * exchangeRate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for a more dynamic feel
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="h-full"
    >
      <Link href={`/courses/${course.id}`} className="block h-full">
        <Card className="h-full overflow-hidden border-purple-200 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover transition-transform hover:scale-110 duration-700"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute bottom-4 left-4 text-white font-medium">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  View Course
                </motion.span>
              </div>
            </motion.div>
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500">{course.category}</Badge>
              </motion.div>
              <div className="flex flex-col items-end">
                <motion.span
                  className="font-bold text-indigo-600"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  ${course.price}
                </motion.span>
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
            <div className="flex items-center gap-4 w-full">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{course.students} students</span>
              </div>
              <motion.div
                className="ml-auto h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
