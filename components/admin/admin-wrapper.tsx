"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AdminSidebar from "./sidebar"

interface AdminWrapperProps {
  children: React.ReactNode
}

export default function AdminWrapper({ children }: AdminWrapperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    // Check authentication
    const adminSession = localStorage.getItem("adminSession")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router, pathname])

  // Show nothing while loading
  if (isLoading) {
    return null
  }

  // For login page, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // For authenticated pages, render with sidebar
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="lg:ml-64">{children}</div>
      </main>
    </div>
  )
}
