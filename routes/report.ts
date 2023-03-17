import { Router } from "express";
import * as reportController from "../controllers/report";

const router = Router();

router.get("/report", reportController.getReport);
router.get("/report/:factoryId", reportController.getFactoryHistory);

export default router;
