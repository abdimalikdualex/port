export interface Video {
  id: string
  courseId: string
  title: string
  description: string
  duration: string // in format "MM:SS"
  videoUrl: string
  thumbnailUrl: string
  isPreview: boolean
  position: number
  sectionId: string
}

export interface Section {
  id: string
  courseId: string
  title: string
  position: number
}

export const sections: Section[] = [
  // Web Design Masterclass
  {
    id: "s1",
    courseId: "1",
    title: "Introduction to Web Design",
    position: 1,
  },
  {
    id: "s2",
    courseId: "1",
    title: "HTML Fundamentals",
    position: 2,
  },
  {
    id: "s3",
    courseId: "1",
    title: "CSS Styling",
    position: 3,
  },

  // Advanced English Communication
  {
    id: "s4",
    courseId: "2",
    title: "Business English Essentials",
    position: 1,
  },
  {
    id: "s5",
    courseId: "2",
    title: "Professional Writing",
    position: 2,
  },

  // Kiswahili for Beginners
  {
    id: "s6",
    courseId: "3",
    title: "Getting Started with Kiswahili",
    position: 1,
  },
  {
    id: "s7",
    courseId: "3",
    title: "Basic Conversations",
    position: 2,
  },
]

export const videos: Video[] = [
  // Web Design Masterclass
  {
    id: "v1",
    courseId: "1",
    title: "Welcome to Web Design Masterclass",
    description: "An introduction to the course and what you'll learn.",
    duration: "05:22",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: true,
    position: 1,
    sectionId: "s1",
  },
  {
    id: "v2",
    courseId: "1",
    title: "Understanding Web Design Principles",
    description: "Learn the fundamental principles that guide effective web design.",
    duration: "12:45",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: true,
    position: 2,
    sectionId: "s1",
  },
  {
    id: "v3",
    courseId: "1",
    title: "HTML Document Structure",
    description: "Learn how to structure an HTML document properly.",
    duration: "15:30",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: false,
    position: 1,
    sectionId: "s2",
  },
  {
    id: "v4",
    courseId: "1",
    title: "Working with HTML Tags",
    description: "Explore the most common HTML tags and their uses.",
    duration: "18:15",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: false,
    position: 2,
    sectionId: "s2",
  },
  {
    id: "v5",
    courseId: "1",
    title: "CSS Selectors and Properties",
    description: "Master CSS selectors and common properties for styling.",
    duration: "22:10",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: false,
    position: 1,
    sectionId: "s3",
  },

  // Advanced English Communication
  {
    id: "v6",
    courseId: "2",
    title: "Introduction to Business English",
    description: "Overview of business English and its importance in professional settings.",
    duration: "08:45",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: true,
    position: 1,
    sectionId: "s4",
  },
  {
    id: "v7",
    courseId: "2",
    title: "Email Writing Essentials",
    description: "Learn how to write clear and effective business emails.",
    duration: "14:30",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: false,
    position: 2,
    sectionId: "s5",
  },

  // Kiswahili for Beginners
  {
    id: "v8",
    courseId: "3",
    title: "Introduction to Kiswahili",
    description: "An overview of the Kiswahili language and its importance in East Africa.",
    duration: "10:15",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: true,
    position: 1,
    sectionId: "s6",
  },
  {
    id: "v9",
    courseId: "3",
    title: "Basic Greetings and Introductions",
    description: "Learn common greetings and how to introduce yourself in Kiswahili.",
    duration: "12:20",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    thumbnailUrl: "/placeholder.svg?height=180&width=320",
    isPreview: false,
    position: 1,
    sectionId: "s7",
  },
]

export function getVideosForCourse(courseId: string): Video[] {
  return videos.filter((video) => video.courseId === courseId)
}

export function getSectionsForCourse(courseId: string): Section[] {
  return sections.filter((section) => section.courseId === courseId).sort((a, b) => a.position - b.position)
}

export function getVideosBySectionId(sectionId: string): Video[] {
  return videos.filter((video) => video.sectionId === sectionId).sort((a, b) => a.position - b.position)
}

export function getPreviewVideosForCourse(courseId: string): Video[] {
  return videos.filter((video) => video.courseId === courseId && video.isPreview)
}

export function getVideoById(videoId: string): Video | undefined {
  return videos.find((video) => video.id === videoId)
}
