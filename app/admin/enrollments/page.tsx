"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Trash2, Award } from "lucide-react"
import { adminDataStore } from "@/lib/admin-data-store"

interface Enrollment {
  id: string
  studentName: string
  email: string
  courseName: string
  enrollDate: string
  progress: number
  status: "active" | "completed" | "suspended"
  certificateIssued: boolean
}

const mockEnrollments: Enrollment[] = [
  {
    id: "enr1",
    studentName: "Alice Johnson",
    email: "alice@example.com",
    courseName: "Web Design Masterclass",
    enrollDate: "2024-01-15",
    progress: 85,
    status: "active",
    certificateIssued: false,
  },
  {
    id: "enr2",
    studentName: "Bob Smith",
    email: "bob@example.com",
    courseName: "JavaScript Essentials",
    enrollDate: "2024-02-10",
    progress: 100,
    status: "completed",
    certificateIssued: true,
  },
  {
    id: "enr3",
    studentName: "Carol White",
    email: "carol@example.com",
    courseName: "Python for Beginners",
    enrollDate: "2024-03-05",
    progress: 45,
    status: "active",
    certificateIssued: false,
  },
]

export default function EnrollmentManagement() {
  const router = useRouter()
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments)
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>(mockEnrollments)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  useEffect(() => {
    let filtered = enrollments

    if (searchTerm) {
      filtered = filtered.filter(
        (enr) =>
          enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enr.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enr.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEnrollments(filtered)
  }, [searchTerm, enrollments])

  const handleIssueCertificate = (enrollmentId: string) => {
    setEnrollments(enrollments.map((enr) => (enr.id === enrollmentId ? { ...enr, certificateIssued: true } : enr)))
    adminDataStore.activityLog.log("certificate_issued", { enrollmentId }, "admin")
  }

  const handleRemoveEnrollment = (enrollmentId: string) => {
    if (confirm("Are you sure you want to remove this enrollment?")) {
      setEnrollments(enrollments.filter((enr) => enr.id !== enrollmentId))
      adminDataStore.activityLog.log("enrollment_removed", { enrollmentId }, "admin")
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Enrollment Management</h1>
          <p className="text-slate-600 mt-1">Track and manage student enrollments and certificates</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Manual Enrollment
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Active Enrollments ({filteredEnrollments.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by student, course, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Enrolled Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{enrollment.studentName}</p>
                        <p className="text-xs text-slate-600">{enrollment.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{enrollment.courseName}</td>
                    <td className="py-3 px-4 text-slate-600">{enrollment.enrollDate}</td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-slate-200 rounded-full h-2 max-w-xs">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{enrollment.progress}%</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          enrollment.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : enrollment.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {enrollment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {enrollment.status === "completed" && !enrollment.certificateIssued && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleIssueCertificate(enrollment.id)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <Award className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveEnrollment(enrollment.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
