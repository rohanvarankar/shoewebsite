import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getMyCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getMyCart); // ✅ THIS WAS MISSING

export default router;
