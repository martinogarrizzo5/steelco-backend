import { Router } from "express";
import * as injuryController from "../controllers/injury";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.get("/injury", injuryController.getInjuries);

export default router;
