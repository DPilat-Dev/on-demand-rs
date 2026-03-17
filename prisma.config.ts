import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  datasource: {
    // Use the direct (non-pooled) URL for migrations.
    // On Neon: DATABASE_URL_UNPOOLED is required for DDL over a direct connection.
    // Locally (Docker): both vars point to the same PostgreSQL instance.
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'ts-node --transpile-only --skip-project --compiler-options {"module":"CommonJS","moduleResolution":"node","esModuleInterop":true} prisma/seed.ts',
  },
});
