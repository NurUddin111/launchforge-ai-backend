import { logger } from "../../utils/logger.js";
import { prisma } from "./prisma.js";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info("✅ Database connected");
  } catch (error) {
    logger.error("❌ Database connection failed", error);
    process.exit(1);
  }
};
