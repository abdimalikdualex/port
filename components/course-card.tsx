import Link from "next/link"
import Image from "next/image"
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

interface CourseCardProps {
  course: Course
}

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

export default function CourseCard({ course }: CourseCardProps) {
  // Calculate KSH price
  const kshPrice = Math.round(course.price * exchangeRate)

  return (
    <Link href={`/courses/${course.id}`} className="transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge>{course.category}</Badge>
            <div className="flex flex-col items-end">
              <span className="font-bold text-primary">${course.price}</span>
              <span className="text-sm text-muted-foreground">KSH {kshPrice}</span>
            </div>
          </div>
          <h3 className="mt-2 text-xl font-bold">{course.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{course.students} students</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 border-t pt-4">
          <p className="text-sm">Instructor: {course.instructor}</p>
          <p className="text-sm">Level: {course.level}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
