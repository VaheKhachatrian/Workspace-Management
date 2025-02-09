import { Router } from "express";
import authController from "../controllers/auth-controller.js";
const router = new Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/users", authController.getUsers);

export default router;
