import { Router } from "express";
import WorkspaceController from "../controllers/workspace-controller.js";
import { AuthMiddleware } from "../middlewares/auth-middleware.js";
const router = new Router();

router.post("/create", AuthMiddleware.check, WorkspaceController.create);
router.get("/check", WorkspaceController.check);
router.get("/", AuthMiddleware.check, WorkspaceController.get);
router.delete("/:id", AuthMiddleware.check, WorkspaceController.delete);

export default router;
