import express from "express";
import {
  getAllProductsAdmin,
  updateProductAdmin,
  toggleProductStatus
} from "../../controllers/admin/product.controller.js";
import { createProduct } from "../../controllers/product.controller.js";
import protect from "../../middlewares/auth.middleware.js";
import adminOnly from "../../middlewares/admin.middleware.js";
import upload from "../../middlewares/upload.js";

const router = express.Router();

// 🔐 ADMIN ONLY
router.use(protect, adminOnly);

// CREATE PRODUCT (ADMIN ONLY)
router.post(
  "/",
  upload.array("images", 5),
  createProduct
);

// GET / UPDATE / TOGGLE
router.get("/", getAllProductsAdmin);
router.put("/:id", updateProductAdmin);
router.patch("/:id/toggle", toggleProductStatus);

export default router;
