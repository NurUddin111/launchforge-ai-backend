import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { StartupRoutes } from "../modules/startup/startup.route.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API v1",
  });
});

router.use("/auth", AuthRoutes);

router.use("/startup", StartupRoutes);

export default router;
