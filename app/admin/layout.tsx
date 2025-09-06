"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Home,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface AdminUser {
  email: string
  name: string
  role: string
  loginTime: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    // Check authentication
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session")
      if (session) {
        try {
          const userData = JSON.parse(session)
          setAdminUser(userData)
        } catch (error) {
          console.error("Error parsing admin session:", error)
          localStorage.removeItem("admin_session")
        }
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_session")
      localStorage.removeItem("admin_remember")
    }
    toast.success("Logged out successfully")
    window.location.href = "/admin/login"
  }

  // If on login page, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If not mounted or not authenticated, redirect to login
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!adminUser) {
    router.push("/admin/login")
    return null
  }

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: PlayCircle, label: "Videos", href: "/admin/videos" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: Users, label: "Students", href: "/admin/students" },
    { icon: CreditCard, label: "Payments", href: "/admin/payments" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">Admin Panel</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="flex-1">
            <SidebarMenu className="p-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <div className="border-t p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-indigo-100 text-indigo-600">{adminUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{adminUser.name}</p>
                <p className="text-xs text-gray-500 truncate">{adminUser.role}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Website
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
