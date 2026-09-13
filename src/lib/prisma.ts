import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

function resolveDatabaseUrl(): string {
  // If explicitly overridden with a non-sqlite remote URL (e.g., PostgreSQL/Supabase):
  const rawUrl = process.env.DATABASE_URL;
  if (rawUrl && !rawUrl.startsWith("file:")) {
    return rawUrl;
  }

  // Serverless / Vercel Lambda environment:
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === "production");

  if (isServerless) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");

    // Copy bundled seed database to /tmp if not already present
    if (!fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size === 0) {
      if (fs.existsSync(sourceDbPath) && fs.statSync(sourceDbPath).size > 0) {
        try {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
          console.log(`[Prisma Serverless] Successfully copied SQLite database from ${sourceDbPath} to ${tmpDbPath}`);
        } catch (err: any) {
          console.error(`[Prisma Serverless] Failed to copy SQLite db from ${sourceDbPath}:`, err.message);
        }
      }
    }

    const sqliteUrl = `file:${tmpDbPath}`;
    process.env.DATABASE_URL = sqliteUrl;
    return sqliteUrl;
  }

  // Local development:
  const localDbPath = path.join(process.cwd(), "prisma", "dev.db");
  const localUrl = `file:${localDbPath}`;
  process.env.DATABASE_URL = localUrl;
  return localUrl;
}

const resolvedDbUrl = resolveDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

