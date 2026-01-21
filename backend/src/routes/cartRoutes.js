import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getMyCart,
} from "../controllers/cart.controller.js";
import { removeFromCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getMyCart); // ✅ THIS WAS MISSING
// REMOVE ITEM FROM CART
router.delete("/remove/:productId", authMiddleware, removeFromCart);

export default router;
