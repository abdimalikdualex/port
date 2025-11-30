"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Send, Trash2, Check } from "lucide-react"
import { adminDataStore } from "@/lib/admin-data-store"

interface Notification {
  id: string
  title: string
  message: string
  type: "alert" | "info" | "warning" | "success"
  recipient: string
  createdAt: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Course Approved",
    message: "Your Web Design course has been approved",
    type: "success",
    recipient: "All Instructors",
    createdAt: "2024-11-25",
    read: false,
  },
  {
    id: "2",
    title: "New Enrollment",
    message: "5 new students enrolled in JavaScript course",
    type: "info",
    recipient: "All Admins",
    createdAt: "2024-11-24",
    read: false,
  },
  {
    id: "3",
    title: "Payment Failed",
    message: "Failed transaction from user John Doe",
    type: "warning",
    recipient: "Finance Team",
    createdAt: "2024-11-23",
    read: true,
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("all")

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  const handleSendNotification = () => {
    if (!title.trim() || !message.trim()) return

    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type: "info",
      recipient: recipient === "all" ? "All Users" : recipient,
      createdAt: new Date().toISOString().split("T")[0],
      read: false,
    }

    setNotifications([newNotification, ...notifications])
    adminDataStore.notifications.add(newNotification)
    adminDataStore.activityLog.log("notification_sent", { title, recipient }, "admin")

    setTitle("")
    setMessage("")
    setRecipient("all")
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    adminDataStore.notifications.markAsRead(notificationId)
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId))
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-600 mt-1">Send and manage system notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Notification Form */}
        <Card className="border-0 shadow-md lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Send Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <Input placeholder="Notification title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Notification message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Send To</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="instructors">Instructors Only</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>

            <Button onClick={handleSendNotification} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 flex items-start justify-between ${
                    notification.type === "success"
                      ? "border-l-green-500 bg-green-50"
                      : notification.type === "warning"
                        ? "border-l-yellow-500 bg-yellow-50"
                        : "border-l-indigo-500 bg-indigo-50"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                      <span>{notification.recipient}</span>
                      <span>•</span>
                      <span>{notification.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-green-600 hover:bg-green-100"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
