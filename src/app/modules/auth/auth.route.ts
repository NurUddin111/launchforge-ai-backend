import { Router } from "express";

import { AuthController } from "./auth.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import { loginValidationSchema, registerValidationSchema } from "./auth.validation.js";
import auth from "../../middlewares/auth.js";

const router = Router();

router.post("/register", validateRequest(registerValidationSchema), AuthController.registerUser);

router.post("/login", validateRequest(loginValidationSchema), AuthController.loginUser);

router.get("/me", auth(), AuthController.getMe);

export const AuthRoutes = router;
