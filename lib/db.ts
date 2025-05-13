import { neon, neonConfig } from "@neondatabase/serverless"

// Configure Neon to use WebSocket for better connection stability
neonConfig.fetchConnectionCache = true

// Check if DATABASE_URL is available
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set")
}

// Create a SQL client with connection string or fallback to a dummy implementation for development/preview
const createSqlClient = () => {
  try {
    if (!DATABASE_URL) {
      // Return a mock implementation for development/preview when no DB connection is available
      return {
        // Mock implementation that returns empty arrays or dummy data
        async query() {
          return []
        },
        // Support for tagged template literals
        async raw(strings: TemplateStringsArray, ...values: any[]) {
          return ""
        },
      }
    }

    return neon(DATABASE_URL)
  } catch (error) {
    console.error("Failed to initialize database connection:", error)

    // Return a mock implementation if connection fails
    return {
      async query() {
        return []
      },
      async raw(strings: TemplateStringsArray, ...values: any[]) {
        return ""
      },
    }
  }
}

// Create the SQL client
const sql = createSqlClient()

// Create a prisma-like interface that wraps our SQL client
export const prisma = {
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      try {
        if (where.id) {
          const [user] = await sql`SELECT * FROM users WHERE id = ${where.id}`
          return user
        }
        if (where.email) {
          const [user] = await sql`SELECT * FROM users WHERE email = ${where.email}`
          return user
        }
      } catch (error) {
        console.error("Database error in user.findUnique:", error)
      }
      return null
    },
    findMany: async () => {
      try {
        return await sql`SELECT * FROM users`
      } catch (error) {
        console.error("Database error in user.findMany:", error)
        return []
      }
    },
    create: async ({ data }: { data: any }) => {
      try {
        const [user] = await sql`
          INSERT INTO users (name, email, password, role)
          VALUES (${data.name}, ${data.email}, ${data.password}, ${data.role || "USER"})
          RETURNING *
        `
        return user
      } catch (error) {
        console.error("Database error in user.create:", error)
        return null
      }
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      try {
        const setClause = Object.entries(data)
          .map(([key, value]) => `${key} = ${value}`)
          .join(", ")

        const [user] = await sql`
          UPDATE users SET ${sql.raw(setClause)}
          WHERE id = ${where.id}
          RETURNING *
        `
        return user
      } catch (error) {
        console.error("Database error in user.update:", error)
        return null
      }
    },
  },
  course: {
    findUnique: async ({ where }: { where: { id?: string } }) => {
      try {
        if (where.id) {
          const [course] = await sql`SELECT * FROM courses WHERE id = ${where.id}`
          return course
        }
      } catch (error) {
        console.error("Database error in course.findUnique:", error)
      }
      return null
    },
    findMany: async () => {
      try {
        return await sql`SELECT * FROM courses`
      } catch (error) {
        console.error("Database error in course.findMany:", error)
        return []
      }
    },
  },
  enrollment: {
    findMany: async ({ where }: { where: { userId?: string } }) => {
      try {
        if (where.userId) {
          return await sql`
            SELECT e.*, c.title, c.description, c.thumbnail 
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            WHERE e.user_id = ${where.userId}
          `
        }
        return await sql`SELECT * FROM enrollments`
      } catch (error) {
        console.error("Database error in enrollment.findMany:", error)
        return []
      }
    },
    create: async ({ data }: { data: any }) => {
      try {
        const [enrollment] = await sql`
          INSERT INTO enrollments (user_id, course_id, status)
          VALUES (${data.userId}, ${data.courseId}, ${data.status || "ACTIVE"})
          RETURNING *
        `
        return enrollment
      } catch (error) {
        console.error("Database error in enrollment.create:", error)
        return null
      }
    },
  },
  payment: {
    findMany: async ({ where }: { where: { userId?: string } }) => {
      try {
        if (where.userId) {
          return await sql`SELECT * FROM payments WHERE user_id = ${where.userId}`
        }
        return await sql`SELECT * FROM payments`
      } catch (error) {
        console.error("Database error in payment.findMany:", error)
        return []
      }
    },
    create: async ({ data }: { data: any }) => {
      try {
        const [payment] = await sql`
          INSERT INTO payments (user_id, course_id, amount, payment_method, status)
          VALUES (${data.userId}, ${data.courseId}, ${data.amount}, ${data.paymentMethod}, ${data.status || "PENDING"})
          RETURNING *
        `
        return payment
      } catch (error) {
        console.error("Database error in payment.create:", error)
        return null
      }
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      try {
        const setClause = Object.entries(data)
          .map(([key, value]) => `${key} = ${value}`)
          .join(", ")

        const [payment] = await sql`
          UPDATE payments SET ${sql.raw(setClause)}
          WHERE id = ${where.id}
          RETURNING *
        `
        return payment
      } catch (error) {
        console.error("Database error in payment.update:", error)
        return null
      }
    },
  },
  comment: {
    findMany: async ({ where }: { where: { courseId?: string } }) => {
      try {
        if (where.courseId) {
          return await sql`
            SELECT c.*, u.name as user_name, u.avatar as user_avatar
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.course_id = ${where.courseId}
            ORDER BY c.created_at DESC
          `
        }
        return await sql`SELECT * FROM comments`
      } catch (error) {
        console.error("Database error in comment.findMany:", error)
        return []
      }
    },
    create: async ({ data }: { data: any }) => {
      try {
        const [comment] = await sql`
          INSERT INTO comments (user_id, course_id, content, rating)
          VALUES (${data.userId}, ${data.courseId}, ${data.content}, ${data.rating || 5})
          RETURNING *
        `
        return comment
      } catch (error) {
        console.error("Database error in comment.create:", error)
        return null
      }
    },
  },
}

export default sql
