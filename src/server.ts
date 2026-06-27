import app from "./app.js";
import config from "./app/config/index.js";
import { connectDB } from "./app/db/index.js";
import { prisma } from "./app/db/prisma.js";

const PORT = config.port || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  const shutdown = async () => {
    console.log("\n🛑 Shutting down server...");

    await prisma.$disconnect();

    server.close(() => {
      console.log("✅ Server stopped.");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

startServer();
