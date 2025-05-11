"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", usd: 4000, ksh: 520000 },
  { name: "Feb", usd: 3000, ksh: 390000 },
  { name: "Mar", usd: 2000, ksh: 260000 },
  { name: "Apr", usd: 2780, ksh: 361400 },
  { name: "May", usd: 1890, ksh: 245700 },
  { name: "Jun", usd: 2390, ksh: 310700 },
  { name: "Jul", usd: 3490, ksh: 453700 },
  { name: "Aug", usd: 4000, ksh: 520000 },
  { name: "Sep", usd: 5000, ksh: 650000 },
  { name: "Oct", usd: 6000, ksh: 780000 },
  { name: "Nov", usd: 7000, ksh: 910000 },
  { name: "Dec", usd: 8000, ksh: 1040000 },
]

export default function AdminRevenueChart() {
  const [currency, setCurrency] = useState("usd")
  const [chartData, setChartData] = useState(data)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-80 flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-80">
      <div className="mb-4 flex justify-end">
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
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [currency === "usd" ? `$${value}` : `KSH ${value}`, "Revenue"]} />
          <Legend />
          <Bar
            dataKey={currency}
            name={currency === "usd" ? "USD Revenue" : "KSH Revenue"}
            fill={currency === "usd" ? "#6366f1" : "#8b5cf6"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
