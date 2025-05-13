import sql from "../lib/db"
import { hash } from "bcryptjs"

async function seed() {
  try {
    console.log("Seeding database...")

    // Create admin user
    const adminPassword = await hash("admin123", 10)
    await sql`
      INSERT INTO "User" (id, name, email, "hashedPassword", role, "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        'Admin User',
        'admin@example.com',
        ${adminPassword},
        'ADMIN',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING
    `

    // Create super admin user
    const superAdminPassword = await hash("Maisha@0134", 10)
    await sql`
      INSERT INTO "User" (id, name, email, "hashedPassword", role, "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        'Abdulmalik',
        'amalikduale@gmail.com',
        ${superAdminPassword},
        'SUPER_ADMIN',
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO NOTHING
    `

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
      // Insert course
      const courseResult = await sql`
        INSERT INTO "Course" (
          id, 
          title, 
          description, 
          price, 
          "imageUrl", 
          category, 
          level, 
          duration, 
          lectures, 
          instructor, 
          featured, 
          "createdAt", 
          "updatedAt"
        )
        VALUES (
          gen_random_uuid(),
          ${course.title},
          ${course.description},
          ${course.price},
          ${course.imageUrl},
          ${course.category},
          ${course.level},
          ${course.duration},
          ${course.lectures},
          ${course.instructor},
          ${course.featured},
          NOW(),
          NOW()
        )
        ON CONFLICT (title) DO NOTHING
        RETURNING id
      `

      if (courseResult.length > 0) {
        const courseId = courseResult[0].id

        // Add sample videos for each course
        await sql`
          INSERT INTO "Video" (
            id, 
            title, 
            description, 
            url, 
            duration, 
            "order", 
            "isPreview", 
            "courseId", 
            "createdAt", 
            "updatedAt"
          )
          VALUES 
          (
            gen_random_uuid(),
            'Introduction to the Course',
            'Overview of what you''ll learn in this course',
            'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            360,
            1,
            true,
            ${courseId},
            NOW(),
            NOW()
          ),
          (
            gen_random_uuid(),
            'Getting Started',
            'First steps to begin your learning journey',
            'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            600,
            2,
            false,
            ${courseId},
            NOW(),
            NOW()
          ),
          (
            gen_random_uuid(),
            'Core Concepts',
            'Understanding the fundamental principles',
            'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            900,
            3,
            false,
            ${courseId},
            NOW(),
            NOW()
          )
        `

        // Add sample materials for each course
        await sql`
          INSERT INTO "Material" (
            id, 
            title, 
            description, 
            "fileUrl", 
            "fileType", 
            "courseId", 
            "createdAt", 
            "updatedAt"
          )
          VALUES 
          (
            gen_random_uuid(),
            'Course Workbook',
            'Comprehensive workbook with exercises and examples',
            '/files/sample-workbook.pdf',
            'PDF',
            ${courseId},
            NOW(),
            NOW()
          ),
          (
            gen_random_uuid(),
            'Practice Exercises',
            'Additional exercises to reinforce your learning',
            '/files/practice-exercises.pdf',
            'PDF',
            ${courseId},
            NOW(),
            NOW()
          )
        `
      }
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}

// This is a script, not a module, so we can call the function directly
seed()
