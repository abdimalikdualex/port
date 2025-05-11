"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, DollarSign, Film, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Simple sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white">A</div>
            <span className="font-bold text-lg text-indigo-600">Admin</span>
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <link.icon className="h-5 w-5 text-gray-500" />
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t mt-auto">
          <Button variant="outline" size="sm" className="w-full justify-start mb-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Website
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-red-500">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b p-4 flex items-center justify-between z-10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-white">A</div>
          <span className="font-bold text-lg text-indigo-600">Admin</span>
        </Link>
        <Button variant="outline" size="sm">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 md:p-8 p-4 md:pt-8 pt-20">{children}</div>
    </div>
  )
}
