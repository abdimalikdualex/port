"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    // Check if already logged in
    const checkAuth = () => {
      try {
        const isLoggedIn = localStorage.getItem("adminLoggedIn")
        if (isLoggedIn === "true") {
          router.replace("/admin")
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }
    checkAuth()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials
      const validCredentials = [
        {
          email: "superadmin@example.com",
          password: "superadmin123",
          role: "super_admin",
          name: "Super Admin",
          id: "1",
        },
        {
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
          name: "Admin User",
          id: "2",
        },
      ]

      const user = validCredentials.find((cred) => cred.email === formData.email && cred.password === formData.password)

      if (user) {
        // Create admin session
        const adminSession = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          loginTime: new Date().toISOString(),
          isAuthenticated: true,
        }

        // Store session data
        localStorage.setItem("adminLoggedIn", "true")
        localStorage.setItem("adminUser", JSON.stringify(adminSession))
        localStorage.setItem("adminSessionTime", Date.now().toString())

        if (formData.rememberMe) {
          localStorage.setItem("adminRememberMe", "true")
        }

        toast.success("Login successful! Redirecting to dashboard...")

        // Force page reload to ensure clean state
        setTimeout(() => {
          window.location.href = "/admin"
        }, 1500)
      } else {
        setError("Invalid email or password. Please check your credentials and try again.")
        toast.error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An error occurred during login. Please try again.")
      toast.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <CardDescription className="text-gray-600">Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-xs text-indigo-600 hover:text-indigo-500 hover:underline"
                  onClick={(e) => {
                    e.preventDefault()
                    toast.info("Contact system administrator for password reset")
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                disabled={isLoading}
                className="border-gray-300"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">Demo Credentials:</h4>
              <div className="space-y-1 text-xs text-blue-700">
                <div className="flex justify-between">
                  <span className="font-medium">Super Admin:</span>
                  <span>superadmin@example.com / superadmin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Regular Admin:</span>
                  <span>admin@example.com / admin123</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in to Admin Panel"
              )}
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600 hover:underline transition-colors">
                ← Return to Website
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
