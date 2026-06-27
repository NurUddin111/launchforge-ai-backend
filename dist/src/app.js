import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./app/routes/index.js";
import notFound from "./app/middlewares/notFound.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "LaunchForge AI API Running 🚀",
    });
});
app.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        status: "healthy",
    });
});
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "LaunchForge AI API Running 🚀",
    });
});
app.use("/api/v1", router);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map