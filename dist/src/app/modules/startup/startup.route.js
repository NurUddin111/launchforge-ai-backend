import { Router } from "express";
import auth from "../../middlewares/auth.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { StartupController } from "./startup.controller.js";
import { StartupValidation } from "./startup.validation.js";
const router = Router();
router.post("/generate", auth(), validateRequest(StartupValidation.generateStartupSchema), StartupController.generateStartup);
router.get("/", auth(), StartupController.getMyStartups);
router.get("/dashboard/stats", auth(), StartupController.getDashboardStats);
router.patch("/:id/favorite", auth(), StartupController.toggleFavorite);
router.get("/:id/export", auth(), StartupController.exportStartup);
router.delete("/:id", auth(), StartupController.softDeleteStartup);
router.get("/:slug", auth(), StartupController.getStartupBySlug);
export const StartupRoutes = router;
//# sourceMappingURL=startup.route.js.map