import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllDebts() {
  await prisma.debt.deleteMany({});
  console.log('Todas as dívidas foram apagadas.');
}

deleteAllDebts()
  .catch((e) => {
    console.error('Erro ao apagar as dívidas:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
