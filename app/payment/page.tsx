"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, Lock, Phone, Wallet, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import { dataStore } from "@/lib/data-store"
import { getCurrentUser, enrollUserInCourse } from "@/lib/auth-utils"

const exchangeRate = 145

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [currency, setCurrency] = useState("usd")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [allCourses, setAllCourses] = useState<any[]>([])
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    phone: "",
  })

  useEffect(() => {
    // Get current user and course from URL
    const user = getCurrentUser()
    setCurrentUser(user)

    const courseId = searchParams.get("courseId")
    const courses = dataStore.getCourses()
    setAllCourses(courses)

    if (courseId) {
      const selectedCourse = courses.find((c) => c.id === courseId)
      if (selectedCourse) {
        setCourse(selectedCourse)
        setSelectedCourseId(courseId)
      }
    } else if (courses.length > 0) {
      setCourse(courses[0])
      setSelectedCourseId(courses[0].id)
    }
  }, [searchParams])

  if (!currentUser) {
    return (
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to purchase a course.</p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentCourse = allCourses.find((c) => c.id === selectedCourseId) || course
  const priceUSD = currentCourse?.price || 79.99
  const priceKSH = Math.round(priceUSD * exchangeRate)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId)
    const selected = allCourses.find((c) => c.id === courseId)
    if (selected) {
      setCourse(selected)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "credit-card") {
      if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvc) {
        alert("Please fill in all card details")
        return
      }
    } else if (paymentMethod === "mpesa") {
      if (!formData.phone) {
        alert("Please enter your phone number")
        return
      }
    }

    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const payment = dataStore.addPayment({
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        courseId: selectedCourseId,
        courseName: currentCourse?.title || "Course",
        amount: priceUSD,
        currency: currency === "usd" ? "USD" : "KES",
        method: paymentMethod as any,
        status: "completed",
        transactionId: `TXN${Date.now()}`,
        createdAt: new Date().toISOString(),
      })

      // Enroll user in course
      enrollUserInCourse(currentUser.id, selectedCourseId)

      setPaymentSuccess(true)

      // Redirect to course after 3 seconds
      setTimeout(() => {
        router.push(`/courses/${selectedCourseId}`)
      }, 3000)
    } catch (error) {
      console.error("Payment failed:", error)
      alert("Payment processing failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for purchasing <span className="font-semibold">{currentCourse?.title}</span>. You now have full
            access to all course content.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Transaction ID:</span> TXN{Date.now()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Amount Paid:</span> ${priceUSD} (KSH {priceKSH.toLocaleString()})
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to your course in a few seconds...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-gray-600">Complete your purchase to access the course</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {allCourses.length > 1 && (
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle>Select Course</CardTitle>
                <CardDescription>Choose which course you want to purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {allCourses.map((c) => (
                    <div key={c.id} className="flex items-center space-x-2">
                      <RadioGroup value={selectedCourseId} onValueChange={handleCourseChange}>
                        <div className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                          <RadioGroupItem value={c.id} id={`course-${c.id}`} />
                          <Label
                            htmlFor={`course-${c.id}`}
                            className="flex-1 cursor-pointer flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium">{c.title}</p>
                              <p className="text-sm text-gray-500">{c.category}</p>
                            </div>
                            <p className="font-semibold text-green-600">${c.price}</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <Tabs value={currency} onValueChange={setCurrency} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="usd">USD ($)</TabsTrigger>
                    <TabsTrigger value="ksh">KSH (KES)</TabsTrigger>
                  </TabsList>
                  <TabsContent value="usd" className="pt-4">
                    <p className="mb-4 text-lg font-medium">Total: ${priceUSD}</p>
                  </TabsContent>
                  <TabsContent value="ksh" className="pt-4">
                    <p className="mb-4 text-lg font-medium">Total: KSH {priceKSH.toLocaleString()}</p>
                  </TabsContent>
                </Tabs>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex-1 cursor-pointer flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <span>M-Pesa</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit / Debit Card</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        <span>PayPal</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "mpesa" && (
                  <div className="space-y-4 p-4 border rounded-md bg-blue-50">
                    <div className="text-center mb-4">
                      <p className="font-medium">Pay with M-Pesa</p>
                      <p className="text-sm text-gray-600">Send money to the number below</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="e.g. 0712345678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Business Number</AlertTitle>
                      <AlertDescription>
                        Send {currency === "usd" ? `$${priceUSD}` : `KSH ${priceKSH}`} to 174379
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>PayPal Payment</AlertTitle>
                    <AlertDescription>
                      You will be redirected to PayPal to complete your payment securely.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isProcessing} size="lg">
                  {isProcessing ? "Processing Payment..." : "Complete Payment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card className="border-purple-200 sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourse && (
                <>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{currentCourse.title}</h3>
                    <p className="text-sm text-gray-600">{currentCourse.category}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Course Price</span>
                    <div className="text-right">
                      <div>${priceUSD}</div>
                      <div className="text-sm text-gray-600">KSH {priceKSH.toLocaleString()}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <div className="text-right">
                      <div className="text-green-600">${priceUSD}</div>
                      <div className="text-sm text-green-600">KSH {priceKSH.toLocaleString()}</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-center justify-center w-full text-sm text-gray-600">
                <Lock className="w-4 h-4 mr-2" />
                Secure payment processing
              </div>
              <p className="text-xs text-center text-gray-500">
                After payment, you'll have instant access to all course materials.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
