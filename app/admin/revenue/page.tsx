"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Users, FileText } from "lucide-react"
import { adminDataStore } from "@/lib/admin-data-store"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const revenueData = [
  { month: "January", revenue: 4000, expenses: 2400, profit: 1600 },
  { month: "February", revenue: 5200, expenses: 2210, profit: 2990 },
  { month: "March", revenue: 6800, expenses: 2290, profit: 4510 },
  { month: "April", revenue: 8900, expenses: 2000, profit: 6900 },
  { month: "May", revenue: 11000, expenses: 2181, profit: 8819 },
  { month: "June", revenue: 12500, expenses: 2500, profit: 10000 },
]

const payoutData = [
  { instructor: "Sarah Johnson", amount: 2400, courses: 3, status: "paid" },
  { instructor: "Mike Davis", amount: 1800, courses: 2, status: "pending" },
  { instructor: "Emily Chen", amount: 1200, courses: 1, status: "pending" },
]

export default function RevenueManagement() {
  const router = useRouter()
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }

    const revenue = adminDataStore.transactions.getTotalRevenue()
    setTotalRevenue(revenue)
  }, [router])

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Revenue & Payment Management</h1>
        <p className="text-slate-600 mt-1">Track platform revenue, instructor payouts, and financial reports</p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-600 bg-green-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Instructor Payouts</p>
                <p className="text-3xl font-bold text-slate-900">$5,400</p>
              </div>
              <Users className="w-12 h-12 text-purple-600 bg-purple-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Platform Profit</p>
                <p className="text-3xl font-bold text-slate-900">${(totalRevenue * 0.25).toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-indigo-600 bg-indigo-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Transactions</p>
                <p className="text-3xl font-bold text-slate-900">24</p>
              </div>
              <FileText className="w-12 h-12 text-blue-600 bg-blue-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Revenue Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
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
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
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
                <Bar dataKey="revenue" fill="#6366f1" />
                <Bar dataKey="expenses" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Instructor Payouts */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Instructor Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Instructor</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Courses</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {payoutData.map((payout, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{payout.instructor}</td>
                    <td className="py-3 px-4">{payout.courses}</td>
                    <td className="py-3 px-4 font-bold text-green-600">${payout.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          payout.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {payout.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
