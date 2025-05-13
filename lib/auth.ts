import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Mock user for development when database is not available
const MOCK_USER = {
  id: "mock-user-id",
  name: "Demo User",
  email: "demo@example.com",
  role: "USER",
  avatar: "/placeholder.svg?height=100&width=100",
}

// Function to get the JWT secret
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error("JWT_SECRET environment variable is not set")
    return new TextEncoder().encode("fallback-secret-for-development-only")
  }
  return new TextEncoder().encode(secret)
}

// Function to create a JWT token
export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getJwtSecret())
}

// Function to verify a JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return payload
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Function to get the session
export async function getSession() {
  const token = cookies().get("token")?.value
  if (!token) return null
  return await verifyToken(token)
}

// Function to update the session (used in middleware)
export async function updateSession(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) return

    // Refresh the session so it doesn't expire
    const parsed = await verifyToken(token)
    if (!parsed) return

    const session = await createToken(parsed)
    const response = NextResponse.next()
    response.cookies.set({
      name: "token",
      value: session,
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    console.error("Error updating session:", error)
    return NextResponse.next()
  }
}

// Function to login a user
export async function login(formData: FormData) {
  try {
    // Get email and password from form
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // For demo purposes, we'll use hardcoded credentials
    if (email === "admin@expressacademy.com" && password === "admin123") {
      const token = await createToken({
        id: "1",
        email,
        role: "ADMIN",
      })

      cookies().set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })

      return { success: true }
    }

    return { success: false, error: "Invalid credentials" }
  } catch (error) {
    console.error("Error in login:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

// Function to logout a user
export async function logout() {
  cookies().set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  })
}

// Function to get the authenticated user
export async function getAuthUser() {
  try {
    // Get the session
    const session = await getSession()
    if (!session || !session.id) {
      return null
    }

    // Get the user from the database
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.id as string },
      })

      if (!user) {
        return process.env.NODE_ENV === "development" ? MOCK_USER : null
      }

      // Remove sensitive information
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    } catch (dbError) {
      console.error("Database error in getAuthUser:", dbError)
      // Return mock user in development environment when database is not available
      return process.env.NODE_ENV === "development" ? MOCK_USER : null
    }
  } catch (error) {
    console.error("Error in getAuthUser:", error)
    return null
  }
}

// Function to check if the user has admin privileges
export async function isAdmin() {
  const user = await getAuthUser()
  return user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
}

// Function to check if the user has super admin privileges
export async function isSuperAdmin() {
  const user = await getAuthUser()
  return user?.role === "SUPER_ADMIN"
}
