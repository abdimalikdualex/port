import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Update the session if needed
  const response = await updateSession(request)
  if (response) return response

  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Admin routes protection
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value

    // If there's no token, redirect to login
    if (!token) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Dashboard routes protection
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value

    // If there's no token, redirect to login
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
