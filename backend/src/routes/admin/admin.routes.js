import express from "express";
import protect from "../../middlewares/auth.middleware.js";
import adminOnly from "../../middlewares/admin.middleware.js";

import adminAnalyticsRoutes from "./admin.analytics.routes.js";
import adminProductRoutes from "./admin.product.routes.js";
import adminOrderRoutes from "./admin.order.routes.js";
import adminUserRoutes from "./admin.user.routes.js";

const router = express.Router();

// Global admin protection
router.use(protect, adminOnly);

// Analytics
router.use("/analytics", adminAnalyticsRoutes);

// Products
router.use("/products", adminProductRoutes);

// Orders
router.use("/orders", adminOrderRoutes);

// Users
router.use("/users", adminUserRoutes);

export default router;
