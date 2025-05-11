"\"use client"

// Re-export client-side functions from payment-verification
import { hasAccessToCourse as clientHasAccessToCourse } from "./payment-verification"
export { hasAccessToCourse } from "./payment-verification"

// Import server actions
import { verifyTransaction as serverVerifyTransaction } from "../app/actions/payment-actions"

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
  return clientHasAccessToCourse(courseId)
}
