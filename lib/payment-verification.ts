"use client"

// Utility functions to verify payment status and course access

// Check if a user has purchased a specific course
export function hasAccessToCourse(courseId: string | number): boolean {
  try {
    // Get purchased courses from localStorage
    const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")

    // Check if the course exists in the purchased courses
    return purchasedCourses.some((course: any) => course.id.toString() === courseId.toString())
  } catch (error) {
    console.error("Error checking course access:", error)
    return false
  }
}

// Record a course purchase
export function recordCoursePurchase(course: any): void {
  try {
    // Get current purchased courses
    const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")

    // Add the new course if it doesn't already exist
    if (!purchasedCourses.some((c: any) => c.id.toString() === course.id.toString())) {
      purchasedCourses.push({
        id: course.id,
        title: course.title,
        purchaseDate: new Date().toISOString(),
        expiryDate: null, // null means lifetime access
        price: course.price,
      })

      // Save updated purchased courses
      localStorage.setItem("purchasedCourses", JSON.stringify(purchasedCourses))
    }
  } catch (error) {
    console.error("Error recording course purchase:", error)
  }
}

// Get all purchased courses
export function getPurchasedCourses(): any[] {
  try {
    return JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
  } catch (error) {
    console.error("Error getting purchased courses:", error)
    return []
  }
}

// Check if user is authenticated
export function isUserAuthenticated(): boolean {
  try {
    const userSession = localStorage.getItem("userSession")
    return !!userSession
  } catch (error) {
    console.error("Error checking authentication status:", error)
    return false
  }
}
