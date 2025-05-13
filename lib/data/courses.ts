export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels"
export type CourseCategory =
  | "Web Development"
  | "Mobile Development"
  | "Data Science"
  | "Design"
  | "Marketing"
  | "Business"
  | "Language"
  | "IT & Software"

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  price: number
  salePrice?: number
  imageUrl: string
  category: CourseCategory
  level: CourseLevel
  duration: string
  lectures: number
  instructor: string
  instructorId: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
  rating?: number
  ratingCount?: number
  enrollmentCount?: number
  tags?: string[]
  language?: string
  requirements?: string[]
  whatYouWillLearn?: string[]
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Web Design Masterclass",
    slug: "web-design-masterclass",
    description: "Learn modern web design principles, HTML, CSS, and responsive design.",
    longDescription:
      "This comprehensive course will take you from beginner to advanced level, covering all the essential concepts and tools used in modern web design. You'll learn how to create beautiful, responsive websites that work across all devices. By the end of this course, you'll have a strong portfolio of web design projects.",
    price: 94.99,
    salePrice: 79.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    level: "All Levels",
    duration: "38 hours",
    lectures: 72,
    instructor: "John Smith",
    instructorId: "1",
    featured: true,
    published: true,
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-05-20T00:00:00Z",
    rating: 4.8,
    ratingCount: 1245,
    enrollmentCount: 3850,
    tags: ["HTML", "CSS", "Responsive Design", "UI/UX"],
    language: "English",
    requirements: ["Basic computer skills", "No prior design experience needed", "A computer with internet access"],
    whatYouWillLearn: [
      "Create beautiful, responsive websites from scratch",
      "Master HTML5 and CSS3",
      "Understand web design principles and best practices",
      "Build a portfolio of web design projects",
    ],
  },
  {
    id: "2",
    title: "Advanced English Communication",
    slug: "advanced-english-communication",
    description: "Master professional English communication skills for business and academic contexts.",
    longDescription:
      "Improve your speaking, writing, and presentation abilities with this comprehensive English course. Designed for intermediate to advanced learners, this course focuses on professional communication in business settings, academic writing, and confident public speaking.",
    price: 79.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Language",
    level: "Intermediate",
    duration: "24 hours",
    lectures: 48,
    instructor: "Sarah Johnson",
    instructorId: "2",
    featured: true,
    published: true,
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z",
    rating: 4.7,
    ratingCount: 892,
    enrollmentCount: 2150,
    tags: ["English", "Business Communication", "Academic Writing", "Public Speaking"],
    language: "English",
    requirements: [
      "Intermediate English proficiency",
      "Basic understanding of English grammar",
      "Willingness to practice speaking and writing",
    ],
    whatYouWillLearn: [
      "Communicate confidently in professional settings",
      "Write clear and effective business emails and reports",
      "Deliver engaging presentations",
      "Participate effectively in meetings and negotiations",
    ],
  },
  {
    id: "3",
    title: "Kiswahili for Beginners",
    slug: "kiswahili-for-beginners",
    description: "Learn the basics of Kiswahili language with this comprehensive course for beginners.",
    longDescription:
      "Master pronunciation, grammar, and everyday conversations in Kiswahili. This course is designed for complete beginners and will take you from zero knowledge to being able to hold basic conversations, understand simple texts, and navigate daily situations in Kiswahili-speaking environments.",
    price: 59.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Language",
    level: "Beginner",
    duration: "20 hours",
    lectures: 40,
    instructor: "Hassan Mwangi",
    instructorId: "3",
    featured: true,
    published: true,
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-07-10T00:00:00Z",
    rating: 4.9,
    ratingCount: 456,
    enrollmentCount: 1280,
    tags: ["Kiswahili", "Swahili", "Language Learning", "African Languages"],
    language: "English, Kiswahili",
    requirements: [
      "No prior knowledge of Kiswahili required",
      "A notebook for practice exercises",
      "Willingness to practice pronunciation",
    ],
    whatYouWillLearn: [
      "Basic Kiswahili vocabulary for everyday situations",
      "Essential grammar structures",
      "Common phrases for travel and social interactions",
      "Cultural insights into Swahili-speaking regions",
    ],
  },
  {
    id: "4",
    title: "Data Science with Python",
    slug: "data-science-with-python",
    description: "Master data analysis, visualization, and machine learning with Python.",
    longDescription:
      "This comprehensive course covers everything you need to become a data scientist using Python. From data cleaning and visualization to advanced machine learning algorithms, you'll learn through hands-on projects using real-world datasets. By the end of this course, you'll have a portfolio of data science projects and the skills to start a career in this high-demand field.",
    price: 89.99,
    salePrice: 74.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Data Science",
    level: "Intermediate",
    duration: "42 hours",
    lectures: 85,
    instructor: "David Chen",
    instructorId: "4",
    featured: true,
    published: true,
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-08-05T00:00:00Z",
    rating: 4.8,
    ratingCount: 1876,
    enrollmentCount: 5240,
    tags: ["Python", "Data Analysis", "Machine Learning", "Data Visualization"],
    language: "English",
    requirements: [
      "Basic Python knowledge",
      "Understanding of basic mathematics and statistics",
      "Computer with Python installed",
    ],
    whatYouWillLearn: [
      "Clean and prepare data for analysis",
      "Create compelling data visualizations",
      "Build and evaluate machine learning models",
      "Work with popular data science libraries like Pandas, NumPy, and Scikit-learn",
    ],
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    slug: "mobile-app-development-with-flutter",
    description: "Build cross-platform mobile apps for iOS and Android with Flutter and Dart.",
    longDescription:
      "Learn to create beautiful, high-performance mobile applications that work on both iOS and Android from a single codebase. This course covers Dart programming language, Flutter framework, state management, API integration, and publishing your apps to app stores. By the end of this course, you'll have built several complete mobile applications ready for deployment.",
    price: 99.99,
    salePrice: 84.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "36 hours",
    lectures: 68,
    instructor: "Maria Garcia",
    instructorId: "5",
    featured: false,
    published: true,
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-09-10T00:00:00Z",
    rating: 4.7,
    ratingCount: 1245,
    enrollmentCount: 3120,
    tags: ["Flutter", "Dart", "Mobile Development", "iOS", "Android"],
    language: "English",
    requirements: [
      "Basic programming knowledge",
      "Understanding of object-oriented programming concepts",
      "Computer capable of running Android Studio or Xcode",
    ],
    whatYouWillLearn: [
      "Build beautiful user interfaces with Flutter widgets",
      "Manage application state effectively",
      "Integrate with backend services and APIs",
      "Publish applications to Google Play Store and Apple App Store",
    ],
  },
  {
    id: "6",
    title: "Digital Marketing Masterclass",
    slug: "digital-marketing-masterclass",
    description: "Learn comprehensive digital marketing strategies for business growth.",
    longDescription:
      "This all-in-one digital marketing course covers social media marketing, SEO, content marketing, email campaigns, Google Ads, analytics, and more. You'll learn how to create effective marketing strategies, measure results, and optimize campaigns for maximum ROI. Perfect for business owners, marketing professionals, and anyone looking to grow their online presence.",
    price: 84.99,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Marketing",
    level: "All Levels",
    duration: "32 hours",
    lectures: 64,
    instructor: "Alex Thompson",
    instructorId: "6",
    featured: true,
    published: true,
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-10-15T00:00:00Z",
    rating: 4.9,
    ratingCount: 2156,
    enrollmentCount: 6780,
    tags: ["Digital Marketing", "SEO", "Social Media", "Content Marketing", "Google Ads"],
    language: "English",
    requirements: [
      "No prior marketing experience needed",
      "Basic computer skills",
      "Social media accounts for practice",
    ],
    whatYouWillLearn: [
      "Create effective digital marketing strategies",
      "Optimize websites for search engines",
      "Build engaging social media campaigns",
      "Analyze marketing performance and ROI",
      "Create converting email marketing campaigns",
    ],
  },
]

export function getAllCourses(): Course[] {
  return courses.filter((course) => course.published)
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured && course.published)
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function searchCourses(query: string, category?: string, level?: string): Course[] {
  return courses.filter((course) => {
    const matchesQuery =
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = !category || course.category === category
    const matchesLevel = !level || course.level === level
    return course.published && matchesQuery && matchesCategory && matchesLevel
  })
}
