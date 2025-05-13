import sql from "./db"

export type Course = {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string | null
  category: string
  level: string
  duration: string
  lectures: number
  instructor: string
  featured: boolean
  published: boolean
}

export async function getAllCourses(): Promise<Course[]> {
  try {
    const result = await sql`
      SELECT id, title, description, price, "imageUrl", category, level, duration, lectures, instructor, featured, published
      FROM "Course"
      WHERE published = true
      ORDER BY "createdAt" DESC
    `

    return result as Course[]
  } catch (error) {
    console.error("Error getting all courses:", error)
    return []
  }
}

export async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const result = await sql`
      SELECT id, title, description, price, "imageUrl", category, level, duration, lectures, instructor, featured, published
      FROM "Course"
      WHERE published = true AND featured = true
      ORDER BY "createdAt" DESC
      LIMIT 6
    `

    return result as Course[]
  } catch (error) {
    console.error("Error getting featured courses:", error)
    return []
  }
}

export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const result = await sql`
      SELECT id, title, description, price, "imageUrl", category, level, duration, lectures, instructor, featured, published
      FROM "Course"
      WHERE id = ${id} AND published = true
    `

    return result.length > 0 ? (result[0] as Course) : null
  } catch (error) {
    console.error("Error getting course by id:", error)
    return null
  }
}

export async function searchCourses(query: string, category?: string, level?: string): Promise<Course[]> {
  try {
    let queryString = `
      SELECT id, title, description, price, "imageUrl", category, level, duration, lectures, instructor, featured, published
      FROM "Course"
      WHERE published = true AND (
        title ILIKE '%' || ${query} || '%' OR
        description ILIKE '%' || ${query} || '%'
      )
    `

    if (category) {
      queryString += ` AND category = ${category}`
    }

    if (level) {
      queryString += ` AND level = ${level}`
    }

    queryString += ` ORDER BY "createdAt" DESC`

    const result = await sql.raw(queryString)

    return result.rows as Course[]
  } catch (error) {
    console.error("Error searching courses:", error)
    return []
  }
}
