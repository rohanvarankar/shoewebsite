import express from "express";
import upload from "../middleware/upload.js";
import {
  createProduct,
  getAllProducts
} from "../controllers/product.controller.js";

const router = express.Router();

// CREATE product (admin)
router.post("/", upload.array("images", 5), createProduct);

// GET all products (frontend)
router.get("/", getAllProducts);

export default router;
