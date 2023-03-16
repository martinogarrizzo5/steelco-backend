import { Router } from "express";
import * as injuryController from "../controllers/injury";

const router = Router();

router.get("/injury", injuryController.getInjuries);
router.get("/injury/:id", injuryController.getInjurieById);
router.post("/injury", injuryController.addInjurie);
router.put("/injury/:id", injuryController.updateInjurie);
router.delete("/injury/:id", injuryController.deleteInjurie);

export default router;
