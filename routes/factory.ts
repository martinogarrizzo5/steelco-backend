import { Router } from "express";
import * as factoryController from "../controllers/factory";

const router = Router();

// CRUD operations
router.get("/factory", factoryController.getFactories);
router.post("/factory", factoryController.addFactory);
router.put("/factory/:id", factoryController.updateFactory);
router.delete("/factory/:id", factoryController.deleteFactory);

export default router;
