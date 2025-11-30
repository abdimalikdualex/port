"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", users: 400, revenue: 2400, courses: 5 },
  { month: "Feb", users: 520, revenue: 2210, courses: 6 },
  { month: "Mar", users: 680, revenue: 2290, courses: 7 },
  { month: "Apr", users: 890, revenue: 2000, courses: 8 },
  { month: "May", users: 1100, revenue: 2181, courses: 9 },
  { month: "Jun", users: 1280, revenue: 2500, courses: 10 },
]

export default function AnalyticsChart() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>Monthly growth trends across key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
