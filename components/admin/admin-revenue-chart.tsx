"use client"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 5000 },
  { name: "Mar", revenue: 6000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 5500 },
  { name: "Jun", revenue: 6500 },
  { name: "Jul", revenue: 8000 },
  { name: "Aug", revenue: 9000 },
  { name: "Sep", revenue: 7500 },
  { name: "Oct", revenue: 8500 },
  { name: "Nov", revenue: 9500 },
  { name: "Dec", revenue: 11000 },
]

export default function AdminRevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
