import sql from "./db"

export type Video = {
  id: string
  title: string
  description: string | null
  url: string
  duration: number
  order: number
  isPreview: boolean
  courseId: string
}

export async function getVideosForCourse(courseId: string): Promise<Video[]> {
  try {
    const result = await sql`
      SELECT id, title, description, url, duration, "order", "isPreview", "courseId"
      FROM "Video"
      WHERE "courseId" = ${courseId}
      ORDER BY "order" ASC
    `

    return result as Video[]
  } catch (error) {
    console.error("Error getting videos for course:", error)
    return []
  }
}

export async function getPreviewVideosForCourse(courseId: string): Promise<Video[]> {
  try {
    const result = await sql`
      SELECT id, title, description, url, duration, "order", "isPreview", "courseId"
      FROM "Video"
      WHERE "courseId" = ${courseId} AND "isPreview" = true
      ORDER BY "order" ASC
    `

    return result as Video[]
  } catch (error) {
    console.error("Error getting preview videos for course:", error)
    return []
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const result = await sql`
      SELECT id, title, description, url, duration, "order", "isPreview", "courseId"
      FROM "Video"
      WHERE id = ${id}
    `

    return result.length > 0 ? (result[0] as Video) : null
  } catch (error) {
    console.error("Error getting video by id:", error)
    return null
  }
}
