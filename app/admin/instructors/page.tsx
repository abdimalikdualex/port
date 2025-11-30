"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, XCircle, Eye } from "lucide-react"
import { adminDataStore } from "@/lib/admin-data-store"

interface InstructorApplication {
  id: string
  name: string
  email: string
  phone: string
  bio: string
  experience: string
  expertise: string[]
  status: "pending" | "approved" | "rejected"
  coursesCreated: number
  earnings: number
  appliedDate: string
}

const mockInstructors: InstructorApplication[] = [
  {
    id: "inst1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+254 700 123 456",
    bio: "Experienced web designer with 10+ years in the industry",
    experience: "10+ years",
    expertise: ["Web Design", "UI/UX", "Figma"],
    status: "approved",
    coursesCreated: 3,
    earnings: 12450,
    appliedDate: "2024-01-15",
  },
  {
    id: "inst2",
    name: "Mike Davis",
    email: "mike@example.com",
    phone: "+254 700 234 567",
    bio: "Full-stack developer passionate about teaching",
    experience: "8 years",
    expertise: ["JavaScript", "React", "Node.js"],
    status: "pending",
    coursesCreated: 0,
    earnings: 0,
    appliedDate: "2024-11-20",
  },
  {
    id: "inst3",
    name: "Emily Chen",
    email: "emily@example.com",
    phone: "+254 700 345 678",
    bio: "Data scientist and Python enthusiast",
    experience: "6 years",
    expertise: ["Python", "Data Science", "Machine Learning"],
    status: "pending",
    coursesCreated: 0,
    earnings: 0,
    appliedDate: "2024-11-18",
  },
]

export default function InstructorManagement() {
  const router = useRouter()
  const [instructors, setInstructors] = useState<InstructorApplication[]>(mockInstructors)
  const [filteredInstructors, setFilteredInstructors] = useState<InstructorApplication[]>(mockInstructors)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorApplication | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
  }, [router])

  useEffect(() => {
    let filtered = instructors

    if (searchTerm) {
      filtered = filtered.filter(
        (inst) =>
          inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inst.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((inst) => inst.status === filterStatus)
    }

    setFilteredInstructors(filtered)
  }, [searchTerm, filterStatus, instructors])

  const handleApprove = (id: string) => {
    setInstructors(instructors.map((inst) => (inst.id === id ? { ...inst, status: "approved" as const } : inst)))
    adminDataStore.activityLog.log("instructor_approved", { instructorId: id }, "admin")
  }

  const handleReject = (id: string) => {
    setInstructors(instructors.map((inst) => (inst.id === id ? { ...inst, status: "rejected" as const } : inst)))
    adminDataStore.activityLog.log("instructor_rejected", { instructorId: id }, "admin")
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Instructor Management</h1>
        <p className="text-slate-600 mt-1">Approve, manage, and track instructor applications and performance</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Instructor Applications & Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInstructors.map((instructor) => (
              <Card key={instructor.id} className="border border-slate-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">{instructor.name}</h3>
                      <p className="text-sm text-slate-600">{instructor.email}</p>
                    </div>
                    <Badge
                      className={
                        instructor.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : instructor.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {instructor.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Experience:</span> {instructor.experience}
                    </p>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Expertise:</span> {instructor.expertise.join(", ")}
                    </p>
                  </div>

                  {instructor.status === "approved" && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-600">Courses</p>
                        <p className="font-bold text-indigo-600">{instructor.coursesCreated}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Earnings</p>
                        <p className="font-bold text-green-600">${instructor.earnings.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  {instructor.status === "pending" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(instructor.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(instructor.id)}
                        className="flex-1 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {instructor.status === "approved" && (
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View Performance
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
