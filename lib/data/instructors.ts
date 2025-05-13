export interface Instructor {
  id: string
  name: string
  slug: string
  bio: string
  imageUrl: string
  title: string
  expertise: string[]
  socialLinks?: {
    website?: string
    twitter?: string
    linkedin?: string
    github?: string
  }
  rating?: number
  ratingCount?: number
  courseCount?: number
  studentCount?: number
}

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "John Smith",
    slug: "john-smith",
    bio: "John is a senior web developer with over 10 years of experience in building responsive and user-friendly websites. He specializes in modern frontend frameworks and has worked with major tech companies throughout his career.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "Senior Web Developer & Instructor",
    expertise: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    socialLinks: {
      website: "https://johnsmith.dev",
      twitter: "johnsmith",
      linkedin: "johnsmith",
      github: "johnsmith",
    },
    rating: 4.8,
    ratingCount: 1245,
    courseCount: 5,
    studentCount: 12500,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    slug: "sarah-johnson",
    bio: "Sarah is an English language specialist with a Master's degree in TESOL and over 8 years of teaching experience. She has taught at universities in the UK and abroad, specializing in business English and academic writing.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "English Language Specialist",
    expertise: ["Business English", "Academic Writing", "IELTS Preparation", "Public Speaking"],
    socialLinks: {
      website: "https://sarahjohnson.edu",
      twitter: "sarahjohnson_teach",
      linkedin: "sarahjohnson",
    },
    rating: 4.7,
    ratingCount: 892,
    courseCount: 3,
    studentCount: 8700,
  },
  {
    id: "3",
    name: "Hassan Mwangi",
    slug: "hassan-mwangi",
    bio: "Hassan is a native Kiswahili speaker and language educator with a passion for teaching African languages. With a PhD in Linguistics and 12 years of teaching experience, he specializes in making language learning accessible and enjoyable for beginners.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "Kiswahili Language Educator",
    expertise: ["Kiswahili", "Linguistics", "Language Teaching", "African Studies"],
    socialLinks: {
      website: "https://hassanmwangi.co.ke",
      twitter: "hassanmwangi",
      linkedin: "hassanmwangi",
    },
    rating: 4.9,
    ratingCount: 456,
    courseCount: 2,
    studentCount: 3200,
  },
  {
    id: "4",
    name: "David Chen",
    slug: "david-chen",
    bio: "David is a data scientist and AI researcher with experience at leading tech companies. He holds a PhD in Computer Science and specializes in machine learning algorithms and their practical applications in business and research.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "Data Scientist & AI Researcher",
    expertise: ["Python", "Machine Learning", "Data Analysis", "Deep Learning", "AI"],
    socialLinks: {
      website: "https://davidchen.ai",
      twitter: "davidchen_ai",
      linkedin: "davidchen",
      github: "davidchen",
    },
    rating: 4.8,
    ratingCount: 1876,
    courseCount: 4,
    studentCount: 15600,
  },
  {
    id: "5",
    name: "Maria Garcia",
    slug: "maria-garcia",
    bio: "Maria is a mobile app developer and Flutter expert who has built apps with millions of downloads. She previously worked as a senior developer at Google and now focuses on teaching and consulting in mobile development.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "Mobile App Developer & Flutter Expert",
    expertise: ["Flutter", "Dart", "iOS Development", "Android Development", "UI/UX"],
    socialLinks: {
      website: "https://mariagarcia.dev",
      twitter: "mariagarcia_dev",
      linkedin: "mariagarcia",
      github: "mariagarcia",
    },
    rating: 4.7,
    ratingCount: 1245,
    courseCount: 3,
    studentCount: 9800,
  },
  {
    id: "6",
    name: "Alex Thompson",
    slug: "alex-thompson",
    bio: "Alex is a digital marketing strategist who has helped startups and Fortune 500 companies grow their online presence. With 15 years of experience in the industry, he specializes in SEO, content marketing, and social media strategy.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "Digital Marketing Strategist",
    expertise: ["SEO", "Content Marketing", "Social Media", "Google Ads", "Analytics"],
    socialLinks: {
      website: "https://alexthompson.marketing",
      twitter: "alexthompson_mkt",
      linkedin: "alexthompson",
    },
    rating: 4.9,
    ratingCount: 2156,
    courseCount: 6,
    studentCount: 24500,
  },
]

export function getAllInstructors(): Instructor[] {
  return instructors
}

export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id)
}

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.slug === slug)
}

export function getInstructorCourses(instructorId: string): any[] {
  // This would typically fetch from a database
  // For now, we'll import the courses and filter
  const { courses } = require("./courses")
  return courses.filter((course: any) => course.instructorId === instructorId && course.published)
}
