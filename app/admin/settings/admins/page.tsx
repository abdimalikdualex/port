"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash2, ArrowLeft, UserPlus, Shield, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Mock admin data
const mockAdmins = [
  {
    id: "1",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "super_admin",
    createdAt: new Date("2023-01-01").toISOString(),
  },
  {
    id: "2",
    name: "Regular Admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date("2023-02-15").toISOString(),
  },
]

export default function AdminManagementPage() {
  const router = useRouter()
  const [admins, setAdmins] = useState(mockAdmins)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [currentAdmin, setCurrentAdmin] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  })

  useEffect(() => {
    // Get current admin from localStorage
    const adminUserStr = localStorage.getItem("adminUser")
    if (!adminUserStr) {
      router.push("/admin/login")
      return
    }

    try {
      const adminUser = JSON.parse(adminUserStr)
      setCurrentAdmin(adminUser)

      // Only super admins can access this page
      if (adminUser.role !== "super_admin") {
        router.push("/admin")
        return
      }

      // In a real app, you would fetch admins from an API
      setAdmins(mockAdmins)
    } catch (error) {
      console.error("Error loading admin data:", error)
      setError("Failed to load admin data")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleCreateAdmin = () => {
    setError("")
    setSuccess("")

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    // Check if email already exists
    if (admins.some((admin) => admin.email === formData.email)) {
      setError("An admin with this email already exists")
      return
    }

    try {
      // Create new admin (in a real app, this would be an API call)
      const newAdmin = {
        id: (admins.length + 1).toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role as "admin" | "super_admin",
        createdAt: new Date().toISOString(),
      }

      // Add new admin to the list
      setAdmins((prev) => [...prev, newAdmin])
      setSuccess(`Admin ${newAdmin.name} created successfully`)

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      })

      // Close dialog
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error creating admin:", error)
      setError("An error occurred while creating the admin")
    }
  }

  const handleDeleteAdmin = (adminId: string) => {
    try {
      // Cannot delete yourself or the initial super admin
      if (adminId === currentAdmin?.id || adminId === "1") {
        setError("You cannot delete this admin account")
        return
      }

      // Remove admin from the list
      setAdmins((prev) => prev.filter((admin) => admin.id !== adminId))
      setSuccess("Admin deleted successfully")
    } catch (error) {
      console.error("Error deleting admin:", error)
      setError("An error occurred while deleting the admin")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/settings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Admin Management</h1>
            <p className="text-gray-500">Create and manage admin accounts</p>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <UserPlus className="mr-2 h-4 w-4" /> Create Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Admin</DialogTitle>
              <DialogDescription>
                Create a new admin account. Only super admins can create new admin accounts.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={handleSelectChange}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAdmin}>Create Admin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && !error.includes("field") && !error.includes("match") && !error.includes("characters") && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>Manage admin accounts for your e-learning platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
              <div>Name</div>
              <div className="col-span-2">Email</div>
              <div>Role</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {admins.map((admin) => (
                <div key={admin.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="font-medium">{admin.name}</div>
                  <div className="col-span-2">{admin.email}</div>
                  <div>
                    <Badge
                      className={
                        admin.role === "super_admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {admin.role === "super_admin" ? (
                        <Shield className="h-3 w-3 mr-1" />
                      ) : (
                        <User className="h-3 w-3 mr-1" />
                      )}
                      {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                    </Badge>
                  </div>
                  <div>
                    {admin.id !== "1" && admin.id !== currentAdmin?.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the admin account for {admin.name}. This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAdmin(admin.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

                    {(admin.id === "1" || admin.id === currentAdmin?.id) && (
                      <Badge variant="outline">
                        {admin.id === currentAdmin?.id ? "Current User" : "Initial Admin"}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Note: The initial super admin account cannot be deleted.</p>
        </CardFooter>
      </Card>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
          <CardDescription>Best practices for admin account security</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            <li>Create unique admin accounts for each administrator</li>
            <li>Use strong, unique passwords for each admin account</li>
            <li>Limit the number of super admin accounts</li>
            <li>Regularly review admin accounts and remove unused accounts</li>
            <li>Enable two-factor authentication for additional security</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
