"use server"

import { revalidatePath } from "next/cache"

// Payment status types
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

// Payment method types
export type PaymentMethod = "mpesa" | "card" | "paypal"

// Payment response interface
export interface PaymentResponse {
  success: boolean
  transactionId?: string
  status: PaymentStatus
  message: string
  gatewayResponse?: any
}

// Payment request interface
export interface PaymentRequest {
  amount: number
  currency: string
  method: PaymentMethod
  courseId: string | number
  userId: string
  customerInfo: {
    name: string
    email: string
    phone?: string
    country?: string
  }
  paymentDetails: any
}

// Process M-Pesa payment
export async function processMpesaPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Prepare M-Pesa specific payload
    const payload = {
      phoneNumber: request.paymentDetails.phoneNumber,
      amount: request.amount,
      reference: `COURSE-${request.courseId}`,
      description: `Payment for course #${request.courseId}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/payments/mpesa-callback`,
    }

    // In a real implementation, you would make an API call to M-Pesa
    // using the server-side API key (not exposed to the client)
    // const response = await fetch(PAYMENT_APIS.mpesa, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.MPESA_API_KEY}`,
    //   },
    //   body: JSON.stringify(payload),
    // })

    // For demo purposes, we'll simulate a successful response
    const simulatedResponse = {
      ok: true,
      json: async () => ({
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        CheckoutRequestID: `mpesa_${Date.now()}`,
      }),
    }

    const data = await simulatedResponse.json()

    // Check if the request was successful
    if (simulatedResponse.ok && data.ResponseCode === "0") {
      // Store transaction in database (in a real app)
      // For demo, we'll use a simulated transaction ID
      const transactionId = data.CheckoutRequestID

      return {
        success: true,
        transactionId,
        status: "pending",
        message: "M-Pesa payment initiated. Please check your phone to complete the transaction.",
        gatewayResponse: data,
      }
    }

    return {
      success: false,
      status: "failed",
      message: data.ResponseDescription || "M-Pesa payment failed. Please try again.",
      gatewayResponse: data,
    }
  } catch (error) {
    console.error("M-Pesa payment error:", error)
    return {
      success: false,
      status: "failed",
      message: "An error occurred while processing your M-Pesa payment. Please try again.",
    }
  }
}

// Process credit card payment via Stripe
export async function processCardPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Prepare Stripe specific payload
    const payload = {
      amount: Math.round(request.amount * 100), // Stripe requires amount in cents
      currency: request.currency.toLowerCase(),
      payment_method: request.paymentDetails.paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      description: `Payment for course #${request.courseId}`,
      metadata: {
        courseId: request.courseId,
        userId: request.userId,
      },
      receipt_email: request.customerInfo.email,
    }

    // In a real implementation, you would make an API call to Stripe
    // using the server-side API key (not exposed to the client)
    // const response = await fetch(PAYMENT_APIS.stripe, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    //   },
    //   body: JSON.stringify(payload),
    // })

    // For demo purposes, we'll simulate a successful response
    const simulatedResponse = {
      ok: true,
      json: async () => ({
        id: `stripe_${Date.now()}`,
        status: "succeeded",
        amount: payload.amount,
        currency: payload.currency,
      }),
    }

    const data = await simulatedResponse.json()

    // Check if the request was successful
    if (simulatedResponse.ok && data.status === "succeeded") {
      // Store transaction in database (in a real app)
      // For demo, we'll use a simulated transaction ID
      const transactionId = data.id

      return {
        success: true,
        transactionId,
        status: "completed",
        message: "Payment successful! You now have access to the course.",
        gatewayResponse: data,
      }
    }

    return {
      success: false,
      status: "failed",
      message: data.error?.message || "Payment failed. Please try again.",
      gatewayResponse: data,
    }
  } catch (error) {
    console.error("Card payment error:", error)
    return {
      success: false,
      status: "failed",
      message: "An error occurred while processing your card payment. Please try again.",
    }
  }
}

// Process PayPal payment
export async function processPaypalPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Prepare PayPal specific payload
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: request.currency,
            value: request.amount.toString(),
          },
          description: `Payment for course #${request.courseId}`,
          custom_id: `COURSE-${request.courseId}-USER-${request.userId}`,
        },
      ],
      application_context: {
        brand_name: "E-Learning Platform",
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/payment/cancel`,
      },
    }

    // In a real implementation, you would make an API call to PayPal
    // using the server-side API key (not exposed to the client)
    // const response = await fetch(PAYMENT_APIS.paypal, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
    //   },
    //   body: JSON.stringify(payload),
    // })

    // For demo purposes, we'll simulate a successful response
    const simulatedResponse = {
      ok: true,
      json: async () => ({
        id: `paypal_${Date.now()}`,
        status: "CREATED",
        links: [
          {
            rel: "approve",
            href: "https://www.sandbox.paypal.com/checkoutnow?token=12345",
          },
        ],
      }),
    }

    const data = await simulatedResponse.json()

    // Check if the request was successful
    if (simulatedResponse.ok && data.status === "CREATED") {
      // Store transaction in database (in a real app)
      // For demo, we'll use a simulated transaction ID
      const transactionId = data.id

      // Find the approval URL
      const approvalUrl = data.links.find((link: any) => link.rel === "approve").href

      return {
        success: true,
        transactionId,
        status: "pending",
        message: "Please complete your payment on PayPal.",
        gatewayResponse: { ...data, approvalUrl },
      }
    }

    return {
      success: false,
      status: "failed",
      message: data.message || "PayPal payment initiation failed. Please try again.",
      gatewayResponse: data,
    }
  } catch (error) {
    console.error("PayPal payment error:", error)
    return {
      success: false,
      status: "failed",
      message: "An error occurred while processing your PayPal payment. Please try again.",
    }
  }
}

// Process payment based on method
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  switch (request.method) {
    case "mpesa":
      return processMpesaPayment(request)
    case "card":
      return processCardPayment(request)
    case "paypal":
      return processPaypalPayment(request)
    default:
      return {
        success: false,
        status: "failed",
        message: "Invalid payment method.",
      }
  }
}

// Record a course purchase in local storage
export async function recordCoursePurchase(course: any, userId: string): Promise<void> {
  try {
    // In a real app, this would be a database operation
    // For demo purposes, we'll use localStorage on the client side

    // This function is called from the client, so we'll return the data
    // that the client needs to update its local storage

    // Revalidate the dashboard path to reflect the new purchase
    revalidatePath("/dashboard")

    return
  } catch (error) {
    console.error("Error recording course purchase:", error)
    throw new Error("Failed to record course purchase")
  }
}

// Verify transaction status
export async function verifyTransaction(transactionId: string, method: PaymentMethod): Promise<PaymentResponse> {
  try {
    // In a real implementation, you would make an API call to the payment gateway
    // to check the status of the transaction using server-side API keys

    // For demo purposes, we'll simulate a successful verification
    return {
      success: true,
      transactionId,
      status: "completed",
      message: "Payment verified successfully. You now have access to the course.",
    }
  } catch (error) {
    console.error("Transaction verification error:", error)
    return {
      success: false,
      status: "failed",
      message: "An error occurred while verifying your payment. Please contact support.",
    }
  }
}
