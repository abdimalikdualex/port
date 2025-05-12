import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || undefined
    const level = searchParams.get("level") || undefined
    const minPrice = searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined

    const courses = await prisma.course.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { instructor: { contains: query, mode: "insensitive" } },
            ],
          },
          category ? { category } : {},
          level ? { level } : {},
          minPrice ? { price: { gte: minPrice } } : {},
          maxPrice ? { price: { lte: maxPrice } } : {},
          { published: true },
        ],
      },
      include: {
        _count: {
          select: {
            purchases: true,
            videos: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
