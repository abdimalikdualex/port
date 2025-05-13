import sql from "./db"

export type Material = {
  id: string
  title: string
  description: string | null
  fileUrl: string
  fileType: string
  courseId: string
}

export async function getMaterialsForCourse(courseId: string): Promise<Material[]> {
  try {
    const result = await sql`
      SELECT id, title, description, "fileUrl", "fileType", "courseId"
      FROM "Material"
      WHERE "courseId" = ${courseId}
      ORDER BY title ASC
    `

    return result as Material[]
  } catch (error) {
    console.error("Error getting materials for course:", error)
    return []
  }
}

export async function getMaterialById(id: string): Promise<Material | null> {
  try {
    const result = await sql`
      SELECT id, title, description, "fileUrl", "fileType", "courseId"
      FROM "Material"
      WHERE id = ${id}
    `

    return result.length > 0 ? (result[0] as Material) : null
  } catch (error) {
    console.error("Error getting material by id:", error)
    return null
  }
}
