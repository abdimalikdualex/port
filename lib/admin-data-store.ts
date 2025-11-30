// Admin data store for managing all admin-related data with localStorage
import type { User, Transaction, Notification, ActivityLog } from "@/lib/types"

const ADMIN_STORAGE_PREFIX = "admin_"

export const adminDataStore = {
  // User Management
  users: {
    getAll: (): User[] => {
      const data = localStorage.getItem(`${ADMIN_STORAGE_PREFIX}users`)
      return data ? JSON.parse(data) : getDefaultUsers()
    },
    add: (user: User) => {
      const users = adminDataStore.users.getAll()
      users.push(user)
      localStorage.setItem(`${ADMIN_STORAGE_PREFIX}users`, JSON.stringify(users))
    },
    update: (userId: string, updates: Partial<User>) => {
      const users = adminDataStore.users.getAll()
      const index = users.findIndex((u) => u.id === userId)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates }
        localStorage.setItem(`${ADMIN_STORAGE_PREFIX}users`, JSON.stringify(users))
      }
    },
    delete: (userId: string) => {
      const users = adminDataStore.users.getAll().filter((u) => u.id !== userId)
      localStorage.setItem(`${ADMIN_STORAGE_PREFIX}users`, JSON.stringify(users))
    },
  },

  // Revenue Tracking
  transactions: {
    getAll: (): Transaction[] => {
      const data = localStorage.getItem(`${ADMIN_STORAGE_PREFIX}transactions`)
      return data ? JSON.parse(data) : getDefaultTransactions()
    },
    add: (transaction: Transaction) => {
      const transactions = adminDataStore.transactions.getAll()
      transactions.push(transaction)
      localStorage.setItem(`${ADMIN_STORAGE_PREFIX}transactions`, JSON.stringify(transactions))
    },
    getTotalRevenue: () => {
      const transactions = adminDataStore.transactions.getAll()
      return transactions.reduce((sum, t) => sum + t.amount, 0)
    },
  },

  // Activity Logging
  activityLog: {
    getAll: (): ActivityLog[] => {
      const data = localStorage.getItem(`${ADMIN_STORAGE_PREFIX}activityLog`)
      return data ? JSON.parse(data) : []
    },
    log: (action: string, details: Record<string, any>, userId?: string) => {
      const logs = adminDataStore.activityLog.getAll()
      logs.push({
        id: Date.now().toString(),
        action,
        details,
        userId,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem(`${ADMIN_STORAGE_PREFIX}activityLog`, JSON.stringify(logs))
    },
  },

  // Notifications
  notifications: {
    getAll: (): Notification[] => {
      const data = localStorage.getItem(`${ADMIN_STORAGE_PREFIX}notifications`)
      return data ? JSON.parse(data) : []
    },
    add: (notification: Notification) => {
      const notifications = adminDataStore.notifications.getAll()
      notifications.push(notification)
      localStorage.setItem(`${ADMIN_STORAGE_PREFIX}notifications`, JSON.stringify(notifications))
    },
    markAsRead: (notificationId: string) => {
      const notifications = adminDataStore.notifications.getAll()
      const index = notifications.findIndex((n) => n.id === notificationId)
      if (index !== -1) {
        notifications[index].read = true
        localStorage.setItem(`${ADMIN_STORAGE_PREFIX}notifications`, JSON.stringify(notifications))
      }
    },
  },
}

function getDefaultUsers(): User[] {
  return [
    {
      id: "user1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "student",
      status: "active",
      enrolledCourses: 3,
      createdAt: "2024-01-15",
      lastActive: "2024-12-01",
    },
    {
      id: "user2",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "instructor",
      status: "active",
      enrolledCourses: 0,
      createdAt: "2024-02-10",
      lastActive: "2024-11-28",
    },
  ]
}

function getDefaultTransactions(): Transaction[] {
  return [
    {
      id: "txn1",
      userId: "user1",
      courseId: "course1",
      amount: 49.99,
      status: "completed",
      date: "2024-11-20",
      paymentMethod: "credit_card",
    },
    {
      id: "txn2",
      userId: "user2",
      courseId: "course2",
      amount: 79.99,
      status: "completed",
      date: "2024-11-25",
      paymentMethod: "m_pesa",
    },
  ]
}
