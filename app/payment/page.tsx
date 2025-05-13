"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getCourseById } from "@/lib/data/courses"
import { hasUserPurchasedCourse } from "@/lib/data/payments"
import { CreditCard, AlertCircle } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | "paypal">("card")
  const [processing, setProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [mpesaDetails, setMpesaDetails] = useState({
    phoneNumber: "",
  })
  const [alreadyPurchased, setAlreadyPurchased] = useState(false)

  useEffect(() => {
    if (!courseId) {
      setError("No course selected for payment")
      setLoading(false)
      return
    }

    const courseData = getCourseById(courseId)
    if (!courseData) {
      setError("Course not found")
      setLoading(false)
      return
    }

    setCourse(courseData)

    // Check if user has already purchased this course
    const userInfo = localStorage.getItem("userInfo")
    if (userInfo) {
      const user = JSON.parse(userInfo)
      const purchased = hasUserPurchasedCourse(user.id, courseId)
      setAlreadyPurchased(purchased)
    }

    setLoading(false)
  }, [courseId])

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleMpesaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMpesaDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!course) return

    setProcessing(true)

    try {
      let response

      // Get user info
      const userInfo = localStorage.getItem("userInfo")
      if (!userInfo) {
        throw new Error("Please log in to make a purchase")
      }

      const user = JSON.parse(userInfo)

      switch (paymentMethod) {
        case "card":
          response = await fetch("/api/payments/stripe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentMethodId: "pm_card_visa", // In a real app, this would come from Stripe.js
              amount: course.salePrice || course.price,
              currency: "USD",
              courseId: course.id,
              userId: user.id,
              customerInfo: {
                name: user.name,
                email: user.email,
              },
            }),
          })
          break

        case "mpesa":
          response = await fetch("/api/payments/mpesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phoneNumber: mpesaDetails.phoneNumber,
              amount: course.salePrice || course.price,
              courseId: course.id,
              userId: user.id,
              customerInfo: {
                name: user.name,
                email: user.email,
              },
            }),
          })
          break

        case "paypal":
          response = await fetch("/api/payments/paypal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: course.salePrice || course.price,
              currency: "USD",
              courseId: course.id,
              userId: user.id,
              customerInfo: {
                name: user.name,
                email: user.email,
              },
            }),
          })
          break
      }

      const data = await response.json()

      if (data.success) {
        if (data.checkoutUrl) {
          // For PayPal, redirect to the checkout URL
          window.location.href = data.checkoutUrl
        } else {
          // For other payment methods, redirect to success page
          router.push(`/payment/success?courseId=${course.id}&transactionId=${data.transactionId}`)
        }
      } else {
        throw new Error(data.message || "Payment failed")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during payment processing")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/courses")}>
            Back to Courses
          </Button>
        </Alert>
      </div>
    )
  }

  if (alreadyPurchased) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Course Already Purchased</AlertTitle>
          <AlertDescription>
            You have already purchased this course. You can access it from your dashboard.
          </AlertDescription>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => router.push("/courses")}>
              Browse Courses
            </Button>
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          </div>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Purchase</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as any)}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          value={cardDetails.cardNumber}
                          onChange={handleCardInputChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={cardDetails.cardName}
                          onChange={handleCardInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={handleCardInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mpesa">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="254712345678"
                          value={mpesaDetails.phoneNumber}
                          onChange={handleMpesaInputChange}
                        />
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>How it works</AlertTitle>
                        <AlertDescription>
                          You will receive a prompt on your phone to complete the payment. Enter your M-Pesa PIN to
                          confirm.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal">
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>PayPal Checkout</AlertTitle>
                        <AlertDescription>
                          You will be redirected to PayPal to complete your payment securely.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>Pay ${course?.salePrice || course?.price}</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={course?.imageUrl || "/placeholder.svg?height=64&width=64"}
                        alt={course?.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{course?.title}</h3>
                      <p className="text-sm text-gray-500">{course?.instructor}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Original Price:</span>
                      <span>${course?.price}</span>
                    </div>

                    {course?.salePrice && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Discount:</span>
                        <span>-${(course.price - course.salePrice).toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span>${course?.salePrice || course?.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <p className="text-sm text-gray-500 mb-4">
                  By completing your purchase you agree to our{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure payment processing</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
