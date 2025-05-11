"use client"

import { useState } from "react"
import { Bell, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import AdminSidebar from "./admin-sidebar"

export default function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className={`${searchOpen ? "flex" : "hidden md:flex"} flex-1 max-w-md mx-4`}>
        {searchOpen && (
          <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setSearchOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        )}
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="ml-2 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="ml-4 flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
            A
          </div>
          <span className="ml-2 font-medium text-gray-700 hidden md:inline-block">Admin</span>
        </div>
      </div>
    </header>
  )
}
