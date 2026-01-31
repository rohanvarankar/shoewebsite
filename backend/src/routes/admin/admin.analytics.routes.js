import express from "express";
import { getDashboardMetrics } from "../../controllers/admin/dashboard.controller.js";

const router = express.Router();

router.get("/dashboard", getDashboardMetrics);

export default router;
