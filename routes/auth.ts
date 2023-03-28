import { Router } from "express";
import * as authController from "../controllers/auth";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.get("/user", requireAuth, authController.getUser);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refreshToken);

export default router;
