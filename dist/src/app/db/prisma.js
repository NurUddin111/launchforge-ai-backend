import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import config from "../config/index.js";
const globalForPrisma = globalThis;
const pool = new Pool({
    connectionString: config.databaseUrl,
});
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: ["warn", "error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
//# sourceMappingURL=prisma.js.map