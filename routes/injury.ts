import { Router } from "express";
import * as injuryController from "../controllers/injury";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.get("/injury", injuryController.getInjuries);
router.get("/injury/:id", injuryController.getInjurieById);
router.post("/injury", requireAuth, injuryController.addInjurie);
router.put("/injury/:id", requireAuth, injuryController.updateInjurie);
router.delete("/injury/:id", requireAuth, injuryController.deleteInjurie);

export default router;
