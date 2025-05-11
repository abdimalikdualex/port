import { type NextRequest, NextResponse } from "next/server"

// Handle M-Pesa callback
export async function POST(request: NextRequest) {
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

// Handle PayPal payment verification
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const paymentId = searchParams.get("paymentId")
    const payerId = searchParams.get("PayerID")

    if (!paymentId || !payerId) {
      return NextResponse.json({ success: false, message: "Missing payment information" }, { status: 400 })
    }

    // In a real implementation, you would verify the payment with PayPal
    // and grant access to the course if the payment was successful

    return NextResponse.json({
      success: true,
      message: "Payment successful",
      transactionId: paymentId,
    })
  } catch (error) {
    console.error("PayPal verification error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
