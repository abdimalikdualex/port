export interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "student" | "instructor" | "admin" | "super_admin"
  avatar?: string
  bio?: string
  createdAt: string
  enrolledCourses?: string[]
  wishlist?: string[]
}

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@expressacademy.com",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // admin123
    role: "admin",
    avatar: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Super Admin",
    email: "superadmin@expressacademy.com",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // admin123
    role: "super_admin",
    avatar: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // admin123
    role: "instructor",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Senior Web Developer with over 10 years of experience",
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "4",
    name: "Student User",
    email: "student@example.com",
    password: "$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC", // admin123
    role: "student",
    avatar: "/placeholder.svg?height=200&width=200",
    createdAt: "2023-02-10T00:00:00Z",
    enrolledCourses: ["1", "3"],
    wishlist: ["2", "4"],
  },
]

export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function getEnrolledCourses(userId: string): string[] {
  const user = getUserById(userId)
  return user?.enrolledCourses || []
}

export function getWishlist(userId: string): string[] {
  const user = getUserById(userId)
  return user?.wishlist || []
}

export function addToWishlist(userId: string, courseId: string): boolean {
  const user = users.find((user) => user.id === userId)
  if (!user) return false

  if (!user.wishlist) {
    user.wishlist = []
  }

  if (!user.wishlist.includes(courseId)) {
    user.wishlist.push(courseId)
  }

  return true
}

export function removeFromWishlist(userId: string, courseId: string): boolean {
  const user = users.find((user) => user.id === userId)
  if (!user || !user.wishlist) return false

  user.wishlist = user.wishlist.filter((id) => id !== courseId)
  return true
}

export function enrollInCourse(userId: string, courseId: string): boolean {
  const user = users.find((user) => user.id === userId)
  if (!user) return false

  if (!user.enrolledCourses) {
    user.enrolledCourses = []
  }

  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses.push(courseId)
  }

  return true
}
