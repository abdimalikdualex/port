import { compare, hash } from "bcryptjs"
import { jwtVerify, SignJWT } from "jose"
import type { NextRequest, NextResponse } from "next/server"
import { prisma } from "./db"

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_in_production")

export async function hashPassword(password: string) {
  return hash(password, 10)
}

export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  return compare(plainPassword, hashedPassword)
}

export async function createToken(userId: string, role: string) {
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY)
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, SECRET_KEY)
    return verified.payload
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
  return response
}

export async function getAuthUser(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload || !payload.userId) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId as string },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  })

  return user
}

export async function isAdmin(request: NextRequest) {
  const user = await getAuthUser(request)
  return user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
}
