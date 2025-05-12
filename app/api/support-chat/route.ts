import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Only allow users to access their own chats or admins to access any chat
  if (user.id !== userId && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Get the most recent open chat for the user
    const chat = await prisma.supportChat.findFirst({
      where: {
        userId,
        status: "OPEN",
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json({ chat })
  } catch (error) {
    console.error("Error fetching chat:", error)
    return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content, chatId, userId } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 })
    }

    // Only allow users to send messages for their own chats or admins for any chat
    if (user.id !== userId && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let chat

    if (chatId) {
      // Update existing chat
      chat = await prisma.supportChat.update({
        where: { id: chatId },
        data: {
          updatedAt: new Date(),
          messages: {
            create: {
              content,
              isFromAdmin: user.role === "ADMIN" || user.role === "SUPER_ADMIN",
            },
          },
        },
      })
    } else {
      // Create new chat
      chat = await prisma.supportChat.create({
        data: {
          userId,
          messages: {
            create: {
              content,
              isFromAdmin: user.role === "ADMIN" || user.role === "SUPER_ADMIN",
            },
          },
        },
      })
    }

    return NextResponse.json({ success: true, chatId: chat.id })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
