"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { getCourseById } from "@/lib/data/courses"
import { enrollInCourse } from "@/lib/data/users"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")
  const transactionId = searchParams.get("transactionId")

  const [course, setCourse] = useState<any>(null)

  useEffect(() => {
    if (!courseId) {
      router.push("/courses")
      return
    }

    const courseData = getCourseById(courseId)
    if (!courseData) {
      router.push("/courses")
      return
    }

    setCourse(courseData)

    // Record the enrollment
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      const user = JSON.parse(userInfo)
      enrollInCourse(user.id, courseId)
    }
  }, [courseId, router, transactionId])

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="border-green-100">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
            <CardDescription>Your enrollment is now complete</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{course?.title}</h3>
                <p className="text-sm text-gray-500">{course?.instructor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono">{transactionId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount Paid:</span>
                  <span>${course?.salePrice || course?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              Start Learning
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
