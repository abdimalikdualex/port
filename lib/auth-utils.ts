// Authentication and enrollment utilities for payment gating

export interface AuthUser {
  id: string
  name: string
  email: string
}

// Get current logged-in user from localStorage
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem("current_user")
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch {
    return null
  }
}

// Check if user has purchased a course
export function hasUserPurchasedCourse(userId: string, courseId: string): boolean {
  if (typeof window === "undefined") return false

  const paymentsJson = localStorage.getItem("elearning_payments")
  if (!paymentsJson) return false

  try {
    const payments = JSON.parse(paymentsJson)
    return payments.some((p: any) => p.studentId === userId && p.courseId === courseId && p.status === "completed")
  } catch {
    return false
  }
}

// Enroll user in course
export function enrollUserInCourse(userId: string, courseId: string): boolean {
  if (typeof window === "undefined") return false

  try {
    const studentsJson = localStorage.getItem("elearning_students")
    if (!studentsJson) return false

    const students = JSON.parse(studentsJson)
    const studentIndex = students.findIndex((s: any) => s.id === userId)

    if (studentIndex === -1) return false

    // Add course to enrolled courses if not already there
    if (!students[studentIndex].enrolledCourses.includes(courseId)) {
      students[studentIndex].enrolledCourses.push(courseId)
      students[studentIndex].lastActive = new Date().toISOString()
      localStorage.setItem("elearning_students", JSON.stringify(students))
    }

    return true
  } catch {
    return false
  }
}

// Get user's enrolled courses
export function getUserEnrolledCourses(userId: string): string[] {
  if (typeof window === "undefined") return []

  try {
    const studentsJson = localStorage.getItem("elearning_students")
    if (!studentsJson) return []

    const students = JSON.parse(studentsJson)
    const student = students.find((s: any) => s.id === userId)

    return student?.enrolledCourses || []
  } catch {
    return []
  }
}
