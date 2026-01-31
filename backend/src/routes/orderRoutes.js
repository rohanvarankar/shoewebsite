import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";

const router = express.Router();

/**
 * =========================
 * ORDERS ROUTES
 * =========================
 */

// CREATE ORDER
// POST /api/orders
router.post("/", protect, createOrder);

// GET LOGGED-IN USER ORDERS (ORDER HISTORY)
// GET /api/orders/my
router.get("/my", protect, getMyOrders);

// GET SINGLE ORDER DETAILS
// GET /api/orders/:id
router.get("/:id", protect, getOrderById);

export default router;
