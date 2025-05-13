import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { getSession } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Express Academy",
  description: "Learn new skills with our expert-led online courses",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="text-xl font-bold text-blue-600">
                    Express Academy
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/courses"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Courses
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {session ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/dashboard"
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <form action="/api/auth/logout" method="post">
                      <button
                        type="submit"
                        className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/auth/login"
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Express Academy</h3>
                <p className="text-gray-300">
                  Unlock your potential with our expert-led online courses. Learn at your own pace and achieve your
                  goals.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/courses" className="text-gray-300 hover:text-white">
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login" className="text-gray-300 hover:text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/signup" className="text-gray-300 hover:text-white">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-300">
                  Email: info@expressacademy.com
                  <br />
                  Phone: +1 (123) 456-7890
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} Express Academy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
