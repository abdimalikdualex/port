"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-md mx-auto">
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
            <h2 className="text-2xl font-bold text-amber-700 mb-2">Payment Cancelled</h2>
            <p className="text-amber-600 mb-4">
              Your payment process was cancelled. No charges have been made to your account.
            </p>
            <p className="text-sm text-amber-600">
              If you experienced any issues or have questions, please contact our support team.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/payment")} className="bg-amber-600 hover:bg-amber-700">
              Try Again
            </Button>
            <Button onClick={() => router.push("/courses")} variant="outline" className="ml-2">
              Browse Courses
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
