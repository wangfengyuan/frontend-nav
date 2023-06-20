import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET() {
  const links = await prisma.category.findMany({
    orderBy: [
      {
        rank: 'asc',
      }
    ],
    include: {
      links: {
        orderBy: {
          rank: 'asc',
        },
        where: {
          public: true,
          status: 1,
        },
      },
    },
  });
  return NextResponse.json(links);
}