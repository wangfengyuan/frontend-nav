import prisma from '@/lib/db';
import type { Prisma } from '@prisma/client';

export default async function getNavLinks() {
  const res = await prisma.category.findMany({
    include: {
      links: true,
    },
  });
  console.log(res);
  return res;
}

export type CategoryWithLinks = Prisma.PromiseReturnType<typeof getNavLinks>