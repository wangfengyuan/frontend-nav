const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const sample = require('./sample.json')

async function main() {
  sample.forEach(async (category) => {
    const { id, icon, title, description, rank, links = [] } = category;
    const data = {
      id,
      icon,
      title,
      description,
      rank,
      links: {
        createMany: {
          data: links,
        }
      }
    }
    await prisma.category.create({
      data,
    });
  })
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
