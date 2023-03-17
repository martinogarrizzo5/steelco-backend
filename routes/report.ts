import { Router } from "express";
import * as reportController from "../controllers/report";

const router = Router();

router.get("/report", reportController.getReport);

export default router;
