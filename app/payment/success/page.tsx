"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { verifyTransaction } from "@/lib/payment-service"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState("Verifying your payment...")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get("paymentId")
        const payerId = searchParams.get("PayerID")

        if (!paymentId) {
          setMessage("Payment information is missing. Please try again.")
          setIsSuccess(false)
          setIsVerifying(false)
          return
        }

        // Verify the payment with PayPal
        const result = await verifyTransaction(paymentId, "paypal")

        if (result.success) {
          setIsSuccess(true)
          setMessage("Payment successful! You now have access to the course.")

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          setIsSuccess(false)
          setMessage(result.message || "Payment verification failed. Please contact support.")
        }
      } catch (error) {
        console.error("Payment verification error:", error)
        setIsSuccess(false)
        setMessage("An error occurred while verifying your payment. Please contact support.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [router, searchParams])

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-md mx-auto">
        <Card className={isSuccess ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}>
          <CardContent className="pt-6 text-center">
            {isVerifying ? (
              <>
                <Loader2 className="w-16 h-16 mx-auto mb-4 text-indigo-500 animate-spin" />
                <h2 className="text-2xl font-bold mb-2">Verifying Payment</h2>
                <p className="text-muted-foreground">Please wait while we verify your payment...</p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
                <p className="text-green-600 mb-4">{message}</p>
                <p className="text-sm text-green-600">Redirecting to your dashboard...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-2xl text-amber-600">!</span>
                </div>
                <h2 className="text-2xl font-bold text-amber-700 mb-2">Payment Verification Issue</h2>
                <p className="text-amber-600 mb-4">{message}</p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!isVerifying && !isSuccess && (
              <Button onClick={() => router.push("/payment")} className="bg-amber-600 hover:bg-amber-700">
                Try Again
              </Button>
            )}
            {!isVerifying && (
              <Button onClick={() => router.push("/dashboard")} variant="outline" className="ml-2">
                Go to Dashboard
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
