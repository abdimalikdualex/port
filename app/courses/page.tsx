import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CourseCard from "@/components/course-card"
import { Search, SlidersHorizontal } from "lucide-react"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Advanced English for Professionals",
    description: "Master business English, professional writing, and advanced conversation skills.",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "English",
    instructor: "Mr. Abdijabar",
    level: "Advanced",
    rating: 4.8,
    students: 1245,
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
    rating: 4.7,
    students: 987,
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
    rating: 4.9,
    students: 1089,
  },
  {
    id: 4,
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
    id: 5,
    title: "Video Editing with Adobe Premiere Pro",
    description: "Master video editing techniques using Adobe Premiere Pro from basic to advanced levels.",
    image: "/placeholder.svg?height=400&width=600",
    price: 99.99,
    category: "Video Editing",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Intermediate",
    rating: 4.9,
    students: 654,
  },
  {
    id: 6,
    title: "Microsoft Office Complete Package",
    description: "Comprehensive training on Microsoft Word, Excel, PowerPoint, and Outlook for professional use.",
    image: "/placeholder.svg?height=400&width=600",
    price: 74.99,
    category: "Computer Packages",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "All Levels",
    rating: 4.7,
    students: 1432,
  },
  {
    id: 7,
    title: "Digital Marketing Strategy",
    description: "Learn how to create effective digital marketing campaigns that drive results.",
    image: "/placeholder.svg?height=400&width=600",
    price: 89.99,
    category: "Online Marketing",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "Intermediate",
    rating: 4.8,
    students: 987,
  },
  {
    id: 8,
    title: "Dropshipping Business Masterclass",
    description: "Start and scale your dropshipping business from scratch with proven strategies.",
    image: "/placeholder.svg?height=400&width=600",
    price: 109.99,
    category: "Dropshipping",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "All Levels",
    rating: 4.9,
    students: 765,
  },
  {
    id: 9,
    title: "Intermediate Kiswahili Conversation",
    description: "Improve your Kiswahili speaking skills with practical conversation exercises and vocabulary.",
    image: "/placeholder.svg?height=400&width=600",
    price: 84.99,
    category: "Kiswahili",
    instructor: "Mr. Abdijabar",
    level: "Intermediate",
    rating: 4.8,
    students: 543,
  },
]

export default function CoursesPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">All Courses</h1>

      <div className="flex flex-col gap-4 mb-8 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="kiswahili">Kiswahili</SelectItem>
              <SelectItem value="web-design">Web Design</SelectItem>
              <SelectItem value="graphic-design">Graphic Design</SelectItem>
              <SelectItem value="video-editing">Video Editing</SelectItem>
              <SelectItem value="computer-packages">Computer Packages</SelectItem>
              <SelectItem value="online-marketing">Online Marketing</SelectItem>
              <SelectItem value="dropshipping">Dropshipping</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="w-full sm:w-10">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
