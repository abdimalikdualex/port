"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  DollarSign,
  Film,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Shield,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Videos",
    href: "/admin/videos",
    icon: Film,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    const adminUserStr = localStorage.getItem("adminUser")

    if (!adminLoggedIn || !adminUserStr) {
      router.push("/admin/login")
      return
    }

    try {
      const user = JSON.parse(adminUserStr)
      setAdminUser(user)
    } catch (error) {
      console.error("Error parsing admin user:", error)
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem("adminLoggedIn")
    localStorage.removeItem("adminUser")

    // Redirect to admin login page
    router.push("/admin/login")
  }

  if (isLoading) {
    return null // Or a loading spinner
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <Sidebar variant="floating" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                A
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin
              </span>
            </Link>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={link.title}>
                      <Link href={link.href}>
                        <link.icon className="h-5 w-5" />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  {adminUser?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{adminUser?.name || "Admin User"}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  {adminUser?.role === "super_admin" ? (
                    <>
                      <Shield className="h-3 w-3 mr-1 text-purple-500" />
                      <span>Super Admin</span>
                    </>
                  ) : (
                    <>
                      <User className="h-3 w-3 mr-1 text-blue-500" />
                      <span>Admin</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Website
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start text-red-500 hover:text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be redirected to the login page and will need to sign in again to access the admin panel.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
