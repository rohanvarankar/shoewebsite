import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import adminOnly from "../../middlewares/admin.middleware.js";
import { getDashboardAnalytics } from "../../controllers/admin/analytics.controller.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboardAnalytics);

export default router;
