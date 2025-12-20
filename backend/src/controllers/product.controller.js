import Product from "../models/Product.model.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, brand, price, sizes, stock, description } = req.body;

    // ✅ SAFETY: prevent crash if files are missing
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const product = await Product.create({
      name,
      brand,
      price,
      sizes: JSON.parse(sizes),
      stock,
      images,
      description
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL PRODUCTS (used by homepage + product list)
export const getAllProducts = async (req, res) => {
  try {
    // ⚠️ IMPORTANT:
    // oldest → newest order
    // frontend slices last 4 for "Latest Shoes"
    const products = await Product.find().sort({ createdAt: 1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
