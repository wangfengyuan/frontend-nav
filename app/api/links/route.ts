import { NextResponse } from "next/server"

import prisma from "@/lib/db"

export async function GET() {
  const links = await prisma.category.findMany({
    orderBy: [
      {
        rank: "asc",
      },
    ],
    include: {
      links: {
        orderBy: {
          rank: "asc",
        },
        where: {
          public: true,
          status: 1,
        },
      },
    },
  })
  return NextResponse.json(links)
}

export async function POST(request: Request) {
  const info = await request.json()
  const { url: originalUrl } = info
  const url = originalUrl.trim().replace(/\/+$/, "")
  const link = await prisma.link.findUnique({
    where: {
      url,
    },
  })
  if (link) {
    return NextResponse.json({ error: "Link already exists" }, { status: 500 })
  }
  try {
    const link = await prisma.link.create({
      data: {
        ...info,
        url,
        status: 0,
        is_crawled: true,
      },
    })
    return NextResponse.json(link)
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    )
  }
}
