export interface User {
  id: string
  name: string
  email: string
  role: "student" | "instructor" | "admin" | "super_admin"
  status: "active" | "suspended" | "pending"
  enrolledCourses: number
  createdAt: string
  lastActive: string
  phone?: string
  avatar?: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  category: string
  instructor: string
  status: "active" | "pending" | "archived"
  students: number
  rating: number
  createdAt: string
  modules: number
}

export interface Instructor {
  id: string
  name: string
  email: string
  courses: number
  earnings: number
  rating: number
  status: "approved" | "pending" | "rejected"
  joinDate: string
}

export interface Transaction {
  id: string
  userId: string
  courseId: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  paymentMethod: "credit_card" | "m_pesa" | "paypal"
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "alert" | "info" | "warning" | "success"
  read: boolean
  createdAt: string
  recipient?: string
}

export interface ActivityLog {
  id: string
  action: string
  details: Record<string, any>
  userId?: string
  timestamp: string
}
