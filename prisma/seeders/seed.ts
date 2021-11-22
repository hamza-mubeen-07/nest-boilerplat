import { PrismaClient } from '@prisma/client';
import { users } from './user.seed';
import { categories } from './category.seed';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data: users });
  await prisma.category.createMany({ data: categories });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
