"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { processPayment, type PaymentMethod, type PaymentStatus } from "@/app/actions/payment-actions"
import { motion } from "framer-motion"
import { Loader2, CheckCircle2, AlertCircle, CreditCard, Phone, Wallet, Lock } from "lucide-react"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

// List of countries
const countries = [
  "Somalia",
  "Kenya",
  "Ethiopia",
  "Uganda",
  "Tanzania",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
]

export default function PaymentPage() {
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa")
  const [currency, setCurrency] = useState("USD")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Somalia",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    mpesaNumber: "",
    paypalEmail: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending")
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [paypalRedirectUrl, setPaypalRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    // Get course data from localStorage
    try {
      const courseData = localStorage.getItem("enrollCourse")
      if (courseData) {
        setCourse(JSON.parse(courseData))
      } else {
        // No course data, redirect to courses page
        router.push("/courses")
      }

      // Get user data if available
      const userData = localStorage.getItem("userData")
      if (userData) {
        const parsedUserData = JSON.parse(userData)
        setFormData((prev) => ({
          ...prev,
          firstName: parsedUserData.firstName || "",
          lastName: parsedUserData.lastName || "",
          email: parsedUserData.email || "",
          phone: parsedUserData.phone || "",
          country: parsedUserData.country || "Somalia",
          mpesaNumber: parsedUserData.phone || "",
        }))
      }
    } catch (error) {
      console.error("Error loading course data:", error)
      toast({
        title: "Error",
        description: "Failed to load course data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Common fields
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.country) newErrors.country = "Country is required"

    // Payment method specific validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required"
      if (!formData.cardCvc.trim()) newErrors.cardCvc = "CVC is required"
    } else if (paymentMethod === "mpesa") {
      if (!formData.mpesaNumber.trim()) newErrors.mpesaNumber = "M-Pesa number is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    } else if (paymentMethod === "paypal") {
      if (!formData.email.trim()) newErrors.email = "Email is required for PayPal"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Payment form submitted")

    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    if (!course) {
      toast({
        title: "Error",
        description: "Course information is missing. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setPaymentStatus("processing")

    try {
      // Save user data for future use
      localStorage.setItem(
        "userData",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
        }),
      )

      // Generate a unique user ID (in a real app, this would be from authentication)
      const userId = `user_${Date.now()}`

      // Prepare payment details based on method
      let paymentDetails = {}
      if (paymentMethod === "mpesa") {
        paymentDetails = {
          phoneNumber: formData.mpesaNumber,
        }
      } else if (paymentMethod === "card") {
        paymentDetails = {
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvc: formData.cardCvc,
          // In a real implementation, you would use a secure payment form
          // that returns a payment method ID, not the actual card details
          paymentMethodId: "pm_card_visa", // Simulated payment method ID
        }
      } else if (paymentMethod === "paypal") {
        paymentDetails = {
          email: formData.email,
        }
      }

      // Calculate price based on currency
      const amount = currency === "USD" ? course.price : course.price * exchangeRate

      // Process payment using server action
      const paymentResponse = await processPayment({
        amount,
        currency,
        method: paymentMethod,
        courseId: course.id,
        userId,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
        },
        paymentDetails,
      })

      console.log("Payment response:", paymentResponse)

      if (paymentResponse.success) {
        setTransactionId(paymentResponse.transactionId || null)
        setPaymentStatus(paymentResponse.status)

        // For PayPal, redirect to PayPal for payment completion
        if (paymentMethod === "paypal" && paymentResponse.gatewayResponse?.approvalUrl) {
          setPaypalRedirectUrl(paymentResponse.gatewayResponse.approvalUrl)
          window.location.href = paymentResponse.gatewayResponse.approvalUrl
          return
        }

        // For M-Pesa, show instructions
        if (paymentMethod === "mpesa") {
          toast({
            title: "M-Pesa Payment Initiated",
            description: "Please check your phone and complete the payment.",
          })

          // Record the purchase in local storage
          localStorage.setItem(
            "purchasedCourses",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("purchasedCourses") || "[]"),
              {
                id: course.id,
                purchaseDate: new Date().toISOString(),
              },
            ]),
          )

          // In a real implementation, you would poll for payment status
          // For demo, we'll simulate a successful payment after 5 seconds
          setTimeout(() => {
            setPaymentStatus("completed")
            // Redirect to dashboard after a short delay
            setTimeout(() => {
              router.push("/dashboard")
            }, 2000)
          }, 5000)
          return
        }

        // For card payments that are immediately successful
        if (paymentResponse.status === "completed") {
          // Record the purchase in local storage
          localStorage.setItem(
            "purchasedCourses",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("purchasedCourses") || "[]"),
              {
                id: course.id,
                purchaseDate: new Date().toISOString(),
              },
            ]),
          )

          toast({
            title: "Payment Successful",
            description: `You have successfully enrolled in ${course.title}`,
          })

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        }
      } else {
        setPaymentStatus("failed")
        toast({
          title: "Payment Failed",
          description: paymentResponse.message || "There was an error processing your payment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
            <CardDescription>We couldn't find the course you're trying to enroll in.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/courses")}>Browse Courses</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Calculate prices
  const priceUSD = course.price || 79.99
  const priceKSH = Math.round(priceUSD * exchangeRate)
  const totalPrice = currency === "USD" ? priceUSD : priceKSH
  const currencySymbol = currency === "USD" ? "$" : "KSH"

  return (
    <div className="container px-4 py-12 mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Secure Checkout</h1>

        {paymentStatus === "completed" ? (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
                <p className="text-green-600 mb-4">
                  Thank you for your payment. You now have full access to the course.
                </p>
                <p className="text-sm text-green-600 mb-6">Transaction ID: {transactionId || "N/A"}</p>
                <Button onClick={() => router.push("/dashboard")} className="bg-green-600 hover:bg-green-700">
                  Go to My Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Please fill in your details to complete the enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => handleSelectChange("country", value)}
                        >
                          <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="currency" className="text-sm">
                            Currency:
                          </Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="KSH">KSH</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Tabs
                        defaultValue={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="mpesa" className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            M-Pesa
                          </TabsTrigger>
                          <TabsTrigger value="card" className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Card
                          </TabsTrigger>
                          <TabsTrigger value="paypal" className="flex items-center gap-2">
                            <Wallet className="w-4 h-4" />
                            PayPal
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="mpesa" className="space-y-4 pt-4">
                          <div className="flex items-center justify-center mb-4">
                            <Image
                              src="/placeholder.svg?height=60&width=120"
                              alt="M-Pesa Logo"
                              width={120}
                              height={60}
                              className="object-contain"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                            <Input
                              id="mpesaNumber"
                              name="mpesaNumber"
                              value={formData.mpesaNumber}
                              onChange={handleInputChange}
                              placeholder="Enter your M-Pesa number"
                              className={errors.mpesaNumber ? "border-red-500" : ""}
                            />
                            {errors.mpesaNumber && <p className="text-sm text-red-500">{errors.mpesaNumber}</p>}
                          </div>
                          <div className="p-4 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700">
                              You will receive an M-Pesa prompt on your phone to complete the payment. Please ensure
                              your phone is on and has sufficient balance.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="card" className="space-y-4 pt-4">
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <Image
                              src="/placeholder.svg?height=40&width=60"
                              alt="Visa"
                              width={60}
                              height={40}
                              className="object-contain"
                            />
                            <Image
                              src="/placeholder.svg?height=40&width=60"
                              alt="Mastercard"
                              width={60}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              className={errors.cardNumber ? "border-red-500" : ""}
                            />
                            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiry Date</Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className={errors.cardExpiry ? "border-red-500" : ""}
                              />
                              {errors.cardExpiry && <p className="text-sm text-red-500">{errors.cardExpiry}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvc">CVC</Label>
                              <Input
                                id="cardCvc"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="123"
                                className={errors.cardCvc ? "border-red-500" : ""}
                              />
                              {errors.cardCvc && <p className="text-sm text-red-500">{errors.cardCvc}</p>}
                            </div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700">
                              Your card information is secure and encrypted. We do not store your card details.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="paypal" className="space-y-4 pt-4">
                          <div className="flex items-center justify-center mb-4">
                            <Image
                              src="/placeholder.svg?height=60&width=120"
                              alt="PayPal Logo"
                              width={120}
                              height={60}
                              className="object-contain"
                            />
                          </div>
                          <div className="p-4 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700">
                              You will be redirected to PayPal to complete your payment securely. After payment, you
                              will be returned to our site.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing Payment...
                          </>
                        ) : paymentStatus === "failed" ? (
                          <>
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Try Again
                          </>
                        ) : (
                          `Pay ${currencySymbol}${totalPrice}`
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="w-4 h-4" />
                        Secure payment processing
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">By {course.instructor?.name || "Instructor"}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Price</span>
                      <div>
                        <div>${priceUSD}</div>
                        <div className="text-sm text-muted-foreground">KSH {priceKSH}</div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 font-bold">
                      <span>Total</span>
                      <div>
                        <div>${priceUSD}</div>
                        <div className="text-sm text-muted-foreground">KSH {priceKSH}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">What's included:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✓</span>
                        Full lifetime access
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✓</span>
                        Access on mobile and desktop
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✓</span>
                        Certificate of completion
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-indigo-600">✓</span>
                        All course materials and resources
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4">
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-amber-800 mb-2">Secure Payment Guarantee</h3>
                    <p className="text-sm text-amber-700">
                      Your payment is secure and you will get immediate access to the course after payment is confirmed.
                      All transactions are encrypted and protected.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
