"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Lock, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate authentication - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials against our mock data
      // In a real app, this would be validated by your backend
      if (formData.email === "admin@example.com" && formData.password === "admin123") {
        // Store admin info in localStorage
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: "admin-1",
            name: "Admin User",
            email: formData.email,
            role: "super_admin",
          }),
        )

        // Redirect to admin dashboard
        router.push("/admin")
      } else if (formData.email === "amalikduale@gmail.com" && formData.password === "Maisha@0134") {
        // Store super admin info in localStorage
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: "1",
            name: "Abdulmalik",
            email: formData.email,
            role: "super_admin",
          }),
        )

        // Redirect to admin dashboard
        router.push("/admin")
      } else {
        setError("Invalid email or password. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md border-purple-200 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
              <Lock className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-indigo-900">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your-email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/admin/forgot-password" className="text-xs text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login to Admin Panel"
              )}
            </Button>

            <div className="text-center text-sm">
              <Link href="/" className="text-indigo-600 hover:underline">
                Return to Website
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
