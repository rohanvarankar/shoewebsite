import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const router = express.Router();

// CREATE ORDER
router.post("/", protect, createOrder);

export default router;
