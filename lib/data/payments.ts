export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"
export type PaymentMethod = "mpesa" | "card" | "paypal"

export interface Payment {
  id: string
  userId: string
  courseId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  transactionId: string
  createdAt: string
  updatedAt: string
}

export const payments: Payment[] = [
  {
    id: "p1",
    userId: "4",
    courseId: "1",
    amount: 94.99,
    currency: "USD",
    status: "completed",
    method: "card",
    transactionId: "txn_1234567890",
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-15T10:35:00Z",
  },
  {
    id: "p2",
    userId: "4",
    courseId: "3",
    amount: 59.99,
    currency: "USD",
    status: "completed",
    method: "paypal",
    transactionId: "PAY-ABCDEFGHIJKL",
    createdAt: "2023-04-20T14:45:00Z",
    updatedAt: "2023-04-20T14:50:00Z",
  },
]

export function getPaymentsByUserId(userId: string): Payment[] {
  return payments.filter((payment) => payment.userId === userId)
}

export function getPaymentsByCourseId(courseId: string): Payment[] {
  return payments.filter((payment) => payment.courseId === courseId)
}

export function createPayment(payment: Omit<Payment, "id" | "createdAt" | "updatedAt">): Payment {
  const now = new Date().toISOString()
  const newPayment = {
    ...payment,
    id: `p${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }

  payments.push(newPayment)
  return newPayment
}

export function updatePaymentStatus(paymentId: string, status: PaymentStatus): boolean {
  const payment = payments.find((p) => p.id === paymentId)
  if (!payment) return false

  payment.status = status
  payment.updatedAt = new Date().toISOString()
  return true
}

export function hasUserPurchasedCourse(userId: string, courseId: string): boolean {
  return payments.some((p) => p.userId === userId && p.courseId === courseId && p.status === "completed")
}
