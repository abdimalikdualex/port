import sql from "./db"
import { compare, hash } from "bcryptjs"

export type User = {
  id: string
  name: string
  email: string
  role: "STUDENT" | "ADMIN" | "SUPER_ADMIN"
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, name, email, role 
      FROM "User" 
      WHERE email = ${email}
    `

    return result.length > 0 ? (result[0] as User) : null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
  try {
    return await compare(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

export async function getUserWithPassword(email: string): Promise<{ user: User; hashedPassword: string } | null> {
  try {
    const result = await sql`
      SELECT id, name, email, role, "hashedPassword"
      FROM "User" 
      WHERE email = ${email}
    `

    if (result.length === 0) return null

    const { hashedPassword, ...user } = result[0] as User & { hashedPassword: string }
    return { user, hashedPassword }
  } catch (error) {
    console.error("Error getting user with password:", error)
    return null
  }
}

export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  try {
    const hashedPassword = await hash(password, 10)

    const result = await sql`
      INSERT INTO "User" (id, name, email, "hashedPassword", role, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword}, 'STUDENT', NOW(), NOW())
      RETURNING id, name, email, role
    `

    return result.length > 0 ? (result[0] as User) : null
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}
