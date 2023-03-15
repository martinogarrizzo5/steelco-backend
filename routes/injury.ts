import { Router } from "express";
import * as injuryController from "../controllers/injury";

const router = Router();

router.get("/injury", injuryController.getInjuries);

export default router;
