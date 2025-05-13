import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate request data
    if (!data.phoneNumber || !data.amount || !data.courseId) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would make an API call to M-Pesa
    // using the server-side API key (not exposed to the client)

    // For demo purposes, we'll simulate a successful response
    const transactionId = `mpesa_${Date.now()}`

    // Store the pending transaction in your database
    // ...

    return NextResponse.json({
      success: true,
      message: "M-Pesa payment initiated. Please check your phone to complete the transaction.",
      transactionId,
      checkoutUrl: null, // M-Pesa doesn't use a checkout URL
    })
  } catch (error) {
    console.error("M-Pesa payment error:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your payment" },
      { status: 500 },
    )
  }
}

// Handle M-Pesa callback
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate the callback data
    if (!data.Body || !data.Body.stkCallback) {
      return NextResponse.json({ success: false, message: "Invalid callback data" }, { status: 400 })
    }

    const callback = data.Body.stkCallback
    const resultCode = callback.ResultCode
    const transactionId = callback.CheckoutRequestID

    // In a real implementation, you would update the transaction in your database
    // and grant access to the course if the payment was successful

    if (resultCode === 0) {
      // Payment successful
      return NextResponse.json({
        success: true,
        message: "Payment successful",
        transactionId,
      })
    } else {
      // Payment failed
      return NextResponse.json({
        success: false,
        message: callback.ResultDesc || "Payment failed",
        transactionId,
      })
    }
  } catch (error) {
    console.error("M-Pesa callback error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
