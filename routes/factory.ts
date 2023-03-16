import { Router } from "express";
import * as factoryController from "../controllers/factory";

const router = Router();

router.get("/factory", factoryController.getFactories);
router.get("/factory/:id", factoryController.getFactoryById);
router.post("/factory", factoryController.createFactory);
router.put("/factory/:id", factoryController.updateFactory);
router.delete("/factory/:id", factoryController.deleteFactory);

export default router;
