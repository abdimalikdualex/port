"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Lock, Phone, Wallet } from "lucide-react"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

export default function PaymentPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [currency, setCurrency] = useState("usd")

  // Course price in USD
  const priceUSD = 79.99
  // Calculate KSH price
  const priceKSH = Math.round(priceUSD * exchangeRate)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard")
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
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
                    <p className="mb-4 text-lg font-medium">Total: KSH {priceKSH}</p>
                  </TabsContent>
                </Tabs>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                      M-Pesa
                    </Label>
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      Credit / Debit Card
                    </Label>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </Label>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                </RadioGroup>

                {paymentMethod === "mpesa" && (
                  <div className="space-y-4 p-4 border rounded-md">
                    <div className="text-center mb-4">
                      <p className="font-medium">Pay with M-Pesa</p>
                      <p className="text-sm text-muted-foreground">Send money to the number below</p>
                    </div>
                    <div className="flex justify-center mb-4">
                      <Image src="/placeholder.svg?height=100&width=100" alt="M-Pesa Logo" width={80} height={80} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="e.g. 07XX XXX XXX" required />
                    </div>
                    <div className="p-3 bg-muted rounded-md text-center">
                      <p className="font-medium">Business Number: 123456</p>
                      <p className="text-sm text-muted-foreground">
                        Amount: {currency === "usd" ? `$${priceUSD}` : `KSH ${priceKSH}`}
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="p-4 text-center bg-muted rounded-md">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Complete Payment"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Web Design Masterclass</span>
                <div className="text-right">
                  <div>${priceUSD}</div>
                  <div className="text-sm text-muted-foreground">KSH {priceKSH}</div>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <div className="text-right">
                  <div className="text-green-600">-$10.00</div>
                  <div className="text-sm text-green-600">-KSH {10 * exchangeRate}</div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <div className="text-right">
                  <div>${priceUSD - 10}</div>
                  <div className="text-sm text-muted-foreground">KSH {priceKSH - 10 * exchangeRate}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex items-center justify-center w-full text-sm text-muted-foreground">
                <Lock className="w-4 h-4 mr-2" />
                Secure payment processing
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
