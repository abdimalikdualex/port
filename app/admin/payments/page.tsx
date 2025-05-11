"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart3, CreditCard, Download, Phone, Search, Wallet } from "lucide-react"
import AdminRevenueChart from "@/components/admin/admin-revenue-chart"

// Exchange rate (1 USD to KSH)
const exchangeRate = 130

// Mock data for payments
const mockPayments = [
  {
    id: "PAY-1001",
    student: "John Doe",
    course: "Web Design Masterclass",
    amount: 94.99,
    method: "M-Pesa",
    status: "completed",
    date: "2023-03-08T10:30:00Z",
  },
  {
    id: "PAY-1002",
    student: "Jane Smith",
    course: "Advanced English for Professionals",
    amount: 89.99,
    method: "Credit Card",
    status: "completed",
    date: "2023-03-07T14:45:00Z",
  },
  {
    id: "PAY-1003",
    student: "Ahmed Hassan",
    course: "Kiswahili for Beginners",
    amount: 79.99,
    method: "PayPal",
    status: "completed",
    date: "2023-03-06T09:15:00Z",
  },
  {
    id: "PAY-1004",
    student: "Maria Garcia",
    course: "Web Design Masterclass",
    amount: 94.99,
    method: "M-Pesa",
    status: "completed",
    date: "2023-03-05T16:20:00Z",
  },
  {
    id: "PAY-1005",
    student: "David Wilson",
    course: "Digital Marketing Fundamentals",
    amount: 84.99,
    method: "Credit Card",
    status: "pending",
    date: "2023-03-04T11:10:00Z",
  },
  {
    id: "PAY-1006",
    student: "Sarah Johnson",
    course: "Advanced English for Professionals",
    amount: 89.99,
    method: "PayPal",
    status: "failed",
    date: "2023-03-03T13:25:00Z",
  },
  {
    id: "PAY-1007",
    student: "Michael Brown",
    course: "Kiswahili for Beginners",
    amount: 79.99,
    method: "M-Pesa",
    status: "completed",
    date: "2023-03-02T15:40:00Z",
  },
  {
    id: "PAY-1008",
    student: "Emily Davis",
    course: "Web Design Masterclass",
    amount: 94.99,
    method: "Credit Card",
    status: "refunded",
    date: "2023-03-01T08:55:00Z",
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("all")
  const [currency, setCurrency] = useState("usd")

  // Filter payments based on active tab, search query, and payment method
  const filteredPayments = payments
    .filter((payment) => activeTab === "all" || payment.status === activeTab)
    .filter(
      (payment) =>
        payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((payment) => paymentMethod === "all" || payment.method.toLowerCase().includes(paymentMethod.toLowerCase()))

  // Calculate totals
  const totalRevenue = filteredPayments.reduce((sum, payment) => {
    if (payment.status === "completed") {
      return sum + payment.amount
    }
    return sum
  }, 0)

  const formatCurrency = (amount: number) => {
    if (currency === "usd") {
      return `$${amount.toFixed(2)}`
    } else {
      return `KSH ${(amount * exchangeRate).toFixed(2)}`
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "m-pesa":
        return <Phone className="h-4 w-4" />
      case "credit card":
        return <CreditCard className="h-4 w-4" />
      case "paypal":
        return <Wallet className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "refunded":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground">Track and manage all payment transactions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  From {filteredPayments.filter((p) => p.status === "completed").length} completed payments
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2 rounded-lg bg-green-50">
                <Phone className="h-5 w-5 text-green-600 mb-1" />
                <span className="text-xs font-medium">M-Pesa</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {payments.filter((p) => p.method === "M-Pesa" && p.status === "completed").length} payments
                </span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50">
                <CreditCard className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium">Card</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {payments.filter((p) => p.method === "Credit Card" && p.status === "completed").length} payments
                </span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-indigo-50">
                <Wallet className="h-5 w-5 text-indigo-600 mb-1" />
                <span className="text-xs font-medium">PayPal</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {payments.filter((p) => p.method === "PayPal" && p.status === "completed").length} payments
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Currency Display</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrency("usd")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currency === "usd" ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency("ksh")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currency === "ksh" ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  KSH (KES)
                </button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminRevenueChart />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="m-pesa">M-Pesa</SelectItem>
              <SelectItem value="credit card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search payments..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            {filteredPayments.length} transaction{filteredPayments.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 gap-2 p-4 font-medium border-b">
              <div>ID</div>
              <div className="col-span-2">Student / Course</div>
              <div>Date</div>
              <div>Method</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <div key={payment.id} className="grid grid-cols-7 gap-2 p-4 items-center">
                    <div className="font-medium">{payment.id}</div>
                    <div className="col-span-2">
                      <div className="font-medium">{payment.student}</div>
                      <div className="text-sm text-muted-foreground">{payment.course}</div>
                    </div>
                    <div className="text-sm">{formatDate(payment.date)}</div>
                    <div className="flex items-center gap-1">
                      <div className="p-1 rounded-full bg-gray-100">{getPaymentMethodIcon(payment.method)}</div>
                      <span className="text-sm">{payment.method}</span>
                    </div>
                    <div className="font-medium">{formatCurrency(payment.amount)}</div>
                    <div>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">No payments found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery ? "Try a different search term" : "No payment transactions match your filters"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
