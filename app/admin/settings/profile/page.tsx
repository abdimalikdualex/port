"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { updateAdminCredentials } from "@/lib/admin-auth"

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [adminUser, setAdminUser] = useState<any>(null)

  useEffect(() => {
    // Get admin user from localStorage
    const storedAdmin = localStorage.getItem("adminUser")
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin)
      setAdminUser(parsedAdmin)
      setFormData((prev) => ({
        ...prev,
        name: parsedAdmin.name || "",
        email: parsedAdmin.email || "",
      }))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: "", text: "" })

    // Validate passwords if trying to change password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: "error", text: "New passwords don't match" })
        setIsLoading(false)
        return
      }

      if (formData.newPassword.length < 8) {
        setMessage({ type: "error", text: "Password must be at least 8 characters" })
        setIsLoading(false)
        return
      }
    }

    try {
      // In a real app, you would call an API endpoint
      // For this demo, we'll use the admin-auth functions directly

      // Prepare updates object
      const updates: any = {
        name: formData.name,
      }

      // Only include password if changing it
      if (formData.newPassword) {
        updates.password = formData.newPassword
      }

      // Update admin credentials
      if (adminUser) {
        const updatedAdmin = updateAdminCredentials(adminUser.id, adminUser.id, updates)

        if (updatedAdmin) {
          // Update local storage with new info
          localStorage.setItem(
            "adminUser",
            JSON.stringify({
              ...adminUser,
              name: updatedAdmin.name,
              email: updatedAdmin.email,
            }),
          )

          setMessage({ type: "success", text: "Profile updated successfully" })

          // Clear password fields
          setFormData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }))
        } else {
          setMessage({ type: "error", text: "Failed to update profile" })
        }
      }
    } catch (error) {
      console.error("Update failed:", error)
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (!adminUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information and password</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {message.text && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={message.type === "success" ? "bg-green-50 text-green-800 border-green-200" : ""}
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-4">Change Password</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
