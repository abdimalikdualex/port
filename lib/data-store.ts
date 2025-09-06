// Data management system for the e-learning platform
export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
  instructor: string
  level: string
  status: "published" | "draft"
  enrollments: number
  videos: Video[]
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: string
  title: string
  description: string
  courseId: string
  courseName: string
  duration: string
  thumbnail: string
  videoUrl: string
  status: "published" | "draft" | "processing"
  views: number
  order: number
  createdAt: string
  updatedAt: string
}

export interface Student {
  id: string
  name: string
  email: string
  enrolledCourses: string[]
  completedCourses: string[]
  totalSpent: number
  joinedAt: string
  lastActive: string
}

export interface Payment {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseName: string
  amount: number
  currency: string
  method: "mpesa" | "card" | "paypal"
  status: "completed" | "pending" | "failed"
  transactionId: string
  createdAt: string
}

export interface Settings {
  general: {
    siteName: string
    siteDescription: string
    contactEmail: string
    supportPhone: string
    defaultLanguage: string
    enableRegistration: boolean
    enablePublicCourses: boolean
  }
  payment: {
    currency: string
    exchangeRate: number
    enableMpesa: boolean
    mpesaBusinessNumber: string
    mpesaAccountName: string
    enableCreditCard: boolean
    enablePaypal: boolean
    paypalEmail: string
  }
  email: {
    smtpServer: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    senderName: string
    senderEmail: string
    enableWelcomeEmail: boolean
    enableCourseCompletionEmail: boolean
    enablePaymentReceiptEmail: boolean
  }
  appearance: {
    theme: string
    enableDarkMode: boolean
    primaryColor: string
    secondaryColor: string
    showFooter: boolean
    showSocialLinks: boolean
  }
}

// Default data
const defaultCourses: Course[] = [
  {
    id: "1",
    title: "Web Design Masterclass",
    description: "Comprehensive course on modern web design principles, HTML, CSS, and responsive design.",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Web+Design",
    price: 94.99,
    category: "IT",
    instructor: "ABDULMALIK OMAR DUALE",
    level: "All Levels",
    status: "published",
    enrollments: 45,
    videos: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Advanced English for Professionals",
    description: "Master business English, professional writing, and advanced conversation skills.",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Advanced+English",
    price: 89.99,
    category: "English",
    instructor: "Mr. Abdijabar",
    level: "Advanced",
    status: "published",
    enrollments: 32,
    videos: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Kiswahili for Beginners",
    description: "Learn the fundamentals of Kiswahili language including basic vocabulary and grammar.",
    thumbnail: "/placeholder.svg?height=400&width=600&text=Kiswahili+Basics",
    price: 79.99,
    category: "Kiswahili",
    instructor: "Mr. Abdijabar",
    level: "Beginner",
    status: "published",
    enrollments: 28,
    videos: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const defaultVideos: Video[] = [
  {
    id: "1",
    title: "Introduction to Web Design",
    description: "Learn the basics of web design and what makes a great website.",
    courseId: "1",
    courseName: "Web Design Masterclass",
    duration: "12:34",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Intro+Video",
    videoUrl: "/placeholder-video.mp4",
    status: "published",
    views: 245,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "HTML Fundamentals",
    description: "Master the building blocks of web pages with HTML.",
    courseId: "1",
    courseName: "Web Design Masterclass",
    duration: "18:22",
    thumbnail: "/placeholder.svg?height=180&width=320&text=HTML+Basics",
    videoUrl: "/placeholder-video.mp4",
    status: "published",
    views: 189,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    title: "English Grammar Essentials",
    description: "Master essential English grammar rules and usage.",
    courseId: "2",
    courseName: "Advanced English for Professionals",
    duration: "25:15",
    thumbnail: "/placeholder.svg?height=180&width=320&text=Grammar+Rules",
    videoUrl: "/placeholder-video.mp4",
    status: "published",
    views: 156,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

const defaultStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    enrolledCourses: ["1", "2"],
    completedCourses: ["3"],
    totalSpent: 264.97,
    joinedAt: "2024-01-15T00:00:00Z",
    lastActive: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    enrolledCourses: ["1"],
    completedCourses: [],
    totalSpent: 94.99,
    joinedAt: "2024-02-01T00:00:00Z",
    lastActive: "2024-03-14T15:45:00Z",
  },
]

const defaultPayments: Payment[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
    courseId: "1",
    courseName: "Web Design Masterclass",
    amount: 94.99,
    currency: "USD",
    method: "mpesa",
    status: "completed",
    transactionId: "TXN001",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Jane Smith",
    studentEmail: "jane.smith@example.com",
    courseId: "1",
    courseName: "Web Design Masterclass",
    amount: 94.99,
    currency: "USD",
    method: "card",
    status: "completed",
    transactionId: "TXN002",
    createdAt: "2024-02-01T00:00:00Z",
  },
]

const defaultSettings: Settings = {
  general: {
    siteName: "E-Learning Platform",
    siteDescription: "Premium English, Kiswahili, and IT courses taught by industry experts.",
    contactEmail: "info@example.com",
    supportPhone: "+254 123 456 789",
    defaultLanguage: "english",
    enableRegistration: true,
    enablePublicCourses: true,
  },
  payment: {
    currency: "USD",
    exchangeRate: 145,
    enableMpesa: true,
    mpesaBusinessNumber: "174379",
    mpesaAccountName: "E-Learning Platform",
    enableCreditCard: true,
    enablePaypal: true,
    paypalEmail: "payments@example.com",
  },
  email: {
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@example.com",
    smtpPassword: "",
    senderName: "E-Learning Platform",
    senderEmail: "noreply@example.com",
    enableWelcomeEmail: true,
    enableCourseCompletionEmail: true,
    enablePaymentReceiptEmail: true,
  },
  appearance: {
    theme: "default",
    enableDarkMode: false,
    primaryColor: "#4f46e5",
    secondaryColor: "#8b5cf6",
    showFooter: true,
    showSocialLinks: true,
  },
}

// Data store class
export class DataStore {
  private static instance: DataStore

  private constructor() {
    this.initializeData()
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  private initializeData() {
    // Only initialize data in browser environment and do it efficiently
    if (typeof window === "undefined") return

    // Use a single check to see if data exists, then initialize all at once
    const hasData = localStorage.getItem("elearning_courses")

    if (!hasData) {
      // Initialize all data in one batch to reduce localStorage operations
      localStorage.setItem("elearning_courses", JSON.stringify(defaultCourses))
      localStorage.setItem("elearning_videos", JSON.stringify(defaultVideos))
      localStorage.setItem("elearning_students", JSON.stringify(defaultStudents))
      localStorage.setItem("elearning_payments", JSON.stringify(defaultPayments))
      localStorage.setItem("elearning_settings", JSON.stringify(defaultSettings))
    }
  }

  // Course methods
  getCourses(): Course[] {
    if (typeof window === "undefined") return defaultCourses
    const courses = localStorage.getItem("elearning_courses")
    return courses ? JSON.parse(courses) : defaultCourses
  }

  getCourse(id: string): Course | null {
    const courses = this.getCourses()
    return courses.find((course) => course.id === id) || null
  }

  addCourse(course: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
    const courses = this.getCourses()
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    courses.push(newCourse)
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_courses", JSON.stringify(courses))
    }
    return newCourse
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const courses = this.getCourses()
    const index = courses.findIndex((course) => course.id === id)
    if (index === -1) return null

    courses[index] = {
      ...courses[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_courses", JSON.stringify(courses))
    }
    return courses[index]
  }

  deleteCourse(id: string): boolean {
    const courses = this.getCourses()
    const filteredCourses = courses.filter((course) => course.id !== id)
    if (filteredCourses.length === courses.length) return false

    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_courses", JSON.stringify(filteredCourses))

      // Also delete associated videos
      const videos = this.getVideos()
      const filteredVideos = videos.filter((video) => video.courseId !== id)
      localStorage.setItem("elearning_videos", JSON.stringify(filteredVideos))
    }

    return true
  }

  // Video methods
  getVideos(): Video[] {
    if (typeof window === "undefined") return defaultVideos
    const videos = localStorage.getItem("elearning_videos")
    return videos ? JSON.parse(videos) : defaultVideos
  }

  getVideo(id: string): Video | null {
    const videos = this.getVideos()
    return videos.find((video) => video.id === id) || null
  }

  getVideosByCourse(courseId: string): Video[] {
    const videos = this.getVideos()
    return videos.filter((video) => video.courseId === courseId).sort((a, b) => a.order - b.order)
  }

  addVideo(video: Omit<Video, "id" | "createdAt" | "updatedAt">): Video {
    const videos = this.getVideos()
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    videos.push(newVideo)

    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_videos", JSON.stringify(videos))

      // Update course video count
      const courses = this.getCourses()
      const courseIndex = courses.findIndex((course) => course.id === video.courseId)
      if (courseIndex !== -1) {
        courses[courseIndex].videos = this.getVideosByCourse(video.courseId)
        localStorage.setItem("elearning_courses", JSON.stringify(courses))
      }
    }

    return newVideo
  }

  updateVideo(id: string, updates: Partial<Video>): Video | null {
    const videos = this.getVideos()
    const index = videos.findIndex((video) => video.id === id)
    if (index === -1) return null

    videos[index] = {
      ...videos[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_videos", JSON.stringify(videos))
    }
    return videos[index]
  }

  deleteVideo(id: string): boolean {
    const videos = this.getVideos()
    const video = videos.find((v) => v.id === id)
    if (!video) return false

    const filteredVideos = videos.filter((video) => video.id !== id)

    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_videos", JSON.stringify(filteredVideos))

      // Update course video count
      const courses = this.getCourses()
      const courseIndex = courses.findIndex((course) => course.id === video.courseId)
      if (courseIndex !== -1) {
        courses[courseIndex].videos = this.getVideosByCourse(video.courseId)
        localStorage.setItem("elearning_courses", JSON.stringify(courses))
      }
    }

    return true
  }

  // Student methods
  getStudents(): Student[] {
    if (typeof window === "undefined") return defaultStudents
    const students = localStorage.getItem("elearning_students")
    return students ? JSON.parse(students) : defaultStudents
  }

  getStudent(id: string): Student | null {
    const students = this.getStudents()
    return students.find((student) => student.id === id) || null
  }

  addStudent(student: Omit<Student, "id">): Student {
    const students = this.getStudents()
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
    }
    students.push(newStudent)
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_students", JSON.stringify(students))
    }
    return newStudent
  }

  updateStudent(id: string, updates: Partial<Student>): Student | null {
    const students = this.getStudents()
    const index = students.findIndex((student) => student.id === id)
    if (index === -1) return null

    students[index] = { ...students[index], ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_students", JSON.stringify(students))
    }
    return students[index]
  }

  // Payment methods
  getPayments(): Payment[] {
    if (typeof window === "undefined") return defaultPayments
    const payments = localStorage.getItem("elearning_payments")
    return payments ? JSON.parse(payments) : defaultPayments
  }

  addPayment(payment: Omit<Payment, "id">): Payment {
    const payments = this.getPayments()
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
    }
    payments.push(newPayment)
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_payments", JSON.stringify(payments))
    }
    return newPayment
  }

  // Settings methods
  getSettings(): Settings {
    if (typeof window === "undefined") return defaultSettings
    const settings = localStorage.getItem("elearning_settings")
    return settings ? JSON.parse(settings) : defaultSettings
  }

  updateSettings(updates: Partial<Settings>): Settings {
    const currentSettings = this.getSettings()
    const newSettings = {
      ...currentSettings,
      ...updates,
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("elearning_settings", JSON.stringify(newSettings))
    }
    return newSettings
  }

  // Analytics methods
  getAnalytics() {
    const courses = this.getCourses()
    const videos = this.getVideos()
    const students = this.getStudents()
    const payments = this.getPayments()

    const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrollments, 0)

    return {
      totalCourses: courses.filter((c) => c.status === "published").length,
      totalVideos: videos.filter((v) => v.status === "published").length,
      totalStudents: students.length,
      totalRevenue,
      totalEnrollments,
      recentPayments: payments.slice(-5).reverse(),
      popularCourses: courses.sort((a, b) => b.enrollments - a.enrollments).slice(0, 5),
    }
  }
}

export const dataStore = DataStore.getInstance()
