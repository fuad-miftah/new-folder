/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'bob',
            email: 'alice@gmail.com',
            password: '123456',
            phone: '1234567890',
        },
    });
    console.log(user);
    
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
