"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, DollarSign, Film, User } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "enrollment",
    title: "New Enrollment",
    description: "Student enrolled in Web Design Masterclass",
    time: "10 minutes ago",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "$94.99 via M-Pesa",
    time: "25 minutes ago",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    type: "video",
    title: "New Video Uploaded",
    description: "CSS Animations Tutorial added to Web Design course",
    time: "1 hour ago",
    icon: Film,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    type: "user",
    title: "New User Registered",
    description: "John Doe created an account",
    time: "2 hours ago",
    icon: User,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Received",
    description: "$79.99 via PayPal",
    time: "3 hours ago",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
]

export default function RecentActivities() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className={`${activity.color} p-2 rounded-full`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-xs text-slate-600">{activity.description}</p>
            </div>
            <div className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
