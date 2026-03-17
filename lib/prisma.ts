import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Keep pool size small for serverless/edge environments
    max: process.env.NODE_ENV === 'production' ? 1 : 10,
  });
  // Cast needed: standalone `pg` Pool type conflicts with the one bundled in @prisma/adapter-pg
  const adapter = new PrismaPg(pool as any);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
