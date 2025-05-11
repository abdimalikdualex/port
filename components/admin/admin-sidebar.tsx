"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, DollarSign, Film, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"

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

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <Link href="/admin" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-r-4 border-indigo-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <link.icon className={`mr-3 h-5 w-5 ${isActive ? "text-indigo-500" : "text-gray-400"}`} />
                {link.title}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-indigo-600"
          >
            <Home className="w-5 h-5 mr-3 text-gray-400" />
            Back to Website
          </Link>
          <button className="flex items-center w-full px-4 py-3 mt-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-red-600">
            <LogOut className="w-5 h-5 mr-3 text-gray-400" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
