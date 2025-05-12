import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/auth"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hashPassword("admin123")

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      hashedPassword: adminPassword,
      role: "ADMIN",
    },
  })

  // Create super admin user
  const superAdminPassword = await hashPassword("Maisha@0134")

  const superAdmin = await prisma.user.upsert({
    where: { email: "amalikduale@gmail.com" },
    update: {},
    create: {
      name: "Abdulmalik",
      email: "amalikduale@gmail.com",
      hashedPassword: superAdminPassword,
      role: "SUPER_ADMIN",
    },
  })

  // Create sample courses
  const courses = [
    {
      title: "Web Design Masterclass",
      description:
        "Comprehensive course on modern web design principles, HTML, CSS, and responsive design. This course will take you from beginner to advanced level, covering all the essential concepts and tools used in modern web design.",
      price: 94.99,
      imageUrl: "/placeholder.svg?height=600&width=1200",
      category: "Web Development",
      level: "All Levels",
      duration: "38 hours",
      lectures: 72,
      instructor: "ABDULMALIK OMAR DUALE",
      featured: true,
    },
    {
      title: "Advanced English Communication",
      description:
        "Master professional English communication skills for business and academic contexts. Improve your speaking, writing, and presentation abilities.",
      price: 79.99,
      imageUrl: "/placeholder.svg?height=600&width=1200",
      category: "Language",
      level: "Intermediate",
      duration: "24 hours",
      lectures: 48,
      instructor: "Sarah Johnson",
      featured: true,
    },
    {
      title: "Kiswahili for Beginners",
      description:
        "Learn the basics of Kiswahili language with this comprehensive course for beginners. Master pronunciation, grammar, and everyday conversations.",
      price: 59.99,
      imageUrl: "/placeholder.svg?height=600&width=1200",
      category: "Language",
      level: "Beginner",
      duration: "20 hours",
      lectures: 40,
      instructor: "Hassan Mwangi",
      featured: true,
    },
  ]

  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: course,
    })

    // Add sample videos for each course
    await prisma.video.createMany({
      data: [
        {
          title: "Introduction to the Course",
          description: "Overview of what you'll learn in this course",
          url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 360, // 6 minutes
          order: 1,
          isPreview: true,
          courseId: createdCourse.id,
        },
        {
          title: "Getting Started",
          description: "First steps to begin your learning journey",
          url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 600, // 10 minutes
          order: 2,
          isPreview: false,
          courseId: createdCourse.id,
        },
        {
          title: "Core Concepts",
          description: "Understanding the fundamental principles",
          url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 900, // 15 minutes
          order: 3,
          isPreview: false,
          courseId: createdCourse.id,
        },
      ],
    })

    // Add sample materials for each course
    await prisma.material.createMany({
      data: [
        {
          title: "Course Workbook",
          description: "Comprehensive workbook with exercises and examples",
          fileUrl: "/files/sample-workbook.pdf",
          fileType: "PDF",
          courseId: createdCourse.id,
        },
        {
          title: "Practice Exercises",
          description: "Additional exercises to reinforce your learning",
          fileUrl: "/files/practice-exercises.pdf",
          fileType: "PDF",
          courseId: createdCourse.id,
        },
      ],
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
