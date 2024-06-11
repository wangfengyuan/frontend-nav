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
  console.log(info)
  const link = await prisma.link.create({
    data: {
      ...info,
      status: 0,
    },
  })
  return NextResponse.json(link)
}
