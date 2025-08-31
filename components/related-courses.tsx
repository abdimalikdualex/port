import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CourseCard from "@/components/course-card"

// Mock data for related courses - customized for web design related courses
const relatedCourses = [
  {
    id: 2,
    title: "Graphic Design Fundamentals",
    description: "Learn essential graphic design principles, tools, and techniques for print and digital media.",
    image: "/placeholder.svg?height=400&width=600",
    price: 84.99,
    category: "Graphic Design",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Beginner",
    rating: 4.8,
    students: 876,
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Master user interface and experience design for websites and applications.",
    image: "/placeholder.svg?height=400&width=600",
    price: 79.99,
    category: "Web Design",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Intermediate",
    rating: 4.9,
    students: 1245,
  },
  {
    id: 4,
    title: "HTML & CSS Mastery",
    description: "Comprehensive guide to HTML5 and CSS3 for modern web development.",
    image: "/placeholder.svg?height=400&width=600",
    price: 74.99,
    category: "Web Design",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Beginner to Intermediate",
    rating: 4.8,
    students: 876,
  },
  {
    id: 5,
    title: "JavaScript for Web Designers",
    description: "Learn how to add interactivity to your websites with JavaScript.",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "Web Design",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Intermediate",
    rating: 4.9,
    students: 654,
  },
]

export default function RelatedCourses() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {relatedCourses.map((course) => (
          <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <CourseCard course={course} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-end gap-2 mt-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  )
}
