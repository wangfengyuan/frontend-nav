import type { Prisma } from "@prisma/client"

import prisma from "@/lib/db"

export default async function getNavLinks() {
  const res = await prisma.category.findMany({
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
  return res
}

export async function getLinkByUniqueUrl(url: string) {
  try {
    const link = await prisma.link.findUnique({
      select: {
        title: true,
        url: true,
        icon: true,
        description: true,
        screenshot_url: true,
        status: true,
        is_crawled: true,
      },
      where: {
        url,
      },
    })
    if (!link) {
      return null
    }
    return link
  } catch (error) {}
}

export type CategoryWithLinks = Prisma.PromiseReturnType<typeof getNavLinks>
