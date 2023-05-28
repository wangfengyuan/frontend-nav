import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
export type { Link } from '@prisma/client';

export const revalidate = 24 * 60 * 60;

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