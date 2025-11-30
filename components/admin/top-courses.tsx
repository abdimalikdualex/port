"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const topCoursesData = [
  { name: "Web Design", students: 324, revenue: 15976 },
  { name: "JavaScript Pro", students: 291, revenue: 14509 },
  { name: "Python Basics", students: 287, revenue: 14293 },
  { name: "UI/UX Design", students: 245, revenue: 12245 },
]

export default function TopCourses() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Top Performing Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={topCoursesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Bar dataKey="students" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>

        <div className="space-y-3">
          {topCoursesData.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{course.name}</p>
                <p className="text-xs text-slate-600">{course.students} students</p>
              </div>
              <Badge variant="secondary">${course.revenue.toLocaleString()}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
