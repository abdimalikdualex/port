"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle, CheckCircle2, Eye, EyeOff } from "lucide-react"

interface SecurityAlert {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  timestamp: string
  resolved: boolean
}

const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "1",
    title: "Multiple failed login attempts",
    description: "10 failed login attempts from IP 192.168.1.100",
    severity: "high",
    timestamp: "2024-11-25 14:30",
    resolved: false,
  },
  {
    id: "2",
    title: "Unusual user activity",
    description: "User account downloaded 50 files in 5 minutes",
    severity: "medium",
    timestamp: "2024-11-25 12:15",
    resolved: false,
  },
  {
    id: "3",
    title: "SSL certificate expiring soon",
    description: "Your SSL certificate will expire in 30 days",
    severity: "high",
    timestamp: "2024-11-24 10:00",
    resolved: true,
  },
  {
    id: "4",
    title: "Password security update recommended",
    description: "Consider enforcing stronger password policies",
    severity: "medium",
    timestamp: "2024-11-23 09:00",
    resolved: true,
  },
]

export default function SecurityPage() {
  const router = useRouter()
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockSecurityAlerts)
  const [showResolved, setShowResolved] = useState(false)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-300"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const activeAlerts = alerts.filter((a) => !a.resolved)
  const resolvedAlerts = alerts.filter((a) => a.resolved)
  const displayAlerts = showResolved ? resolvedAlerts : activeAlerts

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Security & Monitoring</h1>
        <p className="text-slate-600 mt-1">Monitor security alerts and system health</p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Alerts</p>
                <p className="text-3xl font-bold text-slate-900">{activeAlerts.length}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-600 bg-red-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">System Health</p>
                <p className="text-3xl font-bold text-green-600">98%</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600 bg-green-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Uptime</p>
                <p className="text-3xl font-bold text-slate-900">99.9%</p>
              </div>
              <Shield className="w-12 h-12 text-indigo-600 bg-indigo-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">2FA Enabled</p>
                <p className="text-3xl font-bold text-slate-900">45%</p>
              </div>
              <Lock className="w-12 h-12 text-purple-600 bg-purple-50 rounded-lg p-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Security Alerts</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowResolved(!showResolved)} className="gap-2">
              {showResolved ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {showResolved ? "Show Active" : "Show Resolved"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {displayAlerts.length > 0 ? (
            displayAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-xs mt-2 opacity-75">{alert.timestamp}</p>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{showResolved ? "No resolved alerts" : "No active security alerts"}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-1">Enable Two-Factor Authentication</h3>
            <p className="text-sm text-blue-700 mb-3">
              Protect all admin accounts with 2FA to prevent unauthorized access
            </p>
            <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 bg-transparent">
              Setup 2FA
            </Button>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-1">Backup Your Data</h3>
            <p className="text-sm text-green-700 mb-3">
              Last backup was 2 days ago. Perform a new backup to protect your data
            </p>
            <Button size="sm" variant="outline" className="text-green-600 border-green-300 bg-transparent">
              Start Backup
            </Button>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-1">Update SSL Certificate</h3>
            <p className="text-sm text-purple-700 mb-3">Your SSL certificate will expire in 30 days</p>
            <Button size="sm" variant="outline" className="text-purple-600 border-purple-300 bg-transparent">
              Renew Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
