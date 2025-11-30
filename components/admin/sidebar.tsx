"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  DollarSign,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

interface NavItem {
  icon: React.ReactNode
  label: string
  href?: string
  submenu?: Array<{ label: string; href: string }>
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "User Management",
      submenu: [
        { label: "All Users", href: "/admin/users" },
        { label: "Students", href: "/admin/users?role=student" },
        { label: "Instructors", href: "/admin/users?role=instructor" },
      ],
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Courses",
      submenu: [
        { label: "All Courses", href: "/admin/courses/management" },
        { label: "Create Course", href: "/admin/courses/create" },
        { label: "Pending Approval", href: "/admin/courses/management?status=pending" },
      ],
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Instructors",
      href: "/admin/instructors",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: "Revenue",
      href: "/admin/revenue",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      href: "/admin/notifications",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Messages",
      href: "/admin/messages",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      href: "/admin/settings",
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  const toggleMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button size="icon" variant="outline" onClick={() => setIsMobileOpen(!isMobileOpen)} className="bg-white">
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-xl transition-transform duration-300 ease-in-out z-30 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-indigo-700">
          <h1 className="text-2xl font-bold">EduAdmin</h1>
          <p className="text-indigo-300 text-sm">Platform Management</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link href={item.href}>
                  <div
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "bg-white bg-opacity-20 text-white font-semibold"
                        : "text-indigo-100 hover:bg-white hover:bg-opacity-10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-indigo-100 hover:bg-white hover:bg-opacity-10`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>
              )}

              {/* Submenu */}
              {item.submenu && expandedMenu === item.label && (
                <div className="mt-2 ml-4 space-y-1 border-l-2 border-indigo-700 pl-4">
                  {item.submenu.map((subitem, subindex) => (
                    <Link key={subindex} href={subitem.href}>
                      <div
                        onClick={() => setIsMobileOpen(false)}
                        className={`px-3 py-2 rounded text-sm transition-all ${
                          isActive(subitem.href)
                            ? "bg-white bg-opacity-20 text-white font-semibold"
                            : "text-indigo-200 hover:bg-white hover:bg-opacity-10"
                        }`}
                      >
                        {subitem.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-700 bg-indigo-900">
          <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
