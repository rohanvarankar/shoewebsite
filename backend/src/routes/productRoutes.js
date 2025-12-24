import express from "express";
import Product from "../models/Product.model.js";

const router = express.Router();

/**
 * GET ALL PRODUCTS
 * Used by product listing page
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/**
 * ✅ GET PRODUCT BY ID
 * Used by product detail page
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // 1️⃣ If product not found
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 2️⃣ Send product
    res.status(200).json(product);
  } catch (error) {
    // 3️⃣ Invalid ObjectId or DB error
    res.status(400).json({
      message: "Invalid product ID",
    });
  }
});

export default router;
