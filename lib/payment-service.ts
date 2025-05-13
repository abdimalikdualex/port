"use client"

// The import from "./payment-verification" is causing the error
// Let's fix it by creating the file and updating the import

// Import server actions
import { verifyTransaction as serverVerifyTransaction } from "../app/actions/payment-actions"

// Client-side functions for payment verification
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

// Client-side wrapper for verifyTransaction
export async function verifyTransaction(transactionId: string, method: string): Promise<any> {
  try {
    // Call the server action
    return await serverVerifyTransaction(transactionId, method as any)
  } catch (error) {
    console.error("Error verifying transaction:", error)
    return {
      success: false,
      status: "failed",
      message: "An error occurred while verifying your payment. Please try again.",
    }
  }
}

// Export other functions that might be needed
export function isPaymentVerified(courseId: string | number): boolean {
  return hasAccessToCourse(courseId)
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
