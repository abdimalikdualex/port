"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { adminDataStore } from "@/lib/admin-data-store"

interface ActivityLogEntry {
  id: string
  action: string
  details: Record<string, any>
  userId?: string
  timestamp: string
}

export default function ActivityLogsPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<ActivityLogEntry[]>([])
  const [filteredLogs, setFilteredLogs] = useState<ActivityLogEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }

    const allLogs = adminDataStore.activityLog.getAll()
    setLogs(allLogs)
    setFilteredLogs(allLogs)
  }, [router])

  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.userId?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterAction !== "all") {
      filtered = filtered.filter((log) => log.action === filterAction)
    }

    setFilteredLogs(filtered)
  }, [searchTerm, filterAction, logs])

  const getActionBadgeColor = (action: string) => {
    if (action.includes("deleted")) return "bg-red-100 text-red-700"
    if (action.includes("created") || action.includes("added")) return "bg-green-100 text-green-700"
    if (action.includes("updated") || action.includes("changed")) return "bg-blue-100 text-blue-700"
    return "bg-slate-100 text-slate-700"
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const handleExport = () => {
    const csv = [
      ["ID", "Action", "User ID", "Timestamp", "Details"],
      ...filteredLogs.map((log) => [
        log.id,
        log.action,
        log.userId || "N/A",
        log.timestamp,
        JSON.stringify(log.details),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "activity-logs.csv"
    a.click()
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity Logs</h1>
          <p className="text-slate-600 mt-1">Track all admin actions and system activities</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>System Activity Log ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by action or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Actions</option>
              <option value="user_deleted">User Deleted</option>
              <option value="user_status_changed">Status Changed</option>
              <option value="course_approved">Course Approved</option>
              <option value="course_deleted">Course Deleted</option>
              <option value="instructor_approved">Instructor Approved</option>
              <option value="notification_sent">Notification Sent</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Action</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">User ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Timestamp</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <Badge className={getActionBadgeColor(log.action)}>{log.action}</Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{log.userId || "System"}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{formatTimestamp(log.timestamp)}</td>
                      <td className="py-3 px-4 text-slate-600 text-sm">
                        <details className="cursor-pointer">
                          <summary className="text-indigo-600 hover:underline">View</summary>
                          <pre className="mt-2 p-2 bg-slate-100 rounded text-xs overflow-auto max-w-xs">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        </details>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No activity logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
