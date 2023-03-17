import { Router } from "express";
import * as factoryController from "../controllers/factory";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.get("/factory", factoryController.getFactories);
router.get("/factory/:id", factoryController.getFactoryById);
router.post("/factory", requireAuth, factoryController.createFactory);
router.put("/factory/:id", requireAuth, factoryController.updateFactory);
router.delete("/factory/:id", requireAuth, factoryController.deleteFactory);

export default router;
