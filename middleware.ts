import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path starts with /admin
  const isAdminPath = path.startsWith("/admin")

  // Exclude the admin login page from protection
  const isAdminLoginPage = path === "/admin/login"

  // Check if the user is authenticated as admin
  const adminSession = request.cookies.get("adminSession")?.value

  // If trying to access admin pages without being logged in (except login page)
  if (isAdminPath && !adminSession && !isAdminLoginPage) {
    // Redirect to the admin login page
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If already logged in and trying to access login page, redirect to admin dashboard
  if (isAdminLoginPage && adminSession) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
